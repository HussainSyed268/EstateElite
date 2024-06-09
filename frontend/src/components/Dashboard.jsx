import React, { useContext, useState, useEffect } from "react";
import { DashboardNav } from "./AdminPanel/DashboardNav";
import Analytics from "./Analytics";
import PropertyManager from "./PropertyManager";
import PendingProperties from "./PendingProperties";
import Grid from '@mui/material/Grid';
import dayjs from "dayjs";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";

export default function Dashboard() {
  const { getPendingProperties, getApprovedProperties } = useContext(AdminContext);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [approvedProperties, setApprovedProperties] = useState([]);

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

      setPendingOrders(ordersWithAvatars);
    });
  }, [getPendingProperties]);

  useEffect(() => {
    const fetchApprovedProperties = async () => {
      try {
        const data = await getApprovedProperties();
        // Assuming data structure from getApprovedProperties is similar to pending properties
        const filteredProperties = data.map(property => ({
          id: property.id,
          name: property.name,
          
          location: `${property.city}, ${property.country}`
        })).slice(0, 6); // Limit to 6 properties
        const propertiesWithAvatars = await Promise.all(
          filteredProperties.map(async (property) => {
            const response = await axios.post(`http://localhost:5000/api/property/images/${property.id}`);
            const image = response.data.images[0]?.image || placeholderAvatar;
            return { ...property, image };
          })
        );
        setApprovedProperties(propertiesWithAvatars);
      } catch (error) {
        console.error('Failed to fetch approved properties:', error);
      }
    };

    fetchApprovedProperties();
  }, [getApprovedProperties]);

  return (
    <>
      <div className="w-full bg-[]">
        <div className="min-w-[300px] mx-10 lg:mx-16 sm:mx-10">
          <Analytics />
        </div>
        <div className="min-w-[300px] mx-10 ml-20 lg:mx-28 sm:mx-20 mt-10">
          <Grid container spacing={2}>
            <Grid item lg={4} md={12} xs={12}>
              <PropertyManager properties={approvedProperties} sx={{ height: '100%' }} />
            </Grid>
            <Grid item lg={8} md={12} xs={12}>
              <PendingProperties orders={pendingOrders} sx={{ height: '100%' }} />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}
