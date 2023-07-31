import { Container, makeStyles } from '@material-ui/core';
import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
//---------------------------------------------------------

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

//---------------------------------------------------------
export default function ProfileLayout() {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <div className={classes.root}>
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
        {/* Profile content */}
        <div className={classes.page}>
          <div className={classes.toolbar}></div>
          <Outlet />
        </div>
      </Container>
    </div>
  );
}
