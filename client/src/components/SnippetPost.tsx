import auth from "../utils/auth";
// import { Link } from 'react-router-dom';
import { SnippetPostData } from '../interfaces/SnippetPostData';
// import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { REMOVE_SNIPPET } from '../utils/mutations';
import { useMutation } from "@apollo/client";
import { ObjectId } from 'mongoose'

interface SnippetPostProps extends SnippetPostData {
    onDelete: (id: ObjectId) => void;
}

const SnippetPost = ({ id, text, title, summary, language, author, createdAt }: SnippetPostProps) => {

    const [deleteSnippetPost] = useMutation(REMOVE_SNIPPET);

    const deleteSnippet = async () => {
        try {
            await deleteSnippetPost({
                variables: {
                    snippetId: id
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
   


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
`;

    const CardText = styled.p`
     font-size: 1rem;
     color: #666;
     padding: 0.5rem;
     `;

    const CodeBlock = styled.p`
     font-size: 1rem;
     color: #666;
     padding: 0.5rem;
     border-width: 1px;
     border-style: solid;
        border-color: #333333;
     `;

    const Button = styled.button<{ primary?: boolean }>`
      background: transparent;
      `

    return (
        <Card>
            <h2>{title}</h2>
            <CodeBlock>{text}</CodeBlock>
            <CardText>{summary}</CardText>
            <CardText>{language}</CardText>
            <CardText>{author}</CardText>
            <CardText>{createdAt}</CardText>
            {auth.loggedIn() && auth.getProfile().data.username === author ? <Button onClick={deleteSnippet}>Delete</Button> : <span></span> }
        </Card>
    )

}

export default SnippetPost;
