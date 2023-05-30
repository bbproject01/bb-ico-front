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

export const NavBarComponents: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (index: number): void => {
    setSelectedIndex(index);
    console.log(index);
  };

  return (
    <React.Fragment>
      <List component="nav">
        <ListItemButton
          selected={selectedIndex === 0}
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
          selected={selectedIndex === 1}
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
          selected={selectedIndex === 2}
          onClick={() => {
            handleListItemClick(2);
          }}
        >
          <ListItemIcon>
            <ArticleIcon />
          </ListItemIcon>
          <ListItemText primary="ERC721" />
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
