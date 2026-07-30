document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initTypingEffect();
    initSkillFilters();
    initProjectFilters();
    initTerminal();
    initContactForm();
    initMobileMenu();
    initModals();
});

function initTheme() {
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'light') {
            themeIcon.className = 'fas fa-moon';
            themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
        } else {
            themeIcon.className = 'fas fa-sun';
            themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
        }
    }
}

function initTypingEffect() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;

    const phrases = [
        "Data Analyst & Visualizer",
        "Full-Stack Web Developer",
        "DevOps & Security Enthusiast",
        "Workflow Automation Specialist (n8n)",
        "Python & SQL Specialist"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 400;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

function initSkillFilters() {
    const filterBtns = document.querySelectorAll('.skills-filter .filter-btn');
    const skillCards = document.querySelectorAll('#skillsGrid .skill-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || cardCat === category) {
                    card.style.display = 'flex';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.opacity = '0';
                    card.style.display = 'none';
                }
            });
        });
    });
}

function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.projects-filter .filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || cardCat === category) {
                    card.style.display = 'flex';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.opacity = '0';
                    card.style.display = 'none';
                }
            });
        });
    });
}

function initTerminal() {
    const terminalInput = document.getElementById('terminalInput');
    const terminalOutput = document.getElementById('terminalOutput');

    if (!terminalInput || !terminalOutput) return;

    const commands = {
        help: `Available commands:
  <span class="prompt-user">whoami</span>    - About Ahmed Mubarak
  <span class="prompt-user">skills</span>    - List core skill highlights (Python, SQL, React...)
  <span class="prompt-user">projects</span>  - Showcase key featured projects
  <span class="prompt-user">contact</span>   - Get direct contact links (Discord, Telegram, WhatsApp...)
  <span class="prompt-user">cv</span>        - Trigger CV download preview
  <span class="prompt-user">clear</span>     - Clear terminal screen`,

        whoami: `Ahmed Mubarak | Data Analyst & Full-Stack Web Developer
Location: Egypt
Focus: Transforming raw data into high-impact insights & building modern web apps with Python, SQL, React, Linux & n8n.`,

        skills: `Core Skillset:
🐍 Python: Data Analytics, Pandas, NumPy, Scripting & Automation
📊 Data Analytics: SQL, Matplotlib, Statistics, Data Viz
💻 Web Dev: HTML5, CSS3, JavaScript (ES6+), React, Java
⚙️ DevOps & Security: Kali Linux, VMware, Docker, Git, GitHub
⚡ Automation: n8n Automation, Canva Design`,

        projects: `1. E-Commerce Customer Segmentation (Python, Pandas, SQL)
2. Interactive Real-Time Data Dashboard (React, Tailwind, Recharts)
3. Automated n8n Lead Generator Workflow (n8n, Webhooks, REST API)
4. Full-Stack Analytics Portal (Java, React, SQL)`,

        contact: `Contact Ahmed Mubarak:
📧 Email: mubarakxahmed2010@gmail.com
📱 WhatsApp: https://wa.me/message/45YZ4FUMDMEJN1
✈️ Telegram: 01553007202 (https://t.me/+201553007202)
🎮 Discord: mubarak3_3
🔗 LinkedIn: https://www.linkedin.com/in/ahmed-mubarak-8564aa303
🐙 GitHub: https://github.com/ahmedmubarak2010`,

        cv: `Preparing CV download request options for Ahmed Mubarak...`
    };

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const inputVal = terminalInput.value.trim().toLowerCase();
            terminalInput.value = '';

            const cmdLine = document.createElement('div');
            cmdLine.className = 'terminal-line';
            cmdLine.innerHTML = `<span class="prompt-user">ahmed</span>@<span class="prompt-host">mubarak-pc</span>:<span class="prompt-dir">~</span>$ ${inputVal}`;
            terminalOutput.appendChild(cmdLine);

            if (inputVal === 'clear') {
                terminalOutput.innerHTML = '';
                return;
            }

            const response = document.createElement('div');
            response.className = 'terminal-line';

            if (commands[inputVal]) {
                response.innerHTML = commands[inputVal].replace(/\n/g, '<br>');
                if (inputVal === 'cv') {
                    setTimeout(() => triggerCVModal(), 800);
                }
            } else if (inputVal === '') {
                return;
            } else {
                response.innerHTML = `<span style="color:#FF5F56;">Command not found: '${inputVal}'. Type <span class="prompt-user">help</span> for assistance.</span>`;
            }

            terminalOutput.appendChild(response);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('formName').value;
        const email = document.getElementById('formEmail').value;
        const subject = document.getElementById('formSubject').value;
        const message = document.getElementById('formMessage').value;

        const waText = encodeURIComponent(
            `Hello Ahmed!\n\nMy name is ${name} (${email}).\nSubject: ${subject}\n\nMessage:\n${message}`
        );
        const waUrl = `https://wa.me/message/45YZ4FUMDMEJN1?text=${waText}`;

        alert(`Thank you ${name}! Opening WhatsApp to dispatch your message directly...`);
        window.open(waUrl, '_blank');
        form.reset();
    });
}

