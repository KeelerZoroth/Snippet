
import { useState, useEffect } from "react";
import styled from 'styled-components'
import auth from '../utils/auth';
import { Link } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import SnippetPost from "../components/SnippetPost";
import { SnippetPostData } from "../interfaces/SnippetPostData";
import { QUERY_SNIPPETS } from "../utils/queries";
import { useQuery} from "@apollo/client";


const Home = () => {

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


    const { loading, error, data } = useQuery(QUERY_SNIPPETS);

    if (loading) return <p>Loading snippets...</p>;
    if (error) return <ErrorPage />;

    const handleSnippetDelete = (deletedSnippetId: number) => {
        // If the backend removes the snippet, Apollo Client will update the cache automatically
        console.log(`Deleted snippet ID: ${deletedSnippetId}`);
    };


    const Container = styled.div`
  margin-top: 60px;
  padding: 1rem;
  min-height: 100vh; /* Ensure it takes the full viewport height */
  background-color: #DDDDDD;
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* Enable scrolling */
`;

    const Header = styled.h1`
  font-size: 1.8rem;
  color: #333;
`;

    const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  flex-grow: 1; /* Allows it to take up remaining space */
  overflow-y: visible; /* Make sure it does not clip the content */
`;

    const SnippetCard = styled.div`
  background: #444444;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  min-width: 250px;  /* Ensures a minimum readable size */
  max-width: 100%; /* Prevents it from getting too wide */
  width: auto;  /* Allows the card to expand based on content */
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;  /* Ensures content stacks properly */
  justify-content: center;
  align-items: center;
  word-wrap: break-word; /* Ensures long text wraps properly */

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

    const MakeSnippet = styled.ul`
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
            {loginCheck ? (
                <>
                    <Header>Check out some snippets below!</Header>
                    <MakeSnippet>
                        <Link to="/ScanSnippet">Add Snippet</Link>
                    </MakeSnippet>
                    <CardsContainer>
                        {data.snippets.map((snippetPost: SnippetPostData) => (
                            <SnippetCard key={snippetPost.id}>
                                <SnippetPost {...snippetPost} onDelete={handleSnippetDelete} />
                            </SnippetCard>
                        ))}
                    </CardsContainer>
                </>
            ) : (
                <>
                    <Header>Check out some snippets below! Log in to add your own!</Header>
                    <CardsContainer>
                        {data.snippets.map((snippetPost: SnippetPostData) => (
                            <SnippetCard key={snippetPost.id}>
                                <SnippetPost {...snippetPost} onDelete={handleSnippetDelete} />
                            </SnippetCard>
                        ))}
                    </CardsContainer>
                </>
            )}
        </Container>
    );

};

export default Home;
