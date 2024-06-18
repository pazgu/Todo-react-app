
import Chip from '@mui/material/Chip';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

function TodoDetailsPage() {

  const { todoId } = useParams();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  useEffect(() => {
    async function fetchTodo() {
      try {
        const { data } = await axios.get(`http://localhost:8001/todos/${todoId}`); 
        setTodo(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchTodo();
  }, [todoId]);

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
      await axios.delete(`http://localhost:8001/todos/${todoId}`, todoId);
      goBack();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div>
        <h2>{todo.title}</h2>
        <p>{todo.description}</p>
        <div>
          {todo.labels && todo.labels.map((label, index) => (
            <Chip key={index} label={label} style={{ marginRight: 5 }} />
          ))}
        </div>
        <p>Status: {todo.isComplete ? 'Completed' : 'Incomplete'}</p>
      </div>
      <Button variant="outlined" color="error" type="button" onClick={() => handleDelete(todo.id)} >
        Remove <DeleteIcon/>
      </Button>
    </>
  );
}

export default TodoDetailsPage;