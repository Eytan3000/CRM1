import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
// import Iconify from '../../../components/iconify';
import {
  Alert,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useAuth } from '../../contexts/DbFunctionsContext';
import { Grid } from '@material-ui/core';
import { auth } from '../../firebase';

// -------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth(); //auth context

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // New state variable

  const passwordRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    setIsMounted(true); // Component is mounted
    return () => setIsMounted(false); // Component is unmounted
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      // navigate('/crm', { replace: true });
      if (isMounted) {
        console.log(auth);
        navigate('/crm', { replace: true });
      }
    } catch {
      setError('Failed to sign in');
    }
    setLoading(false);
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Log In
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField name="email" label="Email address" inputRef={emailRef} />

          <TextField
            name="password"
            label="Password"
            inputRef={passwordRef}
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

        <Grid container direction="row" justifyContent="space-between">
          <Typography
            variant="subtitle2"
            sx={{ my: 2, marginTop: 3, paddingX: 1 }}>
            Don't have an account? <Link to="/signup"> Sign up</Link>
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ my: 2, marginTop: 3, paddingX: 1 }}>
            <Link to="/forgot-password"> Forgot password?</Link>
          </Typography>
        </Grid>
        {error && (
          <Alert severity="error" style={{ marginBottom: '10px' }}>
            {error}
          </Alert>
        )}

        <LoadingButton
          style={{ marginTop: '0px' }}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={loading}
          // onClick={handleClick}
        >
          Log In
        </LoadingButton>
      </form>
      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
