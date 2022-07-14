import {Box} from '@mui/system';
import {useLayoutEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {LayaoutItem} from '../components/atoms/Layaout/Layaout';
import Loading from '../components/atoms/Loading';
/* import {GetTokenFromStorage} from '../redux/slices/user/services'; */

const ProtectedRoutes = ({children}) => {
  const dispatch = useDispatch();

  const {serviceToken} = useSelector(state => state.session);

  /* useLayoutEffect(() => {
    if (!serviceToken && loading) {
      dispatch(GetTokenFromStorage());
    }
    return () => {};
  }, [serviceToken, loading]); */

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
  return serviceToken ? children : <Navigate to="login" />;
};

export default ProtectedRoutes;
