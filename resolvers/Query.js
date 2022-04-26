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
    },
    getUserTodos: (_,{id}) => {
        var userTodos = new Array();
        db.todos.forEach((todo)=>{
            if(todo.user == id){
                userTodos.push(todo);
            }
        })
        return userTodos;
    },
    getUserOfTodo: (_,{id}) => {
        var todo =  db.todos.find(
            (todo) => todo.id == id
        )
        
        return db.users.find(
            (user)=> user.id == todo.user
        )
    }
}
