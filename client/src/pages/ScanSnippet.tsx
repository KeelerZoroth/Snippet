import { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_SNIPPET } from "../utils/mutations";
import { QUERY_SNIPPETS } from "../utils/queries";
import auth from "../utils/auth";
import { useNavigate } from "react-router-dom";
import "../assets/styles/scanSnippet.css";

const ScanSnippet = () => {
    const [codeTitle, setCodeTitle] = useState("Title");
    const [codeText, setCodeText] = useState("");
    const [codeSummary, setCodeSummary] = useState("Summary");

    const navigate = useNavigate();

    const [addSnippet, { loading }] = useMutation(ADD_SNIPPET, {
        refetchQueries: [{ query: QUERY_SNIPPETS }],
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            if (!codeText.trim()) {
                return;
            }
            const { data } = await addSnippet({
                variables: {
                    input: {
                        text: codeText,
                    },
                },
            });

            setCodeTitle(data.addSnippet.title);
            setCodeSummary(data.addSnippet.summary);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {!auth.loggedIn() ? (
                <h1 className="not-logged-in">Please Login</h1>
            ) : (
                <div className="scan-snippet-container">
                    <section className="snippet-module">
                        <h1 className="snippet-title">
                            {!loading ? codeTitle : "..."}
                        </h1>
                        <form className="snippet-form" onSubmit={handleSubmit}>
                            <textarea
                                className="code-textarea"
                                value={codeText}
                                placeholder="Input code here..."
                                autoComplete="off"
                                spellCheck="false"
                                autoCorrect="off"
                                maxLength={2000}
                                onChange={(e) => setCodeText(e.target.value)}
                            />
                            <input
                                type="submit"
                                value="Examine Code"
                                className="submit-button"
                            />
                        </form>
                        <p className="code-summary">
                            {!loading ? codeSummary : "loading..."}
                        </p>
                        <button className="home-button" onClick={() => navigate("/")}>
                            Home
                        </button>
                    </section>
                </div>
            )}
        </>
    );
};

export default ScanSnippet;
