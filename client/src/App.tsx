import { Outlet } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


const httpLink = createHttpLink({
  uri: '/graphql',
});


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  uri: '/graphql',
  link: authLink.concat(httpLink),
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
