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
    const canvas = document.getElementById('linesCanvas');
    const ctx = canvas.getContext('2d');
    const mainNetworkSection = document.getElementById('main-network-section'); // Asegúrate de que esto esté definido o pásalo como argumento
    const chileMap = document.getElementById('chileMap'); // Asegúrate de que esto esté definido o pásalo como argumento


    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = mainNetworkSection.offsetWidth;
    canvas.height = mainNetworkSection.offsetHeight;

    // ESTILOS DE LÍNEA PREDETERMINADOS (para las líneas de conexión)
    ctx.strokeStyle = '#33CCFF'; // Color azul para las líneas
    ctx.lineWidth = 2; // Grosor de 2px para las líneas
    ctx.lineCap = 'round'; // Estilo de punta para las líneas (puedes ajustar)
    // ctx.setLineDash([5, 5]); // Estilo de línea punteada

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
            svgPoint.y = pathBBox.y + pathBBox.height / 5;

            const ctm = chileMap.getScreenCTM();
            const screenPoint = svgPoint.matrixTransform(ctm);

            const endX = screenPoint.x - sectionRect.left;
            const endY = screenPoint.y - sectionRect.top;

            // Dibuja la línea
            ctx.beginPath();
            ctx.moveTo(startX, startY);

            // Usa los estilos de línea predeterminados que definimos al inicio de la función
            ctx.lineTo(startX + (endX - startX) * 0.1, startY);
            ctx.lineTo(startX + (endX - startX) * 0.7, endY);
            ctx.lineTo(endX, endY);

            ctx.stroke(); // Aplica el trazo a la línea con los estilos de línea actuales

            // --- INICIO: SECCIÓN DEL CÍRCULO ---
            ctx.save(); // *** GUARDA EL ESTADO ACTUAL DEL CONTEXTO (incluyendo estilos de línea y relleno) ***

            ctx.beginPath(); // Inicia un nuevo camino para el círculo
            ctx.arc(endX, endY, 5, 0, Math.PI * 2); // Dibuja el círculo

            // ESTILOS ESPECÍFICOS PARA EL CÍRCULO
            ctx.fillStyle = '#C7E4EE'; // Color de relleno del círculo
            ctx.strokeStyle = '#FFFFFF'; // Color del borde (blanco)
            ctx.lineWidth = 1; // Grosor del borde (1 píxel)

            ctx.fill(); // Rellena el círculo
            ctx.stroke(); // Dibuja el borde del círculo

            ctx.restore(); // *** RESTAURA EL ESTADO ANTERIOR DEL CONTEXTO ***
            // Esto revierte los estilos a los que estaban antes de ctx.save(),
            // asegurando que la próxima línea use los estilos predeterminados.
            // --- FIN: SECCIÓN DEL CÍRCULO ---
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

// Ejecutar al cargar la página
window.addEventListener('load', () => {
    drawConnectingLines();
    setupHoverEffects();
});

// Redibujar las líneas al redimensionar la ventana
window.addEventListener('resize', drawConnectingLines);

// Opcional: Si el mapa SVG o las cajas se cargan o renderizan de forma asíncrona,
// podrías necesitar un pequeño retardo o un MutationObserver para asegurarte de que los elementos estén renderizados.
// Por ejemplo, para dar tiempo a que Tailwind CSS aplique sus estilos y los elementos tomen su tamaño final.
// window.addEventListener('load', () => {
//     setTimeout(() => {
//         drawConnectingLines();
//         setupHoverEffects();
//     }, 100); // Pequeño retardo
// });
