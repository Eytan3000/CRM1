import React, { useState, useContext } from 'react';

import { Typography, Container, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Grid from '@mui/material/Grid';
import CreateLeftColumn from '../components/createNewLead/CreateLeftColumn';
import CreateRightColumn from '../components/createNewLead/CreateRightColumn';
import { format } from 'date-fns';
import SubmitButton from '../components/auxs/SubmitButton';
import { Box } from '@mui/material';

import { addLeadToDBContext } from '../contexts/DbFunctionsContext';
import { capitalizeWords } from '../helpers/helpers';
import { renderContext } from '../contexts/DbFunctionsContext';
//----------------------------------------------------------------------

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
  },
});
//----------------------------------------------------------------------

function Create({ onClose, stage }) {
  console.log('Create run');
  const addLeadToDBCtx = useContext(addLeadToDBContext);
  const { setRerender } = useContext(renderContext);

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
        // title: `${name}${nameC ? ' / ' + nameC : ''} `,
        title: `${capitalizeWords(name)} ${
          nameC ? ' / ' + capitalizeWords(nameC) : ''
        }`,
        stage: stage,
        name: capitalizeWords(name),
        phone,
        email,
        website,
        facebook,
        linkedin,
        otherLink,
        companyName: capitalizeWords(nameC),
        companyPhone: phoneC,
        companyEmail: emailC,
        companyWebsite: websiteC,
        companyFacebook: facebookC,
        companyLinkedin: linkedinC,
        companyOtherLink: otherLinkC,
        dateCreated: format(new Date(), 'dd.MM.Y'),
        notes: [],
      });
      setRerender((prevRerender) => !prevRerender);
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
            <CreateLeftColumn
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
            <CreateRightColumn
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
              handleSubmit={handleSubmit}
            />
          </Grid>
        </Grid>
        <SubmitButton />
      </form>
    </Box>
  );
}
export default Create;
// export default React.memo(Create);
