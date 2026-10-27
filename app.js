// --- DATA STORE ---
let resumeData = {
  fullName: "Alex Rivera",
  title: "Senior Full-Stack Software Engineer",
  email: "alex.rivera@example.com",
  phone: "+1 (555) 234-5678",
  location: "San Francisco, CA",
  website: "github.com/alexrivera",
  summary: "Results-driven Software Engineer with 5+ years of experience designing scalable web architectures and leading engineering teams. Passionate about modern JavaScript, clean API design, and performance optimization.",
  experience: [
    {
      role: "Lead Frontend Engineer",
      company: "Nexus Cloud Systems",
      date: "2023 — Present",
      desc: "Architected modern micro-frontends serving 1.2M daily users. Reduced core web vital bundle sizes by 38% and mentored 6 junior engineers."
    },
    {
      role: "Software Developer",
      company: "ByteWave Studios",
      date: "2021 — 2023",
      desc: "Built real-time collaboration dashboards using WebSocket APIs. Automated CI/CD deployment pipelines on Vercel and AWS."
    }
  ],
  education: [
    {
      school: "University of California, Berkeley",
      degree: "B.S. in Computer Science",
      date: "2017 — 2021",
      desc: "Dean's Honor List, Specialization in Distributed Systems & AI."
    }
  ],
  projects: [
    {
      name: "DevSync Collaborative IDE",
      tech: "React, Node.js, WebSockets",
      date: "2024",
      desc: "An in-browser multi-user code editor with real-time cursor sync and embedded compiler."
    }
  ],
  skills: [
    "JavaScript (ES6+)", "TypeScript", "React", "Node.js", "Next.js",
    "Tailwind CSS", "PostgreSQL", "Docker", "Git / GitHub", "REST APIs"
  ]
};

// --- DOM REFERENCES ---
const inFullName = document.getElementById('inFullName');
const inTitle = document.getElementById('inTitle');
const inEmail = document.getElementById('inEmail');
const inPhone = document.getElementById('inPhone');
const inLocation = document.getElementById('inLocation');
const inWebsite = document.getElementById('inWebsite');
const inSummary = document.getElementById('inSummary');

const outFullName = document.getElementById('outFullName');
const outTitle = document.getElementById('outTitle');
const outEmail = document.getElementById('outEmail');
const outPhone = document.getElementById('outPhone');
const outLocation = document.getElementById('outLocation');
const outWebsite = document.getElementById('outWebsite');
const outSummary = document.getElementById('outSummary');

const expContainer = document.getElementById('experienceContainer');
const outExp = document.getElementById('outExperience');

const eduContainer = document.getElementById('educationContainer');
const outEdu = document.getElementById('outEducation');

const projContainer = document.getElementById('projectContainer');
const outProj = document.getElementById('outProjects');

const skillsInput = document.getElementById('inSkill');
const addSkillBtn = document.getElementById('addSkillBtn');
const tagsContainer = document.getElementById('skillsTagContainer');
const outSkills = document.getElementById('outSkills');

