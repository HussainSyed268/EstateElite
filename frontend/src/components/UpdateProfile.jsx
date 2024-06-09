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
import { toast } from 'react-toastify';


  const decodeBase64Image = (base64Image) => {
    return `data:image/jpeg;base64,${base64Image}`;
  };

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
  const { getUserDetails, UpdateUserDetails } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    status: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [avatarSrc, setAvatarSrc] = useState('');
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    getUserDetails().then((data) => {
      console.log(data);
      setProfile({
        firstName: data.userProfile.first_name,
        lastName: data.userProfile.last_name,
        email: data.user.email,
        phone: data.userProfile.contact_number,
        status: data.user.role,
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      const decodedAvatar = decodeBase64Image(data.userProfile.profile_picture);
      setAvatarSrc(decodedAvatar);
      setDisplayName(`${data.userProfile.first_name} ${data.userProfile.last_name}`);
    });
  }, []);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
    setIsSaved(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsEditing(false);
    setIsSaved(true);
    if(profile.newPassword !== profile.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    } else{
    UpdateUserDetails(profile.email, profile.phone,profile.newPassword , profile.firstName, profile.lastName, profile.oldPassword);
    setDisplayName(`${profile.firstName} ${profile.lastName}`);
  }
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
          <Avatar src={avatarSrc} sx={{ height: '80px', width: '80px' }} />
          <Box ml={2}>
            <Typography variant="h6">{displayName}</Typography>
            <Typography variant="body2">{profile.status}</Typography>
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
          <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="oldPassword"
                label="Old Password"
                name="oldPassword"
                type="password"
                value={profile.oldPassword}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>
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
            <Box display="flex" justifyContent="flex-end" marginBottom="1rem">
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
    {console.log(profile)}
  </div>
  );
};

export default UpdateProfile;
