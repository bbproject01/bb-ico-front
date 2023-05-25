import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useCustomSelector } from 'hooks/redux';

interface IData {
  id: number;
  title: string;
  value: string;
}

// Generate Order Data
const createData = (id: number, title: string, value: string): IData => {
  const data: IData = { id, title, value };
  return data;
};

const preventDefault = (event: React.MouseEvent): void => {
  event.preventDefault();
};

export const Orders: React.FC = () => {
  const {
    tokenBNB: { addressToken, name, symbol, decimals, totalSupply }
  } = useCustomSelector((state) => state);
  const rows = [
    createData(0, 'Address', addressToken),
    createData(1, 'Name', name),
    createData(2, 'Symbol', symbol),
    createData(3, 'Decimals', decimals),
    createData(4, 'Total Supply', totalSupply)
  ];

  return (
    <React.Fragment>
      <Title title="Datos del Smart Contract"></Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
};

export default Orders;
