import { useEffect, useRef } from "react";
import HoloFace from "../components/HoloFace";
import HoloRedFace from "../components/HoloRedFace";
import "../assets/styles/home.css";
import { SearchBar } from "../components/SearchBar";
import { useQuery } from "@apollo/client";
import { QUERY_SNIPPETS } from "../utils/queries";
import SnippetPost from "../components/SnippetPost";
import { SnippetPostData } from "../interfaces/SnippetPostData";
import { useNavigate } from "react-router-dom";
import auth from "../utils/auth"; // Import the authentication utility

// Main component for the Home page
const Home = () => {
  const starsRef = useRef<HTMLCanvasElement | null>(null);
  const navigate = useNavigate(); // Initialize navigation

  const { loading, data } = useQuery(QUERY_SNIPPETS);

  useEffect(() => {
    const canvas = starsRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * (canvas?.width || 0),
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
      ctx?.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0);
      if (ctx) ctx.fillStyle = "white";

      stars.forEach((star) => {
        ctx?.beginPath();
        ctx?.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx?.fill();
        star.y += star.speed;
        if (star.y > (canvas?.height || 0)) {
          star.y = 0;
          if (canvas) {
            star.x = Math.random() * (canvas?.width || 0);
          }
        }
      });

      meteors.forEach((meteor, index) => {
        if (ctx) {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(meteor.x, meteor.y);
          ctx.lineTo(meteor.x - meteor.length, meteor.y + meteor.length);
          ctx.stroke();
        }

        meteor.y += meteor.speed;
        meteor.x -= meteor.speed;

        if (meteor.y > (canvas?.height || 0)) {
          meteors.splice(index, 1);
        }
      });

      requestAnimationFrame(animate);
    }

    setInterval(createMeteor, 2000);
    animate();
  }, []);

  // Handle navigation to the ScanSnippet page
  const handleScanSnippetNavigation = () => {
    navigate("/scan-snippet");
  };

  return (
    <div className="background-container">
      <canvas ref={starsRef} className="stars-canvas" />
      <div className="parallax-background" />

      <div className="home-container">
        <div className="spheres-container">
          <HoloFace />
          <HoloRedFace />
        </div>

        <h1 className="snippet-header">Check out some snippets below!</h1>

        <div className="search-bar-container">
          <SearchBar refetchQuery={() => { }} />
        </div>

        {/* Conditionally render the button if the user is logged in */}
        {auth.loggedIn() && (
          <button
            className="scan-snippet-button"
            onClick={handleScanSnippetNavigation}
          >
            Scan Your Own Code Snippet
          </button>
        )}

        <div className="cards-container">
          {loading ? (
            <p>Loading snippets...</p>
          ) : (
            data.snippets.map((snippetPost: SnippetPostData, index: number) => (
              <SnippetPost key={index} {...snippetPost} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
