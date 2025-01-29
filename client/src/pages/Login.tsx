
import { useEffect, useRef } from "react";
import "../assets/styles/login.css";
import HoloFace from "../pages/HoloFace"; 

import type { ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';


import Auth from '../utils/auth';
import type { User } from '../models/User';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';
        
        
        
const speak = (message: string) => {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
};

const Login = () => {
   
    
    
    
    const [userFormData, setUserFormData] = useState<User>({
    username: '',
    password: '',
  });
  const [showAlert, setShowAlert] = useState(false);


  const [loginUser] = useMutation(LOGIN_USER);

  const navigate = useNavigate();



  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { data } = await loginUser({
        variables: {
          username: userFormData.username,
          password: userFormData.password
        }
      });

      if (!data) {
        throw new Error('Something went wrong!');
      }

      const { token } = data.login;
      Auth.login(token);
      
      navigate("/")
      
      setUserFormData({
        username: '',
        password: '',
      });
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    
  };
    
    
    
    
    
    
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
                <form onSubmit={handleFormSubmit}>
                  <input
                    type="text"
                    name="username"
                    onChange={handleInputChange}
                    value={userFormData.username}
                    required
                    placeholder="Username"
                    onFocus={() => speak("Enter your username")} 
                   />
                  {showAlert && (
                    <Feedback>Username is required!</Feedback>
                  )}
                  <input 
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                    value={userFormData.password}
                    required
                    placeholder="Password"
                    onFocus={() => speak("Enter your password")} 
                   />
                  {showAlert && (
                      <Feedback>Password is required!</Feedback>
                    )}
                  <button 
                    type="submit"
                    disabled={!(userFormData.username && userFormData.password)}
                    className="login-button" 
                    onClick={() => speak("Logging in...")}>
                      Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
