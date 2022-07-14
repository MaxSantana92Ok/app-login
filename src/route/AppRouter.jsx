import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import LogIn from '../components/pages/LogIn';
import Dashboard from '../components/pages/Dashboard';
import ProtectedRoutes from './ProtectedRoutes';
import Header from '../components/organism/Header';
import {Layaout} from '../components/atoms/Layaout/Layaout';
import PublicRoute from './PublicRoute';
import {Box} from '@mui/material';

const AppRouter = () => {
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
      </Layaout>
    </React.Fragment>
  );
};

export default AppRouter;
