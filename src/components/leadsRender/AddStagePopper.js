import React, { Fragment, useRef, useState } from 'react';
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Popover,
  TextField,
  makeStyles,
} from '@material-ui/core';
import InputFieldText from '../auxs/InputFieldText';

import EditIcon from '@mui/icons-material/Edit';
import { updateStageToDb } from '../../helpers/dbFunctions';
import { toCamelCase } from '../../helpers/helpers';

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

  // console.log(stages);
  const updateStage = (newStage) => {
    const camelCaseNewStage = toCamelCase(newStage);

    updateStageToDb(camelCaseNewStage)
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
        // color="primary"
        size="medium"
        // variant="text"
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
        {/* <InputFieldText
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
        /> */}

        <TextField
          // style={{ marginTop: 20, marginBottom: 20, display: 'block' }}
          // style={{ marginTop: 2 }}
          variant="outlined"
          onKeyDown={handleKeyDown}
          className={classes.customCard}
          fullWidth
          error={isError}
          key={id}
          // label="Stage Name"
          placeholder="Stage Name"
          helperText={isError && 'Stage already exists'}
          // value={popupValue}
          // defaultValue="Enter stage name"
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
