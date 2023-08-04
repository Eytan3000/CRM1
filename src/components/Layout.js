import { Typography as JoyTypography } from '@mui/joy';
import {
  Drawer,
  makeStyles,
  AppBar,
  Toolbar,
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
import { layoutNameContext, useAuth } from '../contexts/DbFunctionsContext';
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import { dndDataContext } from '../contexts/DbFunctionsContext';
import _ from 'lodash';
import {
  capitalizeWords,
  countNestedObjects,
  removeAfterAtSymbol,
} from '../helpers/helpers';
import { fetchLeadByStage, loadLead } from '../helpers/dbFunctions';
import { Avatar } from '@mui/joy';
import AppBarMenu from './AppBarMenu';
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
export default function Layout() {
  const { layoutName, setLayoutName } = useContext(layoutNameContext);
  const { dndData, setDndData } = useContext(dndDataContext);
  const { currentUser } = useAuth();
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [leadArr, setLeadsArr] = useState('');
  const [currentStageState, setCurrentStageState] = useState('');

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

  // fetch state of current lead
  useEffect(() => {
    async function setCurrentStageFunc() {
      try {
        const currentLead = await loadLead(
          currentUser.uid,
          params.leadId,
          currentUser.accessToken
        );
        setCurrentStageState(currentLead.stage);
      } catch (error) {
        console.error('Error fetching leads:', error);
        return [];
      }
    }
    setCurrentStageFunc();
  }, []);

  // fetch other leads in current state
  useEffect(() => {
    async function fetchLeadsFromBackend(userId, stage) {
      try {
        const leadsArr = await fetchLeadByStage(
          userId,
          stage,
          currentUser.accessToken
        );
        setLeadsArr(leadsArr);
      } catch (error) {
        console.error('Error fetching leads:', error);
        return [];
      }
    }
    fetchLeadsFromBackend(currentUser.uid, currentStageState);
  }, [currentStageState]);

  let currentStage = '';

  const handleNameClick = () => {
    setIsClicked(true);
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // setLayoutName(event.target.value); //Need to change this to database query
      setIsClicked(false);
    }
    if (event.key === 'Enter') setIsClicked(false);
  };

  const handleLeadClick = (leadId) => {
    // Navigate only when clicked, not during drag
    navigate(`/crm/lead/${leadId}`);
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
      path: '/crm',
    },
  ];

  // function h() {
  //   setMenuIsClicked(true);
  // }

  return (
    <div className={classes.root}>
      {/* App bar */}
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar>
          {!isClicked ? (
            <Typography className={classes.date} onClick={handleNameClick}>
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
          <Typography>
            {capitalizeWords(removeAfterAtSymbol(currentUser.email))}
          </Typography>

          <AppBarMenu />
        </Toolbar>
      </AppBar>

      {/* Side draw */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}>
        <div>
          {/* <Typography
            className={classes.title}
            variant="h5"
            onClick={() => navigate('/crm')}
            style={{ cursor: 'pointer' }}>
            Logo
          </Typography> */}
          <JoyTypography
            className={classes.title}
            level="h4"
            onClick={() => navigate('')}
            style={{ cursor: 'pointer', color: 'black', marginRight: '700px' }}>
            freeCRM
          </JoyTypography>
        </div>
        {/* List of Piplines, changes dinamically based on url  */}

        <List>
          {/* If url is '/crm/', show boards */}
          {location.pathname === '/crm' && (
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
          {location.pathname.startsWith('/crm/lead/') && (
            <>
              <Typography
                variant="body2"
                color="primary"
                // color="secondary"
                // style={{ textAlign: 'center' }}
                style={{ paddingLeft: 20 }}>
                {/* {findStage()} */}
                <Link to="/crm">Back</Link>
              </Typography>
              {/* check if dndData exists - This loads faster */}
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
                : // if dndData is empty, fetch leads in stage from db (2 last useEffect hooks)
                  leadArr &&
                  leadArr.map((item) => (
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
                  ))}
            </>
          )}
        </List>
      </Drawer>

      {/* crm content */}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        <Outlet />
      </div>
    </div>
  );
}
