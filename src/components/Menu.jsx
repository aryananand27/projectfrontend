import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import {green } from '@mui/material/colors'
import PaidIcon from '@mui/icons-material/Paid';
import Tooltip from '@mui/material/Tooltip';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Logout from '@mui/icons-material/Logout';
import { Link, useFetcher, useNavigate } from 'react-router-dom';
import { CounterContext } from './context/count';

import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react';



export default function AccountMenu() {
  
    let auth=JSON.parse(sessionStorage.getItem('user'));;
    const counterContext=React.useContext(CounterContext);
   
    useEffect(()=>{
      auth=JSON.parse(sessionStorage.getItem('user'));
    },[counterContext.log])
  
    const color=green[500];
    const navigate=useNavigate();
    
 // logout function
 const loggedOut=()=>{
  sessionStorage.clear();
  counterContext.setLog(counterContext.log+1);
   navigate('/signin');
 }
 
 
    //color Code ---->

  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  
  
  
  // Menu Functonality code--->
    const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

    
    
        <Tooltip title="Account settings" arrow>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          > 
          
            <Avatar sx={{width:32, height: 32}} {...stringAvatar( `${auth.result.name}`)}  />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
       
        PaperProps={{
          elevation: 0,
          sx: {
            
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose} >
          <Avatar /> {`${auth.result.name}`}
        </MenuItem>
       
        <Divider />
        <Link to={`/cart/${auth.result._id}`} style={{textDecoration:"none"}} >
        <MenuItem style={{color:"black"}}>
          <ListItemIcon>
            <ShoppingCartIcon fontSize="small" />
          </ListItemIcon>
          My Cart
        </MenuItem>
        </Link>
        <Link to={`/orders/${auth.result._id}`}  style={{textDecoration:"none"}}>
        <MenuItem style={{color:"black"}}>
          <ListItemIcon>
            <PaidIcon fontSize="small" />
          </ListItemIcon>
          My Orders 
        </MenuItem>
        </Link>
       
        <Divider sx={{height:"25px"}}/>
       
     
       
        <MenuItem onClick={loggedOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
