const radiusOutput = document.getElementById('radius');
const areaOutput = document.getElementById('area'); // Fixed the selector

let area = 0; // Changed from const to let
const PI = 3.14159;

let radius = 10; // Changed from const to let
area = PI * radius * radius;

radiusOutput.textContent = radius; // Fixed assignment
areaOutput.textContent = area; // Fixed assignment

radius = 20; // Now valid since radius is declared with let
area = PI * radius * radius;

radiusOutput.textContent = radius; 
areaOutput.textContent = area;