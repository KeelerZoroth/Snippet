import { ChangeEvent, FormEvent, useCallback, useState } from "react";

import styled from "styled-components";

// styled components
const Form = styled.form`
    display: flex;
    flex-direction: column;
    background: #222;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(255, 255, 255, 0.1);
    width: flex; 100%;
    color: #ddd;
`;


const SearchInput = styled.input`
    height: 40px;
    padding: 10px;
    border: 1px solid #444;
    border-radius: 8px;
    background: #333;
    color: #fff;
    font-size: 1rem;
    
    &:focus {
        outline: none;
        border-color: #777;
    }
`;

const Button = styled.button`
    width: 100%;
    border-radius: 8px;
    padding: 12px;
    margin-top: 15px;
    background: #444;
    color: white;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    transition: background 0.3s ease-in-out;

    &:hover {
        background: #666;
    }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SearchBar = ({refetchQuery}: {refetchQuery: any}) => {
    const [search, setSearch] = useState<string>("");

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            refetchQuery({search});
        } catch (err) {
            console.error(err)
        }
    }
    // callback function to handle input change for search
    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }, [])

    return (
        <Form onSubmit={handleSubmit}>
            <SearchInput
                type='text'
                placeholder='Search for a Language, Username, or Title...'
                value={search}
                onChange={handleChange} />
            <Button type="submit">Submit</Button>
        </Form>
    )
}
