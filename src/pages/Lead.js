// import React, { useContext, useEffect, useState } from 'react';
// import { Container, Grid, makeStyles } from '@material-ui/core';
// import LeadDetails from '../components/LeadDetails';
// import NoteStack from '../components/NoteStack';
// import { loadLeadContext } from '../contexts/DbFunctionsContext';
// const useStyles = makeStyles((theme) => {
//   return {
//     page: {
//       background: '#f9f9f9',
//       width: '100%',
//       padding: theme.spacing(3),
//     },
//   };
// });
// export default function Lead({ id, stages }) {
//   const classes = useStyles();
//   const loadLeadCtx = useContext(loadLeadContext);
//   const [lead, setLead] = useState([]);
//   const [disabled, setDisabled] = useState(true);
//   const [editKey, setEditKey] = useState('');
//   // Find lead in database and set it to page
//   useEffect(() => {
//     (async () => {
//       const leadAwait = await loadLeadCtx(id);
//       setLead(leadAwait);
//     })();
//   }, [id]);
//   useEffect(() => {
//     updateObjectDB(id, lead);
//   }, [lead]);
//   const updateObjectDB = async (objectId, updatedData) => {
//     try {
// const response =` await fetch(`http://localhost:8000/leads/${objectId}`, {`
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedData),
//       });
//       if (response.ok) {
//         console.log('Object updated successfully');
//       } else {
//         console.error('Failed to update object');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
//   return (
//     <div className={classes.page}>
//       <Container>
//         <Grid
//           container
//           direction="row"
//           justifyContent="space-between"
//           alignItems="flex-start">
//           <Grid>
//             <LeadDetails
//               lead={lead}
//               editKey={editKey}
//               setEditKey={(newEditKey) => setEditKey(newEditKey)}
//               setLead={(newLead) => setLead(newLead)}
//               id={id}
//               disabled={disabled}
//               stages={stages}
//             />
//           </Grid>
//           <Grid>
//             <NoteStack
//               lead={lead}
//               editKey={editKey}
//               setEditKey={(newEditKey) => setEditKey(newEditKey)}
//               setLead={(newLead) => setLead(newLead)}
//               disabled={disabled}
//             />
//           </Grid>
//         </Grid>
//       </Container>
//     </div>
//   );
// }
// //

// //--------------
import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid, Paper, makeStyles } from '@material-ui/core';
import NoteStack from '../components/NoteStack';
import { loadLeadContext } from '../contexts/DbFunctionsContext';
import { Box, TextField, Typography } from '@mui/material';
import { convertCamelCaseToSpaces } from '../helpers/helpers';

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

  const [fLead, setfLead] = useState({
    stage: 'Call in a month',
    name: 'Rotem Rozenberg',
    phone: '0508657400',
    email: '',
    website: '',
    facebook: '',
    linkedin: '',
    otherLink: '',
    companyName: 'Rozenberg Prod',
    companyPhone: '',
    companyEmail: '',
    companyWebsite: '',
    companyFacebook: '',
    companyLinkedin: '',
    companyOtherLink: '',
    dateCreated: '05.07.2023',
    notes: [],
    id: 42,
  });

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

  const updateObjectDB = async (objectId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:8000/leads/${objectId}`, {
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

  // const updateLead = (keyToUpdate, valueToUpdate) => {
  //   setLead((prevLead) => ({
  //     ...prevLead,
  //     [keyToUpdate]: valueToUpdate,
  //   }));
  // };

  const updateLead = (keyToUpdate, valueToUpdate) => {
    console.log(lead.keyToUpdate);
    console.log(keyToUpdate);
    console.log(lead);

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
          <Paper
            sx={{
              p: 2,
              margin: 'auto',
              maxWidth: 500,
              flexGrow: 1,
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}>
            <Typography
              padding={1}
              // gutterBottom
              variant="h6">
              Person
            </Typography>

            <Container>
              <Grid
                key="lead_details_column"
                container
                spacing={2}

                // direction="column"
              >
                {Object.entries(lead).map(([key, value]) => {
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
        </Grid>

        <Grid item md={9} sm={10}>
          <Paper sx={{ minWidth: '200px' }}>
            <NoteStack
              lead={lead}
              editKey={editKey}
              setEditKey={(newEditKey) => setEditKey(newEditKey)}
              setLead={(newLead) => setLead(newLead)}
              disabled={disabled}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
