/* ==========================================
   MODAL DIALOGS MODULE
   ========================================== */

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

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
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

/**
 * Smart Project Modal
 * Automatically adapts button text, icons, and links based on the project type:
 * - Google Colab / Data Analytics Notebooks
 * - APK / EXE App Releases
 * - Standard Live Web Demos
 */
function openProjectModal(title, category, description, techStackStr, demoUrl, repoUrl, customType) {
    const overlay = document.getElementById('modalOverlay');
    const modalBody = document.getElementById('modalBody');
    if (!overlay || !modalBody) return;

    const techBadges = techStackStr.split(',').map(t => `<span class="tool-tag">${t.trim()}</span>`).join(' ');

    const lowerCat = category.toLowerCase();
    const lowerType = (customType || '').toLowerCase();
    const isColab = lowerCat.includes('colab') || lowerCat.includes('data') || lowerType.includes('colab') || (demoUrl && demoUrl.includes('colab.research.google.com'));
    const isApp = lowerCat.includes('app') || lowerCat.includes('apk') || lowerCat.includes('exe') || lowerType.includes('apk') || lowerType.includes('exe') || (demoUrl && (demoUrl.endsWith('.apk') || demoUrl.endsWith('.exe') || demoUrl.includes('releases')));

    // Dynamic Action Buttons Setup
    let primaryBtnHtml = '';
    let secondaryBtnHtml = '';

    // Primary Button (Demo / Colab / Download)
    if (demoUrl && demoUrl !== 'null' && demoUrl !== 'soon') {
        if (isColab) {
            primaryBtnHtml = `
                <a href="${demoUrl}" target="_blank" class="btn btn-gold btn-sm">
                    <i class="fab fa-google"></i> Open in Google Colab
                </a>`;
        } else if (isApp) {
            primaryBtnHtml = `
                <a href="${demoUrl}" target="_blank" class="btn btn-gold btn-sm">
                    <i class="fas fa-download"></i> Download Release (APK/EXE)
                </a>`;
        } else {
            primaryBtnHtml = `
                <a href="${demoUrl}" target="_blank" class="btn btn-primary btn-sm">
                    <i class="fas fa-external-link-alt"></i> Live Web Demo
                </a>`;
        }
    } else {
        primaryBtnHtml = `
            <a href="https://wa.me/message/45YZ4FUMDMEJN1?text=Hi%20Ahmed,%20I'm%20interested%20in%20learning%20more%20about%20${encodeURIComponent(title)}" target="_blank" class="btn btn-primary btn-sm">
                <i class="fas fa-paper-plane"></i> Inquire About Project
            </a>`;
    }

    // Secondary Button (GitHub Repo)
    if (repoUrl && repoUrl !== 'null' && repoUrl !== 'soon') {
        const repoLabel = isColab ? 'View Notebook Repository' : 'GitHub Repository';
        secondaryBtnHtml = `
            <a href="${repoUrl}" target="_blank" class="btn btn-outline btn-sm">
                <i class="fab fa-github"></i> ${repoLabel}
            </a>`;
    }

    modalBody.innerHTML = `
        <div style="padding: 0.5rem;">
            <div class="badge badge-gold" style="margin-bottom: 0.8rem;">
                <i class="${isColab ? 'fab fa-google' : (isApp ? 'fas fa-mobile-alt' : 'fas fa-laptop-code')}"></i> ${category}
            </div>
            <h3 style="font-size: 1.8rem; margin-bottom: 1rem; color: var(--primary);">${title}</h3>
            <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 1.5rem;">${description}</p>
            
            <h4 style="font-size: 1rem; margin-bottom: 0.6rem; color: var(--gold);">Technologies & Tools Used:</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">${techBadges}</div>

            <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
                ${primaryBtnHtml}
                ${secondaryBtnHtml}
            </div>
        </div>
    `;

    overlay.classList.add('active');
}
