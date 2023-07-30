import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
// import Iconify from '../../../components/iconify';
import {
  Alert,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useAuth } from '../../contexts/DbFunctionsContext';

// -------------------------------------------------------

export default function SignUnForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth(); //auth context

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const passwordRef = useRef();
  const emailRef = useRef();

  async function handleSubmit(e) {
    console.log('handle');

    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate('/dashboard', { replace: true });
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false);
  }

  return (
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

      <Typography variant="subtitle2" sx={{ my: 2, marginTop: 3, paddingX: 1 }}>
        already have an account? <Link to="/signup"> Log in</Link>
      </Typography>

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
        Continue
      </LoadingButton>
    </form>
  );
}
