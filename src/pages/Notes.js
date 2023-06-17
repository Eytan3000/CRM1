import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Paper,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Grid, Container } from '@mui/material';
import NoteCard from '../components/NoteCard';
import Masonry from 'react-masonry-css';
import Stack from '@mui/material/Stack';
import { DeleteOutline } from '@mui/icons-material';
import TitleLabel from '../components/TitleLabel';
// import Grid from '@mui/material/Grid';

const useStyles = makeStyles((theme) => {
  return {
    background: {
      background: '#F2F2F2',
      width: '100%',
      padding: theme.spacing(2),
    },
    label: {
      fontWeight: 'bold',
      marginBottom: '4px',
    },
  };
});

export default function Notes({ idPassUp }) {
  const classes = useStyles();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/notes')
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    await fetch('http://localhost:8000/notes/' + id, {
      method: 'DELETE',
    });
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 3,
  };

  function leadRenderColumn(notes, stage) {
    const leadIns = notes.map((note) => {
      if (note.stage === stage)
        return (
          <div>
            <NoteCard
              note={note}
              handleDelete={handleDelete}
              idPassUp={idPassUp}
            />
          </div>
        );
    });
    return leadIns;
  }

  return (
    <Stack direction="row" spacing={1} justifyContent="flex-start">
      <Stack className={classes.background} spacing={1}>
        <TitleLabel variant="h6" className={classes.label} label="Lead In" />
        {leadRenderColumn(notes, 'leadIn')}
      </Stack>
      <Stack className={classes.background} spacing={1}>
        <TitleLabel variant="h6" className={classes.label} label="No Answer" />
        {leadRenderColumn(notes, 'noAnswer')}
      </Stack>
      <Stack className={classes.background} spacing={1}>
        <TitleLabel variant="h6" className={classes.label} label="Call Back" />
        {leadRenderColumn(notes, 'callBack')}
      </Stack>
    </Stack>
  );
}
