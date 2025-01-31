import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_SNIPPETS } from "../utils/queries";
import { SnippetPostData } from "../interfaces/SnippetPostData";
import SnippetPost from "./SnippetPost";
import styled from "styled-components";
import { ObjectId } from "mongoose";


const CardsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
    justify-content: space-around;
    `;

const SnippetCard = styled.div`
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 100%;
    max-width: 400px;
    height: 550px;
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
    `;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    `

const Label = styled.label`
    background: black;
    `
const SearchInput = styled.input`
    height: 30px
    `
const Button = styled.button`
    width: 100%
    `

export const SearchBar: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    const [snippets, setSnippets] = useState([]);
    const { loading, error, data, refetch } = useQuery(QUERY_SNIPPETS, {
        variables: {
            search
        }
    })

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            await refetch();
            setSnippets(data.snippets)
        } catch (err) {
            console.error(err)
        }
    }

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }, [])

    const handleDelete = (deletedSnippetId: ObjectId) => {
        // If the backend removes the snippet, Apollo Client will update the cache automatically
        console.log(`Deleted snippet ID: ${deletedSnippetId}`);
    };

    return <>
        <Form onSubmit={handleSubmit}>
            <Label>Search</Label>
            <SearchInput
                type='text'
                placeholder='Search for a Language...'
                value={search}
                onChange={handleChange} />
            <Button type="submit">Submit</Button>
        </Form>

        <CardsContainer>
            {!loading ? snippets.map((snippetPost: SnippetPostData) =>
                <SnippetCard key={snippetPost.title}>
                    <SnippetPost {...snippetPost} onDelete={handleDelete}></SnippetPost>
                </SnippetCard>
            )
                : !error ?
                    <span>Nothing to see here!</span>
                    : <span>{error.message}</span>}
        </CardsContainer>
        <div>
        </div>

    </>
}