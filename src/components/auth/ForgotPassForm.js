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

export default function ForgotPassForm() {
  const navigate = useNavigate();
  const { resetPassword } = useAuth(); //auth context

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const emailRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      console.log('logged');
      setMessage('Check your inbox for further instructions');
    } catch {
      setError('Failed to reset password');
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" inputRef={emailRef} />
      </Stack>

      <Stack direction="flex" justifyContent="space-between" paddingX={1}>
        <Typography
          variant="subtitle2"
          sx={{ my: 2, marginTop: 3, paddingX: 1 }}>
          <Link to="/login"> Login</Link>
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ my: 2, marginTop: 3, paddingX: 1 }}>
          <Link to="/signup"> Sign up</Link>
        </Typography>
      </Stack>
      {error && (
        <Alert severity="error" style={{ marginBottom: '10px' }}>
          {error}
        </Alert>
      )}
      {message && <Alert severity="info">{message}</Alert>}
      <LoadingButton
        style={{ marginTop: '10px' }}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        disabled={loading}
        // onClick={handleClick}
      >
        Reset Password
      </LoadingButton>
    </form>
  );
}
