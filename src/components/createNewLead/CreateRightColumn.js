import React from 'react';
import InputFieldText from '../auxs/InputFieldText';

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
    <div>
      <InputFieldText
        onChange={setName}
        label="Company - Name"
        onKeyDown={handleKeyDown}
      />
      <InputFieldText
        onChange={setPhone}
        label="Company - Phone"
        disabled={setIsDisabled}
        onKeyDown={handleKeyDown}
      />
      <InputFieldText
        onChange={setEmail}
        label="Company - Email"
        disabled={setIsDisabled}
        onKeyDown={handleKeyDown}
      />
      <InputFieldText
        onChange={setWebsite}
        label="Company - Website"
        disabled={setIsDisabled}
        onKeyDown={handleKeyDown}
      />
      <InputFieldText
        onChange={setFacebook}
        label="Company - Facebook"
        disabled={setIsDisabled}
        onKeyDown={handleKeyDown}
      />
      <InputFieldText
        onChange={setLinkedin}
        label="Company - Linkedin"
        disabled={setIsDisabled}
        onKeyDown={handleKeyDown}
      />
      <InputFieldText
        onChange={setOtherLink}
        label="Company - Other link"
        disabled={setIsDisabled}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
