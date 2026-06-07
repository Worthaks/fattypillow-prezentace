// Globální kód a správa responzivního menu
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            menuToggle.classList.toggle('open');
            
            // Přístupnost: Aktualizujeme stav aria-expanded pro čtečky obrazovky
            menuToggle.setAttribute('aria-expanded', isOpen);
        });
    }
});