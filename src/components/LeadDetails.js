import React from 'react';
import TitleLabel from './TitleLabel';
import InputFieldText from './InputFieldText';
import { Grid, IconButton, makeStyles } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import { convertCamelCaseToSpaces } from '../helpers/helpers';
import SelectStage from './SelectStage';
const useStyles = makeStyles((theme) => {
  return {
    // page: {
    //   background: '#f9f9f9',
    //   width: '100%',
    //   padding: theme.spacing(3),
    // },
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
  };
});

export default function LeadDetails({
  lead,
  editKey,
  setEditKey,
  setLead,
  id,
  disabled,
  stages,
}) {
  const classes = useStyles();

  const updateLead = (keyToUpdate, valueToUpdate) => {
    setLead((prevLead) => ({
      ...prevLead,
      [keyToUpdate]: valueToUpdate,
    }));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      updateLead(editKey, event.target.value);

      setEditKey(-1);
    }
  };

  const renderEditingField = (key, value) => {
    if (key === editKey) {
      if (editKey === 'stage')
        return (
          <SelectStage
            optionsArr={stages}
            updateLead={updateLead}
            currentStage={value}
          />
        );
      //stages Selection
      else
        return (
          <InputFieldText // editing
            onKeyDown={handleKeyDown}
            className={classes.customCard}
            fullWidth
            disabled={false}
            key={id}
            defaultValue={value}
          />
        );
    } else
      return (
        <InputFieldText // render regular disabled
          className={classes.customCard}
          fullWidth
          disabled={disabled}
          key={id}
          defaultValue={value}
        />
      );
  };

  return (
    <div>
      {Object.entries(lead).map(([key, value]) => {
        if (key !== 'notes') {
          return (
            <div>
              <Grid container spacing={1}>
                <Grid className={classes.titleLabel}>
                  <TitleLabel
                    variant="body1"
                    // className={classes.titleLabel}
                    label={convertCamelCaseToSpaces(key)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  {renderEditingField(key, value)}
                </Grid>
                <Grid>
                  <IconButton key={id} onClick={() => setEditKey(key)}>
                    <EditIcon className={classes.editButton} />
                  </IconButton>
                </Grid>
              </Grid>
            </div>
          );
        }
      })}
    </div>
  );
}
