import React, { useState, useContext, useEffect } from 'react';
import {
  Avatar,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Box,
  Divider,
  Paper,
} from '@mui/material';
import { styled } from '@mui/system';
import { AuthContext } from '../context/AuthContext';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(6),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'center',
}));

const ProfileBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  width: '100%',
}));

const InfoBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const PasswordBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  width: '100%',
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%', // Fix IE 11 issue.
  marginTop: theme.spacing(3),
}));

const UpdateProfile = () => {
  const { getUserDetails, auth } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    getUserDetails().then((data) => {
      setProfile({
        firstName: data.userProfile.first_name,
        lastName: data.userProfile.last_name,
        email: data.user.email,
        phone: data.userProfile.contact_number,
        newPassword: '',
        confirmPassword: '',
      });
    });
  }, []);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
    setIsSaved(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setIsSaved(true);
    // Perform save logic here
    console.log(profile);
  };

  return (
    <div className='min-w-[300] mx-16 md:mx-0 lg:mx-0 sm:mx-0'>
    <StyledContainer component="main" maxWidth="md">
      <ProfileHeader>
        <Typography component="h1" variant="h5">
          Account
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleEdit}
          disabled={!isSaved}
        >
          Edit Profile
        </Button>
      </ProfileHeader>
      <ProfileBox>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar src='/assets/avatar.png' sx={{ height: '80px', width: '80px' }} />
          <Box ml={2}>
            <Typography variant="h6">{`${profile.firstName} ${profile.lastName}`}</Typography>
            <Typography variant="body2">Los Angeles, USA</Typography>
            <Typography variant="body2">GTM-7</Typography>
          </Box>
        </Box>
      </ProfileBox>
      <StyledForm>
        <ProfileBox>
        <Typography variant="h6" sx={{ mb: 1 }}>Profile</Typography>
  <Typography variant="body2" sx={{ mb: 1 }}>The information can be edited</Typography>
  <Divider sx={{ mb: 2 }} />
          <InfoBox>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={profile.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={profile.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  />
              </Grid>
            </Grid>
          </InfoBox>
          
        </ProfileBox>
        <PasswordBox>
          <Typography variant="h6">Password</Typography>
          <Divider />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="newPassword"
                label="New Password"
                name="newPassword"
                type="password"
                value={profile.newPassword}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={profile.confirmPassword}
                onChange={handleChange}
                disabled={!isEditing}
                />
            </Grid>
          </Grid>
          
        </PasswordBox>
        {isEditing && (
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="success"
                onClick={handleSave}
              >
                Save Details
              </Button>
            </Box>
          )}
      </StyledForm>
    </StyledContainer>
  </div>
  );
};

export default UpdateProfile;
