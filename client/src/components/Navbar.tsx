// import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../utils/auth';
import styled from 'styled-components'
import TempSnippetLogo from '/TempSnippetLogo.png';


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
  box-sizing: border-box; /* Prevents content overflow */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;

  img {
    width: 20px; /* Adjust width */
    height: auto; /* Maintain aspect ratio */
    margin-right: 10px; /* Space between logo and text */
  }

  a {
    color: #646CFF;
    text-decoration: none;
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
    if(auth.loggedIn()){
      auth.logout();
    }
    navigate("/login");
  };

   
    return (
        <Container>
            <Logo>    
                <Link to="/">
                <img src={TempSnippetLogo} alt="Logo" />
                Snippet
                </Link>
            </Logo>
              <NavLinks>
                <Button onClick={handleLoginLogout}>
                  {auth.loggedIn() ? 'Logout' : 'Login'}
                </Button>
              </NavLinks>
        </Container>
    );
};

export default Navbar;
