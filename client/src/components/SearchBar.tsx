import { ChangeEvent, FormEvent, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_SNIPPETS } from "../utils/queries";
import { SnippetPostData } from "../interfaces/SnippetPostData";
import styled from "styled-components";


export const SearchBar: React.FC = () => {
    const [search, setSearch] = useState('');
    const [snippets, setSnippets] = useState([]);
    const { loading, error, data } = useQuery(QUERY_SNIPPETS)

    const handleSubmit = (event: FormEvent)=>{
        event.preventDefault();
        try {
             setSnippets(data.snippets.filter((snippet: SnippetPostData)=>{
                return snippet.title.includes(search) || snippet.language.includes(search) || snippet.summary.includes(search);
             }));
        } catch (err) {
            console.error(err)
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>{
        const { value } = event.target;
        setSearch(value)
    }

    const Container = styled.div`
  margin-top: 60px;
  padding: 1rem;
  min-height: calc(100vh - 60px);
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
    const Form = styled.form`
`

    return <>
    <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search</label>
        <input type="text" name="search" id="search" value={search} onChange={handleChange}/>
        <button type="submit">Submit</button>
    </form>
    <div>
        
    </div>
    </>
}