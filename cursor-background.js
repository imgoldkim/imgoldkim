// Cursor-based background movement
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    console.log('Cursor background script loaded!');
    
    document.addEventListener('mousemove', function(e) {
        // Calculate mouse position as percentage of window
        const xPercent = (e.clientX / window.innerWidth) * 100;
        const yPercent = (e.clientY / window.innerHeight) * 100;
        
        // Move background in SAME direction as cursor (inverted parallax)
        // Background follows where cursor goes
        const bgX = 50 - (xPercent - 50) * 1.5;
        const bgY = 50 - (yPercent - 50) * 1.5;
        
        body.style.backgroundPosition = `${bgX}% ${bgY}%`;
    });
});
