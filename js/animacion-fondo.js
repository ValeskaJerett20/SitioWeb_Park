/*
 * Lógica para la animación del fondo de red digital
 */

// Se asegura de que el script se ejecute solo cuando el DOM esté listo.
document.addEventListener('DOMContentLoaded', () => {

    class DigitalNetwork {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.particlesArray = [];
            this.mouse = { x: null, y: null, radius: 150 };
            this.particleColor = 'rgba(0, 102, 153, 0.7)';
            this.lineColor = 'rgba(41, 197, 255, 0.15)';
            this.maxDistance = 120;

            window.addEventListener('mousemove', (e) => {
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
            });

            window.addEventListener('mouseout', () => {
                this.mouse.x = undefined;
                this.mouse.y = undefined;
            });

            this.resizeCanvas();
            this.initParticles();
            this.animate();
            window.addEventListener('resize', () => {
                this.resizeCanvas();
                this.initParticles();
            });
        }

        resizeCanvas() {
            this.canvas.width = this.canvas.clientWidth;
            this.canvas.height = this.canvas.clientHeight;
        }

        initParticles() {
            this.particlesArray = [];
            const numParticles = (this.canvas.width * this.canvas.height) / 9000;
            for (let i = 0; i < numParticles; i++) {
                const size = (Math.random() * 2) + 1;
                const x = Math.random() * this.canvas.width;
                const y = Math.random() * this.canvas.height;
                const directionX = (Math.random() * 0.4) - 0.2;
                const directionY = (Math.random() * 0.4) - 0.2;
                this.particlesArray.push({ x, y, directionX, directionY, size });
            }
        }

        drawParticle(p) {
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = this.particleColor;
            this.ctx.fill();
        }

        updateParticles() {
            for (let p of this.particlesArray) {
                if (p.x > this.canvas.width || p.x < 0) p.directionX *= -1;
                if (p.y > this.canvas.height || p.y < 0) p.directionY *= -1;
                p.x += p.directionX;
                p.y += p.directionY;
                this.drawParticle(p);
            }
        }

        connectParticles() {
            for (let a = 0; a < this.particlesArray.length; a++) {
                for (let b = a + 1; b < this.particlesArray.length; b++) {
                    const dx = this.particlesArray[a].x - this.particlesArray[b].x;
                    const dy = this.particlesArray[a].y - this.particlesArray[b].y;
                    const distance = dx * dx + dy * dy;

                    if (distance < this.maxDistance * this.maxDistance) {
                        const opacity = 1 - distance / (this.maxDistance * this.maxDistance);
                        this.ctx.strokeStyle = `rgba(41, 197, 255, ${opacity * 0.2})`;
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.particlesArray[a].x, this.particlesArray[a].y);
                        this.ctx.lineTo(this.particlesArray[b].x, this.particlesArray[b].y);
                        this.ctx.stroke();
                    }
                }
            }

            // Línea al mouse
            if (this.mouse.x !== undefined && this.mouse.y !== undefined) {
                for (let p of this.particlesArray) {
                    const dx = p.x - this.mouse.x;
                    const dy = p.y - this.mouse.y;
                    const dist = dx * dx + dy * dy;
                    if (dist < this.mouse.radius ** 2) {
                        const opacity = 1 - dist / (this.mouse.radius ** 2);
                        this.ctx.strokeStyle = `rgba(0, 102, 153, ${opacity * 0.5})`;
                        this.ctx.beginPath();
                        this.ctx.moveTo(p.x, p.y);
                        this.ctx.lineTo(this.mouse.x, this.mouse.y);
                        this.ctx.stroke();
                    }
                }
            }
        }

        animate = () => {
            requestAnimationFrame(this.animate);
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.updateParticles();
            this.connectParticles();
        }
    }

    // Inicializar animaciones en todos los canvas con clase específica
    document.querySelectorAll('.digital-network-canvas').forEach(canvas => {
        new DigitalNetwork(canvas);
    });

});
