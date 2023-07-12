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
//       const response = await fetch(`http://localhost:8000/leads/${objectId}`, {
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
// //-----------------------------------------------------------------------------------
// //-----------------------------------------------------------------------------------
import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid, Paper, makeStyles } from '@material-ui/core';
import LeadDetails from '../components/LeadDetails';
import NoteStack from '../components/NoteStack';
import { loadLeadContext } from '../contexts/DbFunctionsContext';
import { Box, ButtonBase, Typography } from '@mui/material';
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
  };
});

export default function Lead({ id, stages }) {
  const classes = useStyles();

  const loadLeadCtx = useContext(loadLeadContext);

  const [lead, setLead] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [editKey, setEditKey] = useState('');

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

  return (
    <div className={classes.page}>
      <Grid container spacing={2} justifyContent="space-around">
        <Grid item md={3} sm={3}>
          {/* <Paper>
            <Grid container direction="row" spacing={2}>
              <Grid item sx={{ marginLeft: '8px' }}>
                Name:
              </Grid>
              <Grid item>Eytan</Grid>
            </Grid>
          </Paper> */}
          <Paper
            sx={{
              p: 2,
              margin: 'auto',
              maxWidth: 500,
              flexGrow: 1,
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}>
            <Grid
              container
              // direction="column"
              spacing={2}>
              {Object.entries(fLead).map(([key, value]) => {
                return (
                  <Grid container spacing={0} item flexGrow={1}>
                    <Grid item xs={true}>
                      <Container
                        box
                        // sx={{ textAlign: 'center' }}
                      >
                        <Box
                          sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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

                    <Grid item xs={true}>
                      <Box
                        sx={{
                          // width: 300,
                          // height: 300,
                          borderRadius: '2px',
                          paddingX: '7px',
                          // paddingY: '3px',
                          // marginY: '3px',
                          backgroundColor: '#e7ebefff',
                          '&:hover': {
                            backgroundColor: '#e7ebefff',
                            opacity: [0.9, 0.8, 0.7],
                          },
                        }}>
                        <Typography
                          // gutterBottom
                          variant="subtitle2"
                          component="div">
                          {value}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Paper>
        </Grid>

        {/* <Grid item xs container direction="column" spacing={2}></Grid> */}

        <Grid item md={9} sm={9}>
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
