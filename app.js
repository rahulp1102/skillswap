// ==================== STATE MANAGEMENT ====================
const appState = {
  currentUser: null,
  currentPage: 'landing',
  onboardingRole: null,
  searchQuery: '',
  filters: {
    campus: 'all',
    proficiency: 0,
    verified: false
  },
  currentRequest: null,
  // Static data for landing page visuals
  allSkills: [
    { name: 'Python', trend: '↑ 12%' },
    { name: 'UI/UX Design', trend: '↑ 8%' },
    { name: 'React', trend: '↑ 5%' },
    { name: 'DSA', trend: '↑ 15%' },
    { name: 'JavaScript', trend: '↑ 11%' }
  ]
};

// ==================== AUTHENTICATION ====================

// Listen for auth state changes
document.addEventListener('DOMContentLoaded', () => {
  // Wait for Firebase to load from index.html
  setTimeout(() => {
    if (window.onAuthStateChanged) {
      window.onAuthStateChanged(window.auth, async (user) => {
        if (user) {
          // User is signed in, fetch their profile
          try {
            const userDoc = await window.getDoc(window.doc(window.db, "users", user.uid));
            
            if (userDoc.exists()) {
              // Existing user
              appState.currentUser = userDoc.data();
              showToast(`Welcome back, ${appState.currentUser.name}!`, 'success');
              
              if (user.email === 'admin@test.com') {
                navigateTo('admin');
              } else {
                navigateTo('dashboard');
              }
            } else {
              // New user - needs onboarding
              navigateTo('role');
            }
          } catch (e) {
            console.error("Auth Error:", e);
          }
        } else {
          // User is signed out
          appState.currentUser = null;
          navigateTo('landing');
          renderLandingPage();
        }
      });
    } else {
      console.error("Firebase not found. Check index.html keys.");
    }
  }, 1000);
});

async function handleGoogleSignIn() {
  try {
    showToast('Redirecting to Google...', 'success');
    await window.signInWithPopup(window.auth, window.googleProvider);
  } catch (error) {
    console.error(error);
    showToast('Login failed: ' + error.message, 'error');
  }
}

async function handleLogout() {
  try {
    await window.signOut(window.auth);
    showToast('Logged out successfully', 'success');
  } catch (error) {
    console.error(error);
  }
}

// ==================== NAVIGATION ====================
function navigateTo(pageName) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  
  const pageMap = {
    'landing': 'landing-page',
    'signin': 'signin-page',
    'role': 'role-selection-page',
    'onboarding': 'onboarding-page',
    'dashboard': 'dashboard-page',
    'profile': 'profile-page',
    'credits': 'credits-page',
    'campus': 'campus-page',
    'admin': 'admin-page'
  };
  
  const pageId = pageMap[pageName];
  if (pageId) {
    document.getElementById(pageId).classList.add('active');
    appState.currentPage = pageName;
    
    // Load page-specific data
    if (pageName === 'dashboard') loadDashboard();
    if (pageName === 'profile') loadProfile();
    if (pageName === 'credits') loadCreditsLedger();
    if (pageName === 'admin') loadAdminDashboard();
    if (pageName === 'landing') renderLandingPage();
  }
}

// ==================== ONBOARDING ====================
function selectRole(role) {
  appState.onboardingRole = role;
  navigateTo('onboarding');
  
  // Pre-fill email/name from Google Auth if available
  const authUser = window.auth.currentUser;
  if (authUser) {
    document.getElementById('onboarding-email').value = authUser.email;
    document.getElementById('onboarding-name').value = authUser.displayName;
  }

  // Show appropriate fields
  if (role === 'student') {
    document.getElementById('student-fields').style.display = 'block';
    document.getElementById('professional-fields').style.display = 'none';
  } else {
    document.getElementById('student-fields').style.display = 'none';
    document.getElementById('professional-fields').style.display = 'block';
  }
}

// Attach listener to onboarding form
document.addEventListener('DOMContentLoaded', () => {
  const onboardingForm = document.getElementById('onboarding-form');
  if (onboardingForm) {
    onboardingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await completeOnboarding();
    });
  }
});

