import { Avatar, Button } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import ProfileModal from '../doctors/ProfileModal'
import PatientProfile from '../PatientProfile';

export default function AvatarChat(props) {

  const visit = useSelector((state) => state.visitReducer?.visit);
  const [open, setOpen] = useState(false);
  const [openPatient, setOpenPatient] = useState(false);
  const user = useSelector((state) => state.authReducer?.user);

  return (
    <div className="flex flex-row justify-between shadow-lg p-4">
    <div className="flex items-center font-bold gap-3">
     {user.type == 'patient' && <Avatar src={visit?.doctor?.image}></Avatar>}
      <div className="font-bold text-sm">

       {user.type == 'patient' ? `${visit?.doctor?.first_name} ${visit?.doctor?.last_name}`:`${visit?.patient?.first_name} ${visit?.patient?.last_name}`}
      </div>{" "}
      \
      <div className="font-bold text-sm">
        دپارتمان: {visit?.doctor?.department?.faname}
      </div>
    </div>
    {user.type == 'patient' ? <Button onClick={() => setOpen(true)}>مشاهده پروفایل دکتر</Button>:
    <Button onClick={() => setOpenPatient(true)}>مشاهده پروفایل بیمار</Button>}
    <ProfileModal open={open} setOpen={setOpen} data={visit?.doctor} />
    <PatientProfile open={openPatient} setOpen={setOpenPatient} />
  </div>
  )
}
