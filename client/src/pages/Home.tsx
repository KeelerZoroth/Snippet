
// import { useState } from "react";
import styled from 'styled-components'
// import auth from '../utils/auth';
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
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

    const Header = styled.h1`
  font-size: 1.8rem;
  color: #333;
`;

    const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 800px;
  align-items: center;
`;

    const SnippetCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  max-width: 400px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

    return (
        <Container>
            <Header>Some Code on the Front Page</Header>
            <CardsContainer>
                {data.snippets.map((snippetPost: SnippetPostData) => (
                    <SnippetCard key={snippetPost.id}>
                        <SnippetPost {...snippetPost} onDelete={handleSnippetDelete} />
                    </SnippetCard>
                ))}
            </CardsContainer>
        </Container>
    );
};

export default Home;
