function findAndFilterSVGNodes(var_str_to_ro_target_name) {
    // Find all <g> elements with class 'sankey-node'
    const nodes = document.querySelectorAll('g.sankey-node');

    // Filter out nodes that include "林于馨" in their innerHTML
    const filteredNodes = Array.from(nodes).filter(node => node.innerHTML.includes(var_str_to_ro_target_name));

    // Array to store object representations of <rect> elements
    let rects = [];

    // Iterate over filtered nodes and find <rect> elements inside
    filteredNodes.forEach(node => {
        const rectElements = node.querySelectorAll('rect');
        rectElements.forEach(rect => {
            // Get width and height of <rect>
            const width = rect.getAttribute('width');
            const height = rect.getAttribute('height');
            // Get x and y position of <rect> relative to the SVG or parent container
            const x = rect.getAttribute('x');
            const y = rect.getAttribute('y');

            // Apply rotation transform of 90 degrees around the center of the <rect>
            //const centerX = parseFloat(x) + parseFloat(width) / 2;
            //const centerY = parseFloat(y) + parseFloat(height) / 2;
            rect.setAttribute('transform', `rotate(-90, 0,0),translate(0,-${height})`);

            // Store information in an object
            rects.push({ width, height, x, y });
        });
    });

    // Return array of objects containing width, height, x, y, and transform of <rect> elements
    return rects;
}
//usage:
//findAndFilterSVGNodes()