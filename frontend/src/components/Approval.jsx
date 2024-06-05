import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';
import PendingProperties from './PendingProperties';

const orders = [
    {
      id: 'ORD-007',
      customer: { name: 'Ekaterina Tankova' },
      amount: 30.5,
      status: 'pending',
      createdAt: dayjs().subtract(10, 'minutes').toDate(),
    },
    {
      id: 'ORD-004',
      customer: { name: 'Alexa Richardson' },
      amount: 10.99,
      status: 'pending',
      createdAt: dayjs().subtract(10, 'minutes').toDate(),
    },
    {
      id: 'ORD-003',
      customer: { name: 'Anje Keizer' },
      amount: 96.43,
      status: 'pending',
      createdAt: dayjs().subtract(10, 'minutes').toDate(),
    },
    {
      id: 'ORD-002',
      customer: { name: 'Clarke Gillebert' },
      amount: 32.54,
      status: 'pending',
      createdAt: dayjs().subtract(10, 'minutes').toDate(),
    },
    {
      id: 'ORD-001',
      customer: { name: 'Adam Denisov' },
      amount: 16.76,
      status: 'pending',
      createdAt: dayjs().subtract(10, 'minutes').toDate(),
    },
  ];

  export default function Approval(){
    return(
        <div className='mx-16 h-full mt-32'>
        <Grid item lg={8} md={12} xs={12}>
            <PendingProperties
              orders={orders}
              sx={{ height: '100%' }}
              />
        </Grid>
        </div>
    )
  }