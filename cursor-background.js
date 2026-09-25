// Keep the site's desktop composition proportionally scaled as the viewport narrows.
function updatePageScale() {
    const designWidth = 1440;
    const scale = Math.min(1, Math.max(0.25, window.innerWidth / designWidth));
    document.documentElement.style.setProperty('--page-scale', scale);
}

updatePageScale();
window.addEventListener('resize', updatePageScale);

// Cursor-based background movement
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    body.classList.add('proportional-layout');
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