// --- RENDER FUNCTIONS ---
function renderLiveResume() {
  // Personal Info
  outFullName.textContent = resumeData.fullName || "Your Full Name";
  outTitle.textContent = resumeData.title || "Professional Title";
  outEmail.textContent = resumeData.email || "";
  outPhone.textContent = resumeData.phone || "";
  outLocation.textContent = resumeData.location || "";
  outWebsite.textContent = resumeData.website || "";
  outSummary.textContent = resumeData.summary || "Summary text goes here...";

  // Hide summary section if empty
  document.getElementById('blockSummary').style.display = resumeData.summary ? 'block' : 'none';

  // Experience
  outExp.innerHTML = '';
  resumeData.experience.forEach(item => {
    const el = document.createElement('div');
    el.className = 'resume-item';
    el.innerHTML = `
      <div class="resume-item-top">
        <span class="item-role">${escapeHtml(item.role)} <span class="item-company">@ ${escapeHtml(item.company)}</span></span>
        <span class="item-date">${escapeHtml(item.date)}</span>
      </div>
      <p class="item-desc">${escapeHtml(item.desc)}</p>
    `;
    outExp.appendChild(el);
  });
  document.getElementById('blockExperience').style.display = resumeData.experience.length ? 'block' : 'none';

  // Education
  outEdu.innerHTML = '';
  resumeData.education.forEach(item => {
    const el = document.createElement('div');
    el.className = 'resume-item';
    el.innerHTML = `
      <div class="resume-item-top">
        <span class="item-role">${escapeHtml(item.degree)} <span class="item-company">— ${escapeHtml(item.school)}</span></span>
        <span class="item-date">${escapeHtml(item.date)}</span>
      </div>
      ${item.desc ? `<p class="item-desc">${escapeHtml(item.desc)}</p>` : ''}
    `;
    outEdu.appendChild(el);
  });
  document.getElementById('blockEducation').style.display = resumeData.education.length ? 'block' : 'none';

  // Projects
  outProj.innerHTML = '';
  resumeData.projects.forEach(item => {
    const el = document.createElement('div');
    el.className = 'resume-item';
    el.innerHTML = `
      <div class="resume-item-top">
        <span class="item-role">${escapeHtml(item.name)} <span class="item-company">(${escapeHtml(item.tech)})</span></span>
        <span class="item-date">${escapeHtml(item.date)}</span>
      </div>
      <p class="item-desc">${escapeHtml(item.desc)}</p>
    `;
    outProj.appendChild(el);
  });
  document.getElementById('blockProjects').style.display = resumeData.projects.length ? 'block' : 'none';

  // Skills
  outSkills.innerHTML = '';
  tagsContainer.innerHTML = '';
  resumeData.skills.forEach((skill, idx) => {
    // Paper Pill
    const pill = document.createElement('span');
    pill.className = 'resume-skill-pill';
    pill.textContent = skill;
    outSkills.appendChild(pill);

    // Editor Tag
    const tag = document.createElement('span');
    tag.className = 'skill-tag';
    tag.innerHTML = `${escapeHtml(skill)} <span data-idx="${idx}">&times;</span>`;
    tag.querySelector('span').addEventListener('click', () => {
      resumeData.skills.splice(idx, 1);
      renderLiveResume();
      saveToStorage();
    });
    tagsContainer.appendChild(tag);
  });
  document.getElementById('blockSkills').style.display = resumeData.skills.length ? 'block' : 'none';
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}

// --- POPULATE FORM CONTROLS ---
function populateFormFromData() {
  inFullName.value = resumeData.fullName;
  inTitle.value = resumeData.title;
  inEmail.value = resumeData.email;
  inPhone.value = resumeData.phone;
  inLocation.value = resumeData.location;
  inWebsite.value = resumeData.website;
  inSummary.value = resumeData.summary;

  // Render Experience inputs
  expContainer.innerHTML = '';
  resumeData.experience.forEach((exp, idx) => {
    expContainer.appendChild(createDynamicEntry({
      fields: [
        { key: 'role', placeholder: 'Job Title / Role', val: exp.role },
        { key: 'company', placeholder: 'Company Name', val: exp.company },
        { key: 'date', placeholder: 'Date / Period (e.g. 2022 - Present)', val: exp.date },
        { key: 'desc', placeholder: 'Key achievements & responsibilities...', val: exp.desc, textarea: true }
      ],
      onRemove: () => {
        resumeData.experience.splice(idx, 1);
        populateFormFromData();
        renderLiveResume();
        saveToStorage();
      },
      onChange: (key, val) => {
        resumeData.experience[idx][key] = val;
        renderLiveResume();
        saveToStorage();
      }
    }));
  });

  // Render Education inputs
  eduContainer.innerHTML = '';
  resumeData.education.forEach((edu, idx) => {
    eduContainer.appendChild(createDynamicEntry({
      fields: [
        { key: 'school', placeholder: 'Institution / College', val: edu.school },
        { key: 'degree', placeholder: 'Degree / Certificate', val: edu.degree },
        { key: 'date', placeholder: 'Years Attended', val: edu.date },
        { key: 'desc', placeholder: 'Honors, GPA, or notes (optional)', val: edu.desc }
      ],
      onRemove: () => {
        resumeData.education.splice(idx, 1);
        populateFormFromData();
        renderLiveResume();
        saveToStorage();
      },
      onChange: (key, val) => {
        resumeData.education[idx][key] = val;
        renderLiveResume();
        saveToStorage();
      }
    }));
  });

  // Render Projects inputs
  projContainer.innerHTML = '';
  resumeData.projects.forEach((proj, idx) => {
    projContainer.appendChild(createDynamicEntry({
      fields: [
        { key: 'name', placeholder: 'Project Title', val: proj.name },
        { key: 'tech', placeholder: 'Tech Stack (e.g. React, Node)', val: proj.tech },
        { key: 'date', placeholder: 'Year', val: proj.date },
        { key: 'desc', placeholder: 'Project impact & summary...', val: proj.desc, textarea: true }
      ],
      onRemove: () => {
        resumeData.projects.splice(idx, 1);
        populateFormFromData();
        renderLiveResume();
        saveToStorage();
      },
      onChange: (key, val) => {
        resumeData.projects[idx][key] = val;
        renderLiveResume();
        saveToStorage();
      }
    }));
  });
}

