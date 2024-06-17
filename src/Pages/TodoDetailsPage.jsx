
import { useParams } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import axios from 'axios';

function TodoDetailsPage() {
  const { todoId } = useParams();

  async function getTodo() {
    try {
      const {data} = await axios.get("/:id")
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  getTodo();

  return (
    <div>
      {/* <h2>{todo.title}</h2>
      <p>{todo.description}</p>
      <div>
        {todo.labels.map((label, index) => (
          <Chip key={index} label={label} style={{ marginRight: 5 }} />
        ))}
      </div>
      <p>Status: {todo.isComplete ? 'Completed' : 'Incomplete'}</p> */}
    </div>
  );
}

export default TodoDetailsPage