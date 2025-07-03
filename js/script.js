// --- 1. Gestión del Menú Móvil ---
/**
 * Configura la funcionalidad de alternar la visibilidad de un menú móvil.
 * @param {string} toggleBtnId - ID del botón que activa/desactiva el menú.
 * @param {string} mobileMenuId - ID del menú móvil a mostrar/ocultar.
 */
function setupMobileMenu(toggleBtnId, mobileMenuId) {
    const toggleBtn = document.getElementById(toggleBtnId);
    const mobileMenu = document.getElementById(mobileMenuId);

    if (toggleBtn && mobileMenu) {
        toggleBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
            // Opcional: Si usas clases para animar la apertura/cierre (ej. max-h-0/max-h-screen)
            // mobileMenu.classList.toggle("max-h-0");
            // mobileMenu.classList.toggle("max-h-screen");
        });
    }
}

// --- 2. Animaciones de Entrada/Salida por Scroll (generalizada) ---
/**
 * Configura una animación de entrada/salida para un elemento al hacer scroll.
 * El elemento debe tener las clases iniciales (ej. 'opacity-0', 'translate-x-10')
 * y las clases de transición de Tailwind en su HTML.
 * @param {string} elementId - ID del elemento a animar.
 * @param {string} initialClass - Clase de Tailwind que define la posición inicial (ej. '-translate-x-10', 'translate-y-10').
 * @param {number} [threshold=0.3] - Porcentaje del elemento que debe estar visible para activar (0.0 a 1.0).
 * @param {boolean} [resetOnExit=true] - Si la animación debe resetearse cuando el elemento sale de vista.
 */
function setupScrollAnimation(elementId, initialClass, threshold = 0.3, resetOnExit = true) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.warn(`Elemento con ID "${elementId}" no encontrado para setupScrollAnimation.`);
        return;
    }

    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            element.classList.remove('opacity-0', initialClass);
        } else if (resetOnExit) {
            element.classList.add('opacity-0', initialClass);
        }
    }, {
        threshold: threshold,
    });

    observer.observe(element);
}

// --- 3. Control de Reproducción de Video al Scroll ---
/**
 * Gestiona la animación de entrada de una sección de video y el autoplay de un iframe de video
 * cuando la sección entra/sale de vista.
 * El video iframe debe tener el atributo 'src' con 'autoplay=0' o sin 'autoplay' para el reinicio.
 * @param {string} videoSectionId - ID de la sección contenedora del video (para animación de entrada).
 * @param {string} videoFrameId - ID del iframe del video.
 * @param {number} [threshold=0.5] - Porcentaje de la sección que debe estar visible.
 */
function setupVideoPlayerOnScroll(videoSectionId, videoFrameId, threshold = 0.5) {
    const videoSection = document.getElementById(videoSectionId);
    const videoFrame = document.getElementById(videoFrameId);

    if (!videoSection || !videoFrame) {
        console.warn(`Elementos de video (sección: "${videoSectionId}", iframe: "${videoFrameId}") no encontrados.`);
        return;
    }

    const originalSrc = videoFrame.getAttribute("src");
    // Asegura que el src original no tiene autoplay para que el reinicio funcione correctamente
    const cleanOriginalSrc = originalSrc ? originalSrc.replace(/autoplay=[01]/g, 'autoplay=0') : '';

    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            // Animación de entrada de la sección
            videoSection.classList.remove("opacity-0", "translate-y-10");

            // Activa Autoplay
            if (videoFrame.src !== cleanOriginalSrc.replace("autoplay=0", "autoplay=1")) {
                videoFrame.src = cleanOriginalSrc.replace("autoplay=0", "autoplay=1");
            }
        } else {
            // Resetea animación y video
            videoSection.classList.add("opacity-0", "translate-y-10");
            if (videoFrame.src !== cleanOriginalSrc) {
                videoFrame.src = cleanOriginalSrc; // Restaura el src original (sin autoplay)
            }
        }
    }, {
        threshold: threshold,
    });

    observer.observe(videoSection);
}

