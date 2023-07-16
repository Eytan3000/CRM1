import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Container, Grid, Paper, makeStyles } from '@material-ui/core';
import { loadLeadContext } from '../contexts/DbFunctionsContext';
import { Box } from '@mui/material';
import NoteStack2 from '../components/leadDetails/NoteStack2';
import image from './2.jpg';
import { updateObjectDB } from '../helpers/dbFunctions';
import { layoutNameContext } from '../contexts/DbFunctionsContext';
import LeadPaper from '../components/leadDetails/LeadPaper';

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
      // justifyContent: 'felx-start',
      // maxWidth: '100%',
      // margin: '0 auto',
      // flexDirection: 'column',
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
export default function Lead({ id, stages }) {
  const classes = useStyles();
  const { setLayoutName } = useContext(layoutNameContext);
  const loadLeadCtx = useContext(loadLeadContext);

  const [lead, setLead] = useState([]);
  const [editKey, setEditKey] = useState('');

  // Find lead in database and set it to page
  useEffect(() => {
    (async () => {
      const leadAwait = await loadLeadCtx(id);
      setLead(leadAwait);
      setLayoutName(leadAwait.title);
    })();
  }, [id]);

  useEffect(() => {
    updateObjectDB(id, lead);
  }, [lead]);

  return (
    <Fragment className={classes.page}>
      <Box style={{ background: '#f5f7faff' }}>
        <Grid
          key="lead_details"
          container
          spacing={2}
          wrap="nowrap"
          justifyContent="space-around">
          <Grid item md={3} sm={12} xs={12}>
            <Container
              style={{
                // display: 'flex',
                // flexDirection: 'column',
                // alignItems: 'center',
                // width: '60%',
                minWidth: '300px',
              }}>
              <LeadPaper
                stages={stages}
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
            <Paper className={classes.paper}>
              <NoteStack2
                notes={lead.notes}
                editKey={editKey}
                setEditKey={(newEditKey) => setEditKey(newEditKey)}
                setLead={(newLead) => setLead(newLead)}
                id={id}
                stages={stages}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
