// ==================== STATE MANAGEMENT ====================
const appState = {
  currentUser: null,
  currentPage: 'landing',
  onboardingRole: null,
  searchQuery: '',
  filters: {
    campus: 'all',
    proficiency: 0,
    verified: false,
    availability: 'all'
  },
  currentRequest: null,
  users: [],
  skills: [],
  sessions: [],
  creditTransactions: [],
  featureFlags: {
    groupSessions: false,
    videoIntro: false
  }
};

// ==================== MOCK DATA INITIALIZATION ====================
function initializeMockData() {
  // Initialize skills
  appState.skills = [
    { name: 'Python', popularity: 340, trend: '↑ 12%' },
    { name: 'UI/UX Design', popularity: 280, trend: '↑ 8%' },
    { name: 'Data Science', popularity: 265, trend: '↑ 18%' },
    { name: 'React', popularity: 245, trend: '↑ 5%' },
    { name: 'Git', popularity: 198, trend: '↓ 2%' },
    { name: 'Web Development', popularity: 220, trend: '↑ 9%' },
    { name: 'DSA', popularity: 210, trend: '↑ 15%' },
    { name: 'Aptitude', popularity: 185, trend: '↑ 7%' },
    { name: 'JavaScript', popularity: 230, trend: '↑ 11%' },
    { name: 'Machine Learning', popularity: 195, trend: '↑ 14%' },
    { name: 'Figma', popularity: 175, trend: '↑ 6%' },
    { name: 'SQL', popularity: 160, trend: '↑ 4%' },
    { name: 'Java', popularity: 205, trend: '↑ 3%' },
    { name: 'Statistics', popularity: 140, trend: '↑ 9%' },
    { name: 'Node.js', popularity: 155, trend: '↑ 8%' }
  ];

  // Initialize users
  appState.users = [
    {
      id: 'user_1',
      name: 'Rahul Sharma',
      email: 'learner@test.com',
      role: 'student',
      college: 'JECRC',
      year: 3,
      cgpa: 8.2,
      campus: 'Jaipur',
      bio: 'CSE student passionate about web dev and open source',
      teachSkills: [
        { skill: 'Python', level: 4, verified: true },
        { skill: 'Git', level: 3, verified: false }
      ],
      learnSkills: [
        { skill: 'UI/UX Design', priority: 'High' },
        { skill: 'React', priority: 'Medium' }
      ],
      creditsBalance: 4,
      helpfulRate: 0.92,
      completionRate: 0.98,
      badges: ['Verified Campus', '10+ hours taught'],
      availability: 'Weekends, 4-8pm IST',
      lastActive: new Date()
    },
    {
      id: 'user_2',
      name: 'Asha Patel',
      email: 'mentor@test.com',
      role: 'student',
      college: 'BITS Pilani',
      year: 4,
      cgpa: 8.8,
      campus: 'Goa',
      bio: 'UI/UX designer, love teaching design fundamentals',
      teachSkills: [
        { skill: 'UI/UX Design', level: 5, verified: true },
        { skill: 'Figma', level: 5, verified: true }
      ],
      learnSkills: [
        { skill: 'Data Science', priority: 'High' }
      ],
      creditsBalance: 8,
      helpfulRate: 0.96,
      completionRate: 0.99,
      badges: ['Verified Campus', '10+ hours taught', '90% helpful'],
      availability: 'Flexible, Mon-Fri evenings',
      lastActive: new Date()
    },
    {
      id: 'user_3',
      name: 'Priya Singh',
      email: 'user3@test.com',
      role: 'student',
      college: 'Delhi University',
      year: 2,
      campus: 'Delhi',
      bio: 'Data Science enthusiast, love statistics',
      teachSkills: [
        { skill: 'Statistics', level: 4, verified: false }
      ],
      learnSkills: [
        { skill: 'Python', priority: 'High' }
      ],
      creditsBalance: 6,
      helpfulRate: 0.88,
      completionRate: 0.95,
      badges: ['Verified Campus'],
      availability: 'Weekends only',
      lastActive: new Date()
    }
  ];

  // Add more diverse users
  const additionalUsers = [
    {
      id: 'user_4',
      name: 'Arun Kachhawa',
      email: 'user4@test.com',
      role: 'student',
      college: 'JECRC',
      year: 3,
      campus: 'Jaipur',
      bio: 'Competitive programmer, teaching DSA',
      teachSkills: [
        { skill: 'DSA', level: 5, verified: true },
        { skill: 'Java', level: 4, verified: true }
      ],
      learnSkills: [
        { skill: 'Machine Learning', priority: 'High' }
      ],
      creditsBalance: 12,
      helpfulRate: 0.94,
      completionRate: 0.97,
      badges: ['Verified Campus', '10+ hours taught', '90% helpful'],
      availability: 'Flexible timing',
      lastActive: new Date()
    },
    {
      id: 'user_5',
      name: 'Kumkum Tripathi',
      email: 'user5@test.com',
      role: 'student',
      college: 'JECRC',
      year: 2,
      campus: 'Jaipur',
      bio: 'Web dev enthusiast',
      teachSkills: [
        { skill: 'Web Development', level: 5, verified: true },
        { skill: 'JavaScript', level: 5, verified: false }
      ],
      learnSkills: [
        { skill: 'React', priority: 'High' }
      ],
      creditsBalance: 7,
      helpfulRate: 0.91,
      completionRate: 0.96,
      badges: ['Verified Campus', '10+ hours taught'],
      availability: 'Evening slots',
      lastActive: new Date()
    },
    {
      id: 'user_6',
      name: 'Priyanka Rathore',
      email: 'user6@test.com',
      role: 'student',
      college: 'JECRC',
      year: 4,
      campus: 'Jaipur',
      bio: 'Full stack developer',
      teachSkills: [
        { skill: 'React', level: 5, verified: true },
        { skill: 'Node.js', level: 5, verified: true }
      ],
      learnSkills: [
        { skill: 'Data Science', priority: 'Medium' }
      ],
      creditsBalance: 9,
      helpfulRate: 0.93,
      completionRate: 0.98,
      badges: ['Verified Campus', '10+ hours taught', '90% helpful'],
      availability: 'Weekends, flexible',
      lastActive: new Date()
    },
    {
      id: 'user_7',
      name: 'Rahul Purohit',
      email: 'user7@test.com',
      role: 'student',
      college: 'JECRC',
      year: 4,
      campus: 'Jaipur',
      bio: 'ML researcher',
      teachSkills: [
        { skill: 'Machine Learning', level: 5, verified: true },
        { skill: 'Python', level: 5, verified: true }
      ],
      learnSkills: [
        { skill: 'Statistics', priority: 'Low' }
      ],
      creditsBalance: 11,
      helpfulRate: 0.95,
      completionRate: 0.99,
      badges: ['Verified Campus', '10+ hours taught', '90% helpful', '7-day streak'],
      availability: 'Flexible',
      lastActive: new Date()
    },
    {
      id: 'user_8',
      name: 'Vikram Singh',
      email: 'user8@test.com',
      role: 'student',
      college: 'Delhi University',
      year: 1,
      campus: 'Delhi',
      bio: 'New to programming',
      teachSkills: [],
      learnSkills: [
        { skill: 'Python', priority: 'High' },
        { skill: 'Git', priority: 'Medium' }
      ],
      creditsBalance: 10,
      helpfulRate: 0,
      completionRate: 0,
      badges: [],
      availability: 'Weekends',
      lastActive: new Date()
    }
  ];

  appState.users = appState.users.concat(additionalUsers);

  // Initialize sessions
  appState.sessions = [
    {
      id: 'req_001',
      learnerId: 'user_1',
      teacherId: 'user_2',
      skill: 'UI/UX Design',
      status: 'completed',
      proposedSlots: [
        new Date('2025-11-04T14:00:00'),
        new Date('2025-11-05T15:00:00'),
        new Date('2025-11-06T16:00:00')
      ],
      chosenSlot: new Date('2025-11-04T14:00:00'),
      meetLink: 'https://meet.jitsi.org/skillswap_req_001',
      feedback: {
        helpful: true,
        comment: 'Asha explained everything so clearly!'
      },
      completedAt: new Date('2025-11-04T15:00:00')
    },
    {
      id: 'req_002',
      learnerId: 'user_1',
      teacherId: 'user_4',
      skill: 'DSA',
      status: 'active',
      proposedSlots: [
        new Date('2025-11-05T10:00:00'),
        new Date('2025-11-05T14:00:00'),
        new Date('2025-11-06T10:00:00')
      ],
      chosenSlot: new Date('2025-11-05T10:00:00'),
      meetLink: 'https://meet.jitsi.org/skillswap_req_002'
    },
    {
      id: 'req_003',
      learnerId: 'user_1',
      teacherId: 'user_6',
      skill: 'React',
      status: 'pending',
      proposedSlots: [
        new Date('2025-11-06T15:00:00'),
        new Date('2025-11-07T10:00:00'),
        new Date('2025-11-07T16:00:00')
      ]
    }
  ];

  // Initialize credit transactions
  appState.creditTransactions = [
    {
      id: 'tx_001',
      userId: 'user_1',
      amount: -1,
      type: 'spent',
      description: 'Learned UI/UX Design from Asha',
      sessionId: 'req_001',
      timestamp: new Date('2025-11-04T15:00:00')
    },
    {
      id: 'tx_002',
      userId: 'user_2',
      amount: 1,
      type: 'earned',
      description: 'Taught UI/UX Design to Rahul',
      sessionId: 'req_001',
      timestamp: new Date('2025-11-04T15:00:00')
    }
  ];
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
    if (pageName === 'dashboard') {
      loadDashboard();
    } else if (pageName === 'profile') {
      loadProfile();
    } else if (pageName === 'credits') {
      loadCreditsLedger();
    } else if (pageName === 'admin') {
      loadAdminDashboard();
    }
  }
}

