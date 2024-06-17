/* eslint-disable react/prop-types */

import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from "react-router-dom"

function TodoItem(props) {

  const handleDelete = () => {
    props.removeTodoItem(props.id);
  };

    return (
        <li key={props.id}>
        <Checkbox type="checkbox" id={props.id} checked={props.isComplete} onChange={()=> props.toggleIsComplete(props.id)}/>
          {props.editTodoId === props.id ? (
            <>
              <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                  <input 
                type="text" 
                value={props.editTodoTitle} 
                onChange={(ev) => props.setEditTodoTitle(ev.target.value)} 
                className="edit-todo-input" 
              />
              <Button variant="contained" color="success" type="button" onClick={() => props.saveTodoItem(props.id)}>
                Save <SaveIcon/>
              </Button>
              </AccordionSummary>
              <AccordionDetails>  
              {props.description} 
              <div>
                {props.labels && props.labels.length > 0 ? (
                  props.labels.map((label, index) => (
                    <Chip key={index} label={label} style={{ marginRight: 5 }} />
                  ))
                ) : (
                  ""
                )}
              </div>                     
              </AccordionDetails>
            </Accordion>
            </>
          ) : (
            <>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Link to=":id">
                  <label htmlFor={props.id} className={props.isComplete ? "completed text-muted" : ""}>{props.title}</label>
                  </Link>
                </AccordionSummary>
                <AccordionDetails>
                  {props.description}
                  <Button variant="contained" size="medium" type="button" onClick={() => props.editTodoItem(props.id, props.title)}>
                    Edit <EditIcon/>
                  </Button>
                  <Button variant="outlined" color="error" type="button" onClick={handleDelete} >
                    Remove <DeleteIcon/>
                  </Button>
                  <div>
                    {props.labels && props.labels.length > 0 ? (
                      props.labels.map((label, index) => (
                        <Chip key={index} label={label} style={{ marginRight: 5 }} />
                      ))
                    ) : (
                      ""
                    )}
                  </div>
                </AccordionDetails>
              </Accordion>
            </>
          )}
        </li>
    )
}

export default TodoItem;