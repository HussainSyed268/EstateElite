import React, { useContext, useState, useEffect } from "react";
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';
import PendingProperties from './PendingProperties';
import { margin } from '@mui/system';
import { AdminContext } from "../context/AdminContext";
import axios from "axios";

  export default function Approval() {
    const { getPendingProperties } = useContext(AdminContext);
    const [orders, setOrders] = useState([]);

    const placeholderAvatar = 'https://via.placeholder.com/150'; // Placeholder image URL

    useEffect(() => {
      getPendingProperties().then(async (data) => {
        // Map over the data to extract only the required fields             
        const filteredOrders = data.map(property => ({
          id: property.id, // Removed the 'ORD-' prefix
          customer: { name: property.User.username },
          status: property.status,
          createdAt: new Date(property.created_at),
        }));
  
        // Fetch avatar images for each property
        const ordersWithAvatars = await Promise.all(
          filteredOrders.map(async (property) => {
            const response = await axios.post(`http://localhost:5000/api/property/images/${property.id}`);
            const avatar = response.data.images[0]?.image || placeholderAvatar;
            return { ...property, avatar };
          })
        );
  
        setOrders(ordersWithAvatars);
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