// ==================== AUTHENTICATION ====================
function handleGoogleSignIn() {
  showToast('Redirecting to Google Sign In...', 'success');
  setTimeout(() => {
    navigateTo('role');
  }, 1000);
}

function demoLogin(email) {
  const user = appState.users.find(u => u.email === email);
  
  if (user) {
    appState.currentUser = user;
    showToast(`Welcome back, ${user.name}!`, 'success');
    
    if (email === 'admin@test.com') {
      navigateTo('admin');
    } else {
      navigateTo('dashboard');
    }
  } else {
    // New user
    showToast('Please complete your profile', 'success');
    navigateTo('role');
  }
}

function selectRole(role) {
  appState.onboardingRole = role;
  navigateTo('onboarding');
  
  // Show appropriate fields
  if (role === 'student') {
    document.getElementById('student-fields').style.display = 'block';
    document.getElementById('professional-fields').style.display = 'none';
  } else {
    document.getElementById('student-fields').style.display = 'none';
    document.getElementById('professional-fields').style.display = 'block';
  }
}

function handleLogout() {
  appState.currentUser = null;
  showToast('Logged out successfully', 'success');
  navigateTo('landing');
}

// ==================== ONBOARDING ====================
document.addEventListener('DOMContentLoaded', () => {
  const onboardingForm = document.getElementById('onboarding-form');
  if (onboardingForm) {
    onboardingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      completeOnboarding();
    });
  }
});

