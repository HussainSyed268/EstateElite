import React, { useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { AdminContext } from '../context/AdminContext';
import { useSelection } from '../hooks/use-selection';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import dayjs from 'dayjs';

export default function UserList({ users = [], sx }) {
  const [localUsers, setLocalUsers] = useState(users);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(localUsers);

  const { revokeUser } = useContext(AdminContext);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < localUsers.length;
  const selectedAll = localUsers.length > 0 && selected?.size === localUsers.length;

  useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  const handleRevoke = () => {
    const selectedUserIds = Array.from(selected);
  
    Promise.all(selectedUserIds.map(id => revokeUser(id)))
      .then(() => {
        // Filter out the revoked users
        const updatedUsers = localUsers.filter(user => !selectedUserIds.includes(user.id));
        setLocalUsers(updatedUsers);
        console.log("Users revoked successfully");
      })
      .catch(error => {
        console.error("Error revoking users:", error);
        // Handle error
      });
  };

  return (
    <Card sx={sx}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardHeader title="Manage Users" />
        {(selectedSome || selectedAll) && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', marginBottom: 2 }}>
            <Button 
              sx={{ margin: 1 }} 
              color="error" 
              variant="contained"
              onClick={handleRevoke}
            >
              Revoke
            </Button>
          </Box>
        )}
      </Box>
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      selectAll(localUsers.map(user => user.id));
                    } else {
                      deselectAll();
                    }
                  }}
                />
              </TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {localUsers.map((user) => {
              const isSelected = selected?.has(user.id);

              return (
                <TableRow hover key={user.id} selected={isSelected}>
                  <TableCell>
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(user.id);
                        } else {
                          deselectOne(user.id);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Avatar src={user.avatar} />
                      <span>{user.id}</span>
                    </Stack>
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
    </Card>
  );
}
