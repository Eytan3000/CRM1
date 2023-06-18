import React, { useEffect, useState } from 'react';
import InputFieldText from '../components/InputFieldText';
import TitleLabel from '../components/TitleLabel';
import { Box, Container, Grid, TextField, makeStyles } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Stack } from '@mui/material';
import { format, getHours } from 'date-fns';
import ReadMoreText from '../components/ReadMoreText';
import LeadDetails from '../components/LeadDetails';

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
  const [noteInputValue, setNoteInputValue] = useState('');

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

  const updateNoteContent = (keyToUpdate, valueToUpdate) => {
    setLead((prevLead) => ({
      ...prevLead,
      notes: prevLead.notes.map((note) => {
        if (note.noteId === keyToUpdate) {
          return {
            ...note,
            noteContent: valueToUpdate,
          };
        }
        return note;
      }),
    }));
  };

  const updateNewNoteContent = (valueToUpdate) => {
    setLead((prevLead) => ({
      ...prevLead,
      notes: [
        ...prevLead.notes,
        {
          noteId: prevLead.notes.length + 1,
          noteDate: `${format(new Date(), 'do MMMM Y')} , ${format(
            new Date(),
            'h:mm a'
          )}`,
          noteContent: valueToUpdate,
        },
      ],
    }));
  };

  const handleNoteKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      updateNoteContent(editKey, event.target.value);
      setEditKey(-1);
    }
  };

  const handleNewNoteKeyDown = (event) => {
    if (
      event.key === 'Enter' &&
      !event.shiftKey &&
      event.target.value.trim() !== ''
    ) {
      event.preventDefault();
      updateNewNoteContent(event.target.value);
      setNoteInputValue('');
    }
  };

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
      <Container maxWidth="sm">
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
            <Stack
              direction="column-reverse"
              justifyContent="flex-end"
              alignItems="center"
              spacing={1}>
              {Object.entries(lead).map(([key, value]) => {
                if (key === 'notes') {
                  return value.map((note) => {
                    return (
                      <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start">
                        <Grid>
                          {note.noteId === editKey ? (
                            <TextField
                              id="filled-multiline-static"
                              key={`noteId_${note.id}`}
                              multiline
                              minRows={4}
                              placeholder="Note"
                              // value={note.noteContent}
                              variant="filled"
                              fullWidth
                              disabled={false}
                              onKeyDown={handleNoteKeyDown}
                            />
                          ) : (
                            <TextField
                              id="filled-multiline-static"
                              key={`noteId_${note.id}`}
                              multiline
                              minRows={4}
                              // maxRows={6}
                              placeholder="Note"
                              value={note.noteContent}
                              variant="filled"
                              fullWidth
                              disabled={disabled}
                              label={note.noteDate}
                            />
                          )}
                        </Grid>
                        <Grid>
                          <IconButton
                            key={note.noteId}
                            onClick={() => setEditKey(note.noteId)}>
                            <EditIcon className={classes.editButton} />
                          </IconButton>
                        </Grid>
                      </Grid>
                    );
                  });
                }
              })}
              {/* New Note */}
              <TextField
                onKeyDown={handleNewNoteKeyDown}
                onChange={(e) => setNoteInputValue(e.target.value)}
                value={noteInputValue}
                id="new note"
                multiline
                minRows={4}
                placeholder="New note"
                variant="filled"
                fullWidth
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}