async function completeOnboarding() {
  const authUser = window.auth.currentUser;
  if (!authUser) return;

  const newUser = {
    id: authUser.uid,
    name: document.getElementById('onboarding-name').value,
    email: authUser.email,
    role: appState.onboardingRole,
    bio: 'New member',
    teachSkills: [],
    learnSkills: [],
    creditsBalance: 5, // Sign-up bonus
    helpfulRate: 0,
    completionRate: 0,
    badges: ['New Member'],
    lastActive: new Date().toISOString()
  };
  
  if (appState.onboardingRole === 'student') {
    newUser.college = document.getElementById('onboarding-college').value;
    newUser.campus = newUser.college;
  } else {
    newUser.company = document.getElementById('onboarding-company').value;
    newUser.campus = 'Professional';
  }
  
  try {
    await window.setDoc(window.doc(window.db, "users", authUser.uid), newUser);
    appState.currentUser = newUser;
    showToast('Profile created! +5 Credits bonus.', 'success');
    navigateTo('dashboard');
  } catch (error) {
    console.error(error);
    showToast('Error creating profile', 'error');
  }
}

// ==================== DASHBOARD & DISCOVERY ====================
async function loadDashboard() {
  if (!appState.currentUser) return;
  
  // Real-time listener for credits updates
  window.onSnapshot(window.doc(window.db, "users", appState.currentUser.id), (doc) => {
    if(doc.exists()) {
      appState.currentUser = doc.data();
      document.getElementById('credits-value').textContent = `${appState.currentUser.creditsBalance}`;
    }
  });

  document.getElementById('user-avatar').textContent = appState.currentUser.name.charAt(0).toUpperCase();
  
  loadMentorResults();
  loadLearningTab();
}

async function loadMentorResults() {
  const queryText = appState.searchQuery || document.getElementById('dashboard-search').value.toLowerCase();
  const resultsContainer = document.getElementById('mentor-results');
  resultsContainer.innerHTML = '<div class="loading">Loading mentors...</div>';

  try {
    // Fetch all users
    const q = window.query(window.collection(window.db, "users"));
    const snapshot = await window.getDocs(q);
    
    let mentors = [];
    snapshot.forEach(doc => {
      const user = doc.data();
      // Filter out self and users who aren't teaching anything
      if (user.id !== appState.currentUser.id && user.teachSkills && user.teachSkills.length > 0) {
        mentors.push(user);
      }
    });

    // Client-side filtering logic
    if (queryText) {
      mentors = mentors.filter(m => m.teachSkills.some(ts => ts.skill.toLowerCase().includes(queryText)));
    }

    if (appState.filters.campus === 'same') {
      mentors = mentors.filter(m => m.campus === appState.currentUser.campus);
    }
    
    if (appState.filters.verified) {
        mentors = mentors.filter(m => m.badges && m.badges.includes('Verified Campus'));
    }

    if (mentors.length === 0) {
      resultsContainer.innerHTML = `<div class="empty-state"><h3>No mentors found</h3><p>Try running seedDatabase() in console if this is a fresh install.</p></div>`;
      return;
    }

    resultsContainer.innerHTML = mentors.map(renderMentorCard).join('');
  } catch (error) {
    console.error(error);
    resultsContainer.innerHTML = '<div class="empty-state">Error loading mentors</div>';
  }
}

function renderMentorCard(mentor) {
  const initials = mentor.name.split(' ').map(n => n[0]).join('');
  const skill = mentor.teachSkills[0];
  const stars = '⭐'.repeat(skill.level || 3);
  
  return `
    <div class="mentor-card">
      <div class="mentor-header">
        <div class="mentor-avatar">${initials}</div>
        <div class="mentor-info">
          <h4>${mentor.name}</h4>
          <div class="mentor-meta">${mentor.role} • ${mentor.campus}</div>
        </div>
      </div>
      <div class="mentor-details">
        <div class="skill-level">
          <strong>${skill?.skill || 'General'}</strong>
          <span class="stars">${stars}</span>
        </div>
        <button class="btn btn--primary" onclick="requestSession('${mentor.id}', '${skill?.skill || ''}', '${mentor.name}')">Request Session</button>
      </div>
    </div>
  `;
}

