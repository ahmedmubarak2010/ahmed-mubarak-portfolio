/* ==========================================
   CONTACT FORM & TOAST NOTIFICATION MODULE
   ========================================== */

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const origBtnText = submitBtn ? submitBtn.innerHTML : 'Send Email Message';

        const name = document.getElementById('formName').value.trim();
        const email = document.getElementById('formEmail').value.trim();
        const subject = document.getElementById('formSubject').value.trim();
        const message = document.getElementById('formMessage').value.trim();

        if (!name || !email || !subject || !message) {
            showToast('Please fill out all required fields!', 'warning');
            return;
        }

        // Show button loading state
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Opening Email App...`;
        }

        const emailRecipient = "mubarakxahmed2010@gmail.com";
        const emailSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject}`);
        const emailBody = encodeURIComponent(
            `Hello Ahmed Mubarak,\n\nSender Name: ${name}\nSender Email: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n\n---\nSent from Portfolio Website`
        );
        
        const mailtoUrl = `mailto:${emailRecipient}?subject=${emailSubject}&body=${emailBody}`;

        showToast(`Thank you ${name}! Opening your email app to send message... 📧`, 'success');

        setTimeout(() => {
            window.location.href = mailtoUrl;
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = origBtnText;
            }
            form.reset();
        }, 600);
    });
}

function copyDiscordHandle(e) {
    if (e) e.preventDefault();
    const handle = "mubarak3_3";
    navigator.clipboard.writeText(handle).then(() => {
        showToast(`Discord handle copied: ${handle} 🎮`, 'success');
    }).catch(() => {
        showToast(`Discord Username: ${handle}`, 'info');
    });
}

/**
 * Custom UI Toast Notification System
 * @param {string} message 
 * @param {'success' | 'warning' | 'info' | 'error'} type 
 */
function showToast(message, type = 'success') {
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconClass = 'fas fa-check-circle';
    if (type === 'warning') iconClass = 'fas fa-exclamation-triangle';
    if (type === 'info') iconClass = 'fas fa-info-circle';
    if (type === 'error') iconClass = 'fas fa-times-circle';

    toast.innerHTML = `<i class="${iconClass}"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}
