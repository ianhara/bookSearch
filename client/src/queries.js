import { gql } from "@apollo/client";


// route to get logged in user's info (needs the token)
export const GET_ME = gql`
  query Query {
    me {
      username
      savedBooks {
        title
        description
        link
        image
        bookId
      }
    }
  }
`

export const ADD_USER = gql`
    mutation Mutation(
        $username: String!
        $email: String!
        $password: String!
    ) {
       addUser(
            username: $username
            email: $email
            password: $password
       ) {
        token
        user {
            username
            savedBooks {
                title
                description
                link
                image
                bookId
            }
        }
       }
    }
`

export const REMOVE_BOOK = gql`
    mutation Mutation($bookId: ID!) {
      removeBook(bookId: $bookId) {
          savedBooks {
            title
            description
            link
            image
            bookId
          }
      }
    }
`

export const LOGIN_USER = gql`
    mutation Mutation($email: String!, $password: String!){
      loginUser(email: $email, password: $password) {
        token
      }
    }
`

export const SAVE_BOOK = gql`
    mutation Mutation(
      $title: String!,
      $authors: [String]!,
      $link: String!,
      $image: String!,
      $description: String!,
      $bookId: ID!,
    ) {
      saveBook(
      title: $title,
      authors: $authors,
      link: $link,
      image: $image,
      description: $description,
      bookId: $bookId,
      ) {
            savedBooks {
            title
            description
            link
            image
            bookId
          }
      }
    }
`