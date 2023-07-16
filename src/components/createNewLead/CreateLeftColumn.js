import React from 'react';
import InputFieldText from '../auxs/InputFieldText';

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
    <div>
      <InputFieldText
        onChange={setName}
        label="Name"
        onKeyDown={handleKeyDown}
      />
      <InputFieldText
        onChange={setPhone}
        label="Phone"
        onKeyDown={handleKeyDown}
      />
      <InputFieldText
        onChange={setEmail}
        label="Email"
        onKeyDown={handleKeyDown}
      />
      <InputFieldText
        onChange={setWebsite}
        label="Website"
        onKeyDown={handleKeyDown}
      />
      <InputFieldText
        onChange={setFacebook}
        label="Facebook"
        onKeyDown={handleKeyDown}
      />
      <InputFieldText
        onChange={setLinkedin}
        label="Linkedin"
        onKeyDown={handleKeyDown}
      />
      <InputFieldText
        onChange={setOtherLink}
        label="Other link"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
