import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import { useAuth } from '../contexts/DbFunctionsContext';
import { Box } from '@mui/material';
import NotesStack from '../components/leadDetails/NotesStack';

import { loadLead, updateObjectDB } from '../helpers/dbFunctions';
import { layoutNameContext } from '../contexts/DbFunctionsContext';
import LeadPaperDetails from '../components/leadDetails/LeadPaperDetails';
import { useNavigate, useParams } from 'react-router-dom';

//-----------------------------------------------------------------
const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: '#f9f9f9',
      // width: '100%',
      padding: theme.spacing(3),
    },
    customInput: {
      border: '1px solid rgba(0, 0, 0, 0.23)',
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(0.5),
      backgroundColor: theme.palette.background.paper,
      '&:focus': {
        outline: 'none',
        border: '1px solid #80bdff',
        boxShadow: `0 0 0 2px #80bdff`,
      },
    },
    paper: {
      padding: theme.spacing(3),
      display: 'flex',
      flexFlow: 'column',
      height: '100%',
      alignItems: 'center',
      minWidth: '100%',
    },
    img: {
      margin: '-75px 0 -75px 0',
    },
    img2: {
      height: '200px',
      margin: '60px 0 20px 0',
    },
  };
});
//--------------------------------------------------------------
function Lead() {
  const params = useParams();
  const newId = params.leadId; //Get string from param (lead Id from url)
  const { currentUser } = useAuth();
  const classes = useStyles();
  const { setLayoutName } = useContext(layoutNameContext);
  const [lead, setLead] = useState([]);
  const [editKey, setEditKey] = useState('');
  const navigate = useNavigate();
  // Find lead in database and set it to page
  useEffect(() => {
    (async () => {
      const leadAwait = await loadLead(
        currentUser.uid,
        newId,
        currentUser.accessToken
      );
      if (!leadAwait) return navigate('/crm'); // plaster - if trying to access other link user is sent to crm (and then to login if he isen't logged in.)
      setLead(leadAwait);
      setLayoutName(leadAwait.title);
    })();
  }, [newId]);

  useEffect(() => {
    updateObjectDB(currentUser.uid, newId, lead, currentUser.accessToken);
  }, [lead]);

  return (
    <Box style={{ background: '#f5f7faff', paddingRight: '10px' }}>
      <Grid
        key="lead_details"
        container
        spacing={2}
        wrap="nowrap"
        justifyContent="space-around">
        <Grid item md={4} sm={12} xs={12}>
          <Container
            style={
              {
                // display: 'flex',
                // flexDirection: 'column',
                // alignItems: 'center',
                // width: '60%',
                // minWidth: '300px',
              }
            }>
            <LeadPaperDetails
              lead={lead}
              setLead={setLead}
              editKey={editKey}
              setEditKey={setEditKey}
            />
          </Container>
        </Grid>

        <Grid
          item
          md={9}
          sm={12}
          xs={12}
          sx={{
            display: 'flex',
            direction: 'column',
          }}>
          <Box
            sx={{
              background: 'white',
              border: '1px solid #dededeff',
              height: '100%',
            }}>
            <NotesStack
              notes={lead.notes}
              lead={lead}
              setLead={(newLead) => setLead(newLead)}
              newId={newId}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
export default React.memo(Lead);
