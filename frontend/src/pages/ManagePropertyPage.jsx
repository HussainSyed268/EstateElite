import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import dayjs from 'dayjs';
import ManageProperty from '../components/ManageProperty';

const customers = [
  {
    id: 'USR-010',
    name: 'Alcides Antonio',
    avatar: '/assets/property.png',
    email: 'alcides.antonio@devias.io',
    price: '908-691-3242',
    address: { city: 'Madrid', country: 'Spain', state: 'Comunidad de Madrid', street: '4158 Hedge Street' },
    status: 'Approved'
  },
  {
    id: 'USR-009',
    name: 'Marcus Finn',
    avatar: '/assets/property.png',
    email: 'marcus.finn@devias.io',
    price: '415-907-2647',
    address: { city: 'Carson City', country: 'USA', state: 'Nevada', street: '2188 Armbrester Drive' },
    status: 'Approved'
  },
  {
    id: 'USR-008',
    name: 'Jie Yan',
    avatar: '/assets/property.png',
    email: 'jie.yan.song@devias.io',
    price: '770-635-2682',
    address: { city: 'North Canton', country: 'USA', state: 'Ohio', street: '4894 Lakeland Park Drive' },
    status: 'Approved'
  },
  {
    id: 'USR-007',
    name: 'Nasimiyu Danai',
    avatar: '/assets/property.png',
    email: 'nasimiyu.danai@devias.io',
    price: '801-301-7894',
    address: { city: 'Salt Lake City', country: 'USA', state: 'Utah', street: '368 Lamberts Branch Road' },
    status: 'Approved'
  },
  {
    id: 'USR-006',
    name: 'Iulia Albu',
    avatar: '/assets/property.png',
    email: 'iulia.albu@devias.io',
    price: '313-812-8947',
    address: { city: 'Murray', country: 'USA', state: 'Utah', street: '3934 Wildrose Lane' },
    status: 'Approved'
  },
  {
    id: 'USR-005',
    name: 'Fran Perez',
    avatar: '/assets/property.png',
    email: 'fran.perez@devias.io',
    price: '712-351-5711',
    address: { city: 'Atlanta', country: 'USA', state: 'Georgia', street: '1865 Pleasant Hill Road' },
    status: 'Approved'
  },

  {
    id: 'USR-004',
    name: 'Penjani Inyene',
    avatar: '/assets/property.png',
    email: 'penjani.inyene@devias.io',
    price: '858-602-3409',
    address: { city: 'Berkeley', country: 'USA', state: 'California', street: '317 Angus Road' },
    status: 'Approved'
  },
  {
    id: 'USR-003',
    name: 'Carson Darrin',
    avatar: '/assets/property.png',
    email: 'carson.darrin@devias.io',
    price: '304-428-3097',
    address: { city: 'Cleveland', country: 'USA', state: 'Ohio', street: '2849 Fulton Street' },
    status: 'Approved'
  },
  {
    id: 'USR-002',
    name: 'Siegbert Gottfried',
    avatar: '/assets/property.png',
    email: 'siegbert.gottfried@devias.io',
    price: '702-661-1654',
    address: { city: 'Los Angeles', country: 'USA', state: 'California', street: '1798 Hickory Ridge Drive' },
    status: 'Approved'
  },
  {
    id: 'USR-001',
    name: 'Miron Vitold',
    avatar: '/assets/property.png',
    email: 'miron.vitold@devias.io',
    price: '972-333-4106',
    address: { city: 'San Diego', country: 'USA', state: 'California', street: '75247' },
    status: 'Approved'
  },  
] ;

export default function ManagePropertyPage() {
  const page = 0;
  const rowsPerPage = 5;

  const paginatedCustomers = applyPagination(customers, page, rowsPerPage);

  return (
    <div className='mt-32 min-w-[300px] mx-20 lg:mx-32 md:mx-20 sm:mx-20'>
      <Stack spacing={3}>
        <Stack direction="row" spacing={3} className="flex-wrap md:flex-nowrap items-center justify-between">
          <Stack spacing={1} sx={{ flex: '1 1 auto', textAlign: 'left' }}>
            <Typography variant="h4">Approved Properties</Typography>
          </Stack>
          <div className='flex flex-wrap gap-2 justify-end'>
            <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
              Add Property
            </Button>
            <Button color='error' variant="contained">
              <span className='font-bold text-md mr-2'>-</span> Remove Property
            </Button>
          </div>
        </Stack>
        <ManageProperty
          count={paginatedCustomers.length}
          page={page}
          rows={paginatedCustomers}
          rowsPerPage={rowsPerPage}
        />
      </Stack>
    </div>
  );
}

function applyPagination(rows, page, rowsPerPage) {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}