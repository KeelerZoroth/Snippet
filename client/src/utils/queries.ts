import { gql } from '@apollo/client';

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
    query snippets {
        snippets {
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
