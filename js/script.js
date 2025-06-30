document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    if (toggleBtn && mobileMenu) {
        toggleBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }
    // Crear instancia del mapa
    const map = new Datamap({
        element: document.getElementById('chile-map'),
        scope: 'chl',
        setProjection: function (element) {
            const projection = d3.geo.mercator()
                .center([-71, -38])
                .scale(1200)
                .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
            const path = d3.geo.path().projection(projection);
            return { path: path, projection: projection };
        },
        fills: {
            defaultFill: '#E2E8F0',
            valparaiso: '#3B82F6',
            metropolitana: '#10B981',
            ohiggins: '#F59E0B',
            araucania: '#EF4444'
        },
        data: {
            'CL-VS': { fillKey: 'valparaiso' },
            'CL-RM': { fillKey: 'metropolitana' },
            'CL-LI': { fillKey: 'ohiggins' },
            'CL-AR': { fillKey: 'araucania' }
        }
    });

    // Añadir etiquetas
    map.svg.selectAll('.region-label')
        .data([
            { region: 'VALPARAÍSO', coordinates: [-71.6, -33] },
            { region: 'METROPOLITANA', coordinates: [-70.7, -33.8] },
            { region: "O'HIGGINS", coordinates: [-71, -34.5] },
            { region: 'ARAUCANÍA', coordinates: [-72.5, -38.5] }
        ])
        .enter()
        .append('text')
        .attr('class', 'region-name')
        .attr('x', d => map.projection(d.coordinates)[0])
        .attr('y', d => map.projection(d.coordinates)[1])
        .text(d => d.region);
});

// Transición IMagen 
document.addEventListener("DOMContentLoaded", () => {
    const target = document.getElementById("logo-section");

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        target.classList.remove("opacity-0", "-translate-x-10");
      } else {
        // Reinicia al salir de vista
        target.classList.add("opacity-0", "-translate-x-10");
      }
    }, {
      threshold: 0.2
    });

    observer.observe(target);
  });
// end transición imagen


//video display
document.addEventListener("DOMContentLoaded", () => {
    const videoSection = document.getElementById("video-section");
    const videoFrame = document.getElementById("video-frame");
    const originalSrc = videoFrame.getAttribute("src");

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // ✨ Animación de entrada
        videoSection.classList.remove("opacity-0", "translate-y-10");

        // ▶️ Autoplay video
        const src = videoFrame.getAttribute("src");
        if (!src.includes("autoplay=1")) {
          videoFrame.setAttribute("src", originalSrc.replace("autoplay=0", "autoplay=1"));
        }
      } else {
        // 🔄 Reset: oculta animación y reinicia video
        videoSection.classList.add("opacity-0", "translate-y-10");
        videoFrame.setAttribute("src", originalSrc);
      }
    }, {
      threshold: 0.5,
    });

    observer.observe(videoSection);
  });

  //Animacion del texto, debajo del video
  
  document.addEventListener("DOMContentLoaded", () => {
    const funcionaSection = document.getElementById("funciona-section");
    const boton = document.getElementById("boton-nosotros");

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        funcionaSection.classList.remove("opacity-0", "translate-y-10");

        // ✨ Agrega animación al botón (una sola vez)
        boton.classList.add("animate-pulse-smooth");

        // Opcional: remueve animación después de 1s para que no se repita
        setTimeout(() => {
          boton.classList.remove("animate-pulse-smooth");
        }, 1000);
      } else {
        funcionaSection.classList.add("opacity-0", "translate-y-10");
      }
    }, {
      threshold: 0.5,
    });

    observer.observe(funcionaSection);
  });




