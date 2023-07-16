import { Drawer, makeStyles, AppBar, Toolbar, Avatar } from '@material-ui/core';
import { AddCircleOutline, SubjectOutlined } from '@mui/icons-material';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';
import {
  useHistory,
  useLocation,
} from 'react-router-dom/cjs/react-router-dom.min';
import { format } from 'date-fns';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
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
    avatar: {
      marginLeft: theme.spacing(2),
    },
  };
});

export default function LeadPageLayout({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    {
      text: 'Main Pipeline',
      icon: <SubjectOutlined color="secondary" />,
      path: '/',
    },
    {
      text: 'Create Note',
      icon: <AddCircleOutline color="secondary" />,
      path: '/create',
    },
  ];

  return (
    <div className={classes.root}>
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
        <List>kajhsdfkasjhdf</List>
      </Drawer>
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}
