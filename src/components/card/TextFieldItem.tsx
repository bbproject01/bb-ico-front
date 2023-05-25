import React, { useState } from 'react';
// import React from 'react';
// import { useTheme } from '@mui/material/styles';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Label,
//   ResponsiveContainer
// } from 'recharts';
import Title from '../Title/Title';
import { Button, TextField } from '@mui/material';

interface IData {
  title: string;
  onChangeFunction?:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  onClicFunction?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export const TextFieldItem = ({
  title,
  onClicFunction,
  onChangeFunction
}: IData): JSX.Element => {
  const [value, setValue] = useState<string>('');

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // console.log(event.target.value);
    setValue(event.target.value);
  };

  return (
    <React.Fragment>
      <Title title={title}></Title>
      <TextField
        id="filled-basic"
        label="Address"
        variant="filled"
        onChange={handleOnChange}
        value={value}
      />
      <Button sx={{ mt: 2 }} variant="contained" onClick={onClicFunction}>
        Consultar
      </Button>
    </React.Fragment>
  );
};

export default TextFieldItem;
