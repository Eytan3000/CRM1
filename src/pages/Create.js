import React, { Fragment, useState } from 'react';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

import {
  Typography,
  Button,
  Container,
  TextField,
  Radio,
  RadioGroup,
  makeStyles,
  FormControlLabel,
  FormLabel,
  FormControl,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import InputFieldText from '../components/InputFieldText';
import LeftColumn from '../components/LeftColumn';
import RightColumn from '../components/RightColumn';
import { format } from 'date-fns';
const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  },
});

export default function Create() {
  const classes = useStyles();
  const history = useHistory();

  const [isDisabled, setIsDisabled] = useState(true);

  const [titleError, setTitleError] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [facebook, setFacebook] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [otherLink, setOtherLink] = useState('');

  const [nameC, setNameC] = useState('');
  const [phoneC, setPhoneC] = useState('');
  const [emailC, setEmailC] = useState('');
  const [websiteC, setWebsiteC] = useState('');
  const [facebookC, setFacebookC] = useState('');
  const [linkedinC, setLinkedinC] = useState('');
  const [otherLinkC, setOtherLinkC] = useState('');

  // const [dateAdded, setDateAdded] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    setTitleError(false);

    // if (name === '') setNameError(true);
    // if (details === '') setDetailsError(true);
    if (name) {
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          title: `${name}${nameC ? ' / ' + nameC : ''} `,
          stage: 'leadIn',
          name,
          phone,
          email,
          website,
          facebook,
          linkedin,
          otherLink,
          companyName: nameC,
          companyPhone: phoneC,
          companyEmail: emailC,
          companyWebsite: websiteC,
          companyFacebook: facebookC,
          companyLinkedin: linkedinC,
          companyOtherLink: otherLinkC,
          dateCreated: format(new Date(), 'dd.MM.Y'),
          notes: [],
        }),
      }).then(() => history.push('/'));
    }
  };

  return (
    <Container>
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom>
        Create a new lead
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <LeftColumn
              setName={(e) => setName(e.target.value)}
              setPhone={(e) => setPhone(e.target.value)}
              setEmail={(e) => setEmail(e.target.value)}
              setWebsite={(e) => setWebsite(e.target.value)}
              setFacebook={(e) => setFacebook(e.target.value)}
              setLinkedin={(e) => setLinkedin(e.target.value)}
              setOtherLink={(e) => setOtherLink(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <RightColumn
              setName={(e) => {
                setNameC(e.target.value);
                if (e.target.value === '') setIsDisabled(true);
                else setIsDisabled(false);
              }}
              setPhone={(e) => setPhoneC(e.target.value)}
              setEmail={(e) => setEmailC(e.target.value)}
              setWebsite={(e) => setWebsiteC(e.target.value)}
              setFacebook={(e) => setFacebookC(e.target.value)}
              setLinkedin={(e) => setLinkedinC(e.target.value)}
              setOtherLink={(e) => setOtherLinkC(e.target.value)}
              setIsDisabled={isDisabled}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightOutlinedIcon />}>
          Submit
        </Button>
      </form>
    </Container>
  );
}
