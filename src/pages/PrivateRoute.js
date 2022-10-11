import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
  const { isLogin } = useSelector((store) => store.oauth);
  return (
    <Route
      {...rest}
      render={() => {
        return isLogin ? children : <Redirect to="/"></Redirect>;
      }}
    ></Route>
  );
};

export default PrivateRoute;
