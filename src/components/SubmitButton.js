import { Button } from '@material-ui/core';
import React from 'react';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

export default function SubmitButton({ onClick }) {
  return (
    <Button
      type="submit"
      color="secondary"
      variant="contained"
      endIcon={<KeyboardArrowRightOutlinedIcon />}
      onClick={onClick}>
      Submit
    </Button>
  );
}
