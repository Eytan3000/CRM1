import {
  Drawer,
  makeStyles,
  AppBar,
  Toolbar,
  Avatar,
  TextField,
} from '@material-ui/core';
import AlignVerticalTopOutlinedIcon from '@mui/icons-material/AlignVerticalTopOutlined';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { layoutNameContext } from '../contexts/DbFunctionsContext';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import { dndDataContext } from '../contexts/DbFunctionsContext';
import _ from 'lodash';
import { countNestedObjects } from '../helpers/helpers';

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
  const { dndData, setDndData } = useContext(dndDataContext);

  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const chosenElementRef = useRef(null);

  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (chosenElementRef.current) {
      chosenElementRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [location.pathname]);

  let currentStage = '';

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

  function findStage() {
    _.forEach(dndData, (data, key) => {
      data.leads.forEach((lead) =>
        lead.id === params.leadId ? (currentStage = key) : null
      );
    });
    return currentStage;
  }

  function leadsInStage() {
    let leadsInStage = [];
    _.forEach(dndData, (data, key) => {
      if (key === findStage()) {
        data.leads.forEach((lead) => leadsInStage.push(lead));
      }
    });
    return leadsInStage;
  }

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
          {/* If url is '/', show boards */}
          {location.pathname === '/' && (
            <>
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
              ))}
            </>
          )}
          {/* If url is '.../leads/....' then show all leads in lead's stage */}
          {location.pathname.startsWith('/lead/') && (
            <>
              <Typography
                variant="body2"
                // color="primary"
                color="secondary"
                // style={{ textAlign: 'center' }}
                style={{ paddingLeft: 35 }}>
                {findStage()}
              </Typography>
              {/* check if dndData exists */}
              {countNestedObjects(dndData) > 0
                ? leadsInStage().map((item) => (
                    <ListItemButton key={item.id}>
                      <ListItem
                        key={item.id}
                        onClick={() => handleLeadClick(item.id)}
                        ref={
                          params.leadId === item.id ? chosenElementRef : null
                        }
                        className={
                          params.leadId === item.id ? classes.active : null
                        }>
                        <ListItemIcon>
                          <AlignHorizontalLeftIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={item.title} />
                      </ListItem>
                    </ListItemButton>
                  ))
                : // if dndData is empty, you need to fetch leads in stage from db
                  // async () => {
                  //   await leadsInStageFetchFromDb();
                  //   return fetchedLeads.map((item) => (
                  //     <ListItemButton key={item.id}>
                  //       <ListItem
                  //         key={item.id}
                  //         onClick={() => handleLeadClick(item.id)}
                  //         ref={
                  //           params.leadId === item.id ? chosenElementRef : null
                  //         }
                  //         className={
                  //           params.leadId === item.id ? classes.active : null
                  //         }>
                  //         <ListItemIcon>
                  //           <AlignHorizontalLeftIcon color="primary" />
                  //         </ListItemIcon>
                  //         <ListItemText primary={item.title} />
                  //       </ListItem>
                  //     </ListItemButton>
                  //   ));
                  // }
                  null}
            </>
          )}
        </List>
      </Drawer>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        <Outlet />
      </div>
    </div>
  );
}
