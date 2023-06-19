import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { IconButton, Typography } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { CardActionArea, Popover, makeStyles } from '@material-ui/core';
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

  //
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const open = anchorEl;
  const id = open ? 'simple-popover' : undefined;
  const handleClick = (event) => {
    setAnchorEl(true);
  };
  const handleClose = () => {
    setAnchorEl(false);
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  //

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
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => {
            navigator.clipboard.writeText(note.phone);
            handleClick();
          }}>
          {note.phone}
        </Typography>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}>
          Phone Copied
        </Popover>
        {isHovered ? (
          // <Popover
          //   // id={id}
          //   // open={open}
          //   // anchorEl={anchorEl}
          //   // onClose={handleClose}
          //   anchorOrigin={{
          //     vertical: 'bottom',
          //     horizontal: 'left',
          //   }}>
          //   Copy
          // </Popover>
          <div>asdfasdfd</div>
        ) : null}
      </CardContent>
    </Card>
  );
}
