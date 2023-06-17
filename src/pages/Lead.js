import React, { useEffect, useState, useContext } from 'react';
import InputFieldText from '../components/InputFieldText';
import TitleLabel from '../components/TitleLabel';
import {
  Box,
  Card,
  Drawer,
  Grid,
  TextField,
  makeStyles,
} from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Stack } from '@mui/material';
import IdContext from '../components/IdContext';

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

export default function Lead({ id }) {
  const classes = useStyles();

  const [lead, setLead] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [editKey, setEditKey] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/notes')
      .then((res) => res.json())
      .then((data) => {
        data.map((lead) => (lead.id === id ? setLead(lead) : null));
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    updateObjectDB(id, lead);
  }, [lead]);

  const updateLead = (keyToUpdate, valueToUpdate) => {
    setLead((prevLead) => ({
      ...prevLead,
      [keyToUpdate]: valueToUpdate,
    }));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      updateLead(editKey, event.target.value);
      setEditKey(-1);
    }
  };

  const updateObjectDB = async (objectId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:8000/notes/${objectId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        console.log('Object updated successfully');
      } else {
        console.error('Failed to update object');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  function convertCamelCaseToSpaces(str) {
    const result = str.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  return (
    <div className={classes.page}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start">
        <Grid>
          {Object.entries(lead).map(([key, value]) => {
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
          })}
        </Grid>
        <Grid>
          <Stack
            direction="column-reverse"
            justifyContent="flex-end"
            alignItems="center"
            spacing={1}>
            <TextField
              id="filled-multiline-static"
              // label="Multiline"
              multiline
              minRows={4}
              placeholder="Note"
              value="value1"
              variant="filled"
              fullWidth
              disabled={true}
            />

            <TextField
              id="new note"
              // label="Multiline"
              multiline
              minRows={4}
              placeholder="Note"
              variant="filled"
              fullWidth
            />
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}
