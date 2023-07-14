import {
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Stack, IconButton } from '@mui/material';
import React, { Fragment, useState } from 'react';

import { format } from 'date-fns';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VerticalIconPop from '../auxs/VerticalIconPop';
import { renderContext } from '../../contexts/DbFunctionsContext';

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
      margin: '0 0 6px 0',

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
  lead,
  notes,
  // editKey,
  // setEditKey,
  setLead,
  disabled,
}) {
  const classes = useStyles();
  const [noteInputValue, setNoteInputValue] = useState('');
  const [newNoteClicked, setNewNoteClicked] = useState(false);

  const [noteIdState, setNoteIdState] = useState(null);
  const [editKey, setEditKey] = useState(null);

  const { setRerender } = React.useContext(renderContext);
  const [open, setOpen] = React.useState(null);
  const handleOpenMenu = (event, noteId) => {
    // event.stopPropagation();

    setNoteIdState(noteId);
    setOpen(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpen(null);
  };

  function deleteNoteFromLead() {
    const modifiedNotesArr = notes.filter(
      (note) => note.noteId !== noteIdState
    );
    setLead((prevLead) => ({
      ...prevLead,
      notes: modifiedNotesArr,
    }));
    setNoteIdState(null);
  }

  const handleClickDelete = () => {
    handleCloseMenu();
    deleteNoteFromLead();
    setRerender((prevRerender) => !prevRerender);
  };

  const handleClickEdit = () => {
    handleCloseMenu();
    setEditKey(noteIdState);
  };

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
        setNewNoteClicked(false);
      }
    };

    const handleNewNoteFocus = () => {
      setNewNoteClicked(true);
    };

    const handleNewNoteBlur = () => {
      setNewNoteClicked(false);
    };

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
          autoFocus={newNoteClicked} // problem with clicking twice, resolve by setting to true after it's clicked for the first time.
          elevation={0}
          onKeyDown={handleNewNoteKeyDown}
          onChange={(e) => setNoteInputValue(e.target.value)}
          onFocus={handleNewNoteFocus}
          onBlur={handleNewNoteBlur}
          multiline={newNoteClicked}
          minRows={4}
          value={noteInputValue}
          placeholder="Take a note..."
          variant="outlined"
          className={classes.textField}
          fullWidth
        />
        {notes.length > 0 ? (
          <Stack
            width="100%"
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
                  {note.noteId === editKey ? (
                    <TextField
                      key={note.noteId}
                      multiline
                      minRows={4}
                      defaultValue={note.noteContent}
                      fullWidth
                      onKeyDown={handleNoteKeyDown}
                      elevation={0}
                      variant="outlined"
                      className={classes.textField}
                    />
                  ) : (
                    <Paper
                      elevation={0}
                      style={{
                        width: '100%',
                        height: '100%',
                        minHeight: 120,
                        border: '1px solid #d0d4e3',
                      }}>
                      <Grid
                        style={{ padding: '5px 10px 5px 10px' }}
                        xs={12}
                        sm
                        container>
                        <Grid item xs container direction="column" spacing={1}>
                          <Grid item xs>
                            <Typography
                              style={{ fontSize: '0.8em', color: 'gray' }}
                              variant="body1">
                              {note.noteDate}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="body2" color="text.secondary">
                              {note.noteContent}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle1" component="div">
                            <IconButton
                              key={note.noteId}
                              size="small"
                              onClick={(e) => {
                                handleOpenMenu(e, note.noteId);
                              }}>
                              <MoreVertIcon fontSize="0.5em" />
                            </IconButton>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  )}
                </Grid>
              );
            })}
            <VerticalIconPop
              // key={note.noteId}
              edit={true}
              open={open}
              handleCloseMenu={() => handleCloseMenu()}
              handleClickDelete={() => handleClickDelete()}
              handleClickEdit={() => handleClickEdit()}
            />
          </Stack>
        ) : (
          <Fragment>
            <img
              src="https://cdn.monday.com/images/pulse-page-empty-state.svg"
              alt="Image Description"
              width="400"
              height="500"
              className={classes.img}
            />

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
          </Fragment>
        )}
      </Container>
    );
  }
}
