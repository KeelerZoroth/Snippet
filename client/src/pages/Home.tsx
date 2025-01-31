
import styled from 'styled-components'
import auth from '../utils/auth';
import { Link } from "react-router-dom";
import SnippetPost from "../components/SnippetPost";
import { SnippetPostData } from "../interfaces/SnippetPostData";
import { QUERY_SNIPPETS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { ObjectId } from 'mongoose'
import { SearchBar } from '../components/SearchBar';


const Home = () => {

    const { loading, data, refetch } = useQuery(QUERY_SNIPPETS);

    const handleSnippetDelete = (deletedSnippetId: ObjectId) => {
        // If the backend removes the snippet, Apollo Client will update the cache automatically
        console.log(`Deleted snippet ID: ${deletedSnippetId}`);
    };


    const Container = styled.div`
  margin-top: 60px;
  width: 80%;
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
  justify-content: space-around;
  gap: 20px;
  margin: 20px;
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
            <SearchBar {...{refetchQuery: refetch}}/>
            <Header>Check out some snippets below!</Header>
            {auth.loggedIn() && (<MakeSnippet>
                <Link to="/scan-snippet">Add Snippet</Link>
            </MakeSnippet>)}
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
