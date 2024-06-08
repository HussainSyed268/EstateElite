import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { SignOut as SignOutIcon } from '@phosphor-icons/react/dist/ssr/SignOut';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { AuthContext } from '../context/AuthContext';

export function UserPopover({ anchorEl, onClose, open }) {

  const { logout, getUserDetails } = React.useContext(AuthContext);

  const [user, setUser] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  React.useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getUserDetails();
        if (userDetails && userDetails.userProfile) {
          setUser({
            firstName: userDetails.userProfile.first_name,
            lastName: userDetails.userProfile.last_name,
            email: userDetails.user.email,
          });
        } else {
          // Handle the case where userDetails is undefined or does not have userProfile
          console.error('User details not available');
        }
      } catch (error) {
        console.error('Failed to fetch user details', error);
      }
    };
    fetchUserDetails();
  }, [getUserDetails]);
  
  const handleLogout = () => {
    onClose();
    logout();
    window.location = '/login';
  }

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: '240px' } } }}
    >
      <Box sx={{ p: '16px 20px ' }}>
        <Typography variant="subtitle1">{`${user.firstName} ${user.lastName}`}</Typography>
        <Typography color="text.secondary" variant="body2">
          {user.email}
        </Typography>
      </Box>
      <Divider />
      <MenuList disablePadding sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}>
        <MenuItem component={Link} to='/updateprofile' onClick={onClose}>
          <ListItemIcon>
            <UserIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem component={Link} to='/savedproperties' onClick={onClose}>
          <ListItemIcon>
            <UserIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Saved Properties
        </MenuItem>
        <MenuItem component={Link} to='/listedproperties' onClick={onClose}>
          <ListItemIcon>
            <UserIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Listed Properties
        </MenuItem>
        <MenuItem component={Link} onClick={handleLogout}>
          <ListItemIcon>
            <SignOutIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
}
