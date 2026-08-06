/* ==========================================
   MAIN APPLICATION ENTRY POINT
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    if (typeof initTheme === 'function') initTheme();
    if (typeof initTypingEffect === 'function') initTypingEffect();
    if (typeof initSkillFilters === 'function') initSkillFilters();
    if (typeof initProjectFilters === 'function') initProjectFilters();
    if (typeof initTerminal === 'function') initTerminal();
    if (typeof initContactForm === 'function') initContactForm();
    if (typeof initMobileMenu === 'function') initMobileMenu();
    if (typeof initScrollSpy === 'function') initScrollSpy();
    if (typeof initModals === 'function') initModals();
});
