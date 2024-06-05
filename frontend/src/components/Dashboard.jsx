import React from "react"
import {DashboardNav} from "./AdminPanel/DashboardNav";
import Analytics from "../components/Analytics";
import PropertyManager from "../components/PropertyManager";
import  PendingProperties  from "./PendingProperties";
import Grid from '@mui/material/Grid';
import dayjs from "dayjs";

export default function Dashboard() {
  const page = 0;
  const rowsPerPage = 5;

  return(
    <>
      
      <div className="w-full bg-[]">
        <Analytics/>
        <div className="lg:mx-14 sm:mx-8 mt-10"> 
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
              orders={[
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
                  status: 'refunded',
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
                  status: 'delivered',
                  createdAt: dayjs().subtract(10, 'minutes').toDate(),
                },
                {
                  id: 'ORD-001',
                  customer: { name: 'Adam Denisov' },
                  amount: 16.76,
                  status: 'delivered',
                  createdAt: dayjs().subtract(10, 'minutes').toDate(),
                },
              ]}
              sx={{ height: '100%' }}
              />
          </Grid>
        </Grid>
        </div>
      </div>
    </>
  )
}
