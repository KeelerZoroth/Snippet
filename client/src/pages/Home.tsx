
import styled from 'styled-components'
import auth from '../utils/auth';
import { Link } from "react-router-dom";
import SnippetPost from "../components/SnippetPost";
import { SnippetPostData } from "../interfaces/SnippetPostData";
import { QUERY_SNIPPETS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { ObjectId } from 'mongoose'
import { SearchBar } from '../components/SearchBar';
import { useEffect, useState } from 'react';


const Container = styled.div`
  margin-top: 60px;
  width: 80%;
  padding: 1rem;
  min-height: 100vh; /* Ensure it takes the full viewport height */
  background-color: #DDDDDD;
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* Enable scrolling */
  border-radius: 12px; /* Slightly round the corners */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
`;

const Header = styled.h1`
  font-size: 1.8rem;
  color: #333;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start; /* Ensures the height is based on the tallest card */
  gap: 20px;
  margin: 20px;
  flex-grow: 1; /* Allows it to take up remaining space */
  overflow-y: visible; /* Ensures no clipping */
  width: fit-content; /* Adjusts width to fit the content */
  max-width: 100%; /* Prevents it from exceeding parent width */
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

  @media screen and (max-width: 390px){
        position: relative;
        left: -10px
    }
`;

const MakeSnippet = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 0.5;
  padding: 0.5;

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


const Home = () => {

    const { loading, data, refetch } = useQuery(QUERY_SNIPPETS);

    const handleSnippetDelete = (deletedSnippetId: ObjectId) => {
        // If the backend removes the snippet, Apollo Client will update the cache automatically
        console.log(`Deleted snippet ID: ${deletedSnippetId}`);
    };

    const [isLoggedIn, setIsLoggedIn] = useState(auth.loggedIn());

    useEffect(() => {
        const checkAuth = () => setIsLoggedIn(auth.loggedIn());

        window.addEventListener('authChange', checkAuth);
        return () => window.removeEventListener('authChange', checkAuth);
    }, []);

    return (
        <Container>
          {isLoggedIn && (<>
            <MakeSnippet style={{padding: "0", margin: "5px",}}>
                <Link to="/scan-snippet">Scan your own code Snippet</Link>
            </MakeSnippet>
            <p style={{color: "#333333"}}>- or -</p>
            </>
            )}
            <SearchBar {...{refetchQuery: refetch}}/>
            <Header>Check out some snippets below!</Header>
            
            <CardsContainer>
                { loading ? (
                    <div>
                        <p>loading...</p>
                    </div>
                ) : (
                    <>
                    {data.snippets.map((snippetPost: SnippetPostData, indexKey: number) => (
                        <SnippetCard key={indexKey}>
                            <SnippetPost {...snippetPost} onDelete={handleSnippetDelete} />
                        </SnippetCard>
                    ))}
                </>)}
            </CardsContainer>
        </Container>
    );

};

export default Home;
