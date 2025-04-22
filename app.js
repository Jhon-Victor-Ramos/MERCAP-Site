// MENU HAMBURGUER
document.addEventListener('DOMContentLoaded', () => {
    const htmlElement = document.documentElement;
    const body = document.body;
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && header && body && htmlElement) {
        menuToggle.addEventListener('click', () => {
            header.classList.toggle('menu-active');
            body.classList.toggle('overlay-active');
            htmlElement.classList.toggle('overlay-active');

            const isExpanded = header.classList.contains('menu-active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Fechar o menu ao clicar em um link
    if (navLinks && body && htmlElement) {
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (header.classList.contains('menu-active')) {
                    header.classList.remove('menu-active');
                    body.classList.remove('overlay-active');
                    htmlElement.classList.remove('overlay-active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
});

// ANIMAÇÃO CARROSSEL 
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.carrossel-container');
    const track = document.querySelector('.carrossel-track');
    const items = document.querySelectorAll('.carrossel-item');
    
    // Clonar itens para preencher o espaço vazio
    const cloneItems = () => {
        const containerWidth = container.offsetWidth;
        let trackWidth = track.scrollWidth;
        
        while (trackWidth < containerWidth * 4) {
            items.forEach(item => {
                const clone = item.cloneNode(true);
                track.appendChild(clone);
            });
            trackWidth = track.scrollWidth;
        }
    };

    // Configurar animação
    const startAnimation = () => {
        const itemWidth = items[0].offsetWidth;
        const gap = 40; // Mesmo valor do CSS
        const totalItemsWidth = (itemWidth + gap) * items.length;
        
        track.style.animation = `carrossel ${items.length * 3}s linear infinite`;
        
        // Criar keyframes dinamicamente
        const style = document.createElement('style');
        style.textContent = `
            @keyframes carrossel {
                0% { transform: translateX(0); }
                100% { transform: translateX(-${totalItemsWidth}px); }
            }
        `;
        document.head.appendChild(style);
    };

    // Inicialização
    cloneItems();
    startAnimation();

    // Resetar animação ao redimensionar
    window.addEventListener('resize', () => {
        track.style.animation = 'none';
        track.replaceChildren(...items); // Remove clones
        cloneItems();
        startAnimation();
    });
});

// ANIMAÇÃO BANNER (LETRAS SUBINDO E DESLIZANDO)
document.addEventListener('DOMContentLoaded', () => {
    const titleElement = document.getElementById('animated-title');
    const titleText = "MERCAP";
    const delayIncrement = 0.1;
    const animationDuration = 0.6; // Manter sincronizado com CSS

    if (titleElement) {
        titleElement.textContent = '';

        titleText.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.animationDelay = `${index * delayIncrement}s`;

            if (index < titleText.length - 1) {
                span.classList.add('not-last-char');
            }

            titleElement.appendChild(span);
        });
    }

    // ANIMAÇAO TEXTO DESCRITIVO
    document.body.classList.add('js-loading');

    const bannerTextElement = document.querySelector('.banner-text');

    if (bannerTextElement) {
        const originalHTML = bannerTextElement.innerHTML;
        const words = originalHTML.split(/(\s+)/).filter(word => word.trim().length > 0 || word.match(/\s+/));

        bannerTextElement.textContent = '';

        let currentDelay = 0.5;
        const delayIncrementWord = 0.08;

        words.forEach((wordOrSpace, index) => {
            if (wordOrSpace.match(/\s+/)) {
                bannerTextElement.insertAdjacentHTML('beforeend', wordOrSpace);
            } else {
                const span = document.createElement('span');
                span.classList.add('word-reveal');
                span.innerHTML = wordOrSpace;
                span.style.animationDelay = `${currentDelay}s`;
                bannerTextElement.appendChild(span);

                if (index + 1 < words.length && !words[index + 1].match(/\s+/)) {
                    bannerTextElement.insertAdjacentHTML('beforeend', ' ');
                }

                currentDelay += delayIncrementWord;
            }
        });
        setTimeout(() => {
            document.body.classList.remove('js-loading');
        }, 100);

    } else {
        console.warn("Elemento .banner-text não encontrado para animação de palavras.");
        document.body.classList.remove('js-loading');
    }
    window.onload = () => document.body.classList.remove('js-loading');


});

// ANIMAÇÃO NOSSOS PILARES
document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.pillars-section');
    const stats = document.querySelectorAll('.stat-number');

    if (!statsSection || stats.length === 0) return;
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            stats.forEach(stat => animateNumber(stat));
            observer.unobserve(entry.target);
        }
    });
    }, observerOptions);

    observer.observe(statsSection);

    function animateNumber(element) {
        const startValue = 0;
        const endValue = parseInt(element.dataset.target);
        const duration = 2000;
        let startTime = null;

        const animation = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = currentTime - startTime;
            const percentage = Math.min(progress / duration, 1);
        
            element.textContent = Math.floor(percentage * endValue);
        
            if (percentage < 1) {
                requestAnimationFrame(animation);
            } else {
                element.textContent = endValue;
            }
        };
        requestAnimationFrame(animation);
    }
});

// --- ATUALIZAR ANO NO FOOTER ---
function updateFooterYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

updateFooterYear();
setupMenu();
animateBannerTitle();
animateBannerText();
setupCarousel();
setupNumberAnimation();