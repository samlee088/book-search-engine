import { gql } from '@apollo/client';


export const Query_ME = gql`
    query me {
        me {
          _id
          username
          email
          password  
          savedBooks
          bookCount
        }
    }`


