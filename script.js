document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // UPDATE YEAR IN FOOTER
    // ==========================================
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // ==========================================
    // THEME TOGGLE (Light/Dark Mode)
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');

    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.body.classList.add('dark-theme');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');

        if (document.body.classList.contains('dark-theme')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // ==========================================
    // NAVBAR & MOBILE MENU
    // ==========================================
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navItems = navLinks.querySelectorAll('a');

    // Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });

    // Active Navigation Link Update on Scroll
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // ==========================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ==========================================
    const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    const progressBars = document.querySelectorAll('.progress');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add appear class for fading/sliding elements
                entry.target.classList.add('appear');

                // Animate progress bars if they exist in the target
                if (entry.target.classList.contains('skill-category')) {
                    const bars = entry.target.querySelectorAll('.progress');
                    bars.forEach(bar => {
                        bar.style.width = bar.getAttribute('data-width');
                    });
                }

                // Optional: Stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // ==========================================
    // DYNAMIC PORTFOLIO LOADING
    // ==========================================
    const portfolioGrid = document.getElementById('portfolio-grid');

    // Sample data structure to represent images in the 'photos' folder.
    // In a real application without a backend, you'd define this array manually
    // or use a build script to generate it.
    const portfolioData = [
        { id: 1, category: 'graphics', title: 'Portfolio Item 1', path: 'photos/WhatsApp Image 2026-02-26 at 10.40.32 AM (1).jpeg' },
        { id: 2, category: 'video', title: 'Portfolio Item 2', path: 'photos/WhatsApp Image 2026-02-26 at 10.40.32 AM (2).jpeg' },
        { id: 3, category: 'graphics', title: 'Portfolio Item 3', path: 'photos/WhatsApp Image 2026-02-26 at 10.40.32 AM.jpeg' },
        { id: 4, category: 'video', title: 'Portfolio Item 4', path: 'photos/WhatsApp Image 2026-02-26 at 10.40.33 AM (1).jpeg' },
        { id: 5, category: 'graphics', title: 'Portfolio Item 5', path: 'photos/WhatsApp Image 2026-02-26 at 10.40.33 AM (2).jpeg' },
        { id: 6, category: 'video', title: 'Portfolio Item 6', path: 'photos/WhatsApp Image 2026-02-26 at 10.40.33 AM.jpeg' },
        { id: 7, category: 'graphics', title: 'Portfolio Item 7', path: 'photos/WhatsApp Image 2026-02-26 at 10.40.34 AM (1).jpeg' },
        { id: 8, category: 'video', title: 'Portfolio Item 8', path: 'photos/WhatsApp Image 2026-02-26 at 10.40.34 AM (2).jpeg' },
        { id: 9, category: 'graphics', title: 'Portfolio Item 9', path: 'photos/WhatsApp Image 2026-02-26 at 10.40.34 AM.jpeg' },
        { id: 10, category: 'video', title: 'Portfolio Item 10', path: 'photos/WhatsApp Image 2026-02-26 at 10.40.35 AM (1).jpeg' },
        { id: 11, category: 'graphics', title: 'Portfolio Item 11', path: 'photos/WhatsApp Image 2026-02-26 at 10.40.35 AM (2).jpeg' },
        { id: 12, category: 'video', title: 'Portfolio Item 12', path: 'photos/WhatsApp Image 2026-02-26 at 10.40.35 AM.jpeg' },
        { id: 13, category: 'graphics', title: 'Portfolio Item 13', path: 'photos/WhatsApp Image 2026-02-26 at 10.40.36 AM (1).jpeg' },
        { id: 14, category: 'video', title: 'Portfolio Item 14', path: 'photos/WhatsApp Image 2026-02-26 at 10.40.36 AM (2).jpeg' },
        { id: 15, category: 'graphics', title: 'Portfolio Item 15', path: 'photos/WhatsApp Image 2026-02-26 at 10.40.36 AM (3).jpeg' },
        { id: 16, category: 'video', title: 'Portfolio Item 16', path: 'photos/WhatsApp Image 2026-02-26 at 10.40.36 AM.jpeg' },
        { id: 17, category: 'graphics', title: 'Portfolio Item 17', path: 'photos/WhatsApp Image 2026-02-26 at 10.40.37 AM (1).jpeg' },
        { id: 18, category: 'video', title: 'Portfolio Item 18', path: 'photos/WhatsApp Image 2026-02-26 at 10.40.37 AM (2).jpeg' },
        { id: 19, category: 'graphics', title: 'Portfolio Item 19', path: 'photos/WhatsApp Image 2026-02-26 at 10.40.37 AM.jpeg' },
        { id: 20, category: 'video', title: 'Portfolio Item 20', path: 'photos/WhatsApp Image 2026-02-26 at 10.40.38 AM (1).jpeg' },
        { id: 21, category: 'graphics', title: 'Portfolio Item 21', path: 'photos/WhatsApp Image 2026-02-26 at 10.40.38 AM (2).jpeg' },
        { id: 22, category: 'video', title: 'Portfolio Item 22', path: 'photos/WhatsApp Image 2026-02-26 at 10.40.38 AM.jpeg' },
        { id: 23, category: 'graphics', title: 'Portfolio Item 23', path: 'photos/WhatsApp Image 2026-02-26 at 10.40.39 AM (1).jpeg' },
        { id: 24, category: 'video', title: 'Portfolio Item 24', path: 'photos/WhatsApp Image 2026-02-26 at 10.40.39 AM.jpeg' },
        { id: 25, category: 'graphics', title: 'Portfolio Item 25', path: 'photos/WhatsApp Image 2026-02-26 at 10.40.40 AM (1).jpeg' },
        { id: 26, category: 'video', title: 'Portfolio Item 26', path: 'photos/WhatsApp Image 2026-02-26 at 10.40.40 AM.jpeg' },
        { id: 27, category: 'graphics', title: 'Portfolio Item 27', path: 'photos/WhatsApp Image 2026-02-26 at 10.40.41 AM (1).jpeg' },
        { id: 28, category: 'video', title: 'Portfolio Item 28', path: 'photos/WhatsApp Image 2026-02-26 at 10.40.41 AM (2).jpeg' },
        { id: 29, category: 'graphics', title: 'Portfolio Item 29', path: 'photos/WhatsApp Image 2026-02-26 at 10.40.41 AM.jpeg' }
    ];

    // Function to render portfolio items
    function renderPortfolio(items) {
        portfolioGrid.innerHTML = '';

        if (items.length === 0) {
            portfolioGrid.innerHTML = '<p class="text-muted" style="grid-column: 1/-1; text-align: center;">No projects found in this category.</p>';
            return;
        }

        items.forEach(item => {
            const delay = (item.id % 4) * 0.1; // Staggered animation effect

            const element = document.createElement('div');
            element.className = 'portfolio-item fade-in appear'; // Use appear immediately to bypass scroll wait if already visible
            element.style.transitionDelay = `${delay}s`;

            // Using placeholder image if actual file doesn't exist
            // Using a service like unsplash source as fallback for local dev
            const fallbackSrc = `https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800&h=600&random=${item.id}`;
            const actualSrc = item.path;

            element.innerHTML = `
                <img src="${actualSrc}" onerror="this.src='${fallbackSrc}'; this.onerror=null;" alt="${item.title}" loading="lazy">
                <div class="portfolio-overlay">
                    <h3 class="portfolio-title">${item.title}</h3>
                    <span class="portfolio-category">${item.category === 'graphics' ? 'Graphic Design' : 'Video Editing'}</span>
                </div>
            `;

            portfolioGrid.appendChild(element);
        });
    }

    // Initial render
    renderPortfolio(portfolioData);

    // ==========================================
    // PORTFOLIO FILTERING
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            if (filterValue === 'all') {
                renderPortfolio(portfolioData);
            } else {
                const filtered = portfolioData.filter(item => item.category === filterValue);
                renderPortfolio(filtered);
            }
        });
    });

    // ==========================================
    // CONTACT FORM SUBMISSION
    // ==========================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            // Basic UI feedback for submission
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            // Simulate network request
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                btn.classList.add('btn-success'); // You could add this utility class in CSS
                btn.style.background = '#10b981'; // Green color for success

                contactForm.reset();

                // Revert back after 3 seconds
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.style.background = '';
                }, 3000);
            }, 1500);
        });
    }
});
