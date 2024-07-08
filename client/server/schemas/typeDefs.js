const typeDefs =`
type Query {
    me: User
    
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
 
  }
  

`
module.exports = typeDefs