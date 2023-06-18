import React, { useEffect, useState, useContext } from 'react';
import InputFieldText from '../components/InputFieldText';
import TitleLabel from '../components/TitleLabel';
import {
  Box,
  Card,
  Drawer,
  Grid,
  TextField,
  makeStyles,
} from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Stack } from '@mui/material';
import IdContext from '../components/IdContext';
import { format } from 'date-fns';

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

  const updateLead = (keyToUpdate, valueToUpdate) => {
    setLead((prevLead) => ({
      ...prevLead,
      [keyToUpdate]: valueToUpdate,
    }));
  };

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
          noteDate: format(new Date(), 'do MMMM Y'),
          noteContent: valueToUpdate,
        },
      ],
    }));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      console.log(editKey, event.target.value);
      updateLead(editKey, event.target.value);

      setEditKey(-1);
    }
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

  function convertCamelCaseToSpaces(str) {
    const result = str.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  return (
    <div className={classes.page}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start">
        <Grid>
          {Object.entries(lead).map(([key, value]) => {
            if (key !== 'notes') {
              return (
                <div>
                  <Grid container spacing={1}>
                    <Grid className={classes.titleLabel}>
                      <TitleLabel
                        variant="body1"
                        // className={classes.titleLabel}
                        label={convertCamelCaseToSpaces(key)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {key === editKey ? (
                        <InputFieldText
                          onKeyDown={handleKeyDown}
                          className={classes.customCard}
                          fullWidth
                          disabled={false}
                          key={id}
                          defaultValue={value}
                        />
                      ) : (
                        <InputFieldText
                          className={classes.customCard}
                          fullWidth
                          disabled={disabled}
                          key={id}
                          defaultValue={value}
                        />
                      )}
                    </Grid>
                    <Grid>
                      <IconButton key={id} onClick={() => setEditKey(key)}>
                        <EditIcon className={classes.editButton} />
                      </IconButton>
                    </Grid>
                  </Grid>
                </div>
              );
            }
          })}
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
    </div>
  );
}
