import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                snippets {
                    _id
                }
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($input: UserInput!) {
        addUser(input: $input) {
            token
            user {
                _id
                username
                snippets {
                    _id
                }
            }
        }
    }
`;

export const ADD_SNIPPET = gql`
    mutation addSnippet($input: SnippetInput!) {
        addSnippet(input: $input) {
            _id
            author
            title
            summary
            language
            text
            createdAt
        }
    }
`;

export const REMOVE_SNIPPET = gql`
    mutation RemoveSnippet($snippetId: ID!) {
        removeSnippet(snippetId: $snippetId) {
            _id
            author
            title
        }
    }
`;
