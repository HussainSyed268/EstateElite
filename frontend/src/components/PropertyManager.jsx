import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';


export default function PropertyManager({ properties = [], sx }) {
  return (
    <Card sx={sx}>
      <CardHeader title="Approved Properties" />
      <Divider />
      <List>
        {properties.map((property, index) => (
          <ListItem divider={index < properties.length - 1} key={property.id}>
            <ListItemAvatar>
              {property.image ? (
                <Box component="img" src={property.image} sx={{ borderRadius: 1, height: '48px', width: '48px' }} />
              ) : (
                <Box
                  sx={{
                    borderRadius: 1,
                    backgroundColor: 'var(--mui-palette-neutral-200)',
                    height: '48px',
                    width: '48px',
                  }}
                />
              )}
            </ListItemAvatar>
            <ListItemText
              primary={property.name}
              primaryTypographyProps={{ variant: 'subtitle1' }}
              secondary={property.location}
              secondaryTypographyProps={{ variant: 'body2' }}
            />
            <IconButton edge="end">
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Link to="/admin/properties">
          <Button
            color="inherit"
            endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
            size="small"
            variant="text"
            >
            View all
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
