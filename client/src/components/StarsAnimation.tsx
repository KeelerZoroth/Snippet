import { useEffect } from "react";

const StarsAnimation = () => {
    useEffect(() => {
        const canvas = document.getElementById("starsCanvas") as HTMLCanvasElement;
        if (!canvas) return;  // Ensure canvas exists
        const ctx = canvas.getContext("2d");
        if (!ctx) return;  // Ensure context exists

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const meteors: { x: number; y: number; speed: number; size: number }[] = [];

        function createMeteor() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height * 0.5,
                speed: Math.random() * 4 + 2,
                size: Math.random() * 2 + 0.5
            };
        }

        for (let i = 0; i < 10; i++) {
            meteors.push(createMeteor());
        }

        function drawMeteors() {
            if (!ctx) return; // Ensure context is valid before using it

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "white";
            ctx.shadowBlur = 15;
            ctx.shadowColor = "white";

            meteors.forEach(meteor => {
                ctx.beginPath();
                ctx.arc(meteor.x, meteor.y, meteor.size, 0, Math.PI * 2);
                ctx.fill();
                meteor.x -= meteor.speed * 1.5;
                meteor.y += meteor.speed;

                if (meteor.x < 0 || meteor.y > canvas.height) {
                    meteor.x = Math.random() * canvas.width;
                    meteor.y = Math.random() * canvas.height * 0.5;
                }
            });

            requestAnimationFrame(drawMeteors);
        }

        drawMeteors();
    }, []);

    return <canvas id="starsCanvas" className="stars-canvas"></canvas>;
};

export default StarsAnimation;
