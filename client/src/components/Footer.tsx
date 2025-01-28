import styled from 'styled-components'

const Container = styled.div`
position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const FooterText = styled.div`
  font-size: 1rem;
`;

const Footer = () => {
    return (
        <Container>
            <FooterText>© 2025 My Sick Website. All rights reserved. 😎</FooterText>
        </Container>
    )
}

export default Footer