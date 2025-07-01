/*
 * Lógica para la animación del fondo de red digital
 */

// Se asegura de que el script se ejecute solo cuando el DOM esté listo.
document.addEventListener('DOMContentLoaded', () => {

    // --- Configuración del Canvas ---
    const canvas = document.getElementById('digitalNetworkCanvas');
    // Si el canvas no existe en la página, detenemos el script para evitar errores.
    if (!canvas) {
        return;
    }
    const ctx = canvas.getContext('2d');

    // --- Variables de configuración (Personalizadas para la marca Vaala) ---
    let particlesArray;
    const particleColor = 'rgba(0, 102, 153, 0.7)'; // Color #006699
    const lineColor = 'rgba(41, 197, 255, 0.15)'; // Color #29C5FF
    const maxDistance = 120;

    // --- Objeto para la posición del ratón ---
    const mouse = {
        x: null,
        y: null,
        radius: 150
    };

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });
    window.addEventListener('mouseout', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    // --- Clase para crear una Partícula ---
    class Particle {
        constructor(x, y, directionX, directionY, size) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = particleColor;
            ctx.fill();
        }

        update() {
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    // --- Inicialización de partículas ---
    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 0.4) - 0.2;
            let directionY = (Math.random() * 0.4) - 0.2;
            particlesArray.push(new Particle(x, y, directionX, directionY, size));
        }
    }

    // --- Conectar partículas ---
    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) ** 2) + ((particlesArray[a].y - particlesArray[b].y) ** 2);

                if (distance < (maxDistance ** 2)) {
                    opacityValue = 1 - (distance / (maxDistance ** 2));
                    ctx.strokeStyle = `rgba(41, 197, 255, ${opacityValue * 0.2})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
        if (mouse.x !== undefined && mouse.y !== undefined) {
            for (let i = 0; i < particlesArray.length; i++) {
                let distance = ((particlesArray[i].x - mouse.x) ** 2) + ((particlesArray[i].y - mouse.y) ** 2);
                if (distance < (mouse.radius ** 2)) {
                    opacityValue = 1 - (distance / (mouse.radius ** 2));
                    ctx.strokeStyle = `rgba(0, 102, 153, ${opacityValue * 0.5})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
    }

    // --- Bucle de Animación ---
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }
    
    // --- Ajustar el tamaño del canvas y reiniciar ---
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function startup() {
        resizeCanvas();
        init();
        animate();
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
        init();
    });

    // --- Iniciar la aplicación ---
    startup();
});