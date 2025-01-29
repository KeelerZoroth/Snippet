import { ChangeEvent, FormEvent, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_SNIPPETS } from "../utils/queries";


export const SearchBar: React.FC = () => {
    const [search, setSearch] = useState('');
    const [snippets, setSnippets] = useState([]);
    const { loading, error, data } = useQuery(QUERY_SNIPPETS)

    const handleSubmit = (event: FormEvent)=>{
        event.preventDefault();
        try {
             
        } catch (err) {
            console.error(err)
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>{
        const { value } = event.target;
        setSearch(value)
    }

    return <>
    <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search</label>
        <input type="text" name="search" id="search" value={search} onChange={handleChange}/>
        <button type="submit">Submit</button>
    </form>
    <div>
        <p></p>
    </div>
    </>
}