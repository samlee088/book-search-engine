import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`


export const ADD_USER = gql`
    mutation addUser($username: String!, $password: String!, $email: String!,) {
        addUser(username: $username, password: $password, email: $email) {
            token
            user {
                _id
                username
                email
            }

        }
    }`

export const SAVE_BOOK = gql`
    mutation saveBook($authors: [String]!, $description: String!, $bookId: ID!, $image: String!, $link: String, $title: String!) {
        saveBook(authors: $authors, description: $description, bookId: $bookId, image: $image, link: $link, title: $title) {
                _id
                username
                email
        }
    }`

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            _id
            username
            email
            savedBooks{
              authors
              bookId
              description
              title
              image
              link
            }
        }
    }`


