import { createYoga } from 'graphql-yoga'
import { createServer } from 'http'
import { schema } from './schema'

createServer(
  createYoga({
    graphqlEndpoint: '/',
    schema,
    context: (req) => {
      return {
        req,
      }
    },
  }),
).listen(4000, () => {
  console.log(`\
🚀 Server ready at: http://localhost:4000
⭐️ See sample queries: http://pris.ly/e/ts/graphql#using-the-graphql-api
  `)
})
