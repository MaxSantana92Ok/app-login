import {Box} from '@mui/system';
import {useLayoutEffect} from 'react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {LayaoutItem} from '../components/atoms/Layaout/Layaout';
import Loading from '../components/atoms/Loading';
import {Refresh_Service} from '../redux/slices/session/services';

const ProtectedRoutes = ({children}) => {
  const dispatch = useDispatch();
  const {loading, serviceToken} = useSelector(state => state.session);
  const tokenStorage = JSON.parse(localStorage.getItem('token'));

  useLayoutEffect(() => {
    if (tokenStorage) {
      dispatch(Refresh_Service(tokenStorage.expires));
    }

    return () => {};
  }, []);

  if (!serviceToken && !loading) {
    return <Navigate to="/login" />;
  }

  if (serviceToken && !loading) {
    return children;
  }

  return (
    <LayaoutItem>
      <Box mb={5}>
        <Loading />
      </Box>
    </LayaoutItem>
  );
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
