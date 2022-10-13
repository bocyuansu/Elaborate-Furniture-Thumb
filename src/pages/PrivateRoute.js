import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, ...rest }) => {
  const { isLogin } = useSelector((store) => store.oauth);

  return isLogin ? children : <Navigate to="/" />;
};

export default PrivateRoute;
