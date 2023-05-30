import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import { Divider, List } from '@mui/material';
import { setSelectedMenuOption } from 'store/Dashboard';
import { useCustomDispatch } from 'hooks/redux';

export const NavBarComponents: React.FC = () => {
  const dispatch = useCustomDispatch();

  const handleListItemClick = (index: number): void => {
    dispatch(setSelectedMenuOption(index));
  };

  return (
    <React.Fragment>
      <List component="nav">
        <ListItemButton
          onClick={() => {
            handleListItemClick(0);
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            handleListItemClick(1);
          }}
        >
          <ListItemIcon>
            <AttachMoneyIcon />
          </ListItemIcon>
          <ListItemText primary="Token ERC20" />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            handleListItemClick(2);
          }}
        >
          <ListItemIcon>
            <ArticleIcon />
          </ListItemIcon>
          <ListItemText primary="ERC1155" />
        </ListItemButton>
        <Divider sx={{ my: 1 }} />
        <ListSubheader component="div" inset>
          Saved reports
        </ListSubheader>
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Current month" />
        </ListItemButton>
      </List>
    </React.Fragment>
  );
};
