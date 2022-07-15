import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import LogIn from '../components/pages/LogIn';
import Dashboard from '../components/pages/Dashboard';
import ProtectedRoutes from './ProtectedRoutes';
import Header from '../components/organism/Header';
import {Layaout} from '../components/atoms/Layaout/Layaout';
import PublicRoute from './PublicRoute';
import {Alert, Box, Snackbar} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {setAlertClose_Action} from '../redux/slices/interface/interfaceSlice';

const AppRouter = () => {
  const dispatch = useDispatch();
  const {data_alert} = useSelector(state => state.interface);
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAlertClose_Action());
  };
  return (
    <React.Fragment>
      <Layaout>
        <Box width="100%" display="flex">
          <Header />
        </Box>

        <Routes>
          <Route
            path="login/*"
            element={
              <PublicRoute>
                <Routes>
                  <Route path="/*" element={<LogIn />} />
                  {/* Se podría anexar varias rutas públicas para escalar proyecto */}
                </Routes>
              </PublicRoute>
            }
          ></Route>

          <Route
            path="/*"
            element={
              <ProtectedRoutes>
                {/* Se podría anexar varias rutas privadas para escalar proyecto */}
                <Dashboard></Dashboard>
              </ProtectedRoutes>
            }
          ></Route>
        </Routes>
        <Snackbar
          open={data_alert.open}
          autoHideDuration={data_alert.duration}
          onClose={handleCloseAlert}
        >
          <Alert onClose={handleCloseAlert} severity={data_alert.severity} sx={{width: '100%'}}>
            {data_alert.message}
          </Alert>
        </Snackbar>
      </Layaout>
    </React.Fragment>
  );
};

export default AppRouter;
