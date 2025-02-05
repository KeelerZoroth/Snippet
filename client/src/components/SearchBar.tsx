import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import styled, { keyframes } from "styled-components";


const glitchAnimation = keyframes`
    0% {
        text-shadow: 2px 2px red, -2px -2px cyan;
    }
    50% {
        text-shadow: -2px 2px magenta, 2px -2px yellow;
    }
    100% {
        text-shadow: 1px -1px green, -1px 1px blue;
    }
`;

// styled components
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #222;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(255, 255, 255, 0.1);
    width: 100%;
    max-width: 500px;
    color: #ddd;
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 12px;
    font-size: 1rem;
    border: 2px solid transparent;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    text-align: center;
    outline: none;
    transition: 0.3s ease;
    border: 2px solid #646CFF;
    box-shadow: 0 0 10px rgba(100, 108, 255, 0.5), 0 0 15px rgba(255, 0, 255, 0.5);

    &:focus {
        box-shadow: 0 0 15px rgba(0, 255, 255, 0.8);
        background: rgba(0, 0, 0, 0.9);
    }
`;

const Button = styled.button`
    padding: 10px 20px;
    margin-top: 10px;
    background: black;
    color: white;
    font-size: 1.2rem;
    border: 2px solid #646CFF;
    border-radius: 8px;
    cursor: pointer;
    text-transform: uppercase;
    animation: ${glitchAnimation} 2s infinite;
    transition: 0.3s ease;

    &:hover {
        background: #222;
        border: 2px solid #CF7FD4;
    }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SearchBar = ({ refetchQuery }: { refetchQuery: any }) => {
    const [search, setSearch] = useState<string>("");

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            refetchQuery({ search });
        } catch (err) {
            console.error(err);
        }

    };

    // callback function to handle input change for search
    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }, []);

    return (
        <Form onSubmit={handleSubmit}>
            <SearchInput
                type="text"
                placeholder="Search for a Language, Username, or Title..."
                value={search}
                onChange={handleChange}
            />
            <Button type="submit">Submit</Button>
        </Form>
    );
};
