/* eslint-disable react/prop-types */

function TodoItem(props) {
  
    return (
        <>
         <li key={props.id}>
            <input type="checkbox" id={props.id} onChange={()=> props.toggleIsComplete(props.id)}/>
            {props.editTodoId === props.id ? (
              <>
                <input 
                  type="text" 
                  value={props.editTodoTitle} 
                  onChange={(ev) => props.setEditTodoTitle(ev.target.value)} 
                  className="edit-todo-input" 
                />
                <button type="button" onClick={() => props.saveTodoItem(props.id)} className="save-todo-button">Save</button>
              </>
            ) : (
              <>
                <label htmlFor={props.id} className={props.isComplete ? "completed text-muted" : "undone"}>{props.title}</label>
                <button type="button" onClick={() => props.editTodoItem(props.id, props.title)} className="edit-todo-button">Edit</button>
              </>
            )}
            <button type="button" onClick={() => props.removeTodoItem(props.id)} className="remove-todo-button">Remove</button>
          </li>
        </>
    )
}

export default TodoItem;