/* ==========================================
   INTERACTIVE CYBER TERMINAL MODULE
   ========================================== */

function initTerminal() {
    const terminalInput = document.getElementById('terminalInput');
    const terminalOutput = document.getElementById('terminalOutput');
    const terminalWindow = document.querySelector('.terminal-window');

    if (!terminalInput || !terminalOutput) return;

    // Focus input when clicking anywhere inside the terminal window
    if (terminalWindow) {
        terminalWindow.addEventListener('click', () => {
            terminalInput.focus();
        });
    }

    const availableCmds = [
        'help', 'whoami', 'skills', 'projects', 'contact', 'cv', 
        'neofetch', 'matrix', 'date', 'history', 'sudo', 'socials', 'clear'
    ];

    const commands = {
        help: `Available commands:
  <span class="prompt-user">whoami</span>    - Bio & Background
  <span class="prompt-user">skills</span>    - Technical Skillset (Python, SQL, React...)
  <span class="prompt-user">projects</span>  - Showcase Key Projects
  <span class="prompt-user">contact</span>   - Quick Social & Direct Links
  <span class="prompt-user">cv</span>        - Trigger CV Download Options
  <span class="prompt-user">neofetch</span>  - System & Developer Overview
  <span class="prompt-user">matrix</span>    - Trigger Cyber Matrix Rain
  <span class="prompt-user">date</span>      - Display Current Date & Time
  <span class="prompt-user">history</span>   - View Command Session History
  <span class="prompt-user">sudo</span>      - Execute Root Superuser Command
  <span class="prompt-user">clear</span>     - Clear Terminal Screen`,

        whoami: `Ahmed Mubarak | Data Analyst & Full-Stack Web Developer
Location: Egypt 🇪🇬
Tagline: 𓂀 Pharaoh of the Digital Age
Focus: Transforming raw datasets into actionable visual insights & crafting modern web applications with Python, SQL, React, Linux & n8n Automation.`,

        skills: `Core Skillset & Technologies:
🐍 Python: Data Analytics, Pandas, NumPy, Scripting & Automation
📊 Data Analytics: SQL, Matplotlib, Statistics, Data Visualization, EDA
💻 Web Dev: HTML5, CSS3, JavaScript (ES6+), React, Java
⚙️ DevOps & Security: Kali Linux, VMware, Docker, Git, GitHub
⚡ Automation: n8n Workflow Automation, Canva Graphic Design`,

        projects: `1. ERP Product App (HTML5, JavaScript, CSS3, LocalStorage)
2. Food Delivery Data Analysis (Python, Pandas, SQL, Google Colab)
3. Creative Minds (AI Cybersecurity Dashboard)
4. To-Do List Application (React, JavaScript)
5. Age Calculator (JavaScript, CSS3)
6. Zombie Survival Quiz Game (Python CLI)`,

        contact: `Direct Contact Channels:
📧 Email: mubarakxahmed2010@gmail.com
📱 WhatsApp: https://wa.me/message/45YZ4FUMDMEJN1
✈️ Telegram: 01553007202 (https://t.me/+201553007202)
🎮 Discord: mubarak3_3
🔗 LinkedIn: https://www.linkedin.com/in/ahmed-mubarak-8564aa303
🐙 GitHub: https://github.com/ahmedmubarak2010`,

        socials: `Social Profiles:
🐙 GitHub: https://github.com/ahmedmubarak2010
🔗 LinkedIn: https://www.linkedin.com/in/ahmed-mubarak-8564aa303
📱 WhatsApp: https://wa.me/message/45YZ4FUMDMEJN1
✈️ Telegram: https://t.me/+201553007202`,

        cv: `Preparing CV download request options for Ahmed Mubarak...`,

        neofetch: `<span style="color: var(--primary);">
        /\\_/\\       <span style="color: var(--gold);">ahmedmubarak</span>@<span style="color: var(--primary);">kali-linux</span>
       ( o.o )      -----------------------------
        > ^ <       <span style="color: var(--gold);">OS:</span> Kali Linux Rolling x86_64
                    <span style="color: var(--gold);">Host:</span> Ahmed Mubarak Workstation
                    <span style="color: var(--gold);">Role:</span> Data Analyst & Full-Stack Developer
                    <span style="color: var(--gold);">Uptime:</span> 4+ Years of Continuous Learning
                    <span style="color: var(--gold);">Shell:</span> zsh / bash 5.2.21
                    <span style="color: var(--gold);">IDE:</span> VS Code & JupyterLab
                    <span style="color: var(--gold);">Theme:</span> Cyber Teal & Desert Gold 𓂀
</span>`,

        sudo: `<span style="color:#FF5F56;">[sudo] permission denied for user 'guest'. 
Access Restricted: Pharaoh of the Digital Age is watching you 👁️𓂀</span>`,

        date: () => `Current Local Time: ${new Date().toLocaleString()}`
    };

    let commandHistory = [];
    let historyIndex = -1;

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const rawVal = terminalInput.value;
            const inputVal = rawVal.trim().toLowerCase();
            terminalInput.value = '';

            if (inputVal !== '') {
                commandHistory.push(inputVal);
                historyIndex = commandHistory.length;
            }

            const cmdLine = document.createElement('div');
            cmdLine.className = 'terminal-line';
            cmdLine.innerHTML = `<span class="prompt-user">ahmed</span>@<span class="prompt-host">mubarak-pc</span>:<span class="prompt-dir">~</span>$ ${rawVal}`;
            terminalOutput.appendChild(cmdLine);

            if (inputVal === 'clear') {
                terminalOutput.innerHTML = '';
                return;
            }

            if (inputVal === 'history') {
                const histResp = document.createElement('div');
                histResp.className = 'terminal-line';
                histResp.innerHTML = commandHistory.map((cmd, i) => `  ${i + 1}  ${cmd}`).join('<br>');
                terminalOutput.appendChild(histResp);
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
                return;
            }

            if (inputVal === 'matrix') {
                runMatrixEffect(terminalOutput);
                return;
            }

            const response = document.createElement('div');
            response.className = 'terminal-line';

            if (commands[inputVal]) {
                const resContent = typeof commands[inputVal] === 'function' ? commands[inputVal]() : commands[inputVal];
                response.innerHTML = resContent.replace(/\n/g, '<br>');
                if (inputVal === 'cv' && typeof triggerCVModal === 'function') {
                    setTimeout(() => triggerCVModal(), 800);
                }
            } else if (inputVal === '') {
                return;
            } else {
                response.innerHTML = `<span style="color:#FF5F56;">Command not found: '${inputVal}'. Type <span class="prompt-user">help</span> for assistance.</span>`;
            }

            terminalOutput.appendChild(response);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;

        } else if (e.key === 'Tab') {
            e.preventDefault();
            const inputVal = terminalInput.value.trim().toLowerCase();
            if (!inputVal) return;

            const matches = availableCmds.filter(c => c.startsWith(inputVal));
            if (matches.length === 1) {
                terminalInput.value = matches[0];
            } else if (matches.length > 1) {
                const matchLine = document.createElement('div');
                matchLine.className = 'terminal-line';
                matchLine.style.color = 'var(--text-muted)';
                matchLine.innerHTML = matches.join('   ');
                terminalOutput.appendChild(matchLine);
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0 && historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                terminalInput.value = '';
            }
        }
    });
}

function runMatrixEffect(outputElem) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.style.color = '#00FF66';
    line.style.fontFamily = 'monospace';
    outputElem.appendChild(line);

    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ𓂀アイウエオカキクケコサシスセソ';
    let count = 0;

    const interval = setInterval(() => {
        let str = '';
        for (let i = 0; i < 40; i++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length)) + ' ';
        }
        line.innerHTML = str;
        outputElem.scrollTop = outputElem.scrollHeight;
        count++;

        if (count > 25) {
            clearInterval(interval);
            line.innerHTML = `<span style="color: var(--gold);">[Matrix Rain Completed. System Secure.]</span>`;
        }
    }, 100);
}
