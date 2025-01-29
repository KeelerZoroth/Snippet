import auth from "../utils/auth";
// import { Link } from 'react-router-dom';
import { SnippetPostData } from '../interfaces/SnippetPostData';
// import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { REMOVE_SNIPPET } from '../utils/mutations';
import { useMutation } from "@apollo/client";

interface SnippetPostProps extends SnippetPostData {
    onDelete: (id: number) => void;
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
     position: fixed;
     border-radius: 12px;
     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
     padding: 20px;
     max-width: 300px;
     text-align: center;
     transition: transform 0.3s ease-in-out;

       &:hover {
     transform: translateY(-5px);
     box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
     }
     `;

    const CardText = styled.p`
     font-size: 1rem;
     color: #666;
     `;

    const Button = styled.button<{ primary?: boolean }>`
      background: transparent;
      `

    return (
        <Card>
            <h2>{title}</h2>
            <CardText>{text}</CardText>
            <CardText>{summary}</CardText>
            <CardText>{language}</CardText>
            <CardText>{author}</CardText>
            <CardText>{createdAt}</CardText>
            {auth.loggedIn() ? <Button onClick={deleteSnippet}>Delete</Button> : <span></span> }
        </Card>
    )

}

export default SnippetPost;
