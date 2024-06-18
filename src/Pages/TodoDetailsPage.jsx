
import Chip from '@mui/material/Chip';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function TodoDetailsPage() {

  const { todoId } = useParams();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
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
  );
}

export default TodoDetailsPage;