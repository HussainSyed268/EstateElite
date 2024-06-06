import React, { useContext, useState, useEffect } from "react";
import {DashboardNav} from "./AdminPanel/DashboardNav";
import Analytics from "./Analytics";
import PropertyManager from "./PropertyManager";
import  PendingProperties  from "./PendingProperties";
import Grid from '@mui/material/Grid';
import dayjs from "dayjs";
import { AdminContext } from "../context/AdminContext";

export default function Dashboard() {
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
  });

  const page = 0;
  const rowsPerPage = 5;

  return(
    <>
      
      <div className=" w-full bg-[]">
      <div className="min-w-[300px] mx-10 lg:mx-16 sm:mx-10">
        <Analytics/>
        </div>
        <div className="min-w-[300px] mx-10 ml-20 lg:mx-28 sm:mx-20 mt-10"> 
        <Grid container spacing={2} >
          <Grid item lg={4} md={12} xs={12}>
            <PropertyManager
              products={[
                {
                  id: 'PRD-005',
                  name: 'Dha Villa',
                  image: '/assets/property.png',
                  location: 'Lahore, Pakistan'
                },
                {
                  id: 'PRD-004',
                  name: 'Necessaire Body Lotion',
                  image: '/assets/property.png',
                  location: 'Lahore, Pakistan'
                },
                {
                  id: 'PRD-003',
                  name: 'Ritual of Sakura',
                  image: '/assets/property.png',
                  location: 'Lahore, Pakistan'
                },
                {
                  id: 'PRD-002',
                  name: 'Lancome Rouge',
                  image: '/assets/property.png',
                  location: 'Lahore, Pakistan'
                },
                {
                  id: 'PRD-001',
                  name: 'Erbology Aloe Vera',
                  image: '/assets/property.png',
                  location: 'Lahore, Pakistan'
                },
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid item lg={8} md={12} xs={12}>
            <PendingProperties
              orders={orders}
              sx={{ height: '100%' }}
              />
          </Grid>
        </Grid>
        </div>
      </div>
    </>
  )
}
