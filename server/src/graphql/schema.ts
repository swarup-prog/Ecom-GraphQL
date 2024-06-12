import { buildSchema } from "graphql";

const schema = buildSchema(`
  type Book {
    id: ID!
    title: String!
    author: Author!
    pages: Int!
    genre: Genre!
    price: Float
  }

  type Author {
    id: ID!
    name: String!
    books: [Book!]!
  }

  enum Genre {
    FICTION
    NON_FICTION
    ROMANCE
    MYSTERY
  } 

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Query {
    getBook(id: ID!): Book
    getAuthor(id: ID!): Author
    getBooks: [Book!]!
    getAuthors: [Author!]!
    hello: String!
  }

  input BookInput {
    title: String!
    author: String!
    pages: Int!
    genre: Genre!
    price: Float!
  }

  input AuthorInput {
    name: String!
  }

  type Mutation {
    createBook(input: BookInput!): Book
    createAuthor(input: AuthorInput!): Author
    deleteBook(id: ID!): Book
    updateBook(id: ID!, input: BookInput!): Book
    updateAuthor(id: ID!, input: AuthorInput!): Author
    deleteAuthor(id: ID!): Author
    uploadFile(file: Upload!): File!
  }
`);

export default schema;
