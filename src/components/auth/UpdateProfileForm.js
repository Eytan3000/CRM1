import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
// import Iconify from '../../../components/iconify';
import { Alert, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from '../../contexts/DbFunctionsContext';

// -------------------------------------------------------

export default function UpdateProfileForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { currentUser, updateEmailCtx, updatePasswordCtx } = useAuth(); //auth context

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const passwordRef = useRef();
  const emailRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    const promises = [];
    setLoading(true);
    setError('');

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmailCtx(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePasswordCtx(passwordRef.current.value));
    }
    Promise.all(promises)
      .then(() => {
        navigate('/');
      })
      .catch(() => setError('Failed to update account.'))
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Update Profile
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            name="email"
            label="Email address"
            inputRef={emailRef}
            defaultValue={currentUser.email}
          />

          <TextField
            name="password"
            label="Password"
            inputRef={passwordRef}
            type={showPassword ? 'text' : 'password'}
            helperText="Leave blank to keep the same password"
          />
        </Stack>

        <Typography
          variant="subtitle2"
          sx={{ my: 2, marginTop: 3, paddingX: 1 }}>
          <Link to="/dashboard">Cancel</Link>
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
          Update
        </LoadingButton>
      </form>
    </>
  );
}
