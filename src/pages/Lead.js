import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid, Paper, makeStyles } from '@material-ui/core';
import NoteStack from '../components/NoteStack';
import { loadLeadContext } from '../contexts/DbFunctionsContext';
import { Box, TextField, Typography } from '@mui/material';
import { convertCamelCaseToSpaces } from '../helpers/helpers';
import NoteStack2 from '../components/leadRender/NoteStack2';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import image from './2.jpg';
import { updateObjectDB } from '../helpers/dbFunctions';

// import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//   // Customize your theme options here
//   palette: {
//     primary: {
//       main: '#F00B0B',
//     },
//     secondary: {
//       main: '#3f51b5',
//     },
//   },
//   // Other theme options...
// });

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: '#f9f9f9',
      // width: '100%',
      padding: theme.spacing(3),
    },
    customInput: {
      border: '1px solid rgba(0, 0, 0, 0.23)',
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(0.5),
      backgroundColor: theme.palette.background.paper,
      '&:focus': {
        outline: 'none',
        border: '1px solid #80bdff',
        boxShadow: `0 0 0 2px #80bdff`,
      },
    },
    paper: {
      padding: theme.spacing(3),
      display: 'flex',
      flexFlow: 'column',
      // justifyContent: 'felx-start',
      // maxWidth: '100%',
      // margin: '0 auto',
      // flexDirection: 'column',
      height: '95%',
      alignItems: 'center',
    },
    img: {
      margin: '-75px 0 -75px 0',
    },
    img2: {
      height: '200px',
      margin: '60px 0 20px 0',
    },
  };
});

export default function Lead({ id, stages }) {
  const classes = useStyles();

  const loadLeadCtx = useContext(loadLeadContext);

  const [lead, setLead] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [editKey, setEditKey] = useState('');
  const [editClicked, setEditClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Find lead in database and set it to page
  useEffect(() => {
    (async () => {
      const leadAwait = await loadLeadCtx(id);
      setLead(leadAwait);
    })();
  }, [id]);

  useEffect(() => {
    updateObjectDB(id, lead);
  }, [lead]);

  // const updateObjectDB = async (objectId, updatedData) => {
  //   try {
  //     const response = await fetch(`http://localhost:8000/leads/${objectId}`, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(updatedData),
  //     });

  //     if (response.ok) {
  //       console.log('Object updated successfully');
  //     } else {
  //       console.error('Failed to update object');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  const updateLead = (keyToUpdate, valueToUpdate) => {
    if (valueToUpdate !== lead.keyToUpdate) {
      setLead((prevLead) => ({
        ...prevLead,
        [keyToUpdate]: valueToUpdate,
      }));
    } else {
      console.log('same');
    }
  };

  const handleMouseEnter = (key) => {
    if (!editClicked) {
      setIsHovered(true);
      setEditKey(key);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleEditClick = () => {
    setEditClicked(true);
    setIsHovered(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log(event.target.value);
      updateLead(editKey, event.target.value);

      setEditClicked(false);
    }
  };

  return (
    <div className={classes.page}>
      <Grid
        key="lead_details"
        container
        spacing={2}
        justifyContent="space-around">
        <Grid item md={3} sm={2}>
          <Container
            style={{
              // display: 'flex',
              // flexDirection: 'column',
              // alignItems: 'center',
              // width: '60%',
              minWidth: '300px',
            }}>
            <Paper
              sx={{
                p: 2,
                margin: 'auto',
                maxWidth: 500,
                flexGrow: 1,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
              }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '12px',
                }}>
                <AccountCircleIcon sx={{ color: '#6b6cff' }} />
                <Typography
                  padding={1}
                  // gutterBottom
                  variant="h6">
                  Person
                </Typography>
              </div>

              <Container>
                <Grid
                  key="lead_details_column"
                  container
                  spacing={2}

                  // direction="column"
                >
                  {Object.entries(lead).map(([key, value]) => {
                    if (key !== 'notes')
                      return (
                        <Grid
                          key={`${key}_${value}`}
                          container
                          spacing={0}
                          item
                          flexGrow={1}>
                          <Grid key={key} item xs={true}>
                            <Container
                              box
                              // sx={{ textAlign: 'center' }}
                            >
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                }}>
                                <Typography
                                  // paddingTop={2}
                                  // gutterBottom
                                  variant="caption"
                                  fontSize={14}
                                  component="div">
                                  {convertCamelCaseToSpaces(key)}
                                </Typography>
                              </Box>
                            </Container>
                          </Grid>

                          <Grid key={value} item xs={true}>
                            <Box
                              onClick={handleEditClick}
                              onMouseEnter={() => handleMouseEnter(key)}
                              onMouseLeave={handleMouseLeave}
                              sx={{
                                borderRadius: '2px',
                                paddingX: '7px',
                                width: '95%',
                                '&:hover': {
                                  backgroundColor: isHovered && '#cbe4ff',
                                  opacity: [0.9, 0.8, 0.9],
                                  // textDecoration: 'underline',
                                  cursor: 'text',
                                  // cursor: 'pointer',
                                },
                              }}>
                              {editClicked && key === editKey ? (
                                // <TextField
                                //   // id="outlined-basic"
                                //   // label="Outlined"
                                //   // variant="outlined"
                                //   // sx={{ height: '1px' }}
                                //   size="small"
                                //   // value={value}
                                //   defaultValue={value}
                                //   onKeyDown={handleKeyDown}
                                // />

                                <input
                                  className={classes.customInput}
                                  type="text"
                                  defaultValue={value}
                                  onKeyDown={handleKeyDown}
                                />
                              ) : (
                                key !== 'notes' && (
                                  <Typography
                                    // onClick={handleEditClick}
                                    // gutterBottom
                                    variant="subtitle2"
                                    component="div">
                                    {value === '' ? '-' : value}
                                  </Typography>
                                )
                              )}
                            </Box>
                          </Grid>
                          {/* {isHovered && key === editKey && (
                      <Grid
                        item
                        onMouseEnter={() => handleMouseEnter(key)}
                        onMouseLeave={handleMouseLeave}>
                        <EditIcon
                          sx={{ paddingX: '12px' }}
                          fontSize="small"
                          onClick={handleEditClick}
                        />
                      </Grid>
                    )} */}
                        </Grid>
                      );
                  })}
                </Grid>
              </Container>
            </Paper>
          </Container>
        </Grid>

        <Grid
          item
          md={9}
          sm={10}
          sx={{
            display: 'flex',
            direction: 'column',
          }}>
          <Paper className={classes.paper}>
            <NoteStack2
              notes={lead.notes}
              editKey={editKey}
              setEditKey={(newEditKey) => setEditKey(newEditKey)}
              setLead={(newLead) => setLead(newLead)}
              id={id}
              disabled={disabled}
              stages={stages}
            />

            {/* {
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img
                src="https://cdn.monday.com/images/pulse-page-empty-state.svg"
                alt="Image Description"
                width="400"
                height="500"
                className={classes.img}
              />
              // <img
              //   src={image}
              //   alt="Image Description"
              //   className={classes.img2}
              // />
            }
            <Typography
              padding={1}
              variant="h5"
              textAlign={'center'}
              // marginTop={20}
            >
              No updates yet for this lead
            </Typography>
            <Typography padding={1} variant="subtitle1" textAlign={'center'}>
              You can start by describing how your interaction with this person
              went and when to follow up on him
            </Typography> */}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
