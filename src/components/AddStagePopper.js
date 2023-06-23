import React, { Fragment, useEffect, useRef, useState } from 'react';
import {
  Button,
  IconButton,
  InputAdornment,
  Popover,
  makeStyles,
} from '@material-ui/core';
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

export default function AddStagePopper({ updateStage }) {
  const classes = useStyles();

  const [popupValue, setPopupValue] = React.useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const buttonRef = useRef(null);

  // const updateStage = (newStage) => {
  //   fetch('http://localhost:8000/stages', {
  //     method: 'POST',
  //     headers: { 'Content-type': 'application/json' },
  //     body: JSON.stringify({
  //       name: newStage,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setStages((prevStage) => [...prevStage, { ...data }]);
  //     })

  //     .catch((err) => console.error(err));
  // };

  const handlePopperClick = (event) => {
    setAnchorEl(event.currentTarget);
    buttonRef.current.blur();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();

      if (inputValue.trim().length !== 0) {
        updateStage(event.target.value.trim());
        setPopupValue('');
        handleClose();
        handleMouseLeave();
        setInputValue('');
      }
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
    <Fragment>
      <Button ref={buttonRef} variant="contained" onClick={handlePopperClick}>
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
    </Fragment>
  );
}
