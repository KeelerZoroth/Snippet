import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import './assets/styles/index.css'
import './assets/styles/App.css'

import App from './App.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import ScanSnippet from './pages/ScanSnippet.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import SignUp from './pages/Signup.tsx';

// main entry point for the React application
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/scan-snippet',
        element: <ScanSnippet />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
    ]
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}