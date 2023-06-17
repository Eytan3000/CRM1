import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { IconButton, Typography } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { Avatar, CardActionArea, makeStyles } from '@material-ui/core';
import { blue, green, pink, yellow } from '@mui/material/colors';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const useStyles = makeStyles({
  card: {
    width: '300px',
    // height: '100px',
  },
  header: {
    marginBottom: '-20px',
  },
  subheader: {
    cursor: 'pointer',
    color: 'blue',
    textDecoration: 'underline',
    marginTop: '-10px',
  },
});

export default function NoteCard({ key, note, handleDelete, idPassUp }) {
  const classes = useStyles();
  const history = useHistory();
  // const ctx = useContext(IdContext);

  return (
    <Card key={key} className={classes.card} elevation={1}>
      <CardActionArea
        onClick={(e) => {
          idPassUp(note.id);
          history.push('/lead');
        }}>
        <CardHeader
          className={classes.header}
          action={
            <IconButton onClick={() => handleDelete(note.id)}>
              <DeleteOutline />
            </IconButton>
          }
          title={note.title}
          // subheader={note.phone}
        />
      </CardActionArea>
      <CardContent>
        <Typography
          className={classes.subheader}
          variant="body1"
          color="textSecondary"
          onClick={() => navigator.clipboard.writeText(note.phone)}>
          {note.phone}
        </Typography>
      </CardContent>
    </Card>
  );
}
