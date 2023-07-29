import React, { Fragment } from 'react';
import LoginForm from '../components/auth/LoginForm';
import {
  AppBar,
  Button,
  Container,
  Divider,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SigninForm from '../components/auth/SigninForm';
//--------------------------------------------------
const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
    },
    title: {
      padding: theme.spacing(2),
    },
    appbar: {
      border: '1px solid #d0d4e3',
    },
    toolbar: {
      background: '#f5f7fa',
    },
    container: {
      paddingTop: theme.spacing(15),
    },
  };
});

//--------------------------------------------------

export default function Login() {
  const classes = useStyles();

  return (
    <>
      {/* App bar */}
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Typography
            className={classes.title}
            variant="h5"
            // onClick={() => navigate('/')}
            style={{ cursor: 'pointer', color: 'black' }}>
            Logo
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" className={classes.container}>
        <Typography variant="h4" gutterBottom>
          Sign in
        </Typography>

        <SigninForm />

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            OR
          </Typography>
        </Divider>
      </Container>
    </>
  );
}