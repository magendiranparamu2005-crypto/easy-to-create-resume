// --- PARAMASIVAN M DEFAULT RESUME DATA ---
const DEFAULT_RESUME = {
  name: "Paramasivan M",
  phone: "+91 6374914414",
  email: "magendiranparamu2005@gmail.com",
  linkedin: "https://linkedin.com/in/paramasivan",
  linkedinDisplay: "linkedin.com/in/paramasivan",
  github: "https://github.com/magendiranparamu2005-crypto/portfolio",
  summary: "Computer Science graduate with strong knowledge of Python, Java, SQL, HTML, CSS, JavaScript, and React.js. Experienced in developing Python programs, responsive web applications, and REST-based projects. Familiar with OOP, Git, MySQL, and problem-solving, Looking an entry-level Software Developer role.",
  education: [
    {
      institution: "Annai Teresa College of Engineering",
      degree: "Bachelor of Engineering in Computer Science – 7.6 CGPA",
      dates: "Nov 2022 – May 2026",
      location: "Cuddalore, Tamil Nadu"
    },
    {
      institution: "DGM Hr. SEC. School",
      degree: "SSLC – 96.6% & HSC – 64.0%",
      dates: "Jun 2020 – May 2022",
      location: "Cuddalore, Tamil Nadu"
    }
  ],
  skills: {
    languages: "Java, SQL, JavaScript (ES6)",
    frontend: "HTML5, CSS3, React.js, Bootstrap, Tailwind CSS (Basic)",
    tools: "Git, GitHub, MySQL, VS Code, Eclipse, Figma",
    others: "Redux Toolkit, Fetch API, WordPress"
  },
  experience: [
    {
      company: "VEI Technologies Pvt. Ltd.",
      role: "Python Intern",
      dates: "Aug 2025 – Sep 2025",
      location: "Chennai",
      bullets: [
        "Completed a Python internship at VEI Technologies Pvt. Ltd., developing 15+ Python programs using Core Python, functions, loops, conditional statements, and modules.",
        "Developed 10+ Python scripts for file handling, string operations, and exception handling, improving code reusability and execution efficiency by 20%.",
        "Implemented 20+ reusable functions and performed debugging and testing, reducing logical errors by 25% and improving program reliability.",
        "Applied object-oriented programming (OOP) concepts to build small-scale applications and followed coding best practices to achieve 95%+ successful program execution."
      ]
    }
  ],
  projects: [
    {
      title: "AI-Based Student Performance Monitoring System",
      tech: "Python, Flask, Machine Learning",
      dates: "Mar 2026 – May 2026",
      bullets: [
        "Developed an AI-based student performance monitoring system using Python, Flask, and Machine Learning to predict academic risk based on attendance, CGPA, quiz scores, and behavioral data.",
        "Implemented Random Forest, Decision Tree, Logistic Regression, and XGBoost models to classify students into Low, Medium, and High risk categories and improve prediction accuracy.",
        "Designed a role-based web application with risk dashboards, personalized study recommendations, trend analysis, and automated alerts to support early academic intervention."
      ]
    },
    {
      title: "Food Ordering Website",
      tech: "HTML, CSS, JavaScript",
      dates: "Nov 2025",
      bullets: [
        "Created and deployed a responsive food delivery website using React JS, HTML, CSS, and JavaScript; Used Redux for efficient state management and integrated React Router for seamless navigation and user authentication.",
        "Hosted the application on Netlify, improving page load speed by 30% and ensuring high availability through server configuration and domain management."
      ]
    }
  ],
  certifications: [
    {
      title: "Java Programming – SimpliLearn",
      dates: "June – July 2026",
      bullets: [
        "Completed a Java course covering loops, functions, and object-oriented programming (OOP), with hands-on experience developing efficient and scalable applications."
      ]
    },
    {
      title: "Web Technologies – SimpliLearn",
      dates: "July 2026",
      bullets: [
        "Accomplished a course in HTML, CSS and JavaScript focused on building responsive web pages, structuring content, and applying modern styling techniques grounded in strong design principles."
      ]
    },
    {
      title: "Structured Query Language (SQL) – SkillUp",
      dates: "June – July 2026",
      bullets: [
        "Completed a SQL course covering database design, DDL, DML, Joins, Views, Functions, and Stored Procedures. Developed practical skills in querying, manipulating, and optimizing relational databases using SQL."
      ]
    }
  ]
};

