
export const User = {
    todo: ( user ,_, {db} ) => {
        return db.todos.filter(
            (todo) => user.id == todo.user
        );
    }
}