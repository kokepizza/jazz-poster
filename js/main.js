// Store original transforms for each element
const originalTransforms = {};

// Function to handle element movement
function dragMoveListener(event) {
  const target = event.target;
  
  // Get the data-x/data-y attributes, or initialize to 0 if they don't exist
  const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
  const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
  
  // Get the original transform if it exists
  const originalTransform = originalTransforms[target.className] || '';
  
  // Update the element's position by combining translation with original transform
  target.style.transform = `translate(${x}px, ${y}px) ${originalTransform}`;
  
  // Update the position attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get all draggable elements (now including location and date-box)
  const draggableElements = document.querySelectorAll('.musician, .shape, .location, .date-box');
  
  // Store original transforms and initialize data attributes
  draggableElements.forEach(element => {
    const computedStyle = window.getComputedStyle(element);
    let transform = computedStyle.transform;
    
    // If the element has a transform that's not 'none' and not a translation
    if (transform && transform !== 'none' && !transform.includes('translate')) {
      // Store the original transform
      originalTransforms[element.className] = transform;
      
      // Initialize data-x and data-y attributes
      element.setAttribute('data-x', 0);
      element.setAttribute('data-y', 0);
    }
  });
  
  // Make elements draggable with interact.js (now including location and date-box)
  interact('.musician, .shape, .location, .date-box').draggable({
    // Enable inertia for the draggable elements
    inertia: true,
    
    // Keep the element within the area of its parent
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: '#poster',
        endOnly: true
      })
    ],
    
    // Call this function on every dragmove event
    listeners: {
      move: dragMoveListener
    },
    
    // Set cursor style while dragging
    cursorChecker: () => 'grabbing'
  });
});