import React, { useContext, useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ManageProperty from '../components/ManageProperty';
import { AdminContext } from '../context/AdminContext';
import { useSelection } from '../hooks/use-selection';

export default function ManagePropertyPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { getApprovedProperties, rejectProperty } = useContext(AdminContext);
  const [rows, setRows] = useState([]);
  const [modifiedRows, setModifiedRows] = useState([]);

  useEffect(() => {
    const fetchApprovedProperties = async () => {
      const data = await getApprovedProperties();
      setRows(data);
      setModifiedRows(data);
    }
    fetchApprovedProperties();
  }, [getApprovedProperties]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection();

  const handleReject = () => {
    const selectedOrderIds = Array.from(selected);
    Promise.all(selectedOrderIds.map(id => rejectProperty(id)))
      .then(() => {
        // Filter out the rejected properties
        const updatedRows = modifiedRows.filter(row => !selectedOrderIds.includes(row.id));
        setModifiedRows(updatedRows);
        console.log("Properties rejected successfully");
        deselectAll(); // Deselect all after rejection
      })
      .catch(error => {
        console.error("Error rejecting properties:", error);
        // Handle error
      });
  };

  const count = modifiedRows.length;

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className='mt-32 min-w-[300px] mx-20 lg:mx-32 md:mx-20 sm:mx-20'>
      <Stack spacing={3}>
        <Stack direction="row" spacing={3} className="flex-wrap md:flex-nowrap items-center justify-between">
          <Stack spacing={1} sx={{ flex: '1 1 auto', textAlign: 'left' }}>
            <Typography variant="h4">Approved Properties</Typography>
          </Stack>
          <div className='flex flex-wrap gap-2 justify-end'>
            <Button color='error' variant="contained" onClick={handleReject} disabled={selected.size === 0}>
              <span className='font-bold text-md mr-2'>-</span> Remove Property
            </Button>
          </div>
        </Stack>
        <ManageProperty
          count={count}
          rows={modifiedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          selectAll={() => selectAll(modifiedRows.map(row => row.id))}
          deselectAll={deselectAll}
          selectOne={selectOne}
          deselectOne={deselectOne}
          selected={selected}
        />
      </Stack>
    </div>
  );
}
