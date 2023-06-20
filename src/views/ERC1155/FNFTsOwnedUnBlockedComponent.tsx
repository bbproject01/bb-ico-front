import React, { useEffect, useState } from 'react';
import {
  Alert,
  AlertTitle,
  Box,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import Title from 'components/Title/Title';
import Paper from '@mui/material/Paper';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import CircularProgressBarBox from 'components/Loading/CircularProgressBarBox';
import { useGetTokensOwnedEthers } from 'hooks/ERC1155/useGetTokensOwnedEthers';
import { BigNumber } from 'ethers';
import { useContractERC115 } from 'hooks/useContractERC1155';
// import { isValidEthereumAddress } from 'utils/ethereum';

export const FNFTsOwnedUnBlockedComponent = (): JSX.Element => {
  const [data, isLoading] = useGetTokensOwnedEthers(true);
  const [tokenSelected, setTokenSelected] = useState<BigNumber>(
    BigNumber.from(-1)
  );
  const [isValidActive, setIsValidActive] = useState<boolean>(false);

  const [result, isLoadingInfo, isSuccess, status, error] = useContractERC115(
    isValidActive,
    'updateDate',
    [tokenSelected]
  );
  useEffect(() => {
    if (tokenSelected.toString() !== '-1') {
      setIsValidActive(true);
    }
  }, [tokenSelected]);

  useEffect(() => {
    if (isLoadingInfo) {
      setTokenSelected(BigNumber.from(-1));
      setIsValidActive(false);
    }
  }, [isLoadingInfo]);

  return isLoading ? (
    <CircularProgressBarBox />
  ) : (
    <Box
      component={'form'}
      autoComplete="off"
      sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
    >
      <Stack spacing={2}>
        <Title title={'Toolt Test'}></Title>
        {data !== undefined && data?.length > 0 ? (
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Balance</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((item) => {
                  return (
                    <TableRow
                      key={`id-${item.idToken.toString()}`}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center">
                        {item.idToken.toString()}
                      </TableCell>
                      <TableCell align="center">
                        {item.balance.toString()}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          aria-label={`info-${item.idToken.toString()}`}
                          color="primary"
                          onClick={() => {
                            console.log(item.idToken);
                            setTokenSelected(item.idToken);
                          }}
                        >
                          <AccessTimeIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : null}
        {isSuccess && (
          <>
            <Typography sx={{ mt: 2 }}>Resultado:{status} </Typography>
            {result !== null ? (
              <>
                <Typography sx={{ mt: 2 }}>
                  Result: {result.toString()}
                </Typography>
              </>
            ) : null}
          </>
        )}
        {error !== null && (
          <Alert severity="error" onClose={() => {}}>
            <AlertTitle>Error</AlertTitle>
            This is an error alert — <strong>{error.message}</strong>
          </Alert>
        )}
      </Stack>
    </Box>
  );
};