function completeOnboarding() {
  const name = document.getElementById('onboarding-name').value;
  const email = document.getElementById('onboarding-email').value;
  
  const newUser = {
    id: `user_${Date.now()}`,
    name,
    email,
    role: appState.onboardingRole,
    bio: '',
    teachSkills: [],
    learnSkills: [],
    creditsBalance: 10,
    helpfulRate: 0,
    completionRate: 0,
    badges: [],
    availability: 'Flexible',
    lastActive: new Date()
  };
  
  if (appState.onboardingRole === 'student') {
    newUser.college = document.getElementById('onboarding-college').value;
    newUser.year = parseInt(document.getElementById('onboarding-year').value);
    newUser.cgpa = parseFloat(document.getElementById('onboarding-cgpa').value) || null;
    newUser.campus = newUser.college;
  } else {
    newUser.currentRole = document.getElementById('onboarding-role').value;
    newUser.company = document.getElementById('onboarding-company').value;
    newUser.experience = parseInt(document.getElementById('onboarding-experience').value) || null;
    newUser.campus = 'Professional';
  }
  
  appState.users.push(newUser);
  appState.currentUser = newUser;
  
  showToast('Profile created successfully!', 'success');
  navigateTo('dashboard');
}

// ==================== DASHBOARD ====================
function loadDashboard() {
  if (!appState.currentUser) {
    navigateTo('signin');
    return;
  }
  
  // Update credits display
  document.getElementById('credits-value').textContent = 
    `${appState.currentUser.creditsBalance}/10`;
  
  // Update user avatar
  const avatar = document.getElementById('user-avatar');
  avatar.textContent = appState.currentUser.name.charAt(0).toUpperCase();
  
  // Load mentor results
  loadMentorResults();
  
  // Load learning tab
  loadLearningTab();
}

function switchTab(tabName) {
  // Update tab buttons
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  event.target.classList.add('active');
  
  // Update tab content
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  document.getElementById(`${tabName}-tab`).classList.add('active');
}

function toggleUserMenu() {
  const dropdown = document.getElementById('user-dropdown');
  dropdown.classList.toggle('active');
}

