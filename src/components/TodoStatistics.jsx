/* eslint-disable react/prop-types */


function TodoStatistics(props) {
    return (
        <>
          <h1 className="app-title">Todos App</h1>
            <p>Total todos: {props.totalTodos}</p>
            <p>Activated todos: {props.activeTodos}</p>
            <p>Completed todos: {props.completedTodos}</p>
            <div className="progress-bar">
                <div 
                className="progress-bar-inner" 
                style={{ width: `${props.completionRate}%` }}
                ></div>
            </div>
        </>
    )
}

export default TodoStatistics;