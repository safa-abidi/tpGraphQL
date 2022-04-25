import { GraphQLServer } from 'graphql-yoga'
import { Query } from './resolvers/Query.js'
import {Todo} from "./resolvers/todo.js";

const typeDefs = "schema/schema.graphql";
const resolvers = {
    Query,
    Todo
};
const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))
