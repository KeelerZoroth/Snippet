import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import styled from "styled-components";


const Form = styled.form`
    display: flex;
    flex-direction: column;
    `

const Label = styled.label`
    background: black;
    color: white;
    `
const SearchInput = styled.input`
    height: 30px;
    `
const Button = styled.button`
    width: 100%;
    border-radius: 12px;
    padding: 5px;
    margin: 5px 0;
    `

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

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }, [])

    return (
        <Form onSubmit={handleSubmit}>
            <Label>Search</Label>
            <SearchInput
                type='text'
                placeholder='Search for a Language...'
                value={search}
                onChange={handleChange} />
            <Button type="submit">Submit</Button>
        </Form>
    )
}
