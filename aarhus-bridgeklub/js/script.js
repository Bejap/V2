document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.querySelector('.menu');
    
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('open');
    });
    
    // Optional: Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
            menu.classList.remove('open');
        }
    });
});