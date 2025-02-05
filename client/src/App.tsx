import { Outlet } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import backgroundImg from './assets/pictures/7.jpg'

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct the authentication link
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create the Apollo Client
const client = new ApolloClient({
  uri: '/graphql',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {

  const styles: {[key: string]: React.CSSProperties} = {
    main: {
      padding: "80px 0px 60px 0px",
      // backgroundColor: '#DCDCF5',
      width: "100%",
      position: "absolute",
      top: "0",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      flexGrow: "1",
      overflowY: "auto"
    },
    backgroundImgDiv: {
      position: "fixed",
      top: "0",
      backgroundImage: `url(${backgroundImg})`, 
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "100%",
      width: "100%",
      zIndex: "-100",
    }
  }


  return (
    <> 
      <div style={styles.backgroundImgDiv}/>
      <ApolloProvider client={client}>
        <Navbar />
        <main className='container pt-5' style={styles.main}>
          <Outlet />
        </main>
        <Footer />
      </ApolloProvider>
    </>
  );
}
export default App
