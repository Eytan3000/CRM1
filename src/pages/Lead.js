import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Container, Grid, Paper, makeStyles } from '@material-ui/core';
import NoteStack from '../components/NoteStack';
import { loadLeadContext } from '../contexts/DbFunctionsContext';
import { Box, TextField, Typography } from '@mui/material';
import { capitalizeWords, convertCamelCaseToSpaces } from '../helpers/helpers';
import NoteStack2 from '../components/leadRender/NoteStack2';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import image from './2.jpg';
import { updateObjectDB } from '../helpers/dbFunctions';
import AddIcon from '@mui/icons-material/Add';
import { layoutNameContext } from '../contexts/DbFunctionsContext';
import SelectStage from '../components/SelectStage';

//-----------------------------------------------------------------
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
      height: '100%',
      alignItems: 'center',
      minWidth: '100%',
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
//--------------------------------------------------------------
export default function Lead({ id, stages }) {
  const classes = useStyles();
  const { setLayoutName } = useContext(layoutNameContext);
  const loadLeadCtx = useContext(loadLeadContext);

  const [lead, setLead] = useState([]);
  // const [disabled, setDisabled] = useState(true);
  const [editKey, setEditKey] = useState('');
  const [editClicked, setEditClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Find lead in database and set it to page
  useEffect(() => {
    (async () => {
      const leadAwait = await loadLeadCtx(id);
      setLead(leadAwait);
      setLayoutName(leadAwait.title);
    })();
  }, [id]);

  useEffect(() => {
    updateObjectDB(id, lead);
  }, [lead]);

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
    if (event.key === 'Escape') setEditClicked(false);
  };

  return (
    <Fragment className={classes.page}>
      <Box style={{ background: '#f5f7faff' }}>
        <Grid
          key="lead_details"
          container
          spacing={2}
          wrap="nowrap"
          justifyContent="space-around">
          <Grid item md={3} sm={12} xs={12}>
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
                <Container
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
                </Container>

                <Box sx={{ padding: '0 0 30px 0' }}>
                  {Object.entries(lead).map(([key, value]) => {
                    if (key !== 'notes')
                      return (
                        <Grid
                          key={`${key}_${value}`}
                          container
                          spacing={2}
                          // item
                          // flexGrow={1}
                          style={{ padding: '6px', width: '100%' }}
                          wrap="nowrap">
                          <Grid key={key} item xs={true}>
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
                          </Grid>

                          <Grid
                            key={value}
                            item
                            xs={true}
                            style={{ minWidth: '200px' }}>
                            {/* Blue hover box */}
                            <Box
                              maxWidth={200}
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
                              {editKey === 'stage' && key === editKey ? (
                                <SelectStage
                                  optionsArr={stages}
                                  updateLead={updateLead}
                                  currentStage={value}
                                  onClick={handleKeyDown}
                                />
                              ) : editClicked && key === editKey ? (
                                // <input
                                //   autoFocus
                                //   className={classes.customInput}
                                //   type="text"
                                //   defaultValue={value}
                                //   onKeyDown={handleKeyDown}
                                // />
                                <TextField
                                  // id="outlined-basic"
                                  // label="Outlined"
                                  // variant="outlined"
                                  // sx={{ height: '1px' }}
                                  size="small"
                                  // value={value}
                                  defaultValue={value}
                                  onKeyDown={handleKeyDown}
                                />
                              ) : (
                                key !== 'notes' && (
                                  <Typography
                                    // onClick={handleEditClick}
                                    // gutterBottom
                                    variant="subtitle2"
                                    component="div"
                                    noWrap>
                                    {value === '' ? '-' : value}
                                  </Typography>
                                )
                              )}
                            </Box>
                          </Grid>
                        </Grid>
                      );
                  })}
                </Box>
              </Paper>
            </Container>
          </Grid>

          <Grid
            item
            md={9}
            sm={12}
            xs={12}
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
                // disabled={disabled}
                stages={stages}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
