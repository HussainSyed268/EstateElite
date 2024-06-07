import React, { useContext, useState, useEffect } from "react";
import { DashboardNav } from "./AdminPanel/DashboardNav";
import Analytics from "./Analytics";
import PropertyManager from "./PropertyManager";
import PendingProperties from "./PendingProperties";
import Grid from '@mui/material/Grid';
import dayjs from "dayjs";
import { AdminContext } from "../context/AdminContext";

export default function Dashboard() {
  const { getPendingProperties, getApprovedProperties } = useContext(AdminContext);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [approvedProperties, setApprovedProperties] = useState([]);

  useEffect(() => {
    const fetchPendingProperties = async () => {
      try {
        const data = await getPendingProperties();
        const filteredOrders = data.map(property => ({
          id: property.id,
          customer: { name: property.User.username },
          status: property.status,
          createdAt: new Date(property.created_at),
        }));
        setPendingOrders(filteredOrders);
      } catch (error) {
        console.error('Failed to fetch pending properties:', error);
      }
    };

    fetchPendingProperties();
  }, [getPendingProperties]);

  useEffect(() => {
    const fetchApprovedProperties = async () => {
      try {
        const data = await getApprovedProperties();
        // Assuming data structure from getApprovedProperties is similar to pending properties
        const filteredProperties = data.map(property => ({
          id: property.id,
          name: property.name,
          image: property.image,
          location: `${property.city}, ${property.country}`
        })).slice(0, 6); // Limit to only 5 properties
        setApprovedProperties(filteredProperties);
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