// --- 4. Animación de Pulso de Botón al Scroll ---
/**
 * Aplica una animación de pulso a un botón cuando su sección contenedora entra en vista.
 * La clase 'animate-pulse-smooth' debe estar definida en tu CSS/Tailwind config.
 * @param {string} triggerSectionId - ID de la sección que, al entrar en vista, activa la animación del botón.
 * @param {string} buttonId - ID del botón al que se le aplicará la animación.
 * @param {number} [threshold=0.5] - Porcentaje de la sección que debe estar visible.
 * @param {number} [pulseDuration=1000] - Duración de la animación de pulso en milisegundos.
 * @param {boolean} [animateSection=true] - Si la sección de activación también debe animarse (opacity/translate).
 */
function setupButtonPulseAnimation(triggerSectionId, buttonId, threshold = 0.5, pulseDuration = 1000, animateSection = true) {
    const triggerSection = document.getElementById(triggerSectionId);
    const button = document.getElementById(buttonId);

    if (!triggerSection || !button) {
        console.warn(`Elementos de botón (sección: "${triggerSectionId}", botón: "${buttonId}") no encontrados.`);
        return;
    }

    let animatedOnce = false; // Bandera para controlar si el botón ya se animó en esta entrada

    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            if (animateSection) {
                triggerSection.classList.remove("opacity-0", "translate-y-10"); // Asumiendo animación de entrada
            }

            if (!animatedOnce) {
                button.classList.add("animate-pulse-smooth");
                setTimeout(() => {
                    button.classList.remove("animate-pulse-smooth");
                }, pulseDuration);
                animatedOnce = true;
            }
        } else {
            if (animateSection) {
                triggerSection.classList.add("opacity-0", "translate-y-10");
            }
            animatedOnce = false; // Resetea la bandera cuando sale de vista, permitiendo otra animación al volver a entrar
        }
    }, {
        threshold: threshold,
    });

    observer.observe(triggerSection);
}

// --- 5. Animación de "Typewriter" ---
// Textos por defecto (pueden ser sobrescritos al llamar la función)
const DEFAULT_TITLE_TEXT = `CONECTIVIDAD,\nCONTROL Y COBRO\nEN UNA SOLA\nSOLUCIÓN`;
const DEFAULT_PARAGRAPH_TEXT = `EN PARK, NOS MUEVE LA INNOVACIÓN,\nLA EFICIENCIA Y EL DISEÑO DE HERRAMIENTAS\nQUE HACEN MÁS SIMPLE, SEGURO\nY ORDENADO EL USO DE LOS ESPACIOS.`;

/**
 * Simula el efecto de escritura (typewriter) en un elemento.
 * @param {HTMLElement} element - El elemento DOM donde se escribirá el texto.
 * @param {string} text - El texto a "escribir".
 * @param {number} [delay=50] - Retraso entre cada carácter en milisegundos.
 * @param {function} [callback] - Función a llamar una vez que el texto ha terminado de escribirse.
 */
function typeWriter(element, text, delay = 50, callback) {
    let i = 0;
    element.innerHTML = ""; // Limpia el contenido antes de empezar
    function typing() {
        if (i < text.length) {
            element.innerHTML += text[i] === '\n' ? '<br/>' : text[i];
            i++;
            setTimeout(typing, delay);
        } else if (callback) {
            callback();
        }
    }
    typing();
}

/**
 * Configura un ciclo de animación de "máquina de escribir" para un título y un párrafo.
 * Incluye animación de entrada (fade/slide) y repetición.
 * Los elementos deben tener las clases iniciales (ej. 'opacity-0', 'translate-x-10')
 * y las clases de transición de Tailwind en su HTML.
 * @param {string} titleId - ID del elemento del título.
 * @param {string} paragraphId - ID del elemento del párrafo.
 * @param {string} [titleText=DEFAULT_TITLE_TEXT] - Texto a escribir para el título.
 * @param {string} [paragraphText=DEFAULT_PARAGRAPH_TEXT] - Texto a escribir para el párrafo.
 * @param {number} [initialDelay=1000] - Retraso antes de que comience el primer ciclo en milisegundos.
 * @param {number} [repeatInterval=12000] - Intervalo entre repeticiones del ciclo en milisegundos (0 para no repetir).
 * @param {number} [transitionDelay=300] - Retraso para que las clases de transición se apliquen antes de empezar a escribir.
 */
