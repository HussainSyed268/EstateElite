import React, { useContext, useState } from "react";
import { useLocation, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
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

const statusMap = {
  pending: { label: 'Pending', color: 'warning' },
  completed: { label: 'Completed', color: 'success' },
  canceled: { label: 'Canceled', color: 'error' },
};

export default function PendingProperties({ orders = [], sx }) {
  const { rejectProperty } = useContext(AdminContext);
  const {approveProperty} = useContext(AdminContext);

  const [modifiedOrders, setModifiedOrders] = useState([]);
  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(orders);
  const location = useLocation();
  const [maxItems, setMaxItems] = useState(5);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < orders.length;
  const selectedAll = orders.length > 0 && selected?.size === orders.length;
  
  // Determine whether to show the "View All" button based on the current path
  const showViewAllButton = location.pathname === '/admin';

  const handleReject = () => {
    const selectedOrderIds = Array.from(selected);
    Promise.all(selectedOrderIds.map(id => rejectProperty(id)))
      .then(() => {
        // Filter out the rejected properties
        const updatedOrders = modifiedOrders.filter(order => !selectedOrderIds.includes(order.id));
        setModifiedOrders(updatedOrders);
        console.log("Properties rejected successfully");
      })
      .catch(error => {
        console.error("Error rejecting properties:", error);
        // Handle error
      });
  };

  const handleApprove = () => {
    const selectedOrderIds = Array.from(selected);
    Promise.all(selectedOrderIds.map(id => approveProperty(id)))
      .then(() => {
        // Filter out the approved properties
        const updatedOrders = modifiedOrders.filter(order => !selectedOrderIds.includes(order.id));
        setModifiedOrders(updatedOrders);
        console.log("Properties approved successfully");
      })
      .catch(error => {
        console.error("Error approving properties:", error);
        // Handle error
      });
  };

  return (
    <Card sx={sx}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardHeader title="Pending Properties" />
        {(selectedSome || selectedAll) && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', marginBottom: 2 }}>
            <Button 
            sx={{ margin: 1 }} 
            color="success" 
            variant="contained"
            onClick={handleApprove}>
              Approve
            </Button>
            <Button
              sx={{ margin: 1 }}
              color="error"
              variant="contained"
              onClick={handleReject}
            >
              Decline
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
                      selectAll();
                    } else {
                      deselectAll();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Property</TableCell>
              <TableCell>Seller</TableCell>
              <TableCell sortDirection="desc">Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.slice(0, showViewAllButton ? maxItems : orders.length).map((order) => {
              const isSelected = selected?.has(order.id);
              const { label, color } = statusMap[order.status] ?? { label: 'Unknown', color: 'default' };

              return (
                <TableRow hover key={order.id} selected={isSelected}>
                  <TableCell>
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(order.id);
                        } else {
                          deselectOne(order.id);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Avatar src={order.avatar} />
                      <span>{order.id}</span>
                    </Stack>
                  </TableCell>
                  <TableCell>{order.customer.name}</TableCell>
                  <TableCell>{dayjs(order.createdAt).format('MMM D, YYYY')}</TableCell>
                  <TableCell>
                    <Chip color={color} label={label} size="small" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      {showViewAllButton && (
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Link to="/admin/approval">
            <Button
              color="inherit"
              endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
              size="small"
              variant="text"
            >
              View all
            </Button>
          </Link>
        </CardActions>
      )}
    </Card>
  );
}
