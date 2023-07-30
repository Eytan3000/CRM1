import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// @mui
// import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
// components
// import Iconify from '../../../components/iconify';
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { Typography } from '@material-ui/core';
// import { Checkbox, IconButton, InputAdornment } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    console.log('handle');

    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate('/crm', { replace: true });
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false);
  }

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

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2, marginTop: 3, paddingX: 2 }}>
        <Link>
          <Typography variant="subtitle2">Forgot password?</Typography>
        </Link>
        <Link to="/signup">
          <Typography variant="subtitle2">Creat an account</Typography>
        </Link>
      </Stack>

      <LoadingButton
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