// ==================== SESSION REQUESTS ====================
function requestSession(mentorId, skill, mentorName) {
  appState.currentRequest = { mentorId, mentorName, skill };
  
  document.getElementById('request-skill').value = skill;
  document.getElementById('request-mentor').value = mentorName;
  
  openModal('request-modal');
  showRequestStep(1);
}

async function submitSessionRequest() {
  const slots = [
    document.getElementById('slot-1').value,
    document.getElementById('slot-2').value,
    document.getElementById('slot-3').value
  ].filter(s => s).map(s => new Date(s).toISOString());
  
  if (slots.length === 0) {
    showToast('Please pick at least 1 slot', 'error');
    return;
  }

  const newSession = {
    learnerId: appState.currentUser.id,
    learnerName: appState.currentUser.name,
    teacherId: appState.currentRequest.mentorId,
    teacherName: appState.currentRequest.mentorName,
    skill: appState.currentRequest.skill,
    status: 'active', // Auto-accepted for demo purposes
    chosenSlot: slots[0],
    createdAt: new Date().toISOString()
  };

  try {
    await window.addDoc(window.collection(window.db, "sessions"), newSession);
    closeModal('request-modal');
    showToast('Session Confirmed! Check "My Learning" tab.', 'success');
    loadLearningTab();
  } catch (error) {
    showToast('Failed to send request', 'error');
    console.error(error);
  }
}

// ==================== LEARNING TAB ====================
async function loadLearningTab() {
  if (!appState.currentUser) return;
  
  // Query sessions where I am the learner
  const q = window.query(
    window.collection(window.db, "sessions"),
    window.where("learnerId", "==", appState.currentUser.id)
  );
  
  const snapshot = await window.getDocs(q);
  const sessions = [];
  snapshot.forEach(doc => sessions.push({ id: doc.id, ...doc.data() }));
  
  // Sort sessions
  const active = sessions.filter(s => s.status === 'active' || s.status === 'pending');
  const completed = sessions.filter(s => s.status === 'completed');
  
  // Render Active
  const activeContainer = document.getElementById('active-sessions');
  if(active.length === 0) {
      activeContainer.innerHTML = '<p>No active sessions</p>';
  } else {
      activeContainer.innerHTML = active.map(session => `
        <div class="session-card">
          <div class="session-header">
            <h4>${session.skill} with ${session.teacherName}</h4>
            <div class="status-badge active">Active</div>
          </div>
          <div class="session-actions">
            <a href="https://meet.jit.si/skillswap_${session.id}" target="_blank" class="btn btn--primary btn--sm">Join Video</a>
            <button class="btn btn--outline btn--sm" onclick="completeSession('${session.id}', '${session.teacherId}', '${session.skill}')">Mark Complete</button>
          </div>
        </div>
      `).join('');
  }

  // Render Past
  const pastContainer = document.getElementById('past-sessions');
  pastContainer.innerHTML = completed.length ? completed.map(s => `
    <div class="session-card">
        <h4>${s.skill} with ${s.teacherName}</h4>
        <span class="status-badge">Completed</span>
    </div>
  `).join('') : '<p>No past sessions</p>';

  updateProfileCompleteness();
}

function updateProfileCompleteness() {
    const user = appState.currentUser;
    // Simple logic checks
    document.getElementById('status-photo').textContent = user.photoUrl ? '100%' : '0%';
    document.getElementById('status-bio').textContent = user.bio ? '100%' : '0%';
    document.getElementById('status-verified').textContent = user.badges && user.badges.includes('Verified Campus') ? '100%' : '0%';
}

// ==================== COMPLETION & CREDITS ====================
function completeSession(sessionId, teacherId, skill) {
  appState.currentRequest = { sessionId, teacherId, skill }; 
  openModal('feedback-modal');
}

