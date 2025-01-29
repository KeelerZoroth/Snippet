import { useEffect, useRef } from "react";
import "../assets/styles/login.css";
import HoloFace from "../pages/HoloFace"; 

const speak = (message: string) => {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
};

const Login = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        speak("Welcome to the login page");
        
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!canvas || !ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const stars = Array.from({ length: 100 }, () => ({
            x: Math.random() * (canvas?.width || window.innerWidth),
            y: Math.random() * (canvas?.height || window.innerHeight),
            radius: Math.random() * 2,
            speed: Math.random() * 0.5 + 0.2,
        }));

        const meteors: { x: number; y: number; length: number; speed: number }[] = [];

        function createMeteor() {
            meteors.push({
                x: Math.random() * (canvas?.width || window.innerWidth),
                y: 0,
                length: Math.random() * 50 + 50,
                speed: Math.random() * 5 + 2,
            });
        }

        function animate() {
            if (!ctx) return;
            if (canvas) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }

            ctx.fillStyle = "white";
            stars.forEach((star) => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();
                star.y += star.speed;
                if (canvas && star.y > canvas.height) {
                    star.y = 0;
                    star.x = Math.random() * (canvas?.width || window.innerWidth);
                }
            });

            meteors.forEach((meteor, index) => {
                ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(meteor.x, meteor.y);
                ctx.lineTo(meteor.x - meteor.length, meteor.y + meteor.length);
                ctx.stroke();

                meteor.y += meteor.speed;
                meteor.x -= meteor.speed;

                if (canvas && meteor.y > canvas.height) {
                    meteors.splice(index, 1);
                }
            });

            requestAnimationFrame(animate);
        }

        setInterval(createMeteor, 2000);
        animate();

        return () => {
            meteors.length = 0;
        };
    }, []);

    return (
        <div className="login-container">
            <canvas ref={canvasRef} className="stars-canvas"></canvas>
            <div className="parallax-layer"></div>
            <div className="login-box">
                <HoloFace />
                <h1>Login</h1>
                <input type="text" placeholder="Username" onFocus={() => speak("Enter your username")} />
                <input type="password" placeholder="Password" onFocus={() => speak("Enter your password")} />
                <button className="login-button" onClick={() => speak("Logging in...")}>Login</button>
            </div>
        </div>
    );
};

export default Login;
