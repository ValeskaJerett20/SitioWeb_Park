document.addEventListener('DOMContentLoaded', function() {
    // Crear instancia del mapa
    const map = new Datamap({
        element: document.getElementById('chile-map'),
        scope: 'chl',
        setProjection: function(element) {
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