function createDynamicEntry({ fields, onRemove, onChange }) {
  const wrapper = document.createElement('div');
  wrapper.className = 'dynamic-item';

  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove-btn';
  removeBtn.innerHTML = '&times;';
  removeBtn.title = 'Remove';
  removeBtn.addEventListener('click', onRemove);
  wrapper.appendChild(removeBtn);

  fields.forEach(f => {
    let inputEl;
    if (f.textarea) {
      inputEl = document.createElement('textarea');
      inputEl.rows = 2;
    } else {
      inputEl = document.createElement('input');
      inputEl.type = 'text';
    }
    inputEl.placeholder = f.placeholder;
    inputEl.value = f.val || '';
    inputEl.addEventListener('input', (e) => onChange(f.key, e.target.value));
    wrapper.appendChild(inputEl);
  });

  return wrapper;
}

// --- EVENT LISTENERS ---
[
  [inFullName, 'fullName'],
  [inTitle, 'title'],
  [inEmail, 'email'],
  [inPhone, 'phone'],
  [inLocation, 'location'],
  [inWebsite, 'website'],
  [inSummary, 'summary']
].forEach(([input, key]) => {
  input.addEventListener('input', (e) => {
    resumeData[key] = e.target.value;
    renderLiveResume();
    saveToStorage();
  });
});

// Add Experience Button
document.getElementById('addExpBtn').addEventListener('click', () => {
  resumeData.experience.push({ role: '', company: '', date: '', desc: '' });
  populateFormFromData();
  renderLiveResume();
  saveToStorage();
});

// Add Education Button
document.getElementById('addEduBtn').addEventListener('click', () => {
  resumeData.education.push({ school: '', degree: '', date: '', desc: '' });
  populateFormFromData();
  renderLiveResume();
  saveToStorage();
});

// Add Project Button
document.getElementById('addProjBtn').addEventListener('click', () => {
  resumeData.projects.push({ name: '', tech: '', date: '', desc: '' });
  populateFormFromData();
  renderLiveResume();
  saveToStorage();
});

// Skills Input
function addSkill() {
  const val = skillsInput.value.trim();
  if (val && !resumeData.skills.includes(val)) {
    resumeData.skills.push(val);
    skillsInput.value = '';
    renderLiveResume();
    saveToStorage();
  }
}

addSkillBtn.addEventListener('click', addSkill);
skillsInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addSkill();
  }
});

// Print / PDF Button
document.getElementById('printBtn').addEventListener('click', () => {
  window.print();
});

// Clear Button
document.getElementById('clearBtn').addEventListener('click', () => {
  if (confirm('Are you sure you want to clear all resume fields?')) {
    resumeData = {
      fullName: '', title: '', email: '', phone: '', location: '', website: '', summary: '',
      experience: [], education: [], projects: [], skills: []
    };
    populateFormFromData();
    renderLiveResume();
    saveToStorage();
  }
});

// Load Sample Button
document.getElementById('loadSampleBtn').addEventListener('click', () => {
  localStorage.removeItem('resucraft_data');
  location.reload();
});

// Theme Selector
document.querySelectorAll('.color-dot').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.color-dot').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.body.className = btn.dataset.theme;
    localStorage.setItem('resucraft_theme', btn.dataset.theme);
  });
});

// --- LOCAL STORAGE PERSISTENCE ---
function saveToStorage() {
  localStorage.setItem('resucraft_data', JSON.stringify(resumeData));
}

function loadFromStorage() {
  const saved = localStorage.getItem('resucraft_data');
  if (saved) {
    try {
      resumeData = JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved resume data', e);
    }
  }

  const savedTheme = localStorage.getItem('resucraft_theme');
  if (savedTheme) {
    document.body.className = savedTheme;
    document.querySelectorAll('.color-dot').forEach(b => {
      b.classList.toggle('active', b.dataset.theme === savedTheme);
    });
  }
}

// Initialize App
loadFromStorage();
populateFormFromData();
renderLiveResume();