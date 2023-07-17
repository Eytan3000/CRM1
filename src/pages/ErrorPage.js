import React from 'react';
import Layout from '../components/Layout';
import { Typography } from '@material-ui/core';

export default function ErrorPage() {
  return (
    <>
      <Layout></Layout>

      <main style={{ margin: '2rem auto', textAlign: 'center' }}>
        <Typography variant="h3">An error has occured</Typography>
        {/* <br />
        <br /> */}
        <Typography style={{ margin: 30 }} variant="subtitle1">
          Could not find this page
        </Typography>
      </main>
    </>
  );
}
