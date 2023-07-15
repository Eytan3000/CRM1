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
import {
  useHistory,
  useLocation,
} from 'react-router-dom/cjs/react-router-dom.min';
// import { format } from 'date-fns';
import { layoutNameContext } from '../contexts/DbFunctionsContext';
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
  const history = useHistory();
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

  const menuItems = [
    {
      text: layoutName,
      icon: <AlignVerticalTopOutlinedIcon color="primary" />,
      path: '/',
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
          <Typography className={classes.title} variant="h5">
            Pipelines
          </Typography>
        </div>
        {/* List */}
        <List>
          {menuItems.map((item) => (
            <ListItemButton key={item.text}>
              <ListItem
                key={item.text}
                onClick={() => history.push(item.path)}
                className={
                  location.pathname === item.path ? classes.active : null
                }>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}
