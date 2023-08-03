import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Button from '@mui/joy/Button';

import { Link, useNavigate } from 'react-router-dom';
import { Box, Card, CardContent } from '@mui/joy';
import DashNoDrawer from '../images/DashNoDrawer.png';
//----------------------------------------------------
const useStyles = makeStyles((theme) => ({
  // ...existing styles
  image: {
    width: '90%',
    border: '1px solid #e0e0e0',
    // boxShadow: '0 0 0 5px #e0e0e0',
    boxShadow: '0 0 0 12px #fff, 0 0 0 13px #e0e0e0', // White-filled box shadow with 1px border
    borderRadius: '5px',
  },
}));

//----------------------------------------------------
export default function HomePage() {
  const classes = useStyles();
  const navigaet = useNavigate();
  return (
    <>
      {/* <Typography
        style={{ color: '#2d3748' }}
        level="h1"
        fontSize={60}
        align="center"
        gutterBottom>
        The CRM platform to grow your business
      </Typography>
      <Typography
        style={{ color: '#646e73' }}
        level="h4"
        align="center"
        gutterBottom
        color="">
        A CRM designed by freelancers, for freelancers.{' '}
      </Typography> */}
      <Typography
        style={{ color: '#2d3748' }}
        variant="h1"
        align="center"
        gutterBottom>
        The CRM platform to grow your business
      </Typography>
      <Typography
        style={{ color: '#646e73' }}
        variant="h4"
        align="center"
        gutterBottom
        color="">
        A CRM designed by freelancers, for freelancers.{' '}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          margin: 5,
        }}>
        <Button
          style={{ textTransform: 'none', marginRight: '20px' }}
          onClick={() => {
            navigaet('/signup');
          }}
          variant="solid"
          size="lg">
          Get Started - it's free!
        </Button>
        <Button
          onClick={() => {
            navigaet('/signup');
          }}
          style={{ textTransform: 'none' }}
          variant="outlined"
          size="lg">
          Learn more
        </Button>
      </Box>
      <Container style={{ textAlign: 'center' }}>
        <img className={classes.image} src={DashNoDrawer} alt="Dashboard" />
      </Container>

      {/* --------------------------------------------------------- */}

      <Typography
        style={{ color: '#2d3748', marginTop: 100 }}
        variant="h3"
        align="center"
        gutterBottom>
        Top features{' '}
      </Typography>

      <Box
        sx={{
          margin: 5,
          // width: '100%',
          maxWidth: 600,
          display: 'flex',
          // textAlign: 'center',
          // gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 2,
          justifyContent: 'center',
        }}>
        <Card style={{ padding: 50 }}>
          <CardContent>
            <Typography variant="h6" style={{ textDecoration: 'underline' }}>
              Visual sales pipeline
            </Typography>
            <Typography>
              See your entire sales process at a glance. Update deals by
              dragging and dropping them into place.
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography level="title-md">Plain card (default)</Typography>
            <Typography>Description of the card.</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography level="title-md">Plain card (default)</Typography>
            <Typography>Description of the card.</Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
