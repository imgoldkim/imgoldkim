// Cursor-based background movement
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    console.log('Cursor background script loaded!');

    // Keep main page text static: disable background parallax on main page
    if (body.classList.contains('main-bg') || body.classList.contains('info-bg')) {
        return; // do not alter background position on the main page or info page
    }

    document.addEventListener('mousemove', function(e) {
        // Calculate mouse position as percentage of window
        const xPercent = (e.clientX / window.innerWidth) * 100;
        const yPercent = (e.clientY / window.innerHeight) * 100;

        // Move background in SAME direction as cursor (inverted parallax)
        const bgX = 50 - (xPercent - 50) * 1.5;
        const bgY = 50 - (yPercent - 50) * 1.5;

        body.style.backgroundPosition = `${bgX}% ${bgY}%`;
    });
});