// ==================== MENTOR DISCOVERY ====================
function loadMentorResults() {
  const query = appState.searchQuery || document.getElementById('dashboard-search').value.toLowerCase();
  const resultsContainer = document.getElementById('mentor-results');
  
  // Find mentors who teach the searched skill
  let mentors = appState.users.filter(user => {
    if (user.id === appState.currentUser.id) return false;
    
    if (query) {
      return user.teachSkills.some(ts => 
        ts.skill.toLowerCase().includes(query)
      );
    }
    return user.teachSkills.length > 0;
  });
  
  // Apply filters
  mentors = applyFiltersToMentors(mentors);
  
  // Calculate matching scores and sort
  mentors = mentors.map(mentor => {
    const score = calculateMatchingScore(mentor, query);
    return { ...mentor, matchScore: score };
  }).sort((a, b) => b.matchScore - a.matchScore);
  
  if (mentors.length === 0) {
    resultsContainer.innerHTML = `
      <div class="empty-state">
        <h3>No mentors found</h3>
        <p>No ${query || 'mentors'} at your campus yet. Try expanding to 'All campuses' or post a group request.</p>
      </div>
    `;
    return;
  }
  
  resultsContainer.innerHTML = mentors.map(mentor => renderMentorCard(mentor, query)).join('');
}

function applyFiltersToMentors(mentors) {
  const { campus, proficiency, verified, availability } = appState.filters;
  
  return mentors.filter(mentor => {
    // Campus filter
    if (campus === 'same' && mentor.campus !== appState.currentUser.campus) return false;
    if (campus === 'other' && mentor.campus === appState.currentUser.campus) return false;
    
    // Proficiency filter
    if (proficiency > 0) {
      const hasRequiredLevel = mentor.teachSkills.some(ts => ts.level >= proficiency);
      if (!hasRequiredLevel) return false;
    }
    
    // Verified filter
    if (verified) {
      const hasVerified = mentor.teachSkills.some(ts => ts.verified);
      if (!hasVerified) return false;
    }
    
    return true;
  });
}

function calculateMatchingScore(mentor, skillQuery) {
  let proficiencyScore = 0;
  let availabilityScore = 0.2;
  let campusScore = mentor.campus === appState.currentUser.campus ? 0.15 : 0;
  let qualityScore = mentor.helpfulRate * 0.15;
  let activityScore = 0.1; // Simplified
  
  // Find proficiency for queried skill
  if (skillQuery) {
    const skill = mentor.teachSkills.find(ts => 
      ts.skill.toLowerCase().includes(skillQuery)
    );
    if (skill) {
      proficiencyScore = (skill.level / 5) * 0.4;
    }
  } else {
    // Average proficiency
    const avgLevel = mentor.teachSkills.reduce((sum, ts) => sum + ts.level, 0) / mentor.teachSkills.length;
    proficiencyScore = (avgLevel / 5) * 0.4;
  }
  
  return proficiencyScore + availabilityScore + campusScore + qualityScore + activityScore;
}