function copyDiscordHandle(e) {
    if (e) e.preventDefault();
    const handle = "mubarak3_3";
    navigator.clipboard.writeText(handle).then(() => {
        alert(`Discord handle copied to clipboard: ${handle}`);
    }).catch(() => {
        alert(`Discord Username: ${handle}`);
    });
}

function initMobileMenu() {
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (!mobileBtn || !navLinks) return;

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

function initModals() {
    const overlay = document.getElementById('modalOverlay');
    const modalCloseBtn = document.getElementById('modalClose');

    if (modalCloseBtn && overlay) {
        modalCloseBtn.addEventListener('click', () => {
            overlay.classList.remove('active');
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    }
}

function triggerCVModal() {
    const overlay = document.getElementById('modalOverlay');
    const modalBody = document.getElementById('modalBody');
    if (!overlay || !modalBody) return;

    modalBody.innerHTML = `
        <div style="text-align: center; padding: 1.5rem 0;">
            <div style="font-size: 3.5rem; color: var(--gold); margin-bottom: 1rem;"><i class="fas fa-file-pdf"></i></div>
            <h3 style="font-size: 1.6rem; margin-bottom: 0.5rem;">Ahmed Mubarak - Curriculum Vitae</h3>
            <p style="color: var(--text-muted); margin-bottom: 1.8rem;">Select your preferred method to request or download the CV:</p>
            
            <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 480px; margin: 0 auto;">
                <a href="mailto:mubarakxahmed2010@gmail.com?subject=CV%20Request%20-%20Ahmed%20Mubarak" class="btn btn-primary">
                    <i class="fas fa-envelope"></i> Request Full PDF via Email
                </a>
                
                <a href="https://wa.me/message/45YZ4FUMDMEJN1?text=Hi%20Ahmed,%20I'd%20like%20to%20request%20a%20copy%20of%20your%20CV." target="_blank" class="btn btn-gold">
                    <i class="fab fa-whatsapp"></i> Request via WhatsApp
                </a>

                <div class="btn btn-outline" style="opacity: 0.6; cursor: not-allowed; position: relative; border-style: dashed;">
                    <i class="fab fa-google-drive"></i> Google Drive Direct Download
                    <span class="badge badge-gold" style="font-size: 0.7rem; margin-left: 0.5rem;">Coming Soon</span>
                </div>
            </div>
        </div>
    `;

    overlay.classList.add('active');
}

function openProjectModal(title, category, description, techStackStr, demoUrl, repoUrl) {
    const overlay = document.getElementById('modalOverlay');
    const modalBody = document.getElementById('modalBody');
    if (!overlay || !modalBody) return;

    const techBadges = techStackStr.split(',').map(t => `<span class="tool-tag">${t.trim()}</span>`).join(' ');

    const demoLink = demoUrl || "https://wa.me/message/45YZ4FUMDMEJN1";
    const repoLink = repoUrl || "https://github.com/ahmedmubarak2010";

    modalBody.innerHTML = `
        <div style="padding: 0.5rem;">
            <div class="badge badge-gold" style="margin-bottom: 0.8rem;">${category}</div>
            <h3 style="font-size: 1.8rem; margin-bottom: 1rem; color: var(--primary);">${title}</h3>
            <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 1.5rem;">${description}</p>
            
            <h4 style="font-size: 1rem; margin-bottom: 0.6rem; color: var(--gold);">Technologies & Tools Used:</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">${techBadges}</div>

            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <a href="${repoLink}" target="_blank" class="btn btn-outline btn-sm">
                    <i class="fab fa-github"></i> View GitHub Repository
                </a>
                <a href="${demoLink}" target="_blank" class="btn btn-primary btn-sm">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
            </div>
        </div>
    `;

    overlay.classList.add('active');
}
