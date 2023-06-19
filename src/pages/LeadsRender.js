import React, { useEffect, useState } from 'react';
import {
  Button,
  IconButton,
  InputAdornment,
  Popover,
  makeStyles,
} from '@material-ui/core';
import NoteCard from '../components/NoteCard';
import Stack from '@mui/material/Stack';
import TitleLabel from '../components/TitleLabel';
import { convertCamelCaseToSpaces } from '../helpers/helpers';
import InputFieldText from '../components/InputFieldText';

import EditIcon from '@mui/icons-material/Edit';

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
    customCard: {
      height: '1px',
      background: '#F00B0B',
    },
  };
});

export default function LeadsRender({ idPassUp }) {
  const classes = useStyles();
  const [leads, setLeads] = useState([]);
  const [stages, setStages] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [popupValue, setPopupValue] = React.useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/leads')
      .then((res) => res.json())
      .then((data) => setLeads(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/stages')
      .then((res) => res.json())
      .then((data) => setStages(data))
      .catch((err) => console.log(err));
  }, []);

  //////////////////////////////////////////////
  const updateStage = (newStage) => {
    fetch('http://localhost:8000/stages', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        name: newStage,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setStages((prevStage) => [...prevStage, { ...data }]);
      })

      .catch((err) => console.error(err));
  };
  //////////////////////////////////////////////
  const handleDelete = async (id) => {
    await fetch('http://localhost:8000/leads/' + id, {
      method: 'DELETE',
    });
    const newLeads = leads.filter((note) => note.id !== id);
    setLeads(newLeads);
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 3,
  };

  function leadRenderColumn(leads, stage) {
    const leadIns = leads.map((note) => {
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      event.target.value !== '' && updateStage(event.target.value);
      setPopupValue('');
      handleClose();
      handleMouseLeave();
      // event.currentTarget.blur(); // Blur the button to remove focus
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div>
      <Button variant="contained" onClick={handleClick}>
        Add Stage
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
        <InputFieldText
          onKeyDown={handleKeyDown}
          className={classes.customCard}
          fullWidth
          key={id}
          label="Stage Name"
          value={popupValue}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onChange={(event) => setInputValue(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                {isHovered || inputValue !== '' ? (
                  <IconButton aria-label="Edit" size="small">
                    <EditIcon />
                  </IconButton>
                ) : null}
              </InputAdornment>
            ),
          }}
        />
      </Popover>
      <Stack direction="row" spacing={1} justifyContent="flex-start">
        {stages.map((stage) => {
          return (
            <Stack className={classes.background} spacing={1}>
              <TitleLabel
                variant="h6"
                className={classes.label}
                label={convertCamelCaseToSpaces(stage.name)}
              />
              {leadRenderColumn(leads, stage.name)}
            </Stack>
          );
        })}
      </Stack>
    </div>
  );
}
