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
  //trigger => state for scroll
  const trigger = useScrollTrigger({
    //false: dirction scroll +(down) or - (up), true: pure scroll value
    disableHysteresis: true,
    // amount of scroll
    threshold: 0,
    // component that should scroll
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    //elevation=> Shadow depth (AppBar uses Paper ,and Paper has elevation )
    elevation: trigger ? 4 : 0,

  });
}


export default function Header(props) {
  const { openDrawer } = props;
  return (
    <ElevationScroll>

    <AppBar position="absolute" color="white" className="md:border-0 md:border-b md:border-border md:border-solid">
      <Toolbar className="flex justify-between md:justify-end items-center h-[80px]">
        <Box className="flex items-center">
          <IconButton onClick={openDrawer} className="md:hidden">
            <TiThMenuOutline className="text-3xl" />
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
