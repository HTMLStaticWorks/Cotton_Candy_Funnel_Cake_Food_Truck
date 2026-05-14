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

    // RTL/LTR Toggle Logic
    const rtlToggleBtns = document.querySelectorAll('.rtl-toggle');
    
    const updateRTLDisplay = (isRTL) => {
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
        rtlToggleBtns.forEach(btn => {
            btn.innerText = isRTL ? 'LTR' : 'RTL';
        });
    };

    // Initial check
    if (localStorage.dir === 'rtl') {
        updateRTLDisplay(true);
    }

    rtlToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isCurrentlyRTL = document.documentElement.dir === 'rtl';
            const newRTL = !isCurrentlyRTL;
            localStorage.dir = newRTL ? 'rtl' : 'ltr';
            updateRTLDisplay(newRTL);
        });
    });

    // Sticky Navbar
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-md', 'backdrop-blur-md');
                navbar.classList.replace('bg-slate-900', 'bg-slate-900/90');
            } else {
                navbar.classList.remove('shadow-md', 'backdrop-blur-md');
                navbar.classList.replace('bg-slate-900/90', 'bg-slate-900');
            }
        });
    }

    // Candy Dust Particles effect for hero section
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

    // Active Link Highlighting
    const highlightActiveLink = () => {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('#navbar div.hidden.md\\:flex a:not([href="bookings.html"]), #mobile-menu a:not([href="bookings.html"])');
        
        // Target the Home buttons specifically
        const desktopHomeBtn = document.querySelector('#navbar .group button');
        const mobileHomeBtn = document.querySelector('#mobile-menu .cursor-pointer');

        // Reset Home buttons style initially
        [desktopHomeBtn, mobileHomeBtn].forEach(btn => {
            if (btn) {
                btn.classList.remove('text-brand-pink', 'font-bold');
                btn.classList.add('text-white');
            }
        });

        navLinks.forEach(link => {
            // Add hover underline class
            link.classList.add('nav-link');
            
            // Remove any hardcoded active styles
            link.classList.remove('text-brand-pink', 'bg-brand-pink/5', 'nav-link-active', 'font-bold', 'text-brand-dark');
            link.classList.add('text-white');
            
            const href = link.getAttribute('href');
            if (href === currentPath) {
                // Apply active styles
                link.classList.add('nav-link-active', 'text-brand-pink', 'font-bold');
                link.classList.remove('text-white');
                
                // Add background for dropdown items if active
                if (link.classList.contains('block')) {
                    link.classList.add('bg-brand-pink/5');
                }
                
                // If it's a child of Home dropdown, highlight Home buttons
                if (href.includes('index')) {
                    [desktopHomeBtn, mobileHomeBtn].forEach(btn => {
                        if (btn) {
                            btn.classList.add('text-brand-pink', 'font-bold');
                            btn.classList.remove('text-white');
                        }
                    });
                }
            }
        });
    };

    highlightActiveLink();
});

