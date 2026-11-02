// Keep the site's desktop composition proportionally scaled as the viewport narrows.
function updatePageScale() {
    const designWidth = 1440;
    const scale = Math.min(1, Math.max(0.25, window.innerWidth / designWidth));
    document.documentElement.style.setProperty('--page-scale', scale);
}



document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');

    if (!cursor) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'cursor-trail-canvas';
    document.body.appendChild(canvas);

    const context = canvas.getContext('2d');
    const points = [];
    const dpr = window.devicePixelRatio || 1;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let started = false;

    function resizeCanvas() {
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;

        if (!started) {
            currentX = mouseX;
            currentY = mouseY;
            started = true;
        }
    });

    function animate() {
        if (started) {
            currentX += (mouseX - currentX) * 0.45;
            currentY += (mouseY - currentY) * 0.45;

            const cursorSize = cursor.offsetWidth;
            cursor.style.transform =
                `translate3d(${currentX - cursorSize / 2}px, ${currentY - cursorSize / 2}px, 0)`;

            points.unshift({
                x: currentX,
                y: currentY,
                life: 1
            });

            if (points.length > 30) {
                points.pop();
            }
        }

        context.clearRect(0, 0, window.innerWidth, window.innerHeight);

       for (let i = points.length - 1; i >= 1; i--) {
            const point = points[i];
            const progress = i / points.length;
            const size = 16 * (1 - progress);
            const opacity = 0.03 * (1 - progress);

            const gradient = context.createRadialGradient(
                point.x,
                point.y,
                0,
                point.x,
                point.y,
                size
            );

            gradient.addColorStop(0, `rgba(255, 190, 235, ${opacity})`);
            gradient.addColorStop(0., 'rgba(252, 247, 252, 0.08)');

            context.fillStyle = gradient;
            context.beginPath();
            context.arc(point.x, point.y, size, 0, Math.PI * 2);
            context.fill();
        }

        requestAnimationFrame(animate);
    }

    animate();
});