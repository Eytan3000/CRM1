import { Typography } from '@material-ui/core';
import { Box, Card, CardContent } from '@mui/joy';
import React from 'react';

export default function FeaturesCards() {
  return (
    <Box
      sx={{
        margin: 5,
        textAlign: 'center',
        display: 'flex',
        gap: 2,
        justifyContent: 'center',
        '& .MuiCard-root': {
          padding: '25px 40px 40px 40px',
          maxWidth: '300px',
        },
      }}>
      <Card
        sx={{
          transition: 'transform 0.2s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
          },
        }}>
        <CardContent>
          <Typography
            variant="h6"
            style={{
              paddingBottom: 10,
              color: '#2c7dd4',
            }}>
            Visual sales board
          </Typography>
          <Typography>See your entire sales process at a glance.</Typography>
        </CardContent>
      </Card>
      <Card
        sx={{
          transition: 'transform 0.2s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
          },
        }}>
        <CardContent>
          <Typography
            variant="h6"
            style={{
              paddingBottom: 10,
              color: '#2c7dd4',
            }}>
            Customizable board
          </Typography>
          <Typography>
            Set up your board to match your sales cycle. Add custom stages.
          </Typography>
        </CardContent>
      </Card>
      <Card
        sx={{
          transition: 'transform 0.2s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
          },
        }}>
        <CardContent>
          <Typography
            variant="h6"
            style={{
              paddingBottom: 10,
              color: '#2c7dd4',
            }}>
            Drag and Drop
          </Typography>
          <Typography>
            Update leads by dragging and dropping them into place.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
