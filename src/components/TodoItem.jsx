/* eslint-disable react/prop-types */
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function TodoItem(props) {
  
    return (
        <>
         <li key={props.id}>
            <input type="checkbox" id={props.id} checked={props.isComplete} onChange={()=> props.toggleIsComplete(props.id)}/>
            {props.editTodoId === props.id ? (
              <>
                <input 
                  type="text" 
                  value={props.editTodoTitle} 
                  onChange={(ev) => props.setEditTodoTitle(ev.target.value)} 
                  className="edit-todo-input" 
                />
                <Button variant="contained" color="success" type="button" onClick={() => props.saveTodoItem(props.id)}>
                Save <SaveIcon/>
              </Button>
              </>
            ) : (
              <>
                <label htmlFor={props.id} className={props.isComplete ? "completed text-muted" : ""}>{props.title}</label>
                <Button variant="contained" size="medium" type="button" onClick={() => props.editTodoItem(props.id, props.title)}>
                Edit <EditIcon/>
              </Button>
              </>
            )}
             <Button variant="outlined" color="error" type="button" onClick={() => props.removeTodoItem(props.id)}>
              Remove <DeleteIcon/>
            </Button>
          </li>
        </>
    )
}

export default TodoItem;