// State Object (Deep Copy)
let currentResume = JSON.parse(JSON.stringify(DEFAULT_RESUME));

// Load from LocalStorage if available
function loadSavedData() {
  const saved = localStorage.getItem("paramasivan_resume_data");
  if (saved) {
    try {
      currentResume = JSON.parse(saved);
    } catch (e) {
      console.error("Could not parse saved resume data, using default", e);
    }
  }
}

function saveCurrentData() {
  localStorage.setItem("paramasivan_resume_data", JSON.stringify(currentResume));
}

// --- RENDER PREVIEW (RIGHT PANE) ---
function renderPreview() {
  // Header
  document.getElementById("outName").textContent = currentResume.name;
  document.getElementById("outPhone").textContent = currentResume.phone;
  document.getElementById("outPhoneLink").href = `tel:${currentResume.phone.replace(/\s+/g, "")}`;
  document.getElementById("outEmail").textContent = currentResume.email;
  document.getElementById("outEmailLink").href = `mailto:${currentResume.email}`;

  const cleanLinkedin = currentResume.linkedin.replace(/^https?:\/\//, "");
  document.getElementById("outLinkedin").textContent = cleanLinkedin;
  document.getElementById("outLinkedin").href = currentResume.linkedin.startsWith("http") ? currentResume.linkedin : `https://${currentResume.linkedin}`;

  document.getElementById("outGithub").textContent = currentResume.github;
  document.getElementById("outGithub").href = currentResume.github.startsWith("http") ? currentResume.github : `https://${currentResume.github}`;

  // Summary
  document.getElementById("outSummary").textContent = currentResume.summary;

  // Skills
  document.getElementById("outSkillLanguages").textContent = currentResume.skills.languages;
  document.getElementById("outSkillFrontend").textContent = currentResume.skills.frontend;
  document.getElementById("outSkillTools").textContent = currentResume.skills.tools;
  document.getElementById("outSkillOthers").textContent = currentResume.skills.others;

  // Education List
  const eduList = document.getElementById("outEducationList");
  eduList.innerHTML = "";
  currentResume.education.forEach(edu => {
    const el = document.createElement("div");
    el.className = "res-entry";
    el.innerHTML = `
      <div class="entry-row">
        <span class="entry-title-bold">${escapeHtml(edu.institution)}</span>
        <span class="entry-meta-bold">${escapeHtml(edu.dates)}</span>
      </div>
      <div class="entry-row">
        <span class="entry-subtitle-italic">${escapeHtml(edu.degree)}</span>
        <span class="entry-location-italic">${escapeHtml(edu.location)}</span>
      </div>
    `;
    eduList.appendChild(el);
  });

  // Experience List
  const expList = document.getElementById("outExperienceList");
  expList.innerHTML = "";
  currentResume.experience.forEach(exp => {
    const el = document.createElement("div");
    el.className = "res-entry";
    const bulletsHtml = exp.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join("");
    el.innerHTML = `
      <div class="entry-row">
        <span class="entry-title-bold">${escapeHtml(exp.company)}</span>
        <span class="entry-meta-bold">${escapeHtml(exp.dates)}</span>
      </div>
      <div class="entry-row">
        <span class="entry-subtitle-italic">${escapeHtml(exp.role)}</span>
        <span class="entry-location-italic">${escapeHtml(exp.location)}</span>
      </div>
      <ul class="bullet-list">${bulletsHtml}</ul>
    `;
    expList.appendChild(el);
  });

  // Projects List
  const projList = document.getElementById("outProjectsList");
  projList.innerHTML = "";
  currentResume.projects.forEach(proj => {
    const el = document.createElement("div");
    el.className = "res-entry";
    const bulletsHtml = proj.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join("");
    el.innerHTML = `
      <div class="entry-row">
        <span class="entry-title-bold">${escapeHtml(proj.title)} <span class="proj-tech-sub">— ${escapeHtml(proj.tech)}</span></span>
        <span class="entry-meta-bold">${escapeHtml(proj.dates)}</span>
      </div>
      <ul class="bullet-list">${bulletsHtml}</ul>
    `;
    projList.appendChild(el);
  });

  // Certifications List
  const certList = document.getElementById("outCertificationsList");
  certList.innerHTML = "";
  currentResume.certifications.forEach(cert => {
    const el = document.createElement("div");
    el.className = "res-entry";
    const bulletsHtml = cert.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join("");
    el.innerHTML = `
      <div class="entry-row">
        <span class="entry-title-bold">${escapeHtml(cert.title)}</span>
        <span class="entry-meta-bold">${escapeHtml(cert.dates)}</span>
      </div>
      <ul class="bullet-list">${bulletsHtml}</ul>
    `;
    certList.appendChild(el);
  });
}

// --- POPULATE FORM CONTROLS (LEFT PANE) ---
function populateForm() {
  document.getElementById("inName").value = currentResume.name;
  document.getElementById("inPhone").value = currentResume.phone;
  document.getElementById("inEmail").value = currentResume.email;
  document.getElementById("inLinkedin").value = currentResume.linkedin;
  document.getElementById("inGithub").value = currentResume.github;
  document.getElementById("inSummary").value = currentResume.summary;

  document.getElementById("inSkillLanguages").value = currentResume.skills.languages;
  document.getElementById("inSkillFrontend").value = currentResume.skills.frontend;
  document.getElementById("inSkillTools").value = currentResume.skills.tools;
  document.getElementById("inSkillOthers").value = currentResume.skills.others;

  renderEducationEditors();
  renderExperienceEditors();
  renderProjectEditors();
  renderCertificationEditors();
}

// Education Editors
function renderEducationEditors() {
  const container = document.getElementById("eduEditorContainer");
  container.innerHTML = "";
  currentResume.education.forEach((edu, idx) => {
    const card = document.createElement("div");
    card.className = "dynamic-card";
    card.innerHTML = `
      <button class="card-remove-btn" title="Remove">&times;</button>
      <input type="text" class="edu-inst" placeholder="Institution" value="${escapeHtml(edu.institution)}">
      <input type="text" class="edu-deg" placeholder="Degree / Marks" value="${escapeHtml(edu.degree)}">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
        <input type="text" class="edu-dates" placeholder="Dates" value="${escapeHtml(edu.dates)}">
        <input type="text" class="edu-loc" placeholder="Location" value="${escapeHtml(edu.location)}">
      </div>
    `;

    card.querySelector(".card-remove-btn").addEventListener("click", () => {
      currentResume.education.splice(idx, 1);
      renderEducationEditors();
      renderPreview();
      saveCurrentData();
    });

    card.querySelector(".edu-inst").addEventListener("input", (e) => {
      currentResume.education[idx].institution = e.target.value;
      renderPreview();
      saveCurrentData();
    });
    card.querySelector(".edu-deg").addEventListener("input", (e) => {
      currentResume.education[idx].degree = e.target.value;
      renderPreview();
      saveCurrentData();
    });
    card.querySelector(".edu-dates").addEventListener("input", (e) => {
      currentResume.education[idx].dates = e.target.value;
      renderPreview();
      saveCurrentData();
    });
    card.querySelector(".edu-loc").addEventListener("input", (e) => {
      currentResume.education[idx].location = e.target.value;
      renderPreview();
      saveCurrentData();
    });

    container.appendChild(card);
  });
}

// Experience Editors
function renderExperienceEditors() {
  const container = document.getElementById("expEditorContainer");
  container.innerHTML = "";
  currentResume.experience.forEach((exp, idx) => {
    const card = document.createElement("div");
    card.className = "dynamic-card";

    let bulletsInputsHtml = exp.bullets.map((b, bIdx) => `
      <div class="bullet-input-item">
        <input type="text" class="exp-bullet-input" data-bidx="${bIdx}" value="${escapeHtml(b)}">
        <button class="del-bullet-btn" data-bidx="${bIdx}">&times;</button>
      </div>
    `).join("");

    card.innerHTML = `
      <button class="card-remove-btn" title="Remove">&times;</button>
      <input type="text" class="exp-company" placeholder="Company Name" value="${escapeHtml(exp.company)}">
      <input type="text" class="exp-role" placeholder="Role / Title" value="${escapeHtml(exp.role)}">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
        <input type="text" class="exp-dates" placeholder="Dates" value="${escapeHtml(exp.dates)}">
        <input type="text" class="exp-loc" placeholder="Location" value="${escapeHtml(exp.location)}">
      </div>
      <div class="bullets-group">
        <div class="bullet-label-row">
          <span>Bullet Points</span>
          <button class="bullet-sub-btn add-exp-bullet-btn">+ Add Bullet</button>
        </div>
        <div class="bullets-list-wrap">${bulletsInputsHtml}</div>
      </div>
    `;

    card.querySelector(".card-remove-btn").addEventListener("click", () => {
      currentResume.experience.splice(idx, 1);
      renderExperienceEditors();
      renderPreview();
      saveCurrentData();
    });

    card.querySelector(".exp-company").addEventListener("input", (e) => {
      currentResume.experience[idx].company = e.target.value;
      renderPreview();
      saveCurrentData();
    });
    card.querySelector(".exp-role").addEventListener("input", (e) => {
      currentResume.experience[idx].role = e.target.value;
      renderPreview();
      saveCurrentData();
    });
    card.querySelector(".exp-dates").addEventListener("input", (e) => {
      currentResume.experience[idx].dates = e.target.value;
      renderPreview();
      saveCurrentData();
    });
    card.querySelector(".exp-loc").addEventListener("input", (e) => {
      currentResume.experience[idx].location = e.target.value;
      renderPreview();
      saveCurrentData();
    });

    card.querySelectorAll(".exp-bullet-input").forEach(input => {
      input.addEventListener("input", (e) => {
        const bIdx = parseInt(e.target.dataset.bidx, 10);
        currentResume.experience[idx].bullets[bIdx] = e.target.value;
        renderPreview();
        saveCurrentData();
      });
    });

    card.querySelectorAll(".del-bullet-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const bIdx = parseInt(e.target.dataset.bidx, 10);
        currentResume.experience[idx].bullets.splice(bIdx, 1);
        renderExperienceEditors();
        renderPreview();
        saveCurrentData();
      });
    });

    card.querySelector(".add-exp-bullet-btn").addEventListener("click", () => {
      currentResume.experience[idx].bullets.push("New achievement or responsibility...");
      renderExperienceEditors();
      renderPreview();
      saveCurrentData();
    });

    container.appendChild(card);
  });
}

