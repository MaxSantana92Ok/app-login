import React, {useEffect, useLayoutEffect} from 'react';
import {LayaoutItem} from '../atoms/Layaout/Layaout';
import {Box} from '@mui/system';

import {useDispatch, useSelector} from 'react-redux';
import Loading from '../atoms/Loading';
import Error from '../atoms/Error';
import {GetUsers_Service} from '../../redux/slices/users/services';
import CardUser from '../organism/CardUser';
import {Paper} from '@mui/material';

const Dashboard = () => {
  const dispatch = useDispatch();
  const {users, status_users} = useSelector(state => state.users);
  const {serviceToken} = useSelector(state => state.session);

  useEffect(() => {
    if (!status_users) {
      dispatch(GetUsers_Service(serviceToken));
    }
    return () => {};
  }, [status_users]);

  return (
    <LayaoutItem>
      <Box width="100%" minHeight="90%" display="flex" flexDirection="column">
        {status_users === 'loading' && (
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Loading />
          </Box>
        )}
        {status_users === 'success' && (
          <Box width="100%">
            {users.length > 0 &&
              users.map((user, index) => {
                return <CardUser user={user} key={index} />;
              })}
          </Box>
        )}
        {status_users === 'failed' && <Error />}
      </Box>
    </LayaoutItem>
  );
};

export default Dashboard;
