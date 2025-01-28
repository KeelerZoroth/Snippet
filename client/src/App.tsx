import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css'

function App() {

  return (
    <div>
      <Navbar />
      <div style={{ backgroundColor: '#DCDCF5' }}>
        <main className='container pt-5' style={{ backgroundColor: '#DCDCF5' }}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
export default App
