import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Chip } from '@mui/material';

export default function ManageProperty({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
  onPageChange = () => {},
  onRowsPerPageChange = () => {},
  selectAll = () => {},
  deselectAll = () => {},
  selectOne = () => {},
  deselectOne = () => {},
  selected = new Set(),
}) {
  const rowIds = React.useMemo(() => rows.map((row) => row.id), [rows]);

  const selectedSome = selected.size > 0 && selected.size < rows.length;
  const selectedAll = rows.length > 0 && selected.size === rows.length;

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
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
              <TableCell>Photo</TableCell>
              <TableCell>Property Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected.has(row.id);

              return (
                <TableRow hover key={row.id} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(row.id);
                        } else {
                          deselectOne(row.id);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Avatar src={row.avatar} />
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Link to={`/property/${row.id}`}>
                      {row.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {row.address}, {row.city}, {row.country}
                  </TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>
                    <Chip color="success" label={row.status} size="small" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
