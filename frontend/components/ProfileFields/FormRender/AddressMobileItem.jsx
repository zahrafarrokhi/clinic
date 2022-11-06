import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Slide, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import Address from "./Address";
import { useDispatch } from "react-redux";
import { deleteAddress } from "../../../lib/slices/address";

export default function AddressMobileItem(props) {
  const { formsTab, data } = props;
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  
  const dispatch = useDispatch();

  const delAddress = async () => {
    try {
      await dispatch(deleteAddress(data.id)).unwrap()
    } catch(e) {
      console.log(e)
    }
    setOpenDel(false)
  }



  return (
    <div className="flex flex-col pr-3 my-2 gap-1">
      <Typography className="text-lg font-bold">{data.name}</Typography>
      <Typography className="text-base">{data.address}</Typography>
      <Typography className="text-sm flex items-center gap-2">
        <FaceRetouchingNaturalIcon className="text-sm"/>
        {data.reciever}
      </Typography>
      <Typography className="text-sm flex items-center gap-2">
        <LocalPhoneIcon className="text-sm"/>
        {data.phone_number}
      </Typography>
      <Typography className="text-sm flex items-center gap-2">
        <MailOutlineIcon className="text-sm"/>
        {data.postal_code}
      </Typography>

      <div className="flex flex-row justify-between items-center">
        <Button variant="text" color="primary" onClick={() => setOpen(true)}>
          <EditIcon className="text-sm mx-2"/>
          ویرایش
        </Button>
        <Button variant="text" color="danger" onClick={() => setOpenDel(true)}>
          <DeleteOutlineIcon className="text-sm mx-2"/>
          حذف آدرس
        </Button>
      </div>
      <Divider></Divider>

      <Dialog
      onClose={() => setOpen(false)}
      open={open}
      fullWidth
      fullScreen
      TransitionComponent={Slide}
    TransitionProps={{
      direction: 'up',
    }}
    PaperProps={{
      sx: {
        overflow: 'visible',
        
      }
    }}
    >
      {/* for handling overflow */}
      <div className="w-full h-full overflow-auto px-4">
      <AppBar color='white' elevation={0} className="md:hidden">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpen(false)}
            aria-label="close"
          >
            <ArrowForwardOutlinedIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            ویرایش آدرس
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar className="md:hidden"/>
      <Address data={data} formsTab={formsTab} />
      </div>
      </Dialog>

      <Dialog
        open={openDel}
        onClose={() => setOpenDel(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            padding: '0.5em'
          }
        }}
      >
        <DialogTitle id="alert-dialog-title">
          حذف {data.name}
        </DialogTitle>
        <Divider variant="middle"/>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            آیا از حذف این آدرس مطمئن هستید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDel(false)} className="flex-grow">خیر</Button>
          <Button onClick={delAddress} autoFocus color="danger" variant="contained" className="flex-grow">
            بله
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