function renderMentorCard(mentor, skillQuery) {
  const initials = mentor.name.split(' ').map(n => n[0]).join('');
  const skill = skillQuery ? 
    mentor.teachSkills.find(ts => ts.skill.toLowerCase().includes(skillQuery)) :
    mentor.teachSkills[0];
  
  const stars = '⭐'.repeat(skill?.level || 0);
  
  const matchReasons = [];
  if (skill && skill.level >= 4) matchReasons.push('High proficiency');
  if (mentor.campus === appState.currentUser.campus) matchReasons.push('Same campus');
  if (mentor.helpfulRate > 0.9) matchReasons.push('Active this week');
  
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
          <strong>${skill?.skill || 'Multiple skills'}</strong>
          <span class="stars">${stars}</span>
        </div>
        <div class="availability">📅 ${mentor.availability}</div>
        ${matchReasons.length > 0 ? `<div class="match-pill">Why matched: ${matchReasons.join(' • ')}</div>` : ''}
      </div>
      <div class="mentor-actions">
        <button class="btn btn--primary" onclick="requestSession('${mentor.id}', '${skill?.skill || ''}')">Request Session</button>
        <button class="btn btn--outline" onclick="viewUserProfile('${mentor.id}')">View Profile</button>
      </div>
    </div>
  `;
}

function applyFilters() {
  appState.filters = {
    campus: document.getElementById('filter-campus').value,
    proficiency: parseInt(document.getElementById('filter-proficiency').value),
    verified: document.getElementById('filter-verified').checked,
    availability: document.getElementById('filter-availability').value
  };
  
  loadMentorResults();
}

function handleLandingSearch() {
  const query = document.getElementById('landing-search').value;
  if (!appState.currentUser) {
    showToast('Please sign in to search for mentors', 'error');
    navigateTo('signin');
    return;
  }
  
  appState.searchQuery = query;
  document.getElementById('dashboard-search').value = query;
  navigateTo('dashboard');
  loadMentorResults();
}

// Add event listener for dashboard search
document.addEventListener('DOMContentLoaded', () => {
  const dashboardSearch = document.getElementById('dashboard-search');
  if (dashboardSearch) {
    dashboardSearch.addEventListener('input', (e) => {
      appState.searchQuery = e.target.value;
      loadMentorResults();
    });
  }
});

// ==================== SESSION REQUEST ====================
function requestSession(mentorId, skill) {
  const mentor = appState.users.find(u => u.id === mentorId);
  if (!mentor) return;
  
  appState.currentRequest = {
    mentorId,
    mentorName: mentor.name,
    skill
  };
  
  document.getElementById('request-skill').value = skill;
  document.getElementById('request-mentor').value = mentor.name;
  
  openModal('request-modal');
  showRequestStep(1);
}

function showRequestStep(step) {
  document.querySelectorAll('.request-step').forEach(s => s.style.display = 'none');
  document.getElementById(`request-step-${step}`).style.display = 'block';
  
  if (step === 3) {
    // Show review
    document.getElementById('review-skill').textContent = appState.currentRequest.skill;
    document.getElementById('review-mentor').textContent = appState.currentRequest.mentorName;
    
    const slots = [
      document.getElementById('slot-1').value,
      document.getElementById('slot-2').value,
      document.getElementById('slot-3').value
    ].filter(s => s);
    
    document.getElementById('review-slots').innerHTML = slots.map(slot => {
      const date = new Date(slot);
      return `<li>${date.toLocaleString()}</li>`;
    }).join('');
  }
}

function submitSessionRequest() {
  const slots = [
    document.getElementById('slot-1').value,
    document.getElementById('slot-2').value,
    document.getElementById('slot-3').value
  ].filter(s => s).map(s => new Date(s));
  
  if (slots.length < 3) {
    showToast('Please provide 3 time slots', 'error');
    return;
  }
  
  const newSession = {
    id: `req_${Date.now()}`,
    learnerId: appState.currentUser.id,
    teacherId: appState.currentRequest.mentorId,
    skill: appState.currentRequest.skill,
    status: 'pending',
    proposedSlots: slots
  };
  
  appState.sessions.push(newSession);
  
  closeModal('request-modal');
  showToast('Session request sent! Mentors typically respond within 2 hours.', 'success');
  
  // Simulate auto-acceptance after 2 seconds for demo
  setTimeout(() => {
    acceptSessionRequest(newSession.id);
  }, 2000);
  
  loadLearningTab();
}

function acceptSessionRequest(sessionId) {
  const session = appState.sessions.find(s => s.id === sessionId);
  if (!session) return;
  
  session.status = 'active';
  session.chosenSlot = session.proposedSlots[0];
  session.meetLink = `https://meet.jitsi.org/skillswap_${sessionId}`;
  
  if (session.learnerId === appState.currentUser.id) {
    showToast('Session confirmed! Check My Learning tab.', 'success');
    loadLearningTab();
  }
}

function cancelRequest(sessionId) {
  const index = appState.sessions.findIndex(s => s.id === sessionId);
  if (index !== -1) {
    appState.sessions.splice(index, 1);
    showToast('Request cancelled', 'success');
    loadLearningTab();
  }
}

function completeSession(sessionId) {
  appState.currentSessionId = sessionId;
  openModal('feedback-modal');
}

function submitFeedback(helpful) {
  const session = appState.sessions.find(s => s.id === appState.currentSessionId);
  if (!session) return;
  
  const comment = document.getElementById('feedback-comment').value;
  
  session.status = 'completed';
  session.feedback = {
    helpful,
    comment
  };
  session.completedAt = new Date();
  
  // Transfer credits
  if (helpful) {
    const learner = appState.users.find(u => u.id === session.learnerId);
    const teacher = appState.users.find(u => u.id === session.teacherId);
    
    if (learner) learner.creditsBalance -= 1;
    if (teacher) teacher.creditsBalance += 1;
    
    // Add transactions
    appState.creditTransactions.push({
      id: `tx_${Date.now()}_1`,
      userId: session.learnerId,
      amount: -1,
      type: 'spent',
      description: `Learned ${session.skill} from ${teacher.name}`,
      sessionId: session.id,
      timestamp: new Date()
    });
    
    appState.creditTransactions.push({
      id: `tx_${Date.now()}_2`,
      userId: session.teacherId,
      amount: 1,
      type: 'earned',
      description: `Taught ${session.skill} to ${learner.name}`,
      sessionId: session.id,
      timestamp: new Date()
    });
  }
  
  closeModal('feedback-modal');
  document.getElementById('feedback-comment').value = '';
  showToast('Thank you for your feedback! Credit transferred.', 'success');
  
  loadDashboard();
}

