import { Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import DrawerNav from './DrawerNav';
import Header from './Header';

export default function Navigation(props) {
  const { children } = props;
  //use for openig  or closing drawer
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
      <DrawerNav open={open} setOpen={setOpen} />
      <Box sx={{ display: 'flex ' ,flexDirection:'column', width: '100%', height: '100%', position: 'relative'}}>
        <Header openDrawer={() => setOpen(true)}/>
        <Box>
          <Toolbar className="h-[80px]"></Toolbar>
          {children}
        </Box>
      </Box>
   </Box>
  )
}