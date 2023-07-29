import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
// import Iconify from '../../../components/iconify';
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
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

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };

  async function handleSubmit(e) {
    console.log('handle');

    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
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

      <LoadingButton
        style={{ marginTop: '40px' }}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}>
        Continue
      </LoadingButton>
    </form>
  );
}
