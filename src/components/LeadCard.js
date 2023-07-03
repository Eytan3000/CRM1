import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Link, Typography } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  Icon,
  Popover,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { formatPhoneNumber } from '../helpers/helpers';
//-------------------------------------------------

const useStyles = makeStyles({
  card: {
    width: '300px',
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
  const theme = useTheme();

  const handleTypographyClick = (event) => {
    // Copy the typography text
    event.stopPropagation();
    navigator.clipboard.writeText(event.currentTarget.textContent);
    // console.log('Copying text:', textToCopy);
    handleClick();
  };

  const card = (
    <React.Fragment>
      <CardActionArea
        onClick={(e) => {
          idPassUp(lead.id);
          history.push('/lead');
        }}>
        <CardContent>
          <Typography variant="h6" fontSize={16} component="div">
            {lead.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {lead.company}
          </Typography>

          <Typography
            onClick={handleTypographyClick}
            sx={{ fontSize: 14 }}
            color="text.secondary">
            {' '}
            {lead.phone}
          </Typography>

          {/* <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small">{formatPhoneNumber(lead.phone)}</Button>
      </CardActions> */}
    </React.Fragment>
  );

  return (
    // <Card
    //   key={keyVal}
    //   className={classes.card}
    //   elevation={1}
    //   // sx={{ borderRadius: '9px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' }}>
    //   sx={{
    //     borderRadius: '9px',
    //     boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    //     // border: '1px solid',
    //     // borderColor: theme.palette.grey.A100,
    //   }}>
    //   <CardActionArea
    //     onClick={(e) => {
    //       idPassUp(lead.id);
    //       history.push('/lead');
    //     }}>
    //     <CardHeader
    //       className={classes.header}
    //       action={
    //         <Icon onClick={() => handleDelete(lead.id)}>
    //           <DeleteOutline />
    //         </Icon>
    //       }
    //       title={lead.title}
    //       // subheader={lead.phone}
    //       subheader={lead.company}
    //     />
    //   </CardActionArea>
    //   <CardContent>
    //     <Typography
    //       className={classes.subheader}
    //       variant="body1"
    //       color="textSecondary"
    //       onMouseEnter={handleMouseEnter}
    //       onMouseLeave={handleMouseLeave}
    //       onClick={() => {
    //         navigator.clipboard.writeText(lead.phone);
    //         handleClick();
    //       }}>
    //       {lead.phone}

    //       <Popover
    //         id={id}
    //         open={open}
    //         anchorEl={anchorEl}
    //         onClose={handleClose}
    //         anchorOrigin={{
    //           vertical: 'bottom',
    //           horizontal: 'left',
    //         }}>
    //         Phone Copied
    //       </Popover>
    //       {isHovered ? <span>Copy</span> : null}
    //     </Typography>
    //   </CardContent>
    // </Card>

    <Box sx={{ minWidth: 275 }}>
      <Card
        key={keyVal}
        variant="outlined"
        sx={{
          borderRadius: '6px',
        }}>
        {card}{' '}
      </Card>
    </Box>
  );
}
