// Enhanced Dark Mode Toggle Functionality
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (darkModeToggle) {
        // Update button icon based on current theme
        updateDarkModeIcon();
        
        darkModeToggle.addEventListener('click', () => {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.theme = 'light';
            } else {
                document.documentElement.classList.add('dark');
                localStorage.theme = 'dark';
            }
            updateDarkModeIcon();
        });
    }
}

function updateDarkModeIcon() {
    const moonIcon = document.querySelector('#darkModeToggle .fa-moon');
    const sunIcon = document.querySelector('#darkModeToggle .fa-sun');
    
    if (document.documentElement.classList.contains('dark')) {
        if (moonIcon) moonIcon.classList.add('hidden');
        if (sunIcon) sunIcon.classList.remove('hidden');
    } else {
        if (moonIcon) moonIcon.classList.remove('hidden');
        if (sunIcon) sunIcon.classList.add('hidden');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initDarkMode);

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!('theme' in localStorage)) {
        if (e.matches) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        updateDarkModeIcon();
    }
});