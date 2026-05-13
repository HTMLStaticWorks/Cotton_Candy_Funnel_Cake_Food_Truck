document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if(mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Dark/Light Mode Toggle
    const themeToggleBtns = document.querySelectorAll('.theme-toggle');
    
    // Check local storage or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            if (document.documentElement.classList.contains('dark')) {
                localStorage.theme = 'dark';
            } else {
                localStorage.theme = 'light';
            }
        });
    });

    // Sticky Navbar
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-md', 'backdrop-blur-md');
                navbar.classList.replace('bg-white', 'bg-white/90');
                if(document.documentElement.classList.contains('dark')) {
                    navbar.classList.replace('dark:bg-[#0f172a]', 'dark:bg-[#0f172a]/90');
                }
            } else {
                navbar.classList.remove('shadow-md', 'backdrop-blur-md');
                navbar.classList.replace('bg-white/90', 'bg-white');
                if(document.documentElement.classList.contains('dark')) {
                    navbar.classList.replace('dark:bg-[#0f172a]/90', 'dark:bg-[#0f172a]');
                }
            }
        });
    }

    // Sugar Dust Particles effect for hero section
    const heroSection = document.querySelector('.hero-dust-container');
    if(heroSection) {
        for(let i=0; i<30; i++) {
            createDustParticle(heroSection);
        }
    }

    function createDustParticle(container) {
        const particle = document.createElement('div');
        particle.classList.add('dust');
        
        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation duration and delay
        particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        
        container.appendChild(particle);
    }
});