async function submitFeedback(isHelpful) {
  const { sessionId, teacherId, skill } = appState.currentRequest;
  const learnerId = appState.currentUser.id;
  const comment = document.getElementById('feedback-comment').value;

  try {
    await window.runTransaction(window.db, async (transaction) => {
      // 1. Get references
      const sessionRef = window.doc(window.db, "sessions", sessionId);
      const learnerRef = window.doc(window.db, "users", learnerId);
      const teacherRef = window.doc(window.db, "users", teacherId);
      
      const learnerDoc = await transaction.get(learnerRef);
      const teacherDoc = await transaction.get(teacherRef);

      // 2. Logic: Check credits
      const learnerCredits = learnerDoc.data().creditsBalance;
      if (learnerCredits < 1) {
        throw "Not enough credits!";
      }

      // 3. Update Balances
      if (isHelpful) {
        transaction.update(learnerRef, { creditsBalance: learnerCredits - 1 });
        transaction.update(teacherRef, { creditsBalance: teacherDoc.data().creditsBalance + 1 });
      }

      // 4. Close Session
      transaction.update(sessionRef, {
        status: 'completed',
        feedback: { isHelpful, comment },
        completedAt: new Date().toISOString()
      });

      // 5. Add Transaction Record
      const newTxRef = window.doc(window.collection(window.db, "transactions"));
      transaction.set(newTxRef, {
        fromId: learnerId,
        toId: teacherId,
        amount: 1,
        skill: skill,
        timestamp: new Date().toISOString()
      });
    });

    closeModal('feedback-modal');
    showToast('Feedback sent & Credits transferred!', 'success');
    loadLearningTab();
  } catch (e) {
    showToast('Transaction failed: ' + e, 'error');
  }
}

// ==================== CAMPUS HUB & ADMIN ====================
async function loadCampusData() {
  const campus = document.getElementById('campus-select').value;
  if (!campus) {
    document.getElementById('campus-content').style.display = 'none';
    return;
  }
  document.getElementById('campus-content').style.display = 'block';
  
  // Basic query for campus
  const q = window.query(window.collection(window.db, "users"), window.where("campus", "==", campus));
  const snapshot = await window.getDocs(q);
  let campusUsers = [];
  snapshot.forEach(doc => campusUsers.push(doc.data()));

  // Render Top Teachers
  const topTeachers = campusUsers
    .filter(u => u.teachSkills && u.teachSkills.length > 0)
    .slice(0, 5);

  document.getElementById('top-teachers-list').innerHTML = topTeachers.map((u, i) => `
    <div class="leaderboard-item"><span>${i+1}. ${u.name}</span><span>${u.creditsBalance} Cr</span></div>
  `).join('');
  
  document.getElementById('top-skills-list').innerHTML = `<div class="leaderboard-item">1. Python</div><div class="leaderboard-item">2. React</div>`;
}

async function loadAdminDashboard() {
    const usersSnap = await window.getDocs(window.collection(window.db, "users"));
    document.getElementById('admin-total-users').textContent = usersSnap.size;
    const sessionsSnap = await window.getDocs(window.collection(window.db, "sessions"));
    document.getElementById('admin-total-sessions').textContent = sessionsSnap.size;
}

async function loadCreditsLedger() {
    if(!appState.currentUser) return;
    document.getElementById('ledger-balance').textContent = appState.currentUser.creditsBalance;
    // In a full app, query the 'transactions' collection here
    document.getElementById('ledger-list').innerHTML = '<p style="text-align:center">Transaction history loading...</p>';
}

// ==================== PROFILE ====================
async function loadProfile() {
    if (!appState.currentUser) return;
    const user = appState.currentUser;
    
    document.getElementById('profile-name').textContent = user.name;
    document.getElementById('profile-details').textContent = `${user.role} • ${user.campus}`;
    
    const teachList = document.getElementById('teach-skills-list');
    teachList.innerHTML = user.teachSkills ? 
        user.teachSkills.map(s => `<div class="skill-item"><strong>${s.skill}</strong></div>`).join('') : 'No skills';
}

function showAddSkillModal(type) {
    const skill = prompt("Enter skill name:");
    if (!skill) return;

    const userRef = window.doc(window.db, "users", appState.currentUser.id);
    const field = type === 'teach' ? 'teachSkills' : 'learnSkills';
    
    window.updateDoc(userRef, {
        [field]: window.arrayUnion({ skill: skill, level: 3, verified: false })
    }).then(() => {
        showToast('Skill added!', 'success');
        // Update local state
        if(!appState.currentUser[field]) appState.currentUser[field] = [];
        appState.currentUser[field].push({ skill, level:3 });
        loadProfile();
    });
}