// Project Editors
function renderProjectEditors() {
  const container = document.getElementById("projEditorContainer");
  container.innerHTML = "";
  currentResume.projects.forEach((proj, idx) => {
    const card = document.createElement("div");
    card.className = "dynamic-card";

    let bulletsInputsHtml = proj.bullets.map((b, bIdx) => `
      <div class="bullet-input-item">
        <input type="text" class="proj-bullet-input" data-bidx="${bIdx}" value="${escapeHtml(b)}">
        <button class="del-bullet-btn" data-bidx="${bIdx}">&times;</button>
      </div>
    `).join("");

    card.innerHTML = `
      <button class="card-remove-btn" title="Remove">&times;</button>
      <input type="text" class="proj-title" placeholder="Project Title" value="${escapeHtml(proj.title)}">
      <input type="text" class="proj-tech" placeholder="Technologies (e.g. Python, Flask, ML)" value="${escapeHtml(proj.tech)}">
      <input type="text" class="proj-dates" placeholder="Dates (e.g. Mar 2026 – May 2026)" value="${escapeHtml(proj.dates)}">
      <div class="bullets-group">
        <div class="bullet-label-row">
          <span>Bullet Points</span>
          <button class="bullet-sub-btn add-proj-bullet-btn">+ Add Bullet</button>
        </div>
        <div class="bullets-list-wrap">${bulletsInputsHtml}</div>
      </div>
    `;

    card.querySelector(".card-remove-btn").addEventListener("click", () => {
      currentResume.projects.splice(idx, 1);
      renderProjectEditors();
      renderPreview();
      saveCurrentData();
    });

    card.querySelector(".proj-title").addEventListener("input", (e) => {
      currentResume.projects[idx].title = e.target.value;
      renderPreview();
      saveCurrentData();
    });
    card.querySelector(".proj-tech").addEventListener("input", (e) => {
      currentResume.projects[idx].tech = e.target.value;
      renderPreview();
      saveCurrentData();
    });
    card.querySelector(".proj-dates").addEventListener("input", (e) => {
      currentResume.projects[idx].dates = e.target.value;
      renderPreview();
      saveCurrentData();
    });

    card.querySelectorAll(".proj-bullet-input").forEach(input => {
      input.addEventListener("input", (e) => {
        const bIdx = parseInt(e.target.dataset.bidx, 10);
        currentResume.projects[idx].bullets[bIdx] = e.target.value;
        renderPreview();
        saveCurrentData();
      });
    });

    card.querySelectorAll(".del-bullet-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const bIdx = parseInt(e.target.dataset.bidx, 10);
        currentResume.projects[idx].bullets.splice(bIdx, 1);
        renderProjectEditors();
        renderPreview();
        saveCurrentData();
      });
    });

    card.querySelector(".add-proj-bullet-btn").addEventListener("click", () => {
      currentResume.projects[idx].bullets.push("New project highlight...");
      renderProjectEditors();
      renderPreview();
      saveCurrentData();
    });

    container.appendChild(card);
  });
}

