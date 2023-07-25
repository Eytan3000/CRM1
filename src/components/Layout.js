import {
  Drawer,
  makeStyles,
  AppBar,
  Toolbar,
  Avatar,
  TextField,
} from '@material-ui/core';
// import { AddCircleOutline, SubjectOutlined } from '@mui/icons-material';
import AlignVerticalTopOutlinedIcon from '@mui/icons-material/AlignVerticalTopOutlined';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { Fragment, useContext, useState } from 'react';
import { layoutNameContext } from '../contexts/DbFunctionsContext';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
//----------------------------------------------------------------
const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      // background: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
      // background: '#4361ee',
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: 'flex',
    },
    active: {
      background: '#f4f4f4',
    },
    title: {
      padding: theme.spacing(2),
    },
    appbar: {
      width: `calc(100% - ${drawerWidth}px)`,
      // width: '200',
      border: '1px solid #d0d4e3',
    },
    toolbar: theme.mixins.toolbar,
    date: {
      flexGrow: '1',
    },
    textField: {
      // flexGrow: '1',
      marginRight: '80%',
    },
    avatar: {
      marginLeft: theme.spacing(2),
    },
  };
});
//----------------------------------------------------------------
export default function Layout({ children }) {
  const { layoutName, setLayoutName } = useContext(layoutNameContext);

  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const [isClicked, setIsClicked] = useState(false);

  const handleNameClick = () => {
    setIsClicked(true);
    console.log('clicked');
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setLayoutName(event.target.value); //Need to change this to database query
      setIsClicked(false);
    }
    if (event.key === 'Enter') setIsClicked(false);
  };

  const handleLeadClick = (leadId) => {
    // Navigate only when clicked, not during drag
    navigate(`/lead/${leadId}`);
  };

  const menuItems = [
    {
      text: layoutName,
      icon: <AlignVerticalTopOutlinedIcon color="primary" />,
      path: '/',
    },
  ];

  const leadsInStage = [
    {
      id: '-Na65qMDA33ZygFvLdUS',
      title: 'Rotem Solomon',
      stage: 'noAnswer',
      phone: '0508657032',
      company: 'Solomon Prod',
    },
    {
      id: '-Na7TyziinkPbgQWEbLz',
      title: 'Karnina Nails',
      stage: 'noAnswer',
      phone: '0547670033',
      company: 'Karnina Nails',
    },
    {
      id: '-Na7UXJu_dm18gsujyy6',
      title: 'Quentin Tarantino',
      stage: 'noAnswer',
      phone: '0508659703',
      company: 'Tarantino Prod',
    },
  ];

  return (
    <div className={classes.root}>
      {/* App bar */}
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar>
          {!isClicked ? (
            <Typography className={classes.date} onClick={handleNameClick}>
              {/* Today is the {format(new Date(), 'do MMMM Y')} */}
              {menuItems[0].text}
            </Typography>
          ) : (
            <Fragment>
              <TextField
                variant="outlined"
                size="small"
                onKeyDown={handleKeyDown}
                className={classes.textField}
                defaultValue={layoutName}
              />
            </Fragment>
          )}
          <Typography>Eytan</Typography>
          <Avatar src="/Mario.png" className={classes.avatar} />
        </Toolbar>
      </AppBar>
      {/* Side draw */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}>
        <div>
          <Typography
            className={classes.title}
            variant="h5"
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}>
            Logo
          </Typography>
        </div>
        {/* List of Piplines, changes dinamically based on url  */}

        <List>
          {/* {location.pathname === '/' ? } */}

          {/* if url is '/' */}
          {/*<Typography
            variant="body2"
            color="primary"
            style={{ textAlign: 'center' }}>
            Boards
          </Typography>
           {menuItems.map((item) => (
            <ListItemButton key={item.text}>
              <ListItem
                key={item.text}
                onClick={() => navigate(item.path)}
                className={
                  location.pathname === item.path ? classes.active : null
                }>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </ListItemButton>
          ))} */}
          {/* If url is .../leads/.... then: */}

          {/* 
          get dndData from context
          get lead stage from lead
          get all leads in stage
          map thour leads:
          */}

          {/* <Typography
            variant="body2"
            color="primary"
            style={{ textAlign: 'center' }}>
            Lead Stage
          </Typography>
          {leadsInStage.map((item) => (
            <ListItemButton key={item.id}>
              <ListItem
                key={item.id}
                onClick={handleLeadClick}

                // className={
                //   location.pathname === item.path ? classes.active : null
                // } -- here you need to check if current url ends with the id.
              >
                <ListItemIcon>
                  <AlignHorizontalLeftIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            </ListItemButton>
          ))} */}
        </List>
      </Drawer>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        <Outlet />
      </div>
    </div>
  );
}
