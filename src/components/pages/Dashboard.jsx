import React, {useEffect} from 'react';
import {LayaoutItem} from '../atoms/Layaout/Layaout';
import {Box} from '@mui/system';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../atoms/Loading';
import Error from '../atoms/Error';
import {GetUsers_Service} from '../../redux/slices/users/services';
import CardUser from '../organism/CardUser';
import {setAlertOpen_Action} from '../../redux/slices/interface/interfaceSlice';
import './DashboardStyles.css';
const Dashboard = () => {
  const dispatch = useDispatch();
  const {users, status_users} = useSelector(state => state.users);
  const {serviceToken} = useSelector(state => state.session);

  useEffect(() => {
    if (!status_users) {
      dispatch(GetUsers_Service(serviceToken));
    } else {
      if (status_users === 'success') {
        setTimeout(() => {
          dispatch(setAlertOpen_Action({severity: 'success', message: 'Datos de usuario exitoso'}));
        }, 700);
      }
      if (status_users === 'failed') {
        setTimeout(() => {
          dispatch(
            setAlertOpen_Action({
              severity: 'success',
              message: 'Lo sentimos, no se obtuvieron datos de usuario',
            })
          );
        }, 700);
      }
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
          <div className="CI-Dashboard">
            <Box display="flex" flexDirection="column" justifyContent="space-around">
              {users.length > 0 &&
                users.map((user, index) => {
                  return <CardUser user={user} key={index} />;
                })}
            </Box>
            <Box>
              <img
                className="img"
                src="https://i.pinimg.com/originals/e7/7c/d0/e77cd0526e693e6e7f5eb1eb0bb0f7ba.gif"
              ></img>
            </Box>
          </div>
        )}
        {status_users === 'failed' && <Error />}
      </Box>
    </LayaoutItem>
  );
};

export default Dashboard;