// Certification Editors
function renderCertificationEditors() {
  const container = document.getElementById("certEditorContainer");
  container.innerHTML = "";
  currentResume.certifications.forEach((cert, idx) => {
    const card = document.createElement("div");
    card.className = "dynamic-card";

    let bulletsInputsHtml = cert.bullets.map((b, bIdx) => `
      <div class="bullet-input-item">
        <input type="text" class="cert-bullet-input" data-bidx="${bIdx}" value="${escapeHtml(b)}">
        <button class="del-bullet-btn" data-bidx="${bIdx}">&times;</button>
      </div>
    `).join("");

    card.innerHTML = `
      <button class="card-remove-btn" title="Remove">&times;</button>
      <input type="text" class="cert-title" placeholder="Certification Title – Issuer" value="${escapeHtml(cert.title)}">
      <input type="text" class="cert-dates" placeholder="Dates" value="${escapeHtml(cert.dates)}">
      <div class="bullets-group">
        <div class="bullet-label-row">
          <span>Description / Bullets</span>
          <button class="bullet-sub-btn add-cert-bullet-btn">+ Add Bullet</button>
        </div>
        <div class="bullets-list-wrap">${bulletsInputsHtml}</div>
      </div>
    `;

    card.querySelector(".card-remove-btn").addEventListener("click", () => {
      currentResume.certifications.splice(idx, 1);
      renderCertificationEditors();
      renderPreview();
      saveCurrentData();
    });

    card.querySelector(".cert-title").addEventListener("input", (e) => {
      currentResume.certifications[idx].title = e.target.value;
      renderPreview();
      saveCurrentData();
    });
    card.querySelector(".cert-dates").addEventListener("input", (e) => {
      currentResume.certifications[idx].dates = e.target.value;
      renderPreview();
      saveCurrentData();
    });

    card.querySelectorAll(".cert-bullet-input").forEach(input => {
      input.addEventListener("input", (e) => {
        const bIdx = parseInt(e.target.dataset.bidx, 10);
        currentResume.certifications[idx].bullets[bIdx] = e.target.value;
        renderPreview();
        saveCurrentData();
      });
    });

    card.querySelectorAll(".del-bullet-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const bIdx = parseInt(e.target.dataset.bidx, 10);
        currentResume.certifications[idx].bullets.splice(bIdx, 1);
        renderCertificationEditors();
        renderPreview();
        saveCurrentData();
      });
    });

    card.querySelector(".add-cert-bullet-btn").addEventListener("click", () => {
      currentResume.certifications[idx].bullets.push("Course detail or achievement...");
      renderCertificationEditors();
      renderPreview();
      saveCurrentData();
    });

    container.appendChild(card);
  });
}

