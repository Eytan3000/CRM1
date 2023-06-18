import React, { useEffect, useState } from 'react';
import InputFieldText from '../components/InputFieldText';
import TitleLabel from '../components/TitleLabel';
import { Box, Container, Grid, TextField, makeStyles } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Stack } from '@mui/material';
import { format, getHours } from 'date-fns';
import ReadMoreText from '../components/ReadMoreText';
import LeadDetails from '../components/LeadDetails';
import NoteStack from '../components/NoteStack';

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3),
    },
    titleLabel: {
      marginTop: 40,
      width: 80,
    },
    editButton: {
      marginTop: 30,
    },
    customCard: {
      height: '1px',
      background: '#F00B0B',
    },
  };
});

export default function Lead({ id }) {
  const classes = useStyles();

  const [lead, setLead] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [editKey, setEditKey] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/notes')
      .then((res) => res.json())
      .then((data) => {
        data.map((lead) => (lead.id === id ? setLead(lead) : null));
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    updateObjectDB(id, lead);
  }, [lead]);

  const updateObjectDB = async (objectId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:8000/notes/${objectId}`, {
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
