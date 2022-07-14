import React from 'react';
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';

const PublicRoute = ({children}) => {
  const token = JSON.parse(localStorage.getItem('token'));

  return !token ? children : <Navigate to="/" />;
};

export default PublicRoute;
