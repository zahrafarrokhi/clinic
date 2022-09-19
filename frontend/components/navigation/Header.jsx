import {
  MenuOutlined,
  NotificationAddOutlined,
  NotificationsOutlined,
} from "@mui/icons-material";
import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import React, { useState } from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import {TiThMenuOutline} from 'react-icons/ti'
import PatientSelection from "./PatientSelection";
import {IoLogoGitlab} from 'react-icons/io5'

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}


export default function Header(props) {
  const { openDrawer } = props;
  return (
    <ElevationScroll {...props}>

    <AppBar position="absolute" color="background" className="">
      <Toolbar className="flex justify-between md:justify-end items-center h-[80px]">
        <Box className="flex items-center">
          <IconButton onClick={openDrawer} className="md:hidden">
            <TiThMenuOutline />
          </IconButton>
          <NotificationsOutlined />
        </Box>

        <IoLogoGitlab className="md:hidden text-3xl" />

     <PatientSelection/>
      </Toolbar>
    </AppBar>
    </ElevationScroll>

  );
}
