/* eslint-disable react/prop-types */
import ProgressBar from "./ProgressBar"

function TodoStatistics(props) {
    return (
        <div className="statistics">
        <ProgressBar
        totalTodos={props.totalTodos} 
        activeTodos={props.activeTodos} 
        completedTodos={props.completedTodos} />         
        </div>
    )
}

export default TodoStatistics;