// --- BASIC FIELD LISTENERS ---
document.getElementById("inName").addEventListener("input", (e) => {
  currentResume.name = e.target.value;
  renderPreview();
  saveCurrentData();
});
document.getElementById("inPhone").addEventListener("input", (e) => {
  currentResume.phone = e.target.value;
  renderPreview();
  saveCurrentData();
});
document.getElementById("inEmail").addEventListener("input", (e) => {
  currentResume.email = e.target.value;
  renderPreview();
  saveCurrentData();
});
document.getElementById("inLinkedin").addEventListener("input", (e) => {
  currentResume.linkedin = e.target.value;
  renderPreview();
  saveCurrentData();
});
document.getElementById("inGithub").addEventListener("input", (e) => {
  currentResume.github = e.target.value;
  renderPreview();
  saveCurrentData();
});
document.getElementById("inSummary").addEventListener("input", (e) => {
  currentResume.summary = e.target.value;
  renderPreview();
  saveCurrentData();
});

// Skills
document.getElementById("inSkillLanguages").addEventListener("input", (e) => {
  currentResume.skills.languages = e.target.value;
  renderPreview();
  saveCurrentData();
});
document.getElementById("inSkillFrontend").addEventListener("input", (e) => {
  currentResume.skills.frontend = e.target.value;
  renderPreview();
  saveCurrentData();
});
document.getElementById("inSkillTools").addEventListener("input", (e) => {
  currentResume.skills.tools = e.target.value;
  renderPreview();
  saveCurrentData();
});
document.getElementById("inSkillOthers").addEventListener("input", (e) => {
  currentResume.skills.others = e.target.value;
  renderPreview();
  saveCurrentData();
});