// ==================== LEARNING TAB ====================
function loadLearningTab() {
  const userSessions = appState.sessions.filter(s => 
    s.learnerId === appState.currentUser.id
  );
  
  // Active sessions
  const activeSessions = userSessions.filter(s => s.status === 'active');
  const activeContainer = document.getElementById('active-sessions');
  
  if (activeSessions.length === 0) {
    activeContainer.innerHTML = '<p style="color: var(--color-text-secondary);">No active sessions</p>';
  } else {
    activeContainer.innerHTML = activeSessions.map(session => {
      const teacher = appState.users.find(u => u.id === session.teacherId);
      const timeUntil = getTimeUntil(session.chosenSlot);
      
      return `
        <div class="session-card">
          <div class="session-header">
            <div class="session-info">
              <h4>${session.skill} with ${teacher.name}</h4>
              <div class="session-time">${new Date(session.chosenSlot).toLocaleString()}</div>
            </div>
            <div class="status-badge active">${timeUntil}</div>
          </div>
          <div class="session-actions">
            <a href="${session.meetLink}" target="_blank" class="btn btn--primary btn--sm">Join Meeting</a>
            <button class="btn btn--outline btn--sm" onclick="completeSession('${session.id}')">Mark Complete</button>
          </div>
        </div>
      `;
    }).join('');
  }
  
  // Pending requests
  const pendingRequests = userSessions.filter(s => s.status === 'pending');
  const pendingContainer = document.getElementById('pending-requests');
  
  if (pendingRequests.length === 0) {
    pendingContainer.innerHTML = '<p style="color: var(--color-text-secondary);">No pending requests</p>';
  } else {
    pendingContainer.innerHTML = pendingRequests.map(session => {
      const teacher = appState.users.find(u => u.id === session.teacherId);
      
      return `
        <div class="session-card">
          <div class="session-header">
            <div class="session-info">
              <h4>${session.skill} with ${teacher.name}</h4>
              <div class="session-time">Awaiting response...</div>
            </div>
            <div class="status-badge pending">Pending</div>
          </div>
          <div class="session-actions">
            <button class="btn btn--outline btn--sm" onclick="cancelRequest('${session.id}')">Cancel Request</button>
          </div>
        </div>
      `;
    }).join('');
  }
  
  // Past sessions
  const pastSessions = userSessions.filter(s => s.status === 'completed');
  const pastContainer = document.getElementById('past-sessions');
  
  if (pastSessions.length === 0) {
    pastContainer.innerHTML = '<p style="color: var(--color-text-secondary);">No past sessions</p>';
  } else {
    pastContainer.innerHTML = pastSessions.map(session => {
      const teacher = appState.users.find(u => u.id === session.teacherId);
      
      return `
        <div class="session-card">
          <div class="session-info">
            <h4>${session.skill} with ${teacher.name}</h4>
            <div class="session-time">Completed: ${new Date(session.completedAt).toLocaleDateString()}</div>
            ${session.feedback ? `
              <div style="margin-top: 8px;">
                <strong>Your feedback:</strong> ${session.feedback.helpful ? '👍 Helpful' : '👎 Not helpful'}
                ${session.feedback.comment ? `<br><em>"${session.feedback.comment}"</em>` : ''}
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');
  }
  
  // Profile completeness
  updateProfileCompleteness();
}

function getTimeUntil(date) {
  const now = new Date();
  const target = new Date(date);
  const diff = target - now;
  
  if (diff < 0) return 'Now';
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `In ${days} day${days > 1 ? 's' : ''}`;
  if (hours > 0) return `In ${hours} hour${hours > 1 ? 's' : ''}`;
  return 'Soon';
}

function updateProfileCompleteness() {
  const user = appState.currentUser;
  
  document.getElementById('status-photo').textContent = user.photoUrl ? '100%' : '0%';
  document.getElementById('status-bio').textContent = user.bio ? '100%' : '0%';
  document.getElementById('status-video').textContent = user.introVideo ? '100%' : '0%';
  document.getElementById('status-verified').textContent = 
    user.badges.includes('Verified Campus') ? '100%' : '0%';
}

// ==================== PROFILE ====================
function loadProfile() {
  const user = appState.currentUser;
  if (!user) return;
  
  const initials = user.name.split(' ').map(n => n[0]).join('');
  document.getElementById('profile-avatar-large').textContent = initials;
  document.getElementById('profile-name').textContent = user.name;
  document.getElementById('profile-details').textContent = 
    `${user.role} • ${user.college || user.company || 'Professional'}`;
  document.getElementById('profile-bio').textContent = user.bio || 'No bio yet';
  
  // Teach skills
  const teachSkillsList = document.getElementById('teach-skills-list');
  if (user.teachSkills.length === 0) {
    teachSkillsList.innerHTML = '<p style="color: var(--color-text-secondary);">No skills added yet</p>';
  } else {
    teachSkillsList.innerHTML = user.teachSkills.map(ts => `
      <div class="skill-item">
        <div>
          <strong>${ts.skill}</strong>
          ${ts.verified ? ' ✅' : ''}
        </div>
        <div class="stars">${'⭐'.repeat(ts.level)}</div>
      </div>
    `).join('');
  }
  
  // Learn skills
  const learnSkillsList = document.getElementById('learn-skills-list');
  if (user.learnSkills.length === 0) {
    learnSkillsList.innerHTML = '<p style="color: var(--color-text-secondary);">No skills added yet</p>';
  } else {
    learnSkillsList.innerHTML = user.learnSkills.map(ls => `
      <div class="skill-item">
        <strong>${ls.skill}</strong>
        <span style="font-size: 12px; color: var(--color-text-secondary);">${ls.priority} priority</span>
      </div>
    `).join('');
  }
  
  // Badges
  const badgesContainer = document.getElementById('badges-container');
  if (user.badges.length === 0) {
    badgesContainer.innerHTML = '<p style="color: var(--color-text-secondary);">No badges earned yet</p>';
  } else {
    badgesContainer.innerHTML = user.badges.map(badge => `
      <div class="badge">${badge}</div>
    `).join('');
  }
  
  // Reputation
  document.getElementById('profile-helpful-rate').textContent = 
    user.helpfulRate > 0 ? `${Math.round(user.helpfulRate * 100)}% helpful` : 'No sessions yet';
  document.getElementById('profile-completion-rate').textContent = 
    user.completionRate > 0 ? `${Math.round(user.completionRate * 100)}%` : 'No sessions yet';
}

function viewUserProfile(userId) {
  // For simplicity, just show alert. In full version, would show modal or navigate
  const user = appState.users.find(u => u.id === userId);
  if (user) {
    alert(`${user.name}\n${user.bio}\n\nSkills: ${user.teachSkills.map(ts => ts.skill).join(', ')}`);
  }
}

function showAddSkillModal(type) {
  const skill = prompt(`Enter skill name to ${type === 'teach' ? 'teach' : 'learn'}:`);
  if (!skill) return;
  
  if (type === 'teach') {
    const level = parseInt(prompt('Skill level (1-5):'));
    if (level >= 1 && level <= 5) {
      appState.currentUser.teachSkills.push({
        skill,
        level,
        verified: false
      });
    }
  } else {
    const priority = prompt('Priority (High/Medium/Low):') || 'Medium';
    appState.currentUser.learnSkills.push({
      skill,
      priority
    });
  }
  
  loadProfile();
  showToast('Skill added!', 'success');
}

// ==================== CREDITS LEDGER ====================
function loadCreditsLedger() {
  if (!appState.currentUser) return;
  
  document.getElementById('ledger-balance').textContent = appState.currentUser.creditsBalance;
  
  const userTransactions = appState.creditTransactions
    .filter(tx => tx.userId === appState.currentUser.id)
    .sort((a, b) => b.timestamp - a.timestamp);
  
  const ledgerList = document.getElementById('ledger-list');
  
  if (userTransactions.length === 0) {
    ledgerList.innerHTML = '<p style="color: var(--color-text-secondary); text-align: center; padding: 48px;">No transactions yet</p>';
    return;
  }
  
  ledgerList.innerHTML = userTransactions.map(tx => `
    <div class="ledger-item">
      <div class="ledger-header">
        <div class="ledger-amount ${tx.amount > 0 ? 'positive' : 'negative'}">
          ${tx.amount > 0 ? '+' : ''}${tx.amount}
        </div>
        <div style="font-size: 12px; color: var(--color-text-secondary);">
          ${tx.timestamp.toLocaleDateString()} ${tx.timestamp.toLocaleTimeString()}
        </div>
      </div>
      <div class="ledger-details">
        ${tx.description}
        ${tx.sessionId ? `<br>Session ID: ${tx.sessionId}` : ''}
      </div>
    </div>
  `).join('');
}

// ==================== CAMPUS HUB ====================
function loadCampusData() {
  const campus = document.getElementById('campus-select').value;
  if (!campus) {
    document.getElementById('campus-content').style.display = 'none';
    return;
  }
  
  document.getElementById('campus-content').style.display = 'block';
  
  // Get campus users
  const campusUsers = appState.users.filter(u => u.college === campus);
  
  // Top teachers
  const topTeachers = campusUsers
    .filter(u => u.teachSkills.length > 0)
    .sort((a, b) => b.helpfulRate - a.helpfulRate)
    .slice(0, 5);
  
  const topTeachersList = document.getElementById('top-teachers-list');
  topTeachersList.innerHTML = topTeachers.map((user, index) => {
    const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;
    return `
      <div class="leaderboard-item">
        <div>
          <span style="font-size: 20px; margin-right: 8px;">${medal}</span>
          <strong>${user.name}</strong>
        </div>
        <div style="font-size: 14px; color: var(--color-text-secondary);">
          ${Math.round(user.helpfulRate * 100)}% helpful
        </div>
      </div>
    `;
  }).join('');
  
  // Top skills
  const skillCounts = {};
  campusUsers.forEach(user => {
    user.teachSkills.forEach(ts => {
      skillCounts[ts.skill] = (skillCounts[ts.skill] || 0) + 1;
    });
  });
  
  const topSkills = Object.entries(skillCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  const topSkillsList = document.getElementById('top-skills-list');
  topSkillsList.innerHTML = topSkills.map(([skill, count], index) => `
    <div class="leaderboard-item">
      <strong>${index + 1}. ${skill}</strong>
      <span style="font-size: 14px; color: var(--color-text-secondary);">
        ${count} mentor${count > 1 ? 's' : ''}
      </span>
    </div>
  `).join('');
  
  // Rising skills
  const risingSkills = appState.skills
    .filter(s => s.trend.includes('↑'))
    .slice(0, 5);
  
  const risingSkillsList = document.getElementById('rising-skills-list');
  risingSkillsList.innerHTML = risingSkills.map(skill => `
    <div class="leaderboard-item">
      <strong>${skill.name}</strong>
      <span style="color: var(--color-success);">${skill.trend}</span>
    </div>
  `).join('');
}

// ==================== ADMIN ====================
function loadAdminDashboard() {
  document.getElementById('admin-total-users').textContent = appState.users.length;
  document.getElementById('admin-total-sessions').textContent = appState.sessions.length;
  document.getElementById('admin-total-credits').textContent = 
    appState.creditTransactions.length * 1;
  
  // Skills taxonomy
  const taxonomyList = document.getElementById('skills-taxonomy-list');
  taxonomyList.innerHTML = appState.skills.map(skill => `
    <div class="skill-item">
      <div>
        <strong>${skill.name}</strong>
        <span style="font-size: 12px; color: var(--color-text-secondary); margin-left: 8px;">
          ${skill.popularity} requests ${skill.trend}
        </span>
      </div>
    </div>
  `).join('');
}

function toggleFeatureFlag(flag) {
  appState.featureFlags[flag.replace('-', '')] = 
    document.getElementById(`flag-${flag}`).checked;
  showToast(`Feature flag '${flag}' updated`, 'success');
}

// ==================== MODALS ====================
function openModal(modalId) {
  document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
}

// ==================== TOAST NOTIFICATIONS ====================
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  document.getElementById('toast-container').appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// ==================== LANDING PAGE ====================
function renderLandingPage() {
  // Render trending skills
  const trendingContainer = document.getElementById('trending-skills');
  const topSkills = appState.skills.slice(0, 8);
  
  trendingContainer.innerHTML = topSkills.map(skill => `
    <div class="skill-chip">${skill.name}</div>
  `).join('');
  
  // Render rising skills
  const risingContainer = document.getElementById('rising-skills');
  const risingSkills = appState.skills
    .filter(s => s.trend.includes('↑'))
    .sort((a, b) => {
      const aPercent = parseInt(a.trend.match(/\d+/)[0]);
      const bPercent = parseInt(b.trend.match(/\d+/)[0]);
      return bPercent - aPercent;
    })
    .slice(0, 5);
  
  risingContainer.innerHTML = risingSkills.map(skill => `
    <div class="skill-chip">${skill.name} ${skill.trend}</div>
  `).join('');
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  initializeMockData();
  renderLandingPage();
  
  // Start on landing page
  navigateTo('landing');
});