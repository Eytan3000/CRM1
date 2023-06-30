import React, { useState, useContext } from 'react';

import { Typography, Container, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Grid from '@mui/material/Grid';
import LeftColumn from '../components/LeftColumn';
import RightColumn from '../components/RightColumn';
import { format } from 'date-fns';
import SubmitButton from '../components/SubmitButton';
import { Box } from '@mui/material';

import { addLeadToDBContext } from '../contexts/DbFunctionsContext';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default function Create({ onClose }) {
  const addLeadToDBCtx = useContext(addLeadToDBContext);

  const classes = useStyles();
  const history = useHistory();

  const [isDisabled, setIsDisabled] = useState(true);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name) {
      addLeadToDBCtx({
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
      });
      onClose();
    }
  };

  return (
    <Box>
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
              handleSubmit={handleSubmit}
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
        <SubmitButton />
      </form>
    </Box>
  );
}
