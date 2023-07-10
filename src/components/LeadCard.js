import React, { Fragment, useContext, useState } from 'react';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';

import {
  CardActionArea,
  IconButton,
  MenuItem,
  Popover,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { formatPhoneNumber } from '../helpers/helpers';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { renderContext } from '../contexts/DbFunctionsContext';
//-------------------------------------------------

const useStyles = makeStyles({
  card: {
    width: '300px',
    // paddingRight: '20px',
    // height: '100px',
    '& .MuiPaper-root': {
      borderRadius: '2px', // Customize the border radius
    },
  },
  header: {
    marginBottom: '-20px',
  },
  subheader: {
    cursor: 'pointer',
    color: 'blue',
    textDecoration: 'underline',
    marginTop: '-10px',
  },
});

//-------------------------------------------------

export default function LeadCard({ keyVal, lead, handleDelete, idPassUp }) {
  // const classes = useStyles();
  const history = useHistory();
  // const theme = useTheme();

  const { setRerender } = useContext(renderContext);

  const [open, setOpen] = useState(null);
  const handleOpenMenu = (event) => {
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

  const handleTypographyClick = (event) => {
    // Copy phone
    event.stopPropagation();
    navigator.clipboard.writeText(event.currentTarget.textContent);
    // handleClick();
  };

  const card = (
    <React.Fragment>
      <CardActionArea
        onClick={(e) => {
          idPassUp(lead.id);
          history.push('/lead');
        }}>
        <CardContent
          sx={{
            my: -1,
          }}>
          <Typography variant="h6" fontSize={16} component="div">
            {lead.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary" fontSize={13}>
            {lead.company}
          </Typography>
          <Typography
            noWrap
            onClick={handleTypographyClick}
            sx={{ fontSize: 14 }}
            color="text.secondary">
            {/* {' '} */}
            {formatPhoneNumber(lead.phone)}
          </Typography>
        </CardContent>
      </CardActionArea>

      <IconButton size="small" onClick={handleOpenMenu}>
        <MoreVertIcon />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Fragment>
      <Card
        key={keyVal}
        variant="outlined"
        sx={{
          borderRadius: '6px',
          // m: -0.2,
        }}>
        {card}{' '}
      </Card>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}>
        <MenuItem sx={{ color: 'error.main' }} onClick={handleClickPopover}>
          <DeleteOutlineIcon sx={{ mr: 1 }} fontSize="small" color="error" />
          <Typography variant="subtitle1" color="error">
            Delete
          </Typography>
        </MenuItem>
      </Popover>
    </Fragment>
  );
}
