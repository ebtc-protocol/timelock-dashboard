import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function calculateProgress(startDateString, endDateString) {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);
  const now = new Date();
  
  // Ensure start date is before end date to avoid negative progress
  if (startDate > endDate) {
    return 100;
  }

  const totalDuration = endDate - startDate;
  const timePassed = now - startDate;
  const progress = (timePassed / totalDuration) * 100;

  // Ensure progress is between 0 and 100
  return Math.min(Math.max(progress, 0), 100);
}

const ProgressWithLabel = ({ startDateString, endDateString, state }) => {
  const [progress, setProgress] = useState(() => calculateProgress(startDateString, endDateString));

  useEffect(() => {
    // Update the progress bar every second
    const interval = setInterval(() => {
      setProgress(calculateProgress(startDateString, endDateString));
    }, 1000);

    return () => clearInterval(interval);
  }, [startDateString, endDateString]);

  // Determine color based on state
  const color = state === 'Scheduled' ? 'warning'
               : state === 'Executed' || state === 'Ready to execute' ? 'success'
               : state === 'Cancelled' ? 'error'
               : 'primary';

  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" value={progress} color={color} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(progress)}%`}</Typography>
      </Box>
    </Box>
  );
};

export default ProgressWithLabel;
