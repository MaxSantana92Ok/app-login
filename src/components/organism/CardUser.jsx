import {Avatar, Paper, Typography} from '@mui/material';
import {Box} from '@mui/system';
import React from 'react';

const CardUser = ({user = ''}) => {
  return (
    <Paper elevation={1}>
      <Box
        width="100%"
        height="60px"
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        borderBottom="1px solid lightblue"
        marginBottom={3}
      >
        <Box>
          <Typography variant="subtitle2" fontStyle="oblique" fontWeight="700">
            {user && user.name ? user.name : 'Name'}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2">
            {user && user.birthDate ? new Date(user.birthDate).toDateString() : 'Birthday'}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2">
            <Avatar src={user && user.photo ? user.photo : ''} />
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default CardUser;
