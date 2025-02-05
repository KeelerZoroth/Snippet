import { gql } from '@apollo/client';

// GraphQL queries for fetching user and snippet data
export const QUERY_USER = gql`
    query Query($username: String!) {
        user(username: $username) {
            _id
            username
            password
            snippets {
            _id
            }
        }
    }
`;

export const QUERY_SNIPPETS = gql`
    query snippets($limit: Int, $search: String) {
        snippets(limit: $limit, search: $search) {
            _id
            author
            createdAt
            language
            summary
            text
            title
        }
    }
`;

export const QUERY_SINGLE_SNIPPET = gql`
    query snippet($snippetId: ID!) {
        snippet(snippetId: $snippetId) {
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

export const QUERY_ME = gql`
query Me {
  me {
    _id
    username
    snippets {
      _id
    }
  }
}
`;
