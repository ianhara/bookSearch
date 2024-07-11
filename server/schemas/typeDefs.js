const typeDefs =`
  type Query {
      me: User

  }

  type Mutation {
    loginUser(
      email: String!
      password: String!
    ): Token
    removeBook(
      bookId: ID!
    ) : User
    saveBook(
      title: String!
      authors: [String]!
      link: String!
      image: String!
      description: String!
      bookId: ID!
    ) : User
    addUser(
      username: String!
      password: String!
      email: String!
    ) : Token
  }


  type Token {
    token: String!
    user: User
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks:[Book]
  }


  type Book {
    _id: ID
    title: String
    authors: [String]
    link: String
    image: String
    description: String
    bookId: ID
  }


`
module.exports = typeDefs