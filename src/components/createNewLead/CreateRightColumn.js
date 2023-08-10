import React from 'react';
import InputFieldText from '../auxs/InputFieldText';
import { TextField } from '@material-ui/core';
import { Stack } from '@mui/material';

export default function RightColumn({
  setName,
  setPhone,
  setEmail,
  setWebsite,
  setFacebook,
  setLinkedin,
  setOtherLink,
  setIsDisabled,
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
    //     label="Company - Name"
    //     onKeyDown={handleKeyDown}
    //   />
    //   <InputFieldText
    //     onChange={setPhone}
    //     label="Company - Phone"
    //     disabled={setIsDisabled}
    //     onKeyDown={handleKeyDown}
    //   />
    //   <InputFieldText
    //     onChange={setEmail}
    //     label="Company - Email"
    //     disabled={setIsDisabled}
    //     onKeyDown={handleKeyDown}
    //   />
    //   <InputFieldText
    //     onChange={setWebsite}
    //     label="Company - Website"
    //     disabled={setIsDisabled}
    //     onKeyDown={handleKeyDown}
    //   />
    //   <InputFieldText
    //     onChange={setFacebook}
    //     label="Company - Facebook"
    //     disabled={setIsDisabled}
    //     onKeyDown={handleKeyDown}
    //   />
    //   <InputFieldText
    //     onChange={setLinkedin}
    //     label="Company - Linkedin"
    //     disabled={setIsDisabled}
    //     onKeyDown={handleKeyDown}
    //   />
    //   <InputFieldText
    //     onChange={setOtherLink}
    //     label="Company - Other link"
    //     disabled={setIsDisabled}
    //     onKeyDown={handleKeyDown}
    //   />
    // </div>
<Stack spacing={2} marginY={3}>
      <TextField
      variant='outlined'
        onChange={setName}
        label="Company - Name"
        onKeyDown={handleKeyDown}
        id="LeadCompanyName"
      />
      <TextField
      variant='outlined'
        onChange={setPhone}
        label="Company - Phone"
        disabled={setIsDisabled}
        onKeyDown={handleKeyDown}
        id="LeadCompanyPhone"
      />
      <TextField
      variant='outlined'
        onChange={setEmail}
        label="Company - Email"
        disabled={setIsDisabled}
        onKeyDown={handleKeyDown}
        id="LeadCompanyEmail"
      />
      <TextField
      variant='outlined'
        onChange={setWebsite}
        label="Company - Website"
        disabled={setIsDisabled}
        onKeyDown={handleKeyDown}
        id="LeadCompanyWebsite"
      />
      <TextField
      variant='outlined'
        onChange={setFacebook}
        label="Company - Facebook"
        disabled={setIsDisabled}
        onKeyDown={handleKeyDown}
        id="LeadCompanyFacebook"
      />
      <TextField
      variant='outlined'
        onChange={setLinkedin}
        label="Company - Linkedin"
        disabled={setIsDisabled}
        onKeyDown={handleKeyDown}
        id="LeadCompanyLinkedin"
      />
      <TextField
      variant='outlined'
        onChange={setOtherLink}
        label="Company - Other link"
        disabled={setIsDisabled}
        onKeyDown={handleKeyDown}
        id="LeadCompanyOtherLink"
      />
    </Stack>
  );
}
