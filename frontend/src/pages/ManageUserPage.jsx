import React, {useState, useEffect, useContext} from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import UserList from '../components/ManageUser';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';



export default function ManageUserPage() {
  const { getAllUsers } = useContext(AdminContext);
  const [users, setUsers] = useState([]);
  const placeholderAvatar = 'https://via.placeholder.com/150'; // Placeholder image URL

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getAllUsers();
  
        
        // Fetch additional details for each user and update the users state
        const updatedUsers = await Promise.all(
          fetchedUsers.map(async (user) => {
            try {
              // Fetch user details
              const userDetails = await axios.post(`/api/admin/details/${user.id}`);
              
              let avatar = placeholderAvatar;
              let name = user.username;
              if (userDetails.data.userProfile) {
              // Extract necessary information and update user object
              console.log("checking");
              const userProfile = userDetails.data.userProfile;
               avatar = userProfile.profile_picture || placeholderAvatar;
               name = `${userProfile.first_name} ${userProfile.last_name}`;
              }

              // Return updated user object
              return {
                ...user,
                avatar,
                name
              };
            } catch (error) {
              console.error(`Error fetching details for user ${user.id}:`, error);
              // If an error occurs, return the user object without modifying it
              return user;
            }
          })
        );
  
        // Set the updated users state
        setUsers(updatedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchUsers();
  }, [getAllUsers]);

  return (
    <div className="mx-16 ml-24 lg:mx-32 md:mx-20 h-full mt-32">
      <Grid item lg={8} md={12} xs={12}>
        {console.log(users)}
        <UserList
          users={users}
          sx={{ height: '100%' }}
        />
      </Grid>
    </div>
  );
}
