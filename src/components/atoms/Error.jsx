import React from 'react';
import ReportIcon from '@mui/icons-material/Report';
import {Box, Typography} from '@mui/material';
const Error = ({mensaje = ''}) => {
  return (
    <Box
      width="100%"
      mt={5}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box>
        <ReportIcon className="primary" sx={{fontSize: 100}}></ReportIcon>
      </Box>

      <Typography textAlign="center" variant="h6">
        {mensaje
          ? mensaje
          : 'Lo sentimos, en este momento no podemos procesar su solicitud, cierre sesión e ingrese nuevamente o intente más tarde...'}
      </Typography>
    </Box>
  );
};

export default Error;
