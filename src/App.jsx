import { useState } from 'react';
import './App.css';

function App() {
  function makeId(length) { 
    let result = ''; 
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) { 
      result += characters.charAt(Math.floor(Math.random() * charactersLength)); 
    } 
    return result; 
  }  

  const dummy_todos = [
    { id: '1', title: 'Learn React', isComplete: false },
    { id: '2', title: 'Build a Todo App', isComplete: false },
    { id: '3', title: 'Read JavaScript Documentation', isComplete: false },
    { id: '4', title: 'Write Unit Tests', isComplete: false },
    { id: '5', title: 'Implement Context', isComplete: false },
    { id: '6', title: 'Create Portfolio Website', isComplete: false },
    { id: '7', title: 'Learn TypeScript', isComplete: false },
    { id: '8', title: 'Refactor Codebase', isComplete: false },
    { id: '9', title: 'Optimize Performance', isComplete: false },
    { id: '10', title: 'Deploy to Production', isComplete: false }
  ];

  const [todos, setTodos] = useState(dummy_todos);
  const [newTodoTitle, setNewTodoName] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoTitle, setEditTodoTitle] = useState("");

  //stats
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo)=> todo.isComplete).length;
  const activeTodos = todos.length - completedTodos;
  const completionRate = totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;

  if (todos.length === 0) {
    return <p>No todos available</p>
  }

  function createNewTodo (ev) {
    ev.preventDefault();
    const newTodo = {
      id: makeId(5),
      title: newTodoTitle,
      isComplete: false
    };
    setTodos([...todos, newTodo]);
    setNewTodoName("");
    console.log('Total todos after adding:', todos.length + 1);
  }

  function removeTodoItem(todoId) {
    const newTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(newTodos);
    console.log('Total todos after removing:', todos.length - 1);
    // completedTodos = todos.filter((todo)=> todo.isComplete).length;
    // activeTodos = todos.length - completedTodos;
  }

  function editTodoItem(todoId, title) {
    setEditTodoId(todoId);
    setEditTodoTitle(title);
  }

  function saveTodoItem(todoId) {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, title: editTodoTitle };
      }
      return todo;
    });
    setTodos(newTodos);
    setEditTodoId(null);
    setEditTodoTitle("");
  }

  function toggleIsComplete(todoId) {
    const newTodos = todos.map((todo) =>{  
      if(todo.id === todoId) {
        return {...todo, isComplete: !todo.isComplete}
      }
      return todo
    })
    setTodos(newTodos);
    // completedTodos = todos.filter((todo)=> todo.isComplete).length;
    // activeTodos = todos.length - completedTodos;
  }

  return (
    <>
      <h1 className="app-title">Todos App</h1>
      <form onSubmit={createNewTodo}>
        <input 
          type="text" 
          value={newTodoTitle} 
          onChange={(ev) => setNewTodoName(ev.target.value)} 
          className="todo-input" 
        />
        <button type="submit" className="add-todo-button">Add todo</button>
      </form>
      <p>Total todos: {totalTodos}</p>
      <p>Activated todos: {activeTodos}</p>
      <p>Completed todos: {completedTodos}</p>
      <div className="progress-bar">
        <div 
          className="progress-bar-inner" 
          style={{ width: `${completionRate}%` }}
        ></div>
      </div>
      <ul className="todo-list"> 
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" id={todo.id} onChange={()=> toggleIsComplete(todo.id)}/>
            {editTodoId === todo.id ? (
              <>
                <input 
                  type="text" 
                  value={editTodoTitle} 
                  onChange={(ev) => setEditTodoTitle(ev.target.value)} 
                  className="edit-todo-input" 
                />
                <button type="button" onClick={() => saveTodoItem(todo.id)} className="save-todo-button">Save</button>
              </>
            ) : (
              <>
                <label htmlFor={todo.id} className={todo.isComplete ? "completed text-muted" : "undone"}>{todo.title}</label>
                <button type="button" onClick={() => editTodoItem(todo.id, todo.title)} className="edit-todo-button">Edit</button>
              </>
            )}
            <button type="button" onClick={() => removeTodoItem(todo.id)} className="remove-todo-button">Remove</button>
          </li>
        ))}
      </ul>
    </>
  );
}
export default App;