// ==================== UTILS & EXPORTS ====================
function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }
function showRequestStep(step) {
  document.querySelectorAll('.request-step').forEach(s => s.style.display = 'none');
  document.getElementById(`request-step-${step}`).style.display = 'block';
}
function toggleUserMenu() { document.getElementById('user-dropdown').classList.toggle('active'); }
function switchTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById(`${tab}-tab`).classList.add('active');
}
function applyFilters() { loadMentorResults(); }
function showToast(msg, type) {
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.textContent = msg;
    document.getElementById('toast-container').appendChild(t);
    setTimeout(() => t.remove(), 3000);
}
function handleLandingSearch() {
    appState.searchQuery = document.getElementById('landing-search').value;
    navigateTo('dashboard');
}
function renderLandingPage() {
    const list = document.getElementById('trending-skills');
    if(list) list.innerHTML = appState.allSkills.map(s => `<div class="skill-chip">${s.name}</div>`).join('');
    // Render rising skills
    const risingContainer = document.getElementById('rising-skills');
    if(risingContainer) {
         risingContainer.innerHTML = appState.allSkills.map(skill => `
            <div class="skill-chip">${skill.name} ${skill.trend}</div>
        `).join('');
    }
}

// Expose functions to HTML
window.navigateTo = navigateTo;
window.handleGoogleSignIn = handleGoogleSignIn;
window.handleLogout = handleLogout;
window.selectRole = selectRole;
window.renderMentorCard = renderMentorCard;
window.requestSession = requestSession;
window.submitSessionRequest = submitSessionRequest;
window.completeSession = completeSession;
window.submitFeedback = submitFeedback;
window.loadCampusData = loadCampusData;
window.showAddSkillModal = showAddSkillModal;
window.openModal = openModal;
window.closeModal = closeModal;
window.showRequestStep = showRequestStep;
window.toggleUserMenu = toggleUserMenu;
window.switchTab = switchTab;
window.applyFilters = applyFilters;
window.handleLandingSearch = handleLandingSearch;
window.renderLandingPage = renderLandingPage;


// ==========================================
// MOCK DATA SEEDER (Run seedDatabase() in console)
// ==========================================
window.seedDatabase = async function() {
  console.log("Starting Seed...");
  const mockUsers = [
    {
      id: 'user_1',
      name: 'Rohit Sharma',
      email: 'learner@test.com',
      role: 'student',
      college: 'JECRC',
      campus: 'JECRC',
      creditsBalance: 4,
      teachSkills: [{ skill: 'Python', level: 4 }, { skill: 'Git', level: 3 }],
      badges: ['Verified Campus', '10+ hours taught']
    },
    {
      id: 'user_2',
      name: 'Asha Patel',
      role: 'student',
      college: 'BITS Pilani',
      campus: 'BITS Pilani',
      creditsBalance: 8,
      teachSkills: [{ skill: 'UI/UX Design', level: 5 }, { skill: 'Figma', level: 5 }],
      badges: ['Verified Campus']
    },
    {
      id: 'user_3',
      name: 'Priya Singh',
      college: 'Delhi University',
      campus: 'Delhi University',
      creditsBalance: 6,
      teachSkills: [{ skill: 'Statistics', level: 4 }],
      badges: ['Verified Campus']
    },
    {
      id: 'user_4',
      name: 'Rahul Purohit',
      college: 'JECRC',
      campus: 'JECRC',
      creditsBalance: 12,
      teachSkills: [{ skill: 'DSA', level: 5 }, { skill: 'Java', level: 4 }],
      badges: ['Verified Campus', 'Top Teacher']
    }
  ];

  let count = 0;
  for (const user of mockUsers) {
    await window.setDoc(window.doc(window.db, "users", user.id), user);
    console.log(`Uploaded ${user.name}`);
    count++;
  }
  alert(`Uploaded ${count} users! Refresh page.`);
};