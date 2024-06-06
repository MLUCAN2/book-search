import { gql } from '@apollo/client';

// Mutation for the user login
export const LOGIN_USER= gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

// Mutation for the user registration
export const ADD_USER=gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

// Mutation to save book
export const SAVE_BOOK= gql`
    mutation saveBook(&bookData: BookInput!){
        saveBook(bookData: $bookData) {
            _id
            username
            email
            savedBooks{
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;

// Mutation to delete book
export const REMOVE_BOOK= gql`
    mutation removeBook($bookId: String!){
        removeBook(bookId: $bookId) {
            _id
            username
            email
            savedBooks{
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`