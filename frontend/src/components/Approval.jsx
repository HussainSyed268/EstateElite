import React, { useContext, useState, useEffect } from "react";
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';
import PendingProperties from './PendingProperties';
import { margin } from '@mui/system';
import { AdminContext } from "../context/AdminContext";

// const orders = [
//     {
//       id: 'ORD-007',
//       customer: { name: 'Ekaterina Tankova' },
      
//       status: 'pending',
//       createdAt: dayjs().subtract(10, 'minutes').toDate(),
//     },
//     {
//       id: 'ORD-004',
//       customer: { name: 'Alexa Richardson' },
      
//       status: 'pending',
//       createdAt: dayjs().subtract(10, 'minutes').toDate(),
//     },
//     {
//       id: 'ORD-003',
//       customer: { name: 'Anje Keizer' },
      
//       status: 'pending',
//       createdAt: dayjs().subtract(10, 'minutes').toDate(),
//     },
//     {
//       id: 'ORD-002',
//       customer: { name: 'Clarke Gillebert' },
      
//       status: 'pending',
//       createdAt: dayjs().subtract(10, 'minutes').toDate(),
//     },
//     {
//       id: 'ORD-001',
//       customer: { name: 'Adam Denisov' },
      
//       status: 'pending',
//       createdAt: dayjs().subtract(10, 'minutes').toDate(),
//     },
//   ];

  export default function Approval() {
    const { getPendingProperties } = useContext(AdminContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getPendingProperties().then((data) => {
            // Map over the data to extract only the required fields
            const filteredOrders = data.map(property => ({
                id: property.id, // Removed the 'ORD-' prefix
                customer: { name: property.User.username },
                status: property.status,
                createdAt: new Date(property.created_at),
            }));
            setOrders(filteredOrders);
        });
    }, [getPendingProperties]);

    return (
        <div className=' mx-20 md:mx-24 sm:mx-20 lg:mx-32 h-full mt-20'>
            <Grid item lg={8} md={12} xs={12}>
                <PendingProperties
                    orders={orders}
                    sx={{ height: '100%' }}
                />
            </Grid>
        </div>
    );
}