function setupTypewriterAnimation(
    titleId,
    paragraphId,
    titleText = DEFAULT_TITLE_TEXT,
    paragraphText = DEFAULT_PARAGRAPH_TEXT,
    initialDelay = 1000,
    repeatInterval = 12000,
    transitionDelay = 300
) {
    const titleEl = document.getElementById(titleId);
    const paraEl = document.getElementById(paragraphId);

    if (!titleEl || !paraEl) {
        console.warn(`Elementos TypeWriter (título: "${titleId}", párrafo: "${paragraphId}") no encontrados.`);
        return;
    }

    function animateCycle() {
        // Oculta y mueve fuera de vista con las clases que asumen transición
        titleEl.classList.add("opacity-0", "translate-x-10");
        paraEl.classList.add("opacity-0", "translate-x-10");

        // Espera a que las clases de transición se apliquen antes de removerlas y empezar a escribir
        setTimeout(() => {
            titleEl.classList.remove("opacity-0", "translate-x-10");
            paraEl.classList.remove("opacity-0", "translate-x-10");

            // Limpia contenido justo antes de escribir
            titleEl.innerHTML = "";
            paraEl.innerHTML = "";

            typeWriter(titleEl, titleText, 50, () => {
                typeWriter(paraEl, paragraphText, 30);
            });
        }, transitionDelay);
    }

    // Inicia el primer ciclo después del initialDelay
    setTimeout(() => {
        animateCycle();
        // Si se especifica un intervalo de repetición válido, configúralo
        if (repeatInterval > 0) {
            setInterval(animateCycle, repeatInterval);
        }
    }, initialDelay);
}


// --- 6. Event Listener Principal para DOMContentLoaded ---
// Aquí es donde llamarás a las funciones específicas para cada página
// Es crucial que este bloque esté en cada archivo HTML o que cada HTML
// llame a una función de inicialización específica para esa página.
// Por ejemplo, si tienes un archivo 'index.js' y 'nosotros.js' que importan
// estas funciones, cada uno tendría su propio 'DOMContentLoaded' y sus llamadas.
/*
document.addEventListener('DOMContentLoaded', function() {
    // Ejemplo de cómo se usaría en index.html:
    setupMobileMenu("menu-toggle", "mobile-menu");
    setupScrollAnimation("logo-section", "-translate-x-10", 0.2);
    setupVideoPlayerOnScroll("video-section", "video-frame");
    setupButtonPulseAnimation("funciona-section", "boton-nosotros");
    setupScrollAnimation('funciona-section', 'translate-y-10', 0.5); // La sección funciona también se anima
    setupTypewriterAnimation("typewriter-title", "typewriter-paragraph"); // Usará los textos por defecto
    setupScrollAnimation('anim-left', '-translate-x-10');
    setupScrollAnimation('anim-right', 'translate-x-10');

    // Ejemplo de cómo se usaría en nosotros.html (si tuviera otros elementos)
    // setupScrollAnimation("our-story-section", "translate-x-10", 0.4, false); // no resetea
    // setupScrollAnimation("another-element", "-translate-y-5");
    // setupTypewriterAnimation("our-title", "our-paragraph", "NUESTRA HISTORIA", "Un largo y hermoso viaje.");
});
*/

//* animacion Inicio Hero

  document.addEventListener('mousemove', (e) => {
    const circles = document.querySelectorAll('.parallax-circle');
    circles.forEach((circle, index) => {
      const speed = 10 + index * 2;
      const x = (window.innerWidth / 2 - e.clientX) / speed;
      const y = (window.innerHeight / 2 - e.clientY) / speed;
      circle.style.transform = `translate(${x}px, ${y}px)`;
    });
  });

  
//   const canvas = document.getElementById('confetti-canvas');
//   const ctx = canvas.getContext('2d');
//   canvas.width = canvas.offsetWidth;
//   canvas.height = canvas.offsetHeight;

//   const particles = Array.from({ length: 80 }, () => ({
//     x: Math.random() * canvas.width,
//     y: Math.random() * canvas.height,
//     r: Math.random() * 6 + 2,
//     d: Math.random() * 80,
//     color: `hsl(${Math.floor(Math.random() * 360)}, 100%, 70%)`,
//     tilt: Math.floor(Math.random() * 10) - 10,
//     tiltAngleIncremental: Math.random() * 0.07 + 0.05,
//     tiltAngle: 0
//   }));

//   function drawConfetti() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     particles.forEach(p => {
//       ctx.beginPath();
//       ctx.lineWidth = p.r / 2;
//       ctx.strokeStyle = p.color;
//       ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
//       ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
//       ctx.stroke();
//     });
//     updateParticles();
//     requestAnimationFrame(drawConfetti);
//   }

