import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';
import styled, { css } from 'styled-components'

const Navbar = () => {
    const [loginCheck, setLoginCheck] = useState(false);

    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };

    useEffect(() => {
        console.log(loginCheck);
        checkLogin();
    }, [loginCheck]);

    const Button = styled.button<{ primary: boolean }>`
      background: transparent;
  border-radius: 3px;
  border: 2px solid #BF4F74;
  color: #BF4F74;
  margin: 0.5em 1em;
  padding: 0.25em 1em;

`;
  // ${props => props.$primary && css`
  //   background: #BF4F74;
  //   color: white;
  // `}

const Container = styled.div`
position: fixed;
  top: 0;
  left: 0;
  width: 100%;
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
  font-size: 1.5rem;
  font-weight: bold;
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

    return (

        <Container>
            <Logo>
                <Link to="/">Snippet</Link>
            </Logo>
            <div>
                {!loginCheck ? (
                    <div>
                        <NavLinks>
                            <Link to="/login">Login/Sign Up</Link>
                        </NavLinks>
                    </div>
                ) : (

                    <>
                        <Button>
                            <NavLinks to="/">Home</NavLinks>
                            </Button>
                        <Button
                            onClick={() => {
                                auth.logout();
                            }}
                        >
                            Logout
                        </Button>
                    </>
                )}
            </div>
        </Container>
    );
};

export default Navbar;
