import React from 'react';
import TitleLabel from './TitleLabel';
import InputFieldText from './InputFieldText';
import { Grid, IconButton, makeStyles } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3),
    },
    titleLabel: {
      marginTop: 40,
      width: 80,
    },
    editButton: {
      marginTop: 30,
    },
    customCard: {
      height: '1px',
      background: '#F00B0B',
    },
  };
});

export default function LeadDetails() {
  const classes = useStyles();
  return <div></div>;
}
