import { useTheme } from "@emotion/react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

export default function PatientSelection() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  //mobile
  const theme = useTheme();
  
  const handleClose = () => {
    setOpen(false)
    setAnchorEl(null)
  }
  const handleClick = (event) => {
    setOpen(true)
    setAnchorEl(event.currentTarget);
  };
  return (
    <div>
    <Button
      id="basic-button"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
    >
      Dashboard
    </Button>
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
        //patientSelection for mobile
        sx={{
          [theme.breakpoints.down('md')]: {
            '& .MuiMenu-paper': {
              bottom: 0,
              width: '97%',
              left: '1.5% !important',
              right: '1.5% !important',
              top: 'unset !important',
              maxWidth: 'unset',
              borderTopLeftRadius: '1.5rem',
        borderTopRightRadius: '1.5rem',
            }
      }
      }}
    >
      <MenuItem onClick={handleClose}>Profile</MenuItem>
      <MenuItem onClick={handleClose}>My account</MenuItem>
      <MenuItem onClick={handleClose}>Logout</MenuItem>
    </Menu>
  </div>
  )
}