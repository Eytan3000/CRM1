import React, { Fragment } from 'react';
import LoginForm from '../components/auth/LoginForm';
import { AppBar, Container, Divider, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import SignUnForm from '../components/auth/SignUnForm';
import UpdateProfileForm from '../components/auth/UpdateProfileForm';
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

export default function UpdateProfile() {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <>
      {/* App bar */}
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Typography
            className={classes.title}
            variant="h5"
            onClick={() => navigate('/crm/')}
            style={{ cursor: 'pointer', color: 'black' }}>
            Logo
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" className={classes.container}>
        <Typography variant="h4" gutterBottom>
          Update Profile
        </Typography>

        <UpdateProfileForm />
      </Container>
    </>
  );
}