// Add Section Buttons
document.getElementById("addEduBtn").addEventListener("click", () => {
  currentResume.education.push({ institution: "", degree: "", dates: "", location: "" });
  renderEducationEditors();
  renderPreview();
  saveCurrentData();
});

document.getElementById("addExpBtn").addEventListener("click", () => {
  currentResume.experience.push({ company: "", role: "", dates: "", location: "", bullets: ["Key contribution..."] });
  renderExperienceEditors();
  renderPreview();
  saveCurrentData();
});

document.getElementById("addProjBtn").addEventListener("click", () => {
  currentResume.projects.push({ title: "", tech: "", dates: "", bullets: ["Project achievement..."] });
  renderProjectEditors();
  renderPreview();
  saveCurrentData();
});

document.getElementById("addCertBtn").addEventListener("click", () => {
  currentResume.certifications.push({ title: "", dates: "", bullets: ["Course highlight..."] });
  renderCertificationEditors();
  renderPreview();
  saveCurrentData();
});

// Reset Button
document.getElementById("resetBtn").addEventListener("click", () => {
  if (confirm("Reset all fields back to Paramasivan M's original resume?")) {
    localStorage.removeItem("paramasivan_resume_data");
    currentResume = JSON.parse(JSON.stringify(DEFAULT_RESUME));
    populateForm();
    renderPreview();
  }
});

// Print Button
document.getElementById("printBtn").addEventListener("click", () => {
  // If on mobile preview, print directly
  window.print();
});

// --- MOBILE SEGMENTED TABS (EDIT FORM VS VIEW RESUME) ---
const tabEditorBtn = document.getElementById("tabEditorBtn");
const tabPreviewBtn = document.getElementById("tabPreviewBtn");

if (tabEditorBtn && tabPreviewBtn) {
  tabEditorBtn.addEventListener("click", () => {
    tabEditorBtn.classList.add("active");
    tabPreviewBtn.classList.remove("active");
    document.body.classList.add("mobile-show-editor");
    document.body.classList.remove("mobile-show-preview");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  tabPreviewBtn.addEventListener("click", () => {
    tabPreviewBtn.classList.add("active");
    tabEditorBtn.classList.remove("active");
    document.body.classList.add("mobile-show-preview");
    document.body.classList.remove("mobile-show-editor");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Helper
function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/[&<>'"]/g, tag => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  }[tag] || tag));
}

// --- INITIALIZE ---
loadSavedData();
populateForm();
renderPreview();
