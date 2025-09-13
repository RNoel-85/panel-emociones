document.addEventListener('DOMContentLoaded', () => {
    const emotionItems = document.querySelectorAll('.emotion-item');
    const resetButton = document.getElementById('reset-button');
    const dateDisplay = document.getElementById('date-display');
    
    const emotionProgress = {
        'feliz': 0,
        'triste': 0,
        'cansado': 0,
        'ansioso': 0,
        'aburrido': 0,
        'enojado': 0,
    };

    const increment = 2;
    const accessKey = 'GG2025';

    function updateDate() {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        dateDisplay.textContent = now.toLocaleDateString('es-ES', options);
    }
    
    setInterval(updateDate, 1000);
    updateDate();

    function resetAllBars() {
        for (const emotionKey in emotionProgress) {
            emotionProgress[emotionKey] = 0;
            const progressBar = document.getElementById(`${emotionKey}-bar`);
            const progressValue = document.getElementById(`${emotionKey}-value`);
            if (progressBar && progressValue) {
                progressBar.style.width = '0%';
                progressValue.textContent = '0%';
            }
        }
    }

    resetAllBars();

    emotionItems.forEach(item => {
        item.addEventListener('click', () => {
            const emotionKey = item.getAttribute('data-emotion');
            
            item.classList.add('clicked');
            setTimeout(() => {
                item.classList.remove('clicked');
            }, 300);

            if (emotionProgress[emotionKey] < 100) {
                emotionProgress[emotionKey] += increment;
            } else {
                emotionProgress[emotionKey] = 100;
            }

            const progressBar = document.getElementById(`${emotionKey}-bar`);
            const progressValue = document.getElementById(`${emotionKey}-value`);

            if (progressBar && progressValue) {
                progressBar.style.width = emotionProgress[emotionKey] + '%';
                progressValue.textContent = emotionProgress[emotionKey] + '%';
            }
        });
    });

    resetButton.addEventListener('click', () => {
        const enteredKey = prompt('Por favor, introduce la clave para reiniciar el conteo:');
        
        if (enteredKey === accessKey) {
            resetAllBars();
            alert('El conteo se ha reiniciado correctamente.');
        } else {
            alert('Clave incorrecta. El conteo no se ha reiniciado.');
        }
    });
});