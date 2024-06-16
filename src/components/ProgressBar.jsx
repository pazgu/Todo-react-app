import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function ProgressBar(props) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '2rem'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', width: '50%' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function LinearWithValueLabel({ totalTodos, activeTodos, completedTodos }) {
  const completionRate = (totalTodos > 0) ? (completedTodos / totalTodos) * 100 : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <p>Total todos: {totalTodos}</p>
      <p>Activated todos: {activeTodos}</p>
      <p>Completed todos: {completedTodos}</p>
      <ProgressBar value={completionRate} />
    </Box>
  );
}

LinearWithValueLabel.propTypes = {
  totalTodos: PropTypes.number.isRequired,
  activeTodos: PropTypes.number.isRequired,
  completedTodos: PropTypes.number.isRequired,
};
