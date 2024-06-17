/* eslint-disable react/prop-types */
import ProgressBar from "./ProgressBar";
import Card from '@mui/material/Card';

function TodoStatistics(props) {
    return (
        <Card variant="outlined">
        <div className="statistics">
        <ProgressBar
        totalTodos={props.totalTodos} 
        activeTodos={props.activeTodos} 
        completedTodos={props.completedTodos} />         
        </div>
        </Card>
    )
}

export default TodoStatistics;