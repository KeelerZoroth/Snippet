import { type FormEvent, useState } from "react";

import { useMutation } from "@apollo/client";

import { ADD_SNIPPET } from "../utils/mutations";

const ScanSnippet = () => {
    const [codeTitle, setCodeTitle] = useState("Title");
    const [codeText, setCodeText] = useState("");
    const [codeSummary, setCodeSummary] = useState("Summary");


    const [addSnippet, { loading }] = useMutation(ADD_SNIPPET)
    



    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
    
        try {

            if(!codeText.trim()){
                return
            }

            const { data } = await addSnippet({
                variables: {
                    input:{
                        text: codeText,
                    }
                },
            })

            setCodeTitle(data.addSnippet.title)
            setCodeSummary(data.addSnippet.summary)

        } catch (error) {
          console.error(error);
        }
    };


    const styles: {[key: string]: React.CSSProperties} = {
        mainDiv: { 
            width: "100%",
            padding: "5% 5%",
            margin: "5% 5%",
            backgroundColor: "rgb(100, 100, 100)",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        snippetModule: {
            maxWidth: "900px",
            backgroundColor: "#CCCCF5",
            flexGrow: "1",
        },
        codeText: {
            resize: "none",
            width: "80%",
            maxWidth: "500px",
            height: "250px",
            fontFamily: "sans-serif",
        },
        form: { 
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        inputSubmit: {
            padding: "5px",
            margin: "15px"
        }
    }



    
    return (
        <div style={styles.mainDiv}>
            <section style={styles.snippetModule}>
                <h1>{!loading ? codeTitle : "..."}</h1>
                <form style={styles.form} onSubmit={handleSubmit}>
                    <textarea 
                        style={styles.codeText}
                        value={codeText}
                        placeholder="Input code here..."  
                        autoComplete='off' 
                        spellCheck='false' 
                        autoCorrect='off' 
                        maxLength={800}
                        onChange={(e) => setCodeText(e.target.value)}
                    />
                    <input style={styles.inputSubmit} type="submit" value="Examine Code"/>
                </form>
                <p className="code-summary">
                    {!loading ? codeSummary: "loading..."}
                </p>
            </section>
        </div>
    );
}

export default ScanSnippet;