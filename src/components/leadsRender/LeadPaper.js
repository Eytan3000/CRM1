import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { formatPhoneNumber } from '../../helpers/helpers';
import { Box, IconButton, Link, MenuItem, Popover } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { renderContext } from '../../contexts/DbFunctionsContext';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import VerticalIconPop from '../auxs/VerticalIconPop';
import { Block } from '@mui/icons-material';

//---------------------------------------------------------------

//---------------------------------------------------------------

export default function LeadPaper({ keyVal, lead, handleDelete, idPassUp }) {
  const { setRerender } = React.useContext(renderContext);
  const history = useHistory();

  const handleTypographyClick = (event) => {
    // Copy phone
    event.stopPropagation();
    navigator.clipboard.writeText(event.currentTarget.textContent);
  };

  const [open, setOpen] = React.useState(null);
  const handleOpenMenu = (event) => {
    // event.stopPropagation();
    setOpen(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleClickPopover = () => {
    handleCloseMenu();
    handleDelete(lead.id);
    setRerender((prevRerender) => !prevRerender);
  };
  return (
    <React.Fragment>
      {/* <Paper
        key={keyVal}
        variant="outlined"
        sx={{
          borderRadius: '6px',
          p: 2,
          margin: 'auto',
          maxWidth: 500,
          paddingRight: '0.3em',
        }}>
        <Grid
          container
          sm
          sx={{
            my: -0.5,
          }}>
          <Link
            sx={{
              textDecoration: 'none',
              textAlign: 'left',
              color: 'black',
            }}
            component="button"
            onClick={() => {
              idPassUp(lead.id);
              history.push('/lead');
            }}>
            <Grid item xs={11} container direction="column" spacing={2}>
              <Grid item xs>
                <Typography
                  gutterBottom
                  variant="h6"
                  fontSize="medium"
                  component="div">
                  {lead.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {lead.company}
                </Typography>
              </Grid>

              {lead.phone && (
                <Grid item>
                  <Typography
                    sx={{ cursor: 'pointer' }}
                    variant="body2"
                    onClick={handleTypographyClick}>
                    {formatPhoneNumber(lead.phone)}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Link>
          <Grid item xs={1}>
            <Typography variant="subtitle1" component="div">
              <IconButton size="small" onClick={handleOpenMenu}>
                <MoreVertIcon fontSize="0.5em" />
              </IconButton>
            </Typography>
          </Grid>
        </Grid>
      </Paper> */}

      <Paper
        key={keyVal}
        variant="outlined"
        sx={{
          flexGrow: 1,
          borderRadius: '6px',
          p: 2,
          margin: 'auto',
          maxWidth: 500,
          paddingRight: '0.5em',
        }}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Link
              sx={{
                textDecoration: 'none',
                textAlign: 'left',
                color: 'black',
                width: '100%',
              }}
              component="button"
              onClick={() => {
                idPassUp(lead.id);
                history.push('/lead');
              }}>
              <Grid item>
                <Typography
                  gutterBottom
                  variant="h6"
                  fontSize="medium"
                  component="div">
                  {lead.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {lead.company}
                </Typography>
              </Grid>
              {lead.phone && (
                <Grid item style={{ marginTop: '1em' }}>
                  <Typography
                    sx={{ cursor: 'pointer' }}
                    variant="body2"
                    onClick={handleTypographyClick}>
                    {formatPhoneNumber(lead.phone)}
                  </Typography>
                </Grid>
              )}
            </Link>
          </Grid>
          <Grid item xs={1} textAlign="right">
            <Typography variant="subtitle1" component="div">
              <IconButton size="small" onClick={handleOpenMenu}>
                <MoreVertIcon fontSize="0.5em" />
              </IconButton>
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <VerticalIconPop
        open={open}
        handleCloseMenu={() => handleCloseMenu()}
        handleClickDelete={() => handleClickPopover()}
      />
    </React.Fragment>
  );
}
