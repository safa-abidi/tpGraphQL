import {db} from "../data/db.js";

export const Query = {
    hello: (parent, args, context, info) => {
        console.log('parent : ', parent);
        console.log('context : ', context);
        console.log('info : ', info);
        console.log('args : ', args);
        return `Hello ${args.name || 'World'}`;
    },
    getTodoById: (_, {id}) => {
        return db.todos.find(
            (todo) => todo.id === id
        );
    }
}
