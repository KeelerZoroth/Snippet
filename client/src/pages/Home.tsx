import { useState, useEffect, useLayoutEffect } from "react";
import styled, { css } from 'styled-components'
import auth from '../utils/auth';
import { Link } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import SnippetPost from "../components/SnippetPost";
import { SnippetPostData } from "../interfaces/SnippetPostData";

const Home = () => {
    const [ snippetPosts, setSnippetPosts ] = useState<SnippetPostData[]>([]);
    const [error] = useState(false);

    const handleSnippetDelete = (deletedSnippetId: number) => {
        setSnippetPosts((prevPosts) => prevPosts.filter((snippetPost) => snippetPost.id !== deletedSnippetId));
    };
    if (error) {
        return <ErrorPage />;
    }




    const Container = styled.div`
margin-top: 60px; /* Adjust to match the height of the navbar */
  padding: 1rem;
  min-height: calc(100vh - 60px); /* Ensure it fits the viewport minus the navbar */
  background-color: #f4f4f4;
`;

    const Header = styled.h1`
    
    `

    const PostDiv = styled.div`

    `

    return (
        <Container>
            <Header>Some Code on the Front Page</Header>
            <PostDiv>
            {snippetPosts.map((snippetPost) => (
                <SnippetPost key={snippetPost.id} {...snippetPost} 
                    onDelete={handleSnippetDelete}/>
             ))}
            </PostDiv>
           
            </Container>
        )
}

export default Home;