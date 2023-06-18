import { Grid, TextField, makeStyles } from '@material-ui/core';
import { Stack, IconButton } from '@mui/material';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
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

export default function NoteStack({
  lead,
  editKey,
  setEditKey,
  setLead,
  disabled,
}) {
  const classes = useStyles();
  const [noteInputValue, setNoteInputValue] = useState('');

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

  return (
    <div>
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
    </div>
  );
}
