import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = () => {
  return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "90vh", margin: "auto" }}>
          <CircularProgress />
      </Box>
  )
};

export default Loading;