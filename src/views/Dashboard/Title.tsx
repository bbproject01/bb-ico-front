import * as React from 'react';
import Typography from '@mui/material/Typography';

interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps): JSX.Element => {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {title}
    </Typography>
  );
};

export default Title;
