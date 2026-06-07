// Kód pro správu Soundboardu využívající Event Delegation (Optimalizace paměti)
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('soundboard-container');
    const stopButton = document.getElementById('stop-all-btn');
    
    // Pole pro sledování právě hrajících instancí audia
    let activeAudios = [];

    if (container) {
        // Event delegation: Pověsíme event na rodiče .soundboard-grid
        container.addEventListener('click', (e) => {
            // Najdeme nejbližší button, pokud uživatel klikne např. na text uvnitř
            const button = e.target.closest('.sound-btn');
            
            if (!button) return; // Pokud nebylo kliknuto na tlačítko, ignorujeme

            const soundName = button.getAttribute('data-sound');
            
            // Výkon: Dynamické líné vytváření Audio objektu až při kliku (nezatěžuje start stránky)
            const audio = new Audio(`assets/audio/${soundName}.mp3`);
            
            // Přidáme vizuální třídu hrajícího tlačítka
            button.classList.add('playing');
            activeAudios.push({ audio, button });

            audio.play().catch(err => console.log("Přehrávání selhalo (interakce):", err));

            // Po dohrání zvuku vyčistíme efekty a paměť
            audio.addEventListener('ended', () => {
                button.classList.remove('playing');
                activeAudios = activeAudios.filter(item => item.audio !== audio);
            });
        });
    }

    if (stopButton) {
        // Funkce pro okamžité zastavení všech běžících zvuků
        stopButton.addEventListener('click', () => {
            activeAudios.forEach(item => {
                item.audio.pause();
                item.button.classList.remove('playing');
            });
            activeAudios = [];
        });
    }
});