import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function calculateProgress(startMs, endMs, nowMs = Date.now()) {
  if (startMs === null || endMs === null) {
    return 0;
  }

  // Ensure start date is before end date to avoid negative progress
  if (startMs >= endMs) {
    return 100;
  }

  const totalDuration = endMs - startMs;
  const timePassed = nowMs - startMs;
  const progress = (timePassed / totalDuration) * 100;

  // Ensure progress is between 0 and 100
  return Math.min(Math.max(progress, 0), 100);
}

function ProgressWithLabel({ startMs, endMs, state }) {
  const [progress, setProgress] = useState(() =>
    calculateProgress(startMs, endMs)
  );

  useEffect(() => {
    // Update the progress bar every second
    const interval = setInterval(() => {
      setProgress(calculateProgress(startMs, endMs));
    }, 1000);

    return () => clearInterval(interval);
  }, [startMs, endMs]);

  // Determine color based on state
  const color =
    state === 'Scheduled'
      ? 'warning'
      : state === 'Executed' || state === 'Ready to execute'
        ? 'success'
        : state === 'Cancelled'
          ? 'error'
          : 'primary';

  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" value={progress} color={color} />
      </Box>
      <Box minWidth={35}>
        <Typography
          variant="body2"
          color="text.secondary"
        >{`${Math.round(progress)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default ProgressWithLabel;
