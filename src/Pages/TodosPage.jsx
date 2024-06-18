import { useEffect, useState } from 'react';
import TodoStatistics from '../components/TodoStatistics';
import axios from 'axios';
import Filter from '../components/Filter';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import TodoList from '../components/TodoList';
import { Link } from "react-router-dom";


function TodosPage() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editTodoId, setEditTodoId] = useState(null);
    const [editTodoTitle, setEditTodoTitle] = useState("");
  
    // useEffect(() => {
    //   console.log("Hello");
    // }, []);
  
    // useEffect(() => {
    //   console.log(todos);
    // }, [todos]);
  
    const url = "http://localhost:8001/todos";
  
    async function getTodos() {
      try {
        const response = await axios.get(url);
        setTodos(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
  
    useEffect(() => {
      getTodos()
    }, [])
  
    //stats
    const totalTodos = todos.length;
    const completedTodos = todos.filter((todo)=> todo.isComplete).length;
    const activeTodos = todos.length - completedTodos;
    const completionRate = totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;
  
    // if (todos.length === 0) {
    //   return <p>No todos available</p>
    // }
  
    async function removeTodoItem(todoId) {
      try {
        await axios.delete(`${url}/${todoId}`, todoId);
        const newTodos = todos.filter((todo) => todo.id !== todoId);
        setTodos(newTodos);
        console.log(newTodos);
      } catch (error) {
        console.error(error);
      }
    }
  
    function editTodoItem(todoId, title) {
      setEditTodoId(todoId);
      setEditTodoTitle(title);
    }
  
    async function saveTodoItem(todoId) {
      try {
        await axios.patch(`${url}/${todoId}`, {title: editTodoTitle}) 
        const newTodos = todos.map((todo) => {
          if (todo.id === todoId) {
            return { ...todo, title: editTodoTitle };
          }
          return todo;
        });
        setTodos(newTodos);
        setEditTodoId(null);
        setEditTodoTitle("");
      } catch (error) {
        console.error(error)
      }
    }
  
    async function toggleIsComplete(todoId) {
      let currentTodo = null;
      try {
        const newTodos = todos.map((todo) => {
          if(todo.id === todoId) {
            currentTodo = todo;
            return {...todo, isComplete: !todo.isComplete}
          } 
          return todo
        });
        if (currentTodo) {
          await axios.patch(`${url}/${todoId}`, {isComplete: !currentTodo.isComplete}) 
        }
        setTodos(newTodos);
      } catch (error) {
        console.error(error);
      }
    }
   
  
    return (
      <>
        {/* <Link to=":todoId">Todo Details</Link> */}
        <br />
        <Link to="create">Create Todo</Link>
        <br />
          {loading ? (
             <Grid container spacing={2}>
             <Grid item xs={12}>
               <Skeleton width="100%" height={40} variant="text" animation="wave" />
             </Grid>
             <Grid item xs={12}>
               <Skeleton width="100%" height={40} variant="text" animation="wave" />
             </Grid>
             <Grid item xs={12}>
               <Skeleton width="100%" height={40} variant="text" animation="wave" />
             </Grid>
           </Grid>
          ) : (
            <>
              <TodoStatistics 
                totalTodos={totalTodos}
                completedTodos={completedTodos}
                activeTodos={activeTodos}
                completionRate={completionRate}
              />
              <Filter todos={todos}>
                {filteredTodos => (
                  <TodoList
                    todos={filteredTodos}
                    setTodos={setTodos}
                    editTodoId={editTodoId}
                    setEditTodoId={setEditTodoId}
                    editTodoTitle={editTodoTitle}
                    setEditTodoTitle={setEditTodoTitle}
                    removeTodoItem={removeTodoItem}
                    editTodoItem={editTodoItem}
                    saveTodoItem={saveTodoItem}
                    toggleIsComplete={toggleIsComplete}
                  />
                )}
              </Filter>
            </>
          )}
      </>
      );
}


export default TodosPage