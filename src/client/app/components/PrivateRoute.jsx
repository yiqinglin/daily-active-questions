// @flow
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import withUser from 'app/composers/queries/withUser';

function PrivateRoute({ component: Component, isFetching, user, ...rest }) {
  if (isFetching) return null;  
  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{pathname: "/login"}}
          />
        )
      }
    />
  );
}

export default withUser(PrivateRoute);