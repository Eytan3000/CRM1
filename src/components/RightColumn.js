import React from 'react';
import InputFieldText from './InputFieldText';

export default function RightColumn({
  setName,
  setPhone,
  setEmail,
  setWebsite,
  setFacebook,
  setLinkedin,
  setOtherLink,
  setIsDisabled,
}) {
  return (
    <div>
      <InputFieldText onChange={setName} label="Company - Name" />
      <InputFieldText
        onChange={setPhone}
        label="Company - Phone"
        disabled={setIsDisabled}
      />
      <InputFieldText
        onChange={setEmail}
        label="Company - Email"
        disabled={setIsDisabled}
      />
      <InputFieldText
        onChange={setWebsite}
        label="Company - Website"
        disabled={setIsDisabled}
      />
      <InputFieldText
        onChange={setFacebook}
        label="Company - Facebook"
        disabled={setIsDisabled}
      />
      <InputFieldText
        onChange={setLinkedin}
        label="Company - Linkedin"
        disabled={setIsDisabled}
      />
      <InputFieldText
        onChange={setOtherLink}
        label="Company - Other link"
        disabled={setIsDisabled}
      />
    </div>
  );
}
