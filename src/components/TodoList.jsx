/* eslint-disable react/prop-types */

import TodoItem from "./TodoItem";

function TodoList(props) {

    return (
        <>
        <ul className="todo-list"> 
        {props.todos.map((todo) => (
         <TodoItem 
         key={todo.id}
         id={todo.id}   
         title={todo.title}   
         isComplete={todo.isComplete} 
         editTodoId={props.editTodoId} 
         setEditTodoId={props.setEditTodoId} 
         editTodoTitle={props.editTodoTitle}
         setEditTodoTitle={props.setEditTodoTitle}
         removeTodoItem={props.removeTodoItem}
         editTodoItem={props.editTodoItem}
         saveTodoItem={props.saveTodoItem}
         toggleIsComplete={props.toggleIsComplete}   
          />
        ))}
      </ul>
        </>
    )
}

export default TodoList;