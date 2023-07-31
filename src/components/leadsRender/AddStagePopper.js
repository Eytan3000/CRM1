import React, { Fragment, useRef, useState } from 'react';
import {
  Button,
  IconButton,
  InputAdornment,
  Popover,
  TextField,
  makeStyles,
} from '@material-ui/core';

import EditIcon from '@mui/icons-material/Edit';
import { updateStageToDb } from '../../helpers/dbFunctions';
import { toCamelCase } from '../../helpers/helpers';
import { useAuth } from '../../contexts/DbFunctionsContext';

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
      // height: '1px',
      // background: '#F00B0B',
    },
  };
});

function AddStagePopper({ stages, setStages }) {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [popupValue, setPopupValue] = React.useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isError, setIsError] = React.useState(false);

  const buttonRef = useRef(null);

  const handlePopperClick = (event) => {
    setAnchorEl(event.currentTarget);
    buttonRef.current.blur();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(currentUser.uid);

  const updateStage = (newStage) => {
    const camelCaseNewStage = toCamelCase(newStage);

    updateStageToDb(currentUser.uid, camelCaseNewStage)
      .then((data) => {
        setStages((prevStage) => [
          ...prevStage,
          { id: data.name, name: newStage },
        ]);
      })
      .catch((err) => console.error(err));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      //
      const newStage = event.target.value.trim();
      const camelCaseNewStage = toCamelCase(newStage);
      //check for duplicates:
      const stageExists = stages.some(
        (stage) => stage.name === camelCaseNewStage
      );

      if (stageExists) {
        setIsError(true);
        return;
      }
      setIsError(false);
      //

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

  function handleChacge(event) {
    setIsError(false);
    setInputValue(event.target.value);
  }

  return (
    <Fragment>
      <Button
        size="medium"
        ref={buttonRef}
        variant="contained"
        onClick={handlePopperClick}>
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
        <TextField
          variant="outlined"
          onKeyDown={handleKeyDown}
          className={classes.customCard}
          fullWidth
          error={isError}
          key={id}
          placeholder="Stage Name"
          helperText={isError && 'Stage already exists'}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onChange={handleChacge}
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
export default React.memo(AddStagePopper);
