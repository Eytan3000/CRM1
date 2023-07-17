import { TextField, makeStyles } from '@material-ui/core';
// import React, { useState } from 'react';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  },
});

export default function InputFieldText({
  label,
  variant = 'outlined',
  color = 'secondary',
  handleSubmit,
  onChange,
  error,
  disabled = false,
  keyVal,
  onKeyDown,
  type,
  defaultValue,
  onMouseEnter,
  onMouseLeave,
  InputProps,
}) {
  const classes = useStyles();
  //   const [title, setTitle] = useState('');
  // const [titleError, setTitleError] = useState(false);

  return (
    // <form noValidate autoComplete="off" onSubmit={handleSubmit}>
    <TextField
      onKeyDown={onKeyDown}
      onChange={onChange}
      className={classes.field}
      label={label}
      variant={variant}
      color={color}
      fullWidth
      error={error}
      disabled={disabled}
      key={keyVal}
      type={type}
      defaultValue={defaultValue}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      InputProps={InputProps}
    />
    // </form>
  );
}
