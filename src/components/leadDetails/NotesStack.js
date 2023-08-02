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
import { useAuth } from '../../contexts/DbFunctionsContext';
import VerticalMenuPop from '../auxs/VerticalMenuPop';
import _ from 'lodash';
import {
  addNote,
  deleteNoteFromDb,
  loadLead,
  updateNote,
} from '../../helpers/dbFunctions';
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
          color: '#676879',
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
export default function NotesStack({ notes, setLead, lead, newId }) {
  const classes = useStyles();
  const [noteInputValue, setNoteInputValue] = useState('');
  const [newNoteClicked, setNewNoteClicked] = useState(false);
  const { currentUser } = useAuth();
  const [noteIdState, setNoteIdState] = useState(null);
  const [editKey, setEditKey] = useState(null);
  const [open, setOpen] = React.useState(null);

  const handleOpenMenu = (event, noteId) => {
    // event.stopPropagation();
    setNoteIdState(noteId);
    setOpen(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpen(null);
  };

  async function deleteNoteFromLead(leadId, noteId) {
    await deleteNoteFromDb(
      currentUser.uid,
      leadId,
      noteId,
      currentUser.accessToken
    );
  }

  const handleClickDelete = async () => {
    handleCloseMenu();
    await deleteNoteFromLead(newId, noteIdState);
    // setRerender((prevRerender) => !prevRerender);

    const updatedLead = await loadLead(
      currentUser.uid,
      newId,
      currentUser.accessToken
    );
    setLead(updatedLead);
  };

  const handleClickEdit = () => {
    handleCloseMenu();
    setEditKey(noteIdState);
  };

  //----New notes--------
  const updateNewNoteContent = async (valueToUpdate) => {
    const newNote = {
      date: `${format(new Date(), 'do MMMM Y')} , ${format(
        new Date(),
        'h:mm a'
      )}`,
      content: valueToUpdate,
    };

    await addNote(currentUser.uid, newId, newNote, currentUser.accessToken);
    const updatedLead = await loadLead(
      currentUser.uid,
      newId,
      currentUser.accessToken
    );
    setLead(updatedLead);
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

  //----Existing notes--------

  const updateNoteContent = async (keyToUpdate, valueToUpdate) => {
    try {
      // uid, leadId, noteId, token, noteContent
      await updateNote(
        currentUser.uid,
        newId,
        keyToUpdate,
        currentUser.accessToken,
        valueToUpdate
      );
      const lead = await loadLead(
        currentUser.uid,
        newId,
        currentUser.accessToken
      );
      setLead(lead);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleNoteKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      updateNoteContent(editKey, event.target.value);
      setEditKey(-1);
    }
    if (event.key === 'Escape') setEditKey(-1);
  };

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '60%',
        // minWidth: '700px',
        padding: '15px',
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
      {notes ? (
        <Stack
          width="100%"
          direction="column-reverse"
          justifyContent="flex-end"
          alignItems="center"
          spacing={1}>
          {_.map(notes, (data, key) => {
            return (
              <Grid
                key={key}
                container
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start">
                {key === editKey ? (
                  <TextField
                    // key={note.noteId}
                    multiline
                    minRows={4}
                    defaultValue={data.content}
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
                      // xs={12}
                      // sm
                      container>
                      <Grid item xs container direction="column" spacing={1}>
                        <Grid item xs>
                          <Typography
                            style={{ fontSize: '0.8em', color: 'gray' }}
                            variant="body1">
                            {data.date}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body2">
                            {data.content}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1" component="div">
                          <IconButton
                            key={key}
                            size="small"
                            onClick={(e) => {
                              handleOpenMenu(e, key);
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
          <VerticalMenuPop
            edit={true}
            del={true}
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
            style={{ textAlign: 'center' }}
            // marginTop={20}
          >
            No updates yet for this lead
          </Typography>
          <Typography
            padding={1}
            variant="subtitle1"
            style={{ textAlign: 'center' }}>
            You can start by describing how your interaction with this person
            went and when to follow up on him
          </Typography>
        </Fragment>
      )}
    </Container>
  );
}
