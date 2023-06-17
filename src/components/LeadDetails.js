import React from 'react';
import TitleLabel from './TitleLabel';
import InputFieldText from './InputFieldText';
import { Grid, IconButton, makeStyles } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';

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
  };
});

export default function LeadDetails() {
  const classes = useStyles();
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
              // onChange={onChange}
              className={classes.customCard}
              // label={value}
              // variant={variant}
              fullWidth
              // error={error}
              disabled={false}
              key={id}
              defaultValue={value}
            />
          ) : (
            <InputFieldText
              // onChange={onChange}
              className={classes.customCard}
              // label={value}
              // label="sdfsdfsd"
              // variant={variant}
              fullWidth
              // error={error}
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
