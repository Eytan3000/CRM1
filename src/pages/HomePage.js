import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <>
      <h1>HomePage</h1>
      <Link to="/login">login</Link>
      <br />
      <Link to="/signup">Sign Up</Link>
    </>
  );
}
