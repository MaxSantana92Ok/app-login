import {Box} from '@mui/system';
import {useLayoutEffect} from 'react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {LayaoutItem} from '../components/atoms/Layaout/Layaout';
import Loading from '../components/atoms/Loading';
import {Refresh_Service} from '../redux/slices/session/services';

const ProtectedRoutes = ({children}) => {
  const [statusToken, setStatusToken] = useState('loading');

  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem('token'));

  if (token) {
    dispatch(Refresh_Service());
    return children;
  }

  if (token) {
    if (token.expires < Date.now()) {
      dispatch(Refresh_Service('token'));
      return (
        <LayaoutItem>
          <Box mb={5}>
            <Loading />
          </Box>
        </LayaoutItem>
      );
    }
  }

  if (!token === 'navigate') {
    return <Navigate to="/login" />;
  }
  /* return statusToken ? children : <Navigate to="login" />; */
};

export default ProtectedRoutes;

/* if (!loading && !serviceToken) {
    console.log('ejecuta navigate');
    return <Navigate to="/login"></Navigate>;
  }
 
  if (!loading && serviceToken) {
    console.log('ejecuta children');

    return children;
  }

  //buscando token
  return (
    loading && (
      <LayaoutItem>
        <Box mb={5}>
          {console.log('LOADING')}
          <Loading />
        </Box>
      </LayaoutItem>
    )
  ); */
