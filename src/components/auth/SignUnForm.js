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
  Divider,
} from '@mui/material';
import { useAuth } from '../../contexts/DbFunctionsContext';
import { addNewUser } from '../../helpers/dbFunctions';
import { Container } from '@material-ui/core';

// -------------------------------------------------------

export default function SignUnForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { currentUser, signup } = useAuth(); //auth context

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const passwordRef = useRef();
  const emailRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      const UserCredentialImpl = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      addNewUser(
        UserCredentialImpl.user.uid,
        emailRef.current.value,
        UserCredentialImpl.user.accessToken
      );

      navigate('/crm', { replace: true });
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false);
  }

  return (
    <Container style={{ maxWidth: 600, marginBottom: 100 }}>
      <Typography variant="h4" gutterBottom>
        Sign up
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

        <Typography
          variant="subtitle2"
          sx={{ my: 2, marginTop: 3, paddingX: 1 }}>
          already have an account? <Link to="/login"> Log in</Link>
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
          Sign Up
        </LoadingButton>
      </form>
      {/* <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider> */}
    </Container>
  );
}
