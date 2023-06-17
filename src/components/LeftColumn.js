import React from 'react';
import InputFieldText from './InputFieldText';

export default function LeftColumn({
  setName,
  setPhone,
  setEmail,
  setWebsite,
  setFacebook,
  setLinkedin,
  setOtherLink,
}) {
  return (
    <div>
      <InputFieldText onChange={setName} label="Name" />
      <InputFieldText onChange={setPhone} label="Phone" />
      <InputFieldText onChange={setEmail} label="Email" />
      <InputFieldText onChange={setWebsite} label="Website" />
      <InputFieldText onChange={setFacebook} label="Facebook" />
      <InputFieldText onChange={setLinkedin} label="Linkedin" />
      <InputFieldText onChange={setOtherLink} label="Other link" />
    </div>
  );
}
