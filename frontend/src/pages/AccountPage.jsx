import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import  AccountDetailsForm  from '../components/AccountDetails';
import  AccountInfo  from '../components/Account';
import UpdatePasswordForm  from '../components/UpdatePassword';

export default function AccountPage() {
  return (
    <div className='lg:mx-32 mt-6 sm:mx-8 '>
    <Stack spacing={2} >
      <div>
        <Typography variant="h4">Account</Typography>
      </div>
      <Grid container spacing={3}>
        <Grid lg={4} md={6} xs={12}>
          <AccountInfo />
        </Grid>
        <Grid lg={8} md={6} xs={12}>
          <AccountDetailsForm />
        </Grid>
        <Grid lg={12} md={12} xs={12}>
          <UpdatePasswordForm />
        </Grid>
      </Grid>
    </Stack>
    </div>
  );
}
