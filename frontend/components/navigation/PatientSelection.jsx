import { useTheme } from "@emotion/react";
import { ChevronLeft } from "@mui/icons-material";
import { Button, Divider, Menu, MenuItem, Slide, useMediaQuery } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAsPatient } from "../../lib/slices/patients";
import { AiOutlinePlus } from 'react-icons/ai';

export default function PatientSelection(props) {
  const { onOpen = () => { }, onClose = () => { } } = props;
  //redux
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patientReducer?.patients);
  const patient = useSelector((state) => state.patientReducer?.patient);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  //mobile
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const handleClose = () => {
    setOpen(false)
    setAnchorEl(null)
    onClose()
  }
  const handleClick = (event) => {
    setOpen(true)
    setAnchorEl(event.currentTarget);
    onOpen()
  };
  const selectP = (id) => {
    dispatch(loginAsPatient(id))
    handleClose()
  }
//just only show on mobile
  const mobileAnimation = isMobile ? {
    TransitionComponent: Slide,
    TransitionProps: {
      direction: 'up',
    }
  } : {}
  return (
    <div>
    <Button
      id="basic-button"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
    >
        {patient?.first_name}  {patient?.last_name}
        <Divider orientation="vertical" className="h-full mx-1" ></Divider>
        <ChevronLeft className={`transition-all duration-300 ${open ? 'rotate-90' : '-rotate-90'}`}/>
    </Button>
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
        //just only show on mobile
        {...mobileAnimation}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
        //patientSelection for mobile
        sx={{
          [theme.breakpoints.up('md')]: {
            '& .MuiMenu-paper': {
              borderRadius: '1rem',
              padding:'0.5em'
            }
      },
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
            },
            '& .MuiBackdrop-root': {
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }
      }
      }}
    >
        {patients?.map((p) => (<MenuItem key={p.id} onClick={()=>selectP(p.id)} className={patient?.id===p.id?'text-primary':''}>{p.first_name} {p.last_name }</MenuItem>))} 
        <Divider />
        <Link href="/patients/new" passHref>
        <MenuItem>
            <AiOutlinePlus className="text-primary mx-2"/>
          بیمار جدید
          </MenuItem>
          </Link>
    </Menu>
  </div>
  )
}