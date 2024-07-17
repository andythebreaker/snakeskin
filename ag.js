function addGridToSvg(svgId, gridSize) {
    const svg = document.getElementsByClassName(svgId)[0];
    if (!svg) {
        console.error(`SVG element with id "${svgId}" not found`);
        return;
    }

    const width = svg.getAttribute('width');
    const height = svg.getAttribute('height');

    // Create a grid pattern
    const pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
    pattern.setAttribute('id', 'grid-pattern');
    pattern.setAttribute('width', gridSize);
    pattern.setAttribute('height', gridSize);
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');

    // Create grid lines
    const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line1.setAttribute('x1', 0);
    line1.setAttribute('y1', 0);
    line1.setAttribute('x2', gridSize);
    line1.setAttribute('y2', 0);
    line1.setAttribute('stroke', '#ccc');
    line1.setAttribute('stroke-width', 1);

    const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line2.setAttribute('x1', 0);
    line2.setAttribute('y1', 0);
    line2.setAttribute('x2', 0);
    line2.setAttribute('y2', gridSize);
    line2.setAttribute('stroke', '#ccc');
    line2.setAttribute('stroke-width', 1);

    pattern.appendChild(line1);
    pattern.appendChild(line2);

    // Append pattern to defs
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.appendChild(pattern);
    svg.appendChild(defs);

    // Create a rect to use the pattern
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute('width', '100%');
    rect.setAttribute('height', '100%');
    rect.setAttribute('fill', 'url(#grid-pattern)');

    // Append rect to SVG
    svg.appendChild(rect);
}

    addGridToSvg('main-svg', 50);