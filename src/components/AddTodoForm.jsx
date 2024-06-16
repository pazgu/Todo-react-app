/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

function AddTodoForm(props) {
    const [newTodoTitle, setNewTodoName] = useState("");
    const titleRef = useRef(null);

    useEffect(() => {
      titleRef.current.focus();
    }, [])

    function makeId(length) { 
        let result = ''; 
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) { 
          result += characters.charAt(Math.floor(Math.random() * charactersLength)); 
        } 
        return result; 
      } 

    async function createNewTodo (ev) {
        ev.preventDefault();
        try {
          const newTodo = {
            id: makeId(5),
            title: titleRef.current.value,
            isComplete: false
          };
          await axios.post("http://localhost:8001/todos", newTodo);
          props.setTodos([...props.todos, newTodo]);
          console.log(props.todos);
          setNewTodoName("");
        } catch (error) {
          console.error(error)
        }
        finally {
          titleRef.current.focus();
        }
      }

    return (
        <>
         <form onSubmit={createNewTodo}>
        <input 
          type="text" 
          value={newTodoTitle} 
          onChange={(ev) => setNewTodoName(ev.target.value)} 
          className="todo-input" 
          placeholder='add todo...'
          ref={titleRef}
        />
        <Button variant="contained" color="success">
        <AddIcon/>
      </Button>
      </form>
        </>
    )
}

export default AddTodoForm;