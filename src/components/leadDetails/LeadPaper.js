import {
  Box,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { convertCamelCaseToSpaces } from '../../helpers/helpers';
import SelectStage from '../SelectStage';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//---------------------------------------------------------------------------------
export default function LeadPaper({
  lead,
  setLead,
  editKey,
  setEditKey,
  stages,
}) {
  const [editClicked, setEditClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTextHovered, setIsTextHovered] = useState(false);
  const [link, setLink] = useState(false);

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
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}>
      {/* Person label */}
      <Container
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '12px',
        }}>
        <AccountCircleIcon sx={{ color: '#6b6cff', padding: '0.5em' }} />
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

                <Grid key={value} item xs={true} style={{ minWidth: '200px' }}>
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
                        cursor: 'text',
                        // textDecoration: 'underline',
                        // cursor: 'pointer',
                      },
                    }}>
                    {/* Value area */}
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
                        autoFocus
                        size="small"
                        variant="outlined"
                        defaultValue={value}
                        onKeyDown={handleKeyDown}
                      />
                    ) : (
                      key !== 'notes' && (
                        <div
                          style={{
                            display: 'inline-block',
                            maxWidth: '100%',
                          }}>
                          <Typography
                            variant="subtitle2"
                            component="div"
                            noWrap
                            onMouseEnter={() => {
                              setIsTextHovered(true);
                            }}
                            onMouseLeave={() => {
                              setIsTextHovered(false);
                            }}
                            onClick={() => {
                              window.open(
                                'https://support.wwf.org.uk/earth_hour/index.php?type=individual',
                                '_blank'
                              );
                            }}
                            style={{
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              textDecoration:
                                isTextHovered && editKey === key && 'underline',
                              cursor:
                                isTextHovered && editKey === key && 'pointer',
                              color:
                                key === 'email' ||
                                key === 'website' ||
                                key === 'facebook' ||
                                key === 'linkedin' ||
                                key === 'otherLink'
                                  ? '#0084be'
                                  : null,
                            }}>
                            {value === '' ? '-' : value}
                          </Typography>
                        </div>
                      )
                    )}
                  </Box>
                </Grid>
              </Grid>
            );
        })}
      </Box>
    </Paper>
  );
}
