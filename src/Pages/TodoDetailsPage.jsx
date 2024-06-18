
import Chip from '@mui/material/Chip';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

function TodoDetailsPage() {

  const { todoId } = useParams();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoTitle, setEditTodoTitle] = useState("");
  const [editTodoDescription, setEditTodoDescription] = useState("");
  // const [editTodoLabels, setEditTodoLabels] = useState("");
  const [editTodoIsComplete, setEditTodoIsComplete] = useState(false);
  const url = `http://localhost:8001/todos/${todoId}`;

  function goBack() {
    navigate(-1);
  }

  async function fetchTodo() {
    try {
      const { data } = await axios.get(url); 
      setTodo(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTodo();
  }, [todoId, editTodoTitle, editTodoDescription, editTodoIsComplete]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching todo details.</div>;
  }

  if (!todo) {
    return <div>Todo not found</div>;
  }

  async function handleDelete(todoId) {
    try {
      await axios.delete(url, todoId);
      goBack();
    } catch (error) {
      console.error(error);
    }
  }

  function editTodoItem(todoId, title, description) {
    setEditTodoId(todoId);
    setEditTodoTitle(title);
    setEditTodoDescription(description)
    // setEditTodoLabels(labels);
    setEditTodoIsComplete(todo.isComplete);
  }

  async function saveTodoItem(todoId) {
    try {
      await axios.put(url, 
      {...todo, 
        title: editTodoTitle,
        description: editTodoDescription,
        // labels: typeof editTodoLabels === 'string' ? editTodoLabels.split(",") : []
        isComplete: editTodoIsComplete,
      }) 
      setEditTodoId(null);
      setEditTodoTitle("");
      setEditTodoDescription("")
      // setEditTodoLabels("")
    } catch (error) {
      console.error(error)
    }
  }

  async function toggleIsComplete() {
    try {
      await axios.patch(url, setEditTodoIsComplete(prevIsComplete => !prevIsComplete)) 
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {editTodoId === todo.id ? (
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%', 
          mt: 2, 
        }}
      >
        <Box component="form"   sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: 2, 
            width: '50%', 
            marginBottom: '2rem' ,
            marginTop: '2rem',
          }}>
         <Checkbox type="checkbox" id={todo.id} checked={editTodoIsComplete} onChange={toggleIsComplete}/>
          <input 
            type="text" 
            value={editTodoTitle} 
            onChange={(ev) => setEditTodoTitle(ev.target.value)} 
            className="edit-todo-input" 
          />
          <input 
            type="text" 
            value={editTodoDescription} 
            onChange={(ev) => setEditTodoDescription(ev.target.value)} 
            className="edit-todo-input" 
          />
          {/* <input 
            type="text" 
            value={editTodoLabels} 
            onChange={(ev) => setEditTodoLabels(ev.target.value)} 
            className="edit-todo-input" 
          /> */}
          <Button variant="contained" color="success" type="button" onClick={() => saveTodoItem(todo.id)}>
            Save <SaveIcon/>
          </Button>
          <div>
            {todo.labels && todo.labels.length > 0 ? (
              todo.labels.map((label, index) => (
                <Chip key={index} label={label} style={{ marginRight: 5 }} />
              ))
            ) : (
              ""
            )}
          </div>  
          </Box>
          </Box>                   

          ) : (
            <>
              <div>
                <Checkbox type="checkbox" id={todo.id} checked={todo.isComplete} disabled/>
                <h2>{todo.title}</h2>
                <p>{todo.description}</p>
                <div>
                  {todo.labels && todo.labels.map((label, index) => (
                    <Chip key={index} label={label} style={{ marginRight: 5 }} />
                  ))}
                </div>
              </div>
              <Button variant="contained" size="medium" type="button" onClick={() => editTodoItem(todo.id, todo.title, todo.description)}>
                Edit <EditIcon/>
              </Button>
              <Button variant="outlined" color="error" type="button" onClick={handleDelete} >
                Remove <DeleteIcon/>
              </Button>
            </>
          )}
          <div>
          <Button type="button" onClick={goBack} >
            Go back to todos
          </Button>
          </div>
        </>
  );
}

export default TodoDetailsPage;