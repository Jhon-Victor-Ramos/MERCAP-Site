document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.carrossel-container');
    const track = document.querySelector('.carrossel-track');
    const items = document.querySelectorAll('.carrossel-item');
    
    // Clonar itens para preencher o espaço vazio
    const cloneItems = () => {
        const containerWidth = container.offsetWidth;
        let trackWidth = track.scrollWidth;
        
        while (trackWidth < containerWidth * 2) {
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