import auth from "../utils/auth";
import { REMOVE_SNIPPET } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { SnippetPostData } from "../interfaces/SnippetPostData";
import { QUERY_SNIPPETS } from "../utils/queries";
import "../assets/styles/snippetPost.css"; // Import CSS

const SnippetPost = ({ _id, text, title, summary, language, author }: SnippetPostData) => {
    const [deleteSnippetPost, { loading, error }] = useMutation(REMOVE_SNIPPET, {
        refetchQueries: [QUERY_SNIPPETS],
    });

    const deleteSnippet = async () => {
        try {
            await deleteSnippetPost({ variables: { snippetId: _id } });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="card">
            <h2 className="card-title">{title}</h2>
            <pre className="code-block">{text}</pre>
            <p>{summary}</p>

            <div className="meta-info">
                <p>{language}</p>
                <p>By: {author}</p>
            </div>

            {auth.loggedIn() && auth.getProfile().data.username === author && (
                <button className="delete-button" onClick={deleteSnippet}>
                    {loading ? "Deleting..." : error ? "Error" : "Delete"}
                </button>
            )}
        </div>
    );
};

export default SnippetPost;
