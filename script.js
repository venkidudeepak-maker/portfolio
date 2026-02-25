document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal Elements on Scroll
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                
                // Active Nav Link Update
                const id = entry.target.getAttribute('id');
                if (id) {
                    document.querySelectorAll('nav ul li a').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    }, observerOptions);

    // Apply reveal to sections and titles
    document.querySelectorAll('section, .section-title, .glass-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        revealObserver.observe(el);
    });

    // Custom CSS for revealed state
    const style = document.createElement('style');
    style.textContent = `
        .reveal {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // 2. Smooth Scrolling
    document.querySelectorAll('nav a, .cta-group a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 3. Mouse Move Glow Effect
    const glow1 = document.querySelector('.glow-1');
    const glow2 = document.querySelector('.glow-2');

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        // Subtly move glows based on mouse
        if (glow1) {
            glow1.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px)`;
        }
        if (glow2) {
            glow2.style.transform = `translate(${-x * 0.05}px, ${-y * 0.05}px)`;
        }
    });

    // 4. Staggered reveal for cards and tags
    document.querySelectorAll('.grid').forEach(grid => {
        const cards = grid.querySelectorAll('.glass-card');
        cards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    });
});
