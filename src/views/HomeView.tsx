import React from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';

export const HomeView: React.FC = () => {
  return (
    <Box
      sx={{
        height: window.innerHeight,
        display: 'flex',
        justifyContent: 'center',
        p: 1,
        m: 1,
        bgcolor: 'background.paper',
        borderRadius: 1,
        alignItems: 'center'
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography>Home</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
