// @flow
import React from 'react';
import injectSheet from 'react-jss';
import Button from 'app/components/Button';

type Props = {
  classes: Object
}

const Login = ({ classes: c}: Props) => (
  <div className={c.login}>
    <Button
      onClick={() => window.location="/auth/google"}
      text="Log in with google"
      styles={{ width: '280px', marginBottom: '20px' }}
      imgSrc="/img/new-google-favicon-512.png"
    />
    <Button
      onClick={() => console.log('About this app.')}
      text="About this app"
      styles={{ width: '280px' }}
    />
  </div>
);

const styles = {
  login: {
    width: '300px',
    minHeight: '300px',
    padding: '18px',
    marginTop: '80px'
  }
};

export default injectSheet(styles)(Login);
