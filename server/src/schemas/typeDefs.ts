const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    snippets: [Snippet]!
  }

  type Snippet {
    _id: ID
    text: String
    title: String
    summary: String
    author: String
    createdAt: String
  }

  input SnippetInput {
    text: String!
    author: String!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    snippets: [Snippet]!
    Snippet(SnippetId: ID!): Snippet
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addSnippet(input: SnippetInput!): Thought
    removeSnippet(snippetId: ID!): Thought
  }
`;

export default typeDefs;