//   function updateParticles() {
//     for (let i = 0; i < particles.length; i++) {
//       const p = particles[i];
//       p.tiltAngle += p.tiltAngleIncremental;
//       p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
//       p.x += Math.sin(p.d);
//       p.tilt = Math.sin(p.tiltAngle - i / 3) * 15;

//       if (p.y > canvas.height) {
//         particles[i] = {
//           ...p,
//           y: -10,
//           x: Math.random() * canvas.width
//         };
//       }
//     }
//   }

//   drawConfetti();

  // --- FONDO VIDEO SECCION INICIO ---
   particlesJS("particles-js", {
    "particles": {
      "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
      "color": { "value": "#33CCFF" },
      "shape": { "type": "circle" },
      "opacity": { "value": 0.3 },
      "size": { "value": 3 },
      "line_linked": { "enable": true, "distance": 150, "color": "#33CCFF", "opacity": 0.3, "width": 1 },
      "move": { "enable": true, "speed": 1.5 }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": { "enable": true, "mode": "grab" },
        "onclick": { "enable": false },
        "resize": true
      },
      "modes": {
        "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } }
      }
    },
    "retina_detect": true
  });


  // ========= SCRIPT PARA MAPA INTERACTIVO =========
document.addEventListener('DOMContentLoaded', () => {

    const regionCards = document.querySelectorAll('.region-card');
    const mapRegions = document.querySelectorAll('.chile-region');

    if (regionCards.length === 0 || mapRegions.length === 0) {
        console.warn("No se encontraron elementos del mapa interactivo. Revisa las clases '.region-card' y '.chile-region'.");
        return;
    }

    const setActiveRegion = (regionName) => {
        regionCards.forEach(card => card.classList.remove('active'));
        mapRegions.forEach(mapPath => mapPath.classList.remove('active'));

        if (regionName) {
            const activeCard = document.querySelector(`.region-card[data-region="${regionName}"]`);
            const activeMapRegion = document.querySelector(`#map-${regionName}`);

            if (activeCard) activeCard.classList.add('active');
            if (activeMapRegion) activeMapRegion.classList.add('active');
        }
    };

    regionCards.forEach(card => {
        card.addEventListener('click', () => {
            const regionName = card.dataset.region;
            const isAlreadyActive = card.classList.contains('active');
            setActiveRegion(isAlreadyActive ? null : regionName);
        });
    });

    mapRegions.forEach(mapPath => {
        mapPath.addEventListener('click', () => {
            const regionName = mapPath.id.replace('map-', '');
            const isAlreadyActive = mapPath.classList.contains('active');
            setActiveRegion(isAlreadyActive ? null : regionName);
        });
    });
    
    // Activa una región por defecto
    setActiveRegion('metropolitana');
});

  // --- SECCION MAPA ---
  // Ejemplo simple para cambiar color en mapa al hacer clic
  document.querySelectorAll('.region-card').forEach(card => {
    card.addEventListener('click', () => {
      const regionId = card.dataset.region;
      const svgDoc = document.querySelector('#svgMap').contentDocument;
      if (!svgDoc) return;
      svgDoc.querySelectorAll('[data-region]').forEach(el => el.classList.remove('highlight'));
      const regionElement = svgDoc.querySelector(`[data-region="${regionId}"]`);
      if (regionElement) regionElement.classList.add('highlight');
    });
  });



  // --- SECCION Hero reconocimiento ---
   window.addEventListener('scroll', () => {
    const offset = window.scrollY * 0.05;
    document.querySelectorAll('.parallax').forEach(el => {
      el.style.setProperty('--scroll-offset', `${offset}px`);
    });
  });
 // --- SECCION Hero reconocimiento texto e imagen ---
 // Simple Confetti
const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = 600;

const confetti = Array.from({ length: 100 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 6 + 2,
  d: Math.random() * 3 + 1,
  color: `hsl(${Math.random() * 200 + 180}, 100%, 70%)`
}));

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach(c => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fillStyle = c.color;
    ctx.fill();
    c.y += c.d;
    if (c.y > canvas.height) {
      c.y = -10;
      c.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(drawConfetti);
}
drawConfetti();
 
   

