/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function AddTodoForm(props) {
    const [newTodoTitle, setNewTodoName] = useState("");
    const titleRef = useRef(null);
    const [loading, setLoading] = useState(false);

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
            title: newTodoTitle,
            isComplete: false
          };
          setLoading(true);
          await axios.post("http://localhost:8001/todos", newTodo);
          props.setTodos([...props.todos, newTodo]);
          console.log(props.todos);
          setNewTodoName("");
        } catch (error) {
          console.error(error)
        }
        finally {
          titleRef.current.focus();
          setLoading(false);
        }
      }

    return (
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', 
        mt: 2, 
      }}
    >
      <Box component="form" onSubmit={createNewTodo} sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '50%' , marginBottom: '2rem'}}>
        <TextField 
          label="Add todo..."
          id="fullWidth"
          value={newTodoTitle} 
          onChange={(ev) => setNewTodoName(ev.target.value)} 
          placeholder="Add todo..."
          ref={titleRef}
          sx={{ flex: 1 }} 
        />
      <Tooltip title="Add todo">
        <span>
          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={loading}
            sx={{ height: '56px', minWidth: '56px' }}
          >
          {loading ? <CircularProgress /> : <AddIcon />}
          </Button>
        </span>
      </Tooltip>
      </Box>
    </Box>
    )
}

export default AddTodoForm;