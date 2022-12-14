import { AttachEmail, LocalHospital, Menu } from '@mui/icons-material';
import { Button, Dialog, IconButton, ListItemText, MenuItem, Select, Slide, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import VaccinesIcon from "@mui/icons-material/Vaccines";
import BiotechIcon from "@mui/icons-material/Biotech";
import { createPrescrptionDoctor, createPrescrptionDoctorPic } from '../../lib/slices/visits';
import { useDispatch, useSelector } from 'react-redux';


export default function CreatePrescription() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const [attachments, setAttatchments] = useState([]);
  const inputRef = useRef();
  const [select,setselected]=useState('paraclinic')
  const dispatch = useDispatch();
  const visit = useSelector((state) => state.visitReducer?.visit);
  const submit = async()=>{
    try {
      
      const res = await dispatch(createPrescrptionDoctor({
        // models in backend
        visit:visit.id,
        type:select,
       
      })).unwrap()
      for (let attach of attachments){
        await dispatch(createPrescrptionDoctorPic({
          image:attach,
          id:res.data.id
        
        })).unwrap()
      }
      setOpen(false)
    } catch (error) {
      console.log(error)
      
    }
  }
  return (
    <div>
      <IconButton onClick={() => setOpen(true)}>
        <Menu />
      </IconButton>
      <Dialog
        onClose={() => setOpen(false)}
        open={open}
        maxWidth={"xs"}
        fullWidth
        // fullScreen={isMobile}
        TransitionComponent={Slide}
        TransitionProps={{
          direction: 'up',
        }}
        PaperProps={{
          sx: {
            padding: '1em',
            overflow: 'visible',
            [theme.breakpoints.up('md')]: {
              borderRadius:'15px'
            },
            [theme.breakpoints.down('md')]: {
              position: 'fixed',
              bottom:'0',
              width: '90%',
              maxWidth: 'unset',
              m: 0,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
              borderTopRightRadius: '1em',
              borderTopLeftRadius: '1em',
            }
          }
        }}
      >
        <div className='flex flex-col gap-2'>
          <Select value={select} onChange={(e)=>setselected(e.target.value)}
          sx={{
            '& .MuiInputBase-input': {
              display: 'flex',
              alignItems: 'center',
            }
          }}
          >
            <MenuItem value="paraclinic">
              <LocalHospital className="ml-4" />
              <ListItemText primary={"پاراکلینیک"} />
            </MenuItem>
            <MenuItem value="pharmacy">
              <VaccinesIcon className="ml-4" />
              <ListItemText primary={"داروخانه"} />
            </MenuItem>
            <MenuItem value="laboratory">
              <BiotechIcon className="ml-4" />
              <ListItemText primary={"آزمایشگاه"} />
            </MenuItem>
          </Select>
          <div className='flex flex-row gap-2 overflow-auto w-full'>
            <input type="file" hidden onChange={(e) => setAttatchments([...attachments, ...e.target.files])} ref={inputRef} />
            {attachments.map(item => <div className='relative pointer border border-dashed border-gray flex flex-col items-center justify-center gap-4 w-[90px] h-[120px] text-gray rounded-lg shrink-0 overflow-hidden sh' onClick={() => inputRef.current.click()} role="button">
                <img className='inset-0 absolute w-full h-full object-fill'  src={URL.createObjectURL(item)} />
            </div>)}
            <div className='pointer border border-dashed border-gray flex flex-col items-center justify-center gap-4 w-[90px] h-[120px] text-gray rounded-lg shrink-0' onClick={() => inputRef.current.click()} role="button">
                <AttachEmail />
                <div>آپلود تصویر</div>
            </div>
          </div>
          <div className='flex flex-row gap-2'>
            <Button size="small" className="flex-grow basis-[30%]" variant='contained' onClick={submit}>تایید</Button>
            <Button size="small" className="flex-grow basis-[30%]" variant='outlined' onClick={() => setOpen(false)}>انصراف</Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
