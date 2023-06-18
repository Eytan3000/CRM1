import React from 'react';
import TitleLabel from './TitleLabel';
import InputFieldText from './InputFieldText';
import { Grid, IconButton, makeStyles } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';

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

function convertCamelCaseToSpaces(str) {
  const result = str.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export default function LeadDetails({
  lead,
  editKey,
  setEditKey,
  setLead,
  id,
  disabled,
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
      console.log(editKey, event.target.value);
      updateLead(editKey, event.target.value);

      setEditKey(-1);
    }
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
                  {key === editKey ? (
                    <InputFieldText
                      onKeyDown={handleKeyDown}
                      className={classes.customCard}
                      fullWidth
                      disabled={false}
                      key={id}
                      defaultValue={value}
                    />
                  ) : (
                    <InputFieldText
                      className={classes.customCard}
                      fullWidth
                      disabled={disabled}
                      key={id}
                      defaultValue={value}
                    />
                  )}
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
