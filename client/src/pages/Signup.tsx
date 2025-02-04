import { useState, useEffect, useRef } from "react";
import "../assets/styles/signup.css";
import HoloRedFace from "../components/HoloRedFace";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { useNavigate } from "react-router-dom";

let cachedVoice: SpeechSynthesisVoice | null = null;

const preloadVoices = () => {
  const voices = window.speechSynthesis.getVoices();
  if (voices.length) {
    cachedVoice = voices.find((voice) =>
      voice.name.toLowerCase().includes("female")
    ) || voices[0];
  } else {
    window.speechSynthesis.onvoiceschanged = () => {
      const loadedVoices = window.speechSynthesis.getVoices();
      cachedVoice = loadedVoices.find((voice) =>
        voice.name.toLowerCase().includes("female")
      ) || loadedVoices[0];
    };
  }
};

const Signup = () => {
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isVoiceEnabled, setIsVoiceEnabled] = useState<boolean>(() => {
    return localStorage.getItem("voiceEnabled") === "true"; // saves settings for ai voice in local storage
  }); // Control AI voice
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [addUser] = useMutation(ADD_USER);
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    preloadVoices();
    if (isVoiceEnabled) {
      setTimeout(() => speak("Welcome to the signup page"), 100);
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2,
      speed: Math.random() * 0.5 + 0.2,
    }));

    const meteors: { x: number; y: number; length: number; speed: number }[] = [];

    function createMeteor() {
      meteors.push({
        x: Math.random() * (canvas?.width || 0),
        y: 0,
        length: Math.random() * 50 + 50,
        speed: Math.random() * 5 + 2,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "white";
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * (canvas?.width || 0);
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

        if (meteor.y > canvas.height) {
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
  }, [isVoiceEnabled]);

  const speak = (message: string) => {
    if (!isVoiceEnabled || !cachedVoice) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.voice = cachedVoice;
    utterance.pitch = 1.2;
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    speak("Signing you up...");

    if (userFormData.password !== userFormData.confirmPassword) {
      speak("Passwords do not match");
      setErrorMessage("Passwords do not match");
      return;
    }

    

    try {
      const { data } = await addUser({
        variables: {
          input: {
            username: userFormData.username,
            email: userFormData.email,
            password: userFormData.password,
          },
        },
      });

      if (!data) throw new Error("Something went wrong!");

      const { token } = data.addUser;
      localStorage.setItem("auth_token", token);

      speak("Signup successful");
      setTimeout(() => navigate("/"), 1000);

      setUserFormData({ username: "", email: "", password: "", confirmPassword: "" });
      setErrorMessage(null);
    } catch (err) {
      console.error(err);
      speak("Signup failed");
      setErrorMessage("Signup failed. Please try again.");
    }
  };

  const toggleVoice = () => {
    const newVoiceState = !isVoiceEnabled;
    setIsVoiceEnabled(newVoiceState);
    localStorage.setItem("voiceEnabled", JSON.stringify(newVoiceState)); // Save setting
  };

  return (
    <div className="signup-container">
      <canvas ref={canvasRef} className="stars-canvas"></canvas>

      {/* AI Voice Toggle Button */}
      <div className="voice-toggle">
        <label>
          <input
            type="checkbox"
            checked={isVoiceEnabled}
            onChange={toggleVoice}
          />
          {isVoiceEnabled ? "Disable AI Voice" : "Enable AI Voice"}
        </label>
      </div>

      <div className="signup-box">
        <HoloRedFace />
        <h1>Signup</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={userFormData.username}
            onChange={handleInputChange}
            required
            onFocus={() => speak("Enter your username")}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userFormData.email}
            onChange={handleInputChange}
            required
            onFocus={() => speak("Enter your email")}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userFormData.password}
            onChange={handleInputChange}
            required
            onFocus={() => speak("Enter your password")}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={userFormData.confirmPassword}
            onChange={handleInputChange}
            required
            onFocus={() => speak("Confirm your password")}
          />

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button
            type="submit"
            disabled={
              !(
                userFormData.username &&
                userFormData.email &&
                userFormData.password &&
                userFormData.confirmPassword
              )
            }
            className="signup-button"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
