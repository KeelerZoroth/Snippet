import { type JwtPayload, jwtDecode } from 'jwt-decode';

interface ExtendedJwt extends JwtPayload {
  data:{
    username:string,
    id:string
  }
};

// AuthService class to handle authentication
class AuthService {
  getProfile() {
    return jwtDecode<ExtendedJwt>(this.getToken()); // Decode the token
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // Check if the token is valid
  }

  isTokenExpired(token: string) { // Check if the token is expired
    try {
      const decoded = jwtDecode<JwtPayload>(token);

      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        return true;
      }
    } catch (err) {
        console.error(err)
        return false;
    }
  }

  getToken(): string {
    const loggedUser = localStorage.getItem('id_token') || ''; // Get the token from local storage
    return loggedUser;
  }

  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.dispatchEvent(new Event('authChange')); // Dispatch event for automatic updates to home page
  }

  logout() {
    localStorage.removeItem('id_token');
    window.dispatchEvent(new Event('authChange')); // Dispatch event for automatic updates to home page
  }
}

export default new AuthService();
