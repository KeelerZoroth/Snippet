const typeDefs = `
  type User {
    _id: ID
    username: String
    password: String
    snippets: [Snippet]!
  }

  type Snippet {
    _id: ID
    text: String
    title: String
    summary: String
    language: String
    author: String
    createdAt: String
  }

  input SnippetInput {
    text: String!
  }

  input UserInput {
    username: String!
    password: String!
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    snippets(limit: Int, search: String): [Snippet]!
    snippet(snippetId: ID!): Snippet
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(username: String!, password: String!): Auth
    addSnippet(input: SnippetInput!): Snippet
    removeSnippet(snippetId: ID!): Snippet
  }
`;

export default typeDefs;

