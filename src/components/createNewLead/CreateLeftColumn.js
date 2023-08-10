import React from 'react';
import InputFieldText from '../auxs/InputFieldText';
import { TextField } from '@material-ui/core';
import { Stack } from '@mui/material';

export default function LeftColumn({
  setName,
  setPhone,
  setEmail,
  setWebsite,
  setFacebook,
  setLinkedin,
  setOtherLink,
  handleSubmit,
}) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(event); // Call the form submit function, passes the event from the text field to the handleSubmit
    }
  };

  return (
    // <div>
    //   <InputFieldText
    //     onChange={setName}
    //     label="Name"
    //     onKeyDown={handleKeyDown}
    //   />

    //   <InputFieldText
    //     onChange={setPhone}
    //     label="Phone"
    //     onKeyDown={handleKeyDown}
    //   />
    //   <InputFieldText
    //     onChange={setEmail}
    //     label="Email"
    //     onKeyDown={handleKeyDown}
    //   />
    //   <InputFieldText
    //     onChange={setWebsite}
    //     label="Website"
    //     onKeyDown={handleKeyDown}
    //   />
    //   <InputFieldText
    //     onChange={setFacebook}
    //     label="Facebook"
    //     onKeyDown={handleKeyDown}
    //   />
    //   <InputFieldText
    //     onChange={setLinkedin}
    //     label="Linkedin"
    //     onKeyDown={handleKeyDown}
    //   />
    //   <InputFieldText
    //     onChange={setOtherLink}
    //     label="Other link"
    //     onKeyDown={handleKeyDown}
    //   />
    // </div>
    <Stack spacing={2} marginY={3}>
      <TextField
        variant="outlined"
        onChange={setName}
        label="Name"
        onKeyDown={handleKeyDown}
        id="LeadPersonName"
      />

      <TextField
        variant="outlined"
        onChange={setPhone}
        label="Phone"
        onKeyDown={handleKeyDown}
        id="LeadPersonPhone"
      />
      <TextField
        variant="outlined"
        onChange={setEmail}
        label="Email"
        onKeyDown={handleKeyDown}
        id="LeadPersonEmail"
      />
      <TextField
        variant="outlined"
        onChange={setWebsite}
        label="Website"
        onKeyDown={handleKeyDown}
        id="LeadPersonWebsite"
      />
      <TextField
        variant="outlined"
        onChange={setFacebook}
        label="Facebook"
        onKeyDown={handleKeyDown}
        id="LeadPersonFacebook"
      />
      <TextField
        variant="outlined"
        onChange={setLinkedin}
        label="Linkedin"
        onKeyDown={handleKeyDown}
        id="LeadPersonLinkedin"
      />
      <TextField
        variant="outlined"
        onChange={setOtherLink}
        label="Other link"
        onKeyDown={handleKeyDown}
        id="LeadPersonOtherLink"
      />
    </Stack>
  );
}
