import Grid from '@mui/material/Unstable_Grid2';
import UserList from '../components/ManageUser';

const users = [
    {
      id: 'ORD-007',
      name: 'Ekaterina Tankova',
      type: 'seller',
      avatar: 'https://via.placeholder.com/150'
    },
    {
      id: 'ORD-004',
      name: 'Alexa Richardson',
      type: 'seller',
      avatar: 'https://via.placeholder.com/150'
    },
    {
      id: 'ORD-003',
      name: 'Anje Keizer',
      type: 'seller',
      avatar: 'https://via.placeholder.com/150'
    },
    {
      id: 'ORD-002',
      name: 'Clarke Gillebert',
      type: 'seller',
      avatar: 'https://via.placeholder.com/150'
    },
    {
      id: 'ORD-001',
      name: 'Adam Denisov',
      type: 'seller',
      avatar: 'https://via.placeholder.com/150'
    },
];

export default function ManageUserPage() {
  return (
    <div className="mx-16 ml-24 lg:mx-32 md:mx-20 h-full mt-32">
      <Grid item lg={8} md={12} xs={12}>
        <UserList
          users={users}
          sx={{ height: '100%' }}
        />
      </Grid>
    </div>
  );
}
