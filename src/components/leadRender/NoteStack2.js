import {
  Box,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Stack, IconButton } from '@mui/material';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { format } from 'date-fns';
//------------------------------------------------------
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
    textField: {
      width: '100%',

      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#0472ea',
        },
        '&:hover fieldset': {
          borderColor: '#0472ea',
        },
        '&:hover input': {
          background: '#dddfec',
        },
      },
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
//------------------------------------------------------
export default function NoteStack2({
  notes,
  editKey,
  setEditKey,
  setLead,
  disabled,
}) {
  const classes = useStyles();
  const [noteInputValue, setNoteInputValue] = useState('');
  if (!notes) {
    // Handle the case when lead is empty or undefined
    return <div>Loading...</div>; // Display a loading indicator or any other message
  } else {
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

    if (notes.length > 0) {
      return (
        <div>
          <Stack
            direction="column-reverse"
            justifyContent="flex-end"
            alignItems="center"
            spacing={1}>
            {notes.map((note) => {
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
                        key={note.noteId}
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
                        key={note.noteId}
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
    } else {
      return (
        <Container
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '60%',
            minWidth: '700px',
          }}>
          <TextField
            elevation={0}
            onKeyDown={handleNewNoteKeyDown}
            onChange={(e) => setNoteInputValue(e.target.value)}
            value={noteInputValue}
            placeholder="Take a note..."
            variant="outlined"
            className={classes.textField}
            fullWidth
          />

          {
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img
              src="https://cdn.monday.com/images/pulse-page-empty-state.svg"
              alt="Image Description"
              width="400"
              height="500"
              className={classes.img}
            />
            // <img
            //   src={image}
            //   alt="Image Description"
            //   className={classes.img2}
            // />
          }
          <Typography
            padding={1}
            variant="h5"
            textAlign={'center'}
            // marginTop={20}
          >
            No updates yet for this lead
          </Typography>
          <Typography padding={1} variant="subtitle1" textAlign={'center'}>
            You can start by describing how your interaction with this person
            went and when to follow up on him
          </Typography>
        </Container>
      );
    }
  }
}
