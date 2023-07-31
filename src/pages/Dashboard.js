import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/DbFunctionsContext';
import { Alert } from '@mui/material';

export default function Dashboard() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError('');

    try {
      await logout();
      navigate('/login', { replace: true });
    } catch {
      setError('Failed to logout');
    }
  }

  return (
    <>
      <h1>Dashboard</h1>
      <Link>Update Profile</Link>
      <br />
      <Button onClick={handleLogout}>Log Out</Button>
      {error && (
        <Alert variant="outlined" severity="error">
          {error}
        </Alert>
      )}
      <br />
      <Link to="/crm">CRM</Link>
    </>
  );
}
