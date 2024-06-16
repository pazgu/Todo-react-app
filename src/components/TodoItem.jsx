/* eslint-disable react/prop-types */

// import {useState} from 'react';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
// import Snackbar from '@mui/material/Snackbar';

function TodoItem(props) {
  // const [open, setOpen] = useState(false);

  // const handleClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }

  //   setOpen(false);
  // };

  const handleDelete = () => {
    props.removeTodoItem(props.id);
    // setOpen(true);
  };
    return (
        <>
         <li key={props.id}>
         <Checkbox type="checkbox" id={props.id} checked={props.isComplete} onChange={()=> props.toggleIsComplete(props.id)}/>
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
             <Button variant="outlined" color="error" type="button" onClick={handleDelete} >
              Remove <DeleteIcon/>
            </Button>
          </li>
          {/* <Snackbar
              open={open}
              autoHideDuration={5000}
              onClose={handleClose}
              message="Todo was deleted"
            /> */}
        </>
    )
}

export default TodoItem;