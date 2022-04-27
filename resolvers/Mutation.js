import {v4 as uuidv4} from 'uuid';
//import { Status } from '../schema/schema.graphql'

export const Mutation = {
    addTodo: (parent, { addTodoInput }, { db }, info) => {
        var verif = db.users.find((user) => user["id"] == addTodoInput.user);
        if (!verif){
            throw new Error(`Ce user n'existe pas`);
        }
        else{
            const newTodo = {id: uuidv4(),...addTodoInput, status: "WAITING"};
            db.todos.push(newTodo);
            pubsub.publish('newTodo', {newTodo});
            return newTodo;
        }
        
    },

    updateTodo: (parent, {updateTodoInput, id}, {db}) => {
        
        const position = db.todos.findIndex((todo) => todo.id == id);
        if (position == -1) {
            throw new Error("Ce todo n'existe pas");
        } 
        else{
            var todo= db.todos[position];
            updateTodoInput.status ? todo.status = updateTodoInput.status : todo.status;
            updateTodoInput.content ? todo.content = updateTodoInput.content : todo.content;
            updateTodoInput.name ? todo.name = updateTodoInput.name: todo.name;

            if(updateTodoInput.user){
                var verif = db.users.find((user) => user["id"] == updateTodoInput.user);
                if (!verif){
                    throw new Error(`Ce user n'existe pas`);
                }
                else{
                    todo.status = updateTodoInput.user
                }
            }
            pubsub.publish('updateTodo', {updateTodo})
            
            return todo;
        }
    },

    deleteTodo: (parent, {id}, {db}) => {
        const position = db.todos.findIndex((todo) => todo.id == id);
        if (position == -1) {
            throw new Error("Ce todo n'existe pas");
        } 
        else {
            const [todo] = db.todos.splice(position, 1);
            return todo;
        }
    }
}