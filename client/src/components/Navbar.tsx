import { Link, useNavigate } from "react-router-dom";
import auth from "../utils/auth";
import styled from "styled-components";
import TempSnippetLogo from "/TempSnippetLogo.png";

const Button = styled.button`
  background: transparent;
  border-radius: 5px;
  border: 2px solid #646CFF;
  color: #CF7FD4;
  padding: 0.25em 0.75em;
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: #333;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(235, 15, 15, 0.1);
  z-index: 1000;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;

  img {
    width: 20px;
    height: auto;
    margin-right: 10px;
  }

  a {
    color: white;
    text-decoration: none;
  }
`;

const GlitchText = styled.span`
  position: relative;
  display: inline-block;
  font-family: "Press Start 2P", cursive;
  color: #646CFF;
  text-shadow: 0px 0px 5px rgba(100, 108, 255, 0.8);

  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    animation: glitch-animation 2s infinite;
  }

  &::before {
    color: #FF00FF;
    clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
    animation: glitch-animation 1.5s infinite;
  }

  &::after {
    color: #00FFFF;
    clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
    animation: glitch-animation-reverse 1.5s infinite;
  }

  @keyframes glitch-animation {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translate(-3px, -3px);
    }
    40% {
      transform: translate(3px, 3px);
    }
    60% {
      transform: translate(-3px, 3px);
    }
    80% {
      transform: translate(3px, -3px);
    }
    100% {
      transform: translate(0);
    }
  }

  @keyframes glitch-animation-reverse {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translate(3px, -3px);
    }
    40% {
      transform: translate(-3px, 3px);
    }
    60% {
      transform: translate(3px, 3px);
    }
    80% {
      transform: translate(-3px, -3px);
    }
    100% {
      transform: translate(0);
    }
  }
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;

  li {
    a {
      color: white;
      text-decoration: none;
      font-size: 1rem;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginLogout = () => {
    if (auth.loggedIn()) {
      auth.logout();
    }
    navigate("/login");
  };

  return (
    <Container>
      <Logo>
        <img src={TempSnippetLogo} alt="Logo" />
        <Link to="/">
          <GlitchText data-text="Snippet">Snippet</GlitchText>
        </Link>
      </Logo>
      <NavLinks>
        <Button onClick={handleLoginLogout}>
          {auth.loggedIn() ? "Logout" : "Login"}
        </Button>
      </NavLinks>
    </Container>
  );
};

export default Navbar;
