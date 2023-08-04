import { Grid, Typography, makeStyles } from '@material-ui/core';
import { Avatar, Box, Card, CardContent } from '@mui/joy';
import React, { useEffect, useState } from 'react';
import AmeliaDavies from '../../images/avatars/AmeliaDavies.jpeg';
import MiaMitchell from '../../images/avatars/MiaMitchell .jpeg';
import DavidRoberts from '../../images/avatars/DavidRoberts.jpeg';
import EvelynThompson from '../../images/avatars/EvelynThompson.jpeg';
import AmeliaMartinez from '../../images/avatars/AmeliaMartinez.jpeg';
import NoahPatel from '../../images/avatars/NoahPatel.jpeg';
//------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: 'flex',
    overflowX: 'hidden',
    marginTop: 50,
    marginBottom: 100,
  },
  card: {
    width: 300, // Adjust the width as per your card's size
    margin: theme.spacing(0, 1), // Adjust the margin to create spacing between cards
    transition: 'transform 0.5s ease', // Add a smooth transition effect
  },
  firstCard: {
    marginLeft: 0, // Remove the left margin of the first card
  },
  lastCard: {
    marginRight: 0, // Remove the right margin of the last card
  },
}));

const testimonialsArr = [
  {
    name: 'Amelia Davies',
    company: 'PixelWave Productions',
    avatarSrc: AmeliaDavies,
    message:
      'freeCRM has transformed my business with its intuitive interface and powerful features. Highly recommended',
  },
  {
    name: 'Mia Mitchell',
    company: 'AdGenius Solutions',
    avatarSrc: MiaMitchell,
    message:
      'freeCRM is a game-changer! Streamlined workflows and excellent support. Couldnt be happier!',
  },
  {
    name: 'David Roberts',
    company: 'DesignDazzle Co.',
    avatarSrc: DavidRoberts,
    message:
      'Impressed by freeCRMs seamless organization and seamless customer interactions. A must-have tool!',
  },
  {
    name: 'Evelyn Thompson',
    company: 'VisualVibe Studios',
    avatarSrc: EvelynThompson,
    message:
      'freeCRM elevated my productivity, nurturing leads to conversions effortlessly. Very good customer support. Thank you!',
  },
  {
    name: 'Amelia Martinez',
    company: 'AdSprint Creators',
    avatarSrc: AmeliaMartinez,
    message:
      'As a delighted user of freeCRM, I can vouch for its efficiency and time-saving capabilities. A very effectivce tool.',
  },
  {
    name: 'Noah Patel',
    company: 'PostCraft Productions',
    avatarSrc: NoahPatel,
    message:
      'freeCRMs user-friendly design and robust analytics have optimized our sales process. Highly recommended - 5 stars!',
  },
];

function TestimonyCard({ testimony }) {
  return (
    <Card variant="soft">
      <CardContent>
        <Grid container spacing={2}>
          <Grid item>
            <Typography variant="body1">{testimony.message}</Typography>
          </Grid>
          <Grid item>
            <Avatar alt={testimony.name} src={testimony.avatarSrc} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">{testimony.name}</Typography>
            <Typography variant="body2">{testimony.company}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
//------------------------------------------------------
export default function Testimonials() {
  const classes = useStyles();
  const [testimonies, setTestimonies] = useState(testimonialsArr);
  const numVisibleCards = Math.min(4, testimonies.length);

  const rotateTestimonies = () => {
    setTestimonies((prevTestimonies) => {
      const [lastTestimony, ...restTestimonies] = prevTestimonies;
      return [...restTestimonies, lastTestimony];
    });
  };

  useEffect(() => {
    const interval = setInterval(rotateTestimonies, 7000); // Rotate every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Box className={classes.cardContainer}>
        {testimonies.map((testimony, index) => (
          <div
            key={index}
            className={classes.card}
            style={{ display: index < numVisibleCards ? 'block' : 'none' }}>
            <TestimonyCard testimony={testimony} />
          </div>
        ))}
      </Box>
    </>
  );
}
