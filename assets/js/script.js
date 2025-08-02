
document.addEventListener('DOMContentLoaded', () => {
    // --- MOBILE NAVIGATION FUNCTIONALITY ---
    function isMobileDevice() {
        return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    function updateNavigationForMobile() {
        const aboutLink = document.getElementById('about-link');
        const contactLink = document.getElementById('contact-link');

        if (isMobileDevice()) {
            // En móvil, redirigir a páginas separadas
            if (aboutLink) {
                aboutLink.href = 'about.html';
            }
            if (contactLink) {
                contactLink.href = 'contact.html';
            }
        } else {
            // En desktop, mantener navegación por secciones
            if (aboutLink) {
                aboutLink.href = '#sobre-mi';
            }
            if (contactLink) {
                contactLink.href = '#contact-section';
            }
        }
    }

    // Llamar al cargar la página
    updateNavigationForMobile();

    // Actualizar al cambiar el tamaño de la ventana
    window.addEventListener('resize', updateNavigationForMobile);

    // --- STICKY HEADER FUNCTIONALITY ---
    const stickyHeader = document.getElementById('stickyHeader');
    let isCondensed = false;

    function updateHeader() {
        const scrollPosition = window.scrollY;
        const shouldCondense = scrollPosition > 100;

        if (shouldCondense && !isCondensed) {
            stickyHeader.classList.add('condensed');
            document.body.classList.add('header-condensed');
            isCondensed = true;
        } else if (!shouldCondense && isCondensed) {
            stickyHeader.classList.remove('condensed');
            document.body.classList.remove('header-condensed');
            isCondensed = false;
        }
    }

    // Detectar scroll
    window.addEventListener('scroll', updateHeader);

    // Llamar una vez al cargar la página
    updateHeader();

    // --- MUSIC PLAYER COLLAPSIBLE ---
    const musicPlayer = document.getElementById('musicPlayer');
    const musicToggle = document.getElementById('musicToggle');

    if (musicPlayer && musicToggle) {
        // Estado inicial: colapsado
        let isExpanded = false;

        // Función para toggle del reproductor
        const toggleMusicPlayer = () => {
            isExpanded = !isExpanded;

            if (isExpanded) {
                musicPlayer.classList.add('expanded');
            } else {
                musicPlayer.classList.remove('expanded');
            }
        };

        // Event listeners
        musicToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMusicPlayer();
        });

        // Auto-colapsar al hacer click fuera (opcional)
        document.addEventListener('click', (e) => {
            if (isExpanded && !musicPlayer.contains(e.target)) {
                isExpanded = false;
                musicPlayer.classList.remove('expanded');
            }
        });

        // Prevenir que el click en el player lo cierre
        musicPlayer.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // --- GALERÍA EFECTOS Y LIGHTBOX ---
    const workItems = document.querySelectorAll('.work-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    workItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease-out';
        observer.observe(item);
        // Efecto hover
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            item.style.setProperty('--mouse-x', `${x}px`);
            item.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    // Lightbox (versión mínima funcional)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('img');
    document.querySelectorAll('.work-item img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function () {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    lightbox.addEventListener('click', function () {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });
    lightboxImg.addEventListener('click', function (e) {
        e.stopPropagation();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // --- ANIMACIÓN TÍTULO ---
    const title = document.querySelector('.artistic-title');
    if (title) {
        title.style.opacity = 0;
        title.style.transform = 'translateX(-50px)';
        title.style.transition = 'all 1s ease-out';
        setTimeout(() => {
            title.style.opacity = 1;
            title.style.transform = 'translateX(0)';
        }, 300);
    }

    // --- EASTER EGG ---
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    let konamiIndex = 0;
    document.addEventListener('keydown', (e) => {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    function activateEasterEgg() {
        createConfetti();
        const title = document.querySelector('.artistic-title');
        const originalText = title.textContent;
        title.textContent = '🎨 ¡ALMA ES INCREÍBLE! 🎨';
        title.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #f9ca24)';
        title.style.backgroundSize = '400% 400%';
        title.style.webkitBackgroundClip = 'text';
        title.style.webkitTextFillColor = 'transparent';
        title.style.animation = 'rainbow 2s ease-in-out infinite';
        const workItems = document.querySelectorAll('.work-item');
        workItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'rotate(360deg) scale(1.1)';
                item.style.transition = 'transform 1s ease-in-out';
            }, index * 100);
        });
        if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200, 100, 200]);
        }
        setTimeout(() => {
            title.textContent = originalText;
            title.style.background = '';
            title.style.webkitBackgroundClip = '';
            title.style.webkitTextFillColor = '';
            title.style.animation = '';
            workItems.forEach(item => {
                item.style.transform = '';
                item.style.transition = 'all 0.6s ease-out';
            });
            const confettiElements = document.querySelectorAll('.confetti');
            confettiElements.forEach(c => c.remove());
        }, 5000);
    }
    function createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#a55eea', '#26de81'];
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.cssText = `
                position: fixed;
                top: -10px;
                left: ${Math.random() * 100}%;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                animation: confetti-fall 3s linear forwards;
            `;
            document.body.appendChild(confetti);
        }
    }
});

