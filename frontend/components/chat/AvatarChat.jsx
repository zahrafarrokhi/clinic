import { Avatar, Button } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import ProfileModal from '../doctors/ProfileModal'

export default function AvatarChat(props) {

  const visit = useSelector((state) => state.visitReducer?.visit);
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-row justify-between shadow-lg p-4">
    <div className="flex items-center font-bold gap-3">
      <Avatar src={visit?.doctor?.image}></Avatar>
      <div className="font-bold text-sm">
        {visit?.doctor?.first_name} {visit?.doctor?.last_name}
      </div>{" "}
      \
      <div className="font-bold text-sm">
        {visit?.doctor?.department?.faname}
      </div>
    </div>
    <Button onClick={() => setOpen(true)}>مشاهده پروفایل دکتر</Button>
    <ProfileModal open={open} setOpen={setOpen} data={visit?.doctor} />
  </div>
  )
}
