/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

function AddTodoForm() {
    const [newTodoTitle, setNewTodoName] = useState("");
    const [newTodoDescription, setNewTodoDescription] = useState("");
    const [newTodoLabels, setNewTodoLabels] = useState("");
    const titleRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const navigateBack = useNavigate();

    function goBack () {
      navigateBack(-1);
    }

    useEffect(() => {
      titleRef.current.querySelector('label').focus();
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
      if (newTodoTitle !== "" && newTodoDescription!== "" && newTodoLabels !== ""){
        ev.preventDefault();
        try {
          const newTodo = {
            id: makeId(5),
            title: newTodoTitle,
            description: newTodoDescription,
            labels: newTodoLabels.split(","),
            isComplete: false
          };
          setLoading(true);
          await axios.post("http://localhost:8001/todos", newTodo);
          setNewTodoName("");
          setNewTodoDescription("");
          setNewTodoLabels("");
          goBack();
        } catch (error) {
          console.error(error)
        } 
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
      <Box component="form" onSubmit={createNewTodo}  sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: 2, 
          width: '50%', 
          marginBottom: '2rem' ,
          marginTop: '2rem',
        }}>
        <TextField 
          label="Add todo title..."
          id="fullWidth"
          value={newTodoTitle} 
          onChange={(ev) => setNewTodoName(ev.target.value)} 
          placeholder="Add todo..."
          ref={titleRef}
          sx={{ flex: 1 }} 
          fullWidth
          required
        />
        <TextField 
          label="Add description..."
          id="fullWidth"
          value={newTodoDescription} 
          onChange={(ev) => setNewTodoDescription(ev.target.value)} 
          placeholder="Add todo..."
          ref={titleRef}
          sx={{ flex: 1 }} 
          fullWidth
          required
        />
          <TextField 
          label="Add labels, please use comma..."
          id="fullWidth"
          value={newTodoLabels} 
          onChange={(ev) => setNewTodoLabels(ev.target.value)} 
          placeholder="Add todo..."
          ref={titleRef}
          sx={{ flex: 1 }}
          fullWidth
          required
        />
         <Tooltip title="Add todo">
          <Box sx={{ width: '100%' }}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={loading}
              sx={{ height: '56px' }}
              fullWidth
              required
            >
            {loading ? <CircularProgress size={24} /> : <AddIcon />}
            </Button>
          </Box>
        </Tooltip>
      </Box>
    </Box>
    )
}

export default AddTodoForm;