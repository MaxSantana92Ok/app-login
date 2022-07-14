import React from 'react';
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';

const PublicRoute = ({children}) => {
  const {serviceToken} = useSelector(state => state.session);

  return !serviceToken ? children : <Navigate to="/" />;
};

export default PublicRoute;
