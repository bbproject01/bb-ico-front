import React from 'react';
import { Grid, Typography } from '@mui/material';

interface Props {
  title: String;
  subtitle: String;
}



export function LabelAndText({ title, subtitle }: Props) {
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Typography variant='subtitle1' sx={{ fontWeight: 'bold'}}>{title}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{subtitle}</Typography>
        </Grid>
      </Grid>
  );
}