const titleText = `CONECTIVIDAD,\nCONTROL Y COBRO\nEN UNA SOLA\nSOLUCIÓN`;
  const paragraphText = `EN PARK, NOS MUEVE LA INNOVACIÓN,\nLA EFICIENCIA Y EL DISEÑO DE HERRAMIENTAS\nQUE HACEN MÁS SIMPLE, SEGURO\nY ORDENADO EL USO DE LOS ESPACIOS.`;

  function typeWriter(element, text, delay = 50, callback) {
    let i = 0;
    element.innerHTML = ""; // <-- Limpia contenido antes de empezar
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

  function animateCycle() {
    const titleEl = document.getElementById("typewriter-title");
    const paraEl = document.getElementById("typewriter-paragraph");

    // Oculta y mueve fuera de vista
    titleEl.classList.add("opacity-0", "translate-x-10");
    paraEl.classList.add("opacity-0", "translate-x-10");

    // Espera a que se apliquen clases y luego inicia
    setTimeout(() => {
      titleEl.classList.remove("opacity-0", "translate-x-10");
      paraEl.classList.remove("opacity-0", "translate-x-10");

      // Limpia contenido justo antes de escribir
      titleEl.innerHTML = "";
      paraEl.innerHTML = "";

      typeWriter(titleEl, titleText, 50, () => {
        typeWriter(paraEl, paragraphText, 30);
      });
    }, 300); // Delay corto para evitar glitch visual
  }

  // Espera 3 segundos al cargar y repite cada 4s
  setTimeout(() => {
    animateCycle();
    setInterval(animateCycle, 12000);
  }, 1000);


//   Sección 2
function setupObserver(id, initialClass, finalClass) {
    const element = document.getElementById(id);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.remove('opacity-0', initialClass);
      } else {
        element.classList.add('opacity-0', initialClass);
      }
    }, {
      threshold: 0.3,
    });

    observer.observe(element);
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupObserver('anim-left', '-translate-x-10');
    setupObserver('anim-right', 'translate-x-10');
  });


// mapa 
const canvas = document.getElementById('linesCanvas');
        const ctx = canvas.getContext('2d');
        const chileMap = document.getElementById('chileMap');
        const mainNetworkSection = document.getElementById('main-network-section');
        const regionBoxes = {
            'Valparaíso': document.getElementById('valparaiso-box'),
            'Metropolitana': document.getElementById('metropolitana-box'),
            'O\'Higgins': document.getElementById('ohiggins-box'),
            'Araucanía': document.getElementById('araucania-box')
        };
        const mapRegions = {
            'Valparaíso': document.getElementById('path-valparaiso'),
            'Metropolitana': document.getElementById('path-metropolitana'),
            'O\'Higgins': document.getElementById('path-ohiggins'),
            'Araucanía': document.getElementById('path-araucania')
        };
        function drawConnectingLines() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = mainNetworkSection.offsetWidth;
            canvas.height = mainNetworkSection.offsetHeight;
            ctx.strokeStyle = '#60a5fa'; 
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            const sectionRect = mainNetworkSection.getBoundingClientRect();
            for (const regionName in regionBoxes) {
                const box = regionBoxes[regionName];
                const mapPath = mapRegions[regionName];
                if (box && mapPath) {
                    const boxRect = box.getBoundingClientRect();
                    const startX = (boxRect.right) - sectionRect.left;
                    const startY = (boxRect.top + boxRect.height / 2) - sectionRect.top;
                    const pathBBox = mapPath.getBBox();
                    const svgPoint = chileMap.createSVGPoint();
                    svgPoint.x = pathBBox.x; 
                    svgPoint.y = pathBBox.y + pathBBox.height / 2; 
                    const ctm = chileMap.getScreenCTM();
                    const screenPoint = svgPoint.matrixTransform(ctm);
                    const endX = screenPoint.x - sectionRect.left;
                    const endY = screenPoint.y - sectionRect.top;
                    ctx.beginPath();
                    ctx.moveTo(startX, startY);
                    const controlX1 = startX + 100; 
                    const controlY1 = startY;
                    const controlX2 = endX - 100; 
                    const controlY2 = endY;
                    ctx.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, endX, endY);
                    ctx.stroke();
                }
            }
        }
        function setupHoverEffects() {
            for (const regionName in regionBoxes) {
                const box = regionBoxes[regionName];
                const mapPath = mapRegions[regionName];

                if (box && mapPath) {
                    box.addEventListener('mouseenter', () => {
                        mapPath.classList.add('hover-active');
                    });
                    box.addEventListener('mouseleave', () => {
                        mapPath.classList.remove('hover-active');
                    });

                    mapPath.addEventListener('mouseenter', () => {
                        box.classList.add('hover-active');
                    });
                    mapPath.addEventListener('mouseleave', () => {
                        box.classList.remove('hover-active');
                    });
                }
            }
        }
        window.addEventListener('load', () => {
            drawConnectingLines();
            setupHoverEffects();
        });
        window.addEventListener('resize', drawConnectingLines);
  