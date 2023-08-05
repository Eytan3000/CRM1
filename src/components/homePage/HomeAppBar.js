import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appbar: {
    // Your styles here
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    cursor: 'pointer',
    color: 'black',
  },
  responsiveBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
  button: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
    },
  },
}));

const HomeAppBar = () => {
  const classes = useStyles();

  const navigate = (route) => {
    // Implement your navigation logic here
  };

  return (
    <AppBar className={classes.appbar} elevation={0}>
      <Toolbar className={classes.toolbar}>
        <Typography
          className={classes.title}
          variant="h4"
          onClick={() => navigate('')}>
          freeCRM
        </Typography>
        <Box className={classes.responsiveBox}>
          <Button onClick={() => navigate('/login')} variant="plain">
            Login
          </Button>
          <Button onClick={() => navigate('/signup')} variant="plain">
            Sign up
          </Button>
          <Button
            onClick={() => navigate('/crm')}
            variant="outlined"
            className={classes.button}>
            Go to console
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HomeAppBar;
