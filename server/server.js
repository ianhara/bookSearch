const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { ApolloServer } = require('@apollo/server');
const { typeDefs, resolvers } = require("./schemas")
const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({ typeDefs, resolvers })
const { expressMiddleware } = require('@apollo/server/express4');
const { User } = require('./models');
const jwt = require('jsonwebtoken');
const cors = require('cors')
const { configDotenv } = require('dotenv');
configDotenv()

app.use(cors())
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// // Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use('/graphql', expressMiddleware(server, {

    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.startsWith('Bearer ')) {
        let currentUser = null
        try {
          const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
          currentUser = await User.findById(decodedToken.data._id)
        } catch(error) {
          console.error(error)
        }
        return { currentUser }
      }
    },

  }))

  //app.use(routes);

  app.use(express.static(path.join(__dirname, './dist/')));
}

// // Call the async function to start the server


db.once('open', () => {

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
});

startApolloServer();