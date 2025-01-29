
// import { useState } from "react";
import styled from 'styled-components'
import auth from '../utils/auth';
// import { Link } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import SnippetPost from "../components/SnippetPost";
import { SnippetPostData } from "../interfaces/SnippetPostData";
import { QUERY_SNIPPETS } from "../utils/queries";
import { useQuery} from "@apollo/client";


const Home = () => {
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
  min-height: calc(100vh - 60px);
  background-color: #DDDDDD;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
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
`;

    const SnippetCard = styled.div`
  background: #444444;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  max-width: 400px;
  transition: transform 0.3s ease-in-out;
  display: flex;
  justify-content: center;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

    const Button = styled.button<{ primary?: boolean }>`
    background: transparent;
    border-radius: 3px;
    border: 2px solid #BF4F74;
    color: #BF4F74;
    margin: 0.5em 1em;
    padding: 0.25em 1em;
    `

    return (
        <Container>
            {auth.loggedIn() ? (
                <>
                    <Header>Check out some snippets below!</Header>
                    <Button>Add Snippet</Button>
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
