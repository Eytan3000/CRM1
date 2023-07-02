import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { IconButton, Typography } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { CardActionArea, Icon, Popover, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const useStyles = makeStyles({
  card: {
    width: '300px',
    // height: '100px',
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

export default function LeadCard({ key, lead, handleDelete, idPassUp }) {
  const classes = useStyles();
  const history = useHistory();

  //
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const open = anchorEl;
  const id = open ? 'simple-popover' : undefined;
  const handleClick = () => {
    setAnchorEl(true);
  };
  const handleClose = () => {
    setAnchorEl(false);
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  //

  return (
    <Card key={key} className={classes.card} elevation={1}>
      <CardActionArea
        onClick={(e) => {
          idPassUp(lead.id);
          history.push('/lead');
        }}>
        <CardHeader
          className={classes.header}
          action={
            <Icon onClick={() => handleDelete(lead.id)}>
              <DeleteOutline />
            </Icon>
          }
          title={lead.title}
          // subheader={lead.phone}
        />
      </CardActionArea>
      <CardContent>
        <Typography
          className={classes.subheader}
          variant="body1"
          color="textSecondary"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => {
            navigator.clipboard.writeText(lead.phone);
            handleClick();
          }}>
          {lead.phone}

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}>
            Phone Copied
          </Popover>
          {isHovered ? <span>Copy</span> : null}
        </Typography>
      </CardContent>
    </Card>
  );
}
