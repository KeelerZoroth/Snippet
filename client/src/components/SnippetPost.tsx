import auth from "../utils/auth";
import styled from 'styled-components';
import { REMOVE_SNIPPET } from '../utils/mutations';
import { useMutation } from "@apollo/client";
import { SnippetPostData } from "../interfaces/SnippetPostData";
import { QUERY_SNIPPETS } from "../utils/queries";

// styled components
const Card = styled.div`
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    max-width: 300px;
    text-align: center;
    transition: transform 0.3s ease-in-out;
    background: white;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    @media screen and (max-width: 490px){
        display: flex;
        flex-direction: column;
    }
`;

const CardTitle = styled.h2`
    color: #666;
`
const CardSubblock = styled.div`
    display: flex;
    justify-content: space-around;
`

const CardSummary = styled.p`
    font-size: 1rem;
    color: #666;
    padding: 0.5rem;

    @media screen and (max-width:490px){
        display: none;
    }
`
const CardLanguage = styled.p`
    font-size: 1rem;
    color: #666;
    padding: 0.5rem;
`;
const CardAuthor = styled.p`
     font-size: 1rem;
     color: #666;
     padding: 0.5rem;
     `;


const CodeBlock = styled.p`
     font-size: 1rem;
     color: #FFF;
     background: #666;
     padding: 0.5rem;
     border-width: 1px;
     border-style: solid;
     border-color: #333333;
     text-align: left;
     `;
const P = styled.p`
    font-size: 1rem;
    color: #666;
    padding: 0.5rem;
`

const Button = styled.button<{ primary?: boolean }>`
      `
// SnippetPost component that displays a single snippet post
const SnippetPost = ({ _id, text, title, summary, language, author }: SnippetPostData) => {

    const [deleteSnippetPost, { data, loading, error }] = useMutation(REMOVE_SNIPPET, {refetchQueries:[QUERY_SNIPPETS]});

    const deleteSnippet = async () => {
        try {
            await deleteSnippetPost({
                variables: {
                    snippetId: _id
                }
            });
        } catch (error) {
            console.error(error);
        }
    }





    return (
        <Card>
            <CardTitle>{title}</CardTitle>
            <CodeBlock>{text}</CodeBlock>
            <CardSummary>{summary}</CardSummary>
            <CardSubblock>
                <CardLanguage>{language}</CardLanguage>
                <CardAuthor>{author}</CardAuthor>
            </CardSubblock>
            {auth.loggedIn() && auth.getProfile().data.username === author ? 
            loading ? <P>Loading...</P> :
            error ? <P>{error.message}</P> :
            data ? <P>deleted</P> :
            <Button onClick={deleteSnippet}>Delete</Button> :
             <span></span>}
        </Card>
    )

}

export default SnippetPost;
