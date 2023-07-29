import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// @mui
// import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
// components
// import Iconify from '../../../components/iconify';
import {
  Checkbox,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import { Typography } from '@material-ui/core';
// import { Checkbox, IconButton, InputAdornment } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function SigninForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end">
                  {/* <Iconify
                    icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                  /> */}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        style={{ marginTop: '40px' }}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
