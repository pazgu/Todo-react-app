/* eslint-disable react/prop-types */

import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
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
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
              <label htmlFor={props.id} className={props.isComplete ? "completed text-muted" : ""}>{props.title}</label>
              </AccordionSummary>
              <AccordionDetails>
                {props.description}
                <Link to={`${props.id}`}>
                  <Button variant="contained" size="medium" type="button">
                    See Details <InfoIcon/>
                  </Button>
                </Link>
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
        </li>
    )
}

export default TodoItem;