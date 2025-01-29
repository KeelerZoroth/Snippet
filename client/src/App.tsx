import { Outlet } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import Navbar from './components/Navbar';
import Footer from './components/Footer';


const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});


function App() {

  const styles: {[key: string]: React.CSSProperties} = {
    main: {
      padding: "70px 0px 60px 0px",
      // backgroundColor: '#DCDCF5',
      width: "100%",
      position: "absolute",
      top: "0",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    }
  }


  return (
    <> 
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
