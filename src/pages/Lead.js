import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import LeadDetails from '../components/LeadDetails';
import NoteStack from '../components/NoteStack';
import { loadLeadContext } from '../contexts/DbFunctionsContext';

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3),
    },
  };
});

export default function Lead({ id, stages }) {
  const classes = useStyles();

  const loadLeadCtx = useContext(loadLeadContext);

  const [lead, setLead] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [editKey, setEditKey] = useState('');

  // Find lead in database and set it to page
  useEffect(() => {
    (async () => {
      const x = await loadLeadCtx(id);
      setLead(x);
    })();
  }, [id]);

  useEffect(() => {
    updateObjectDB(id, lead);
  }, [lead]);

  const updateObjectDB = async (objectId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:8000/leads/${objectId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        console.log('Object updated successfully');
      } else {
        console.error('Failed to update object');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={classes.page}>
      <Container>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start">
          <Grid>
            <LeadDetails
              lead={lead}
              editKey={editKey}
              setEditKey={(newEditKey) => setEditKey(newEditKey)}
              setLead={(newLead) => setLead(newLead)}
              id={id}
              disabled={disabled}
              stages={stages}
            />
          </Grid>
          <Grid>
            <NoteStack
              lead={lead}
              editKey={editKey}
              setEditKey={(newEditKey) => setEditKey(newEditKey)}
              setLead={(newLead) => setLead(newLead)}
              disabled={disabled}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
