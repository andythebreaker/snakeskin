function ard(varx,vary){
// Select the g element with class "sankey"
const sankeyGroup = document.querySelector('g.sankey');

// Create a new circle element
const redDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

// Set the attributes for the circle (red dot)
redDot.setAttribute('cx', varx);
redDot.setAttribute('cy', vary);
redDot.setAttribute('r', 5); // Radius of the dot
redDot.setAttribute('fill', 'red');

// Append the circle to the sankey group
sankeyGroup.appendChild(redDot);}