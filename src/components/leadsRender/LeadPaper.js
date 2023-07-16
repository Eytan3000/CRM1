import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { formatPhoneNumber } from '../../helpers/helpers';
import { IconButton, Link, MenuItem, Popover } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { renderContext } from '../../contexts/DbFunctionsContext';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import VerticalIconPop from '../auxs/VerticalIconPop';

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
    event.stopPropagation();
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
      <Link
        sx={{
          textDecoration: 'none',
          width: '100%',
          textAlign: 'left',
        }}
        component="button"
        onClick={() => {
          idPassUp(lead.id);
          history.push('/lead');
        }}>
        <Paper
          key={keyVal}
          variant="outlined"
          sx={{
            borderRadius: '6px',
            p: 2,
            margin: 'auto',
            maxWidth: 500,
            flexGrow: 1,
            paddingRight: '0.3em',
            // backgroundColor: (theme) =>
            //   theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          }}>
          <Grid container spacing={0}>
            <Grid
              item
              xs={12}
              sm
              container
              sx={{
                my: -0.5,
              }}>
              <Grid item xs container direction="column" spacing={2}>
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
              <Grid item>
                <Typography variant="subtitle1" component="div">
                  <IconButton size="small" onClick={handleOpenMenu}>
                    <MoreVertIcon fontSize="0.5em" />
                  </IconButton>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Link>

      <VerticalIconPop
        open={open}
        handleCloseMenu={() => handleCloseMenu()}
        handleClickDelete={() => handleClickPopover()}
      />
    </React.Fragment>
  );
}
