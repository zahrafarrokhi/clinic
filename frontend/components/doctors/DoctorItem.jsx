import { Button } from "@mui/material";
import Image from "next/image";
import {IoCaretBackCircleOutline } from 'react-icons/io5';
import { useState } from "react";
import DoctorModal from "./DoctorModal";

const DoctorItem = (props) => {
  const { data } = props;
  const [open,setOpen] = useState(false)
  return (
    <div className="flex basis-full min-h-[190px] rounded-xl border border-solid border-backgroundGray md:basis-[45%] md:max-w-[calc(50%-0.5rem)] flex-grow flex-shrink-0 p-2 md:p-4 gap-2">

      <div className="basis-[90px] md:basis-[90px] relative shrink-0">
        <Image layout="fill" objectFit="contain" src={data.image ?? '/defaultDoctorPic/doctor.jpeg'} objectPosition="center" />
     </div>
     <div className="flex flex-col basis-[calc(100%-140px)]  flex-grow flex-shrink-0">
     <div className="text-primary text-base font-bold italic"> {data.department.faname} </div>
        <div className="text-lg font-medium"> {data.first_name} {data.last_name} </div>
        <div  className="hidden md:flex text-lg font-medium"> شماره نظام پزشکی: {data.medical_code} </div>
        <div className=""> {data.degree} </div>

        <div className="hidden md:flex flex-wrap flex-row justify-end gap-1">
        <Button className="rounded-xl w-40" variant="outlined" onClick={()=>setOpen(true)}>مشاهده پروفایل </Button>
        <Button className="rounded-xl w-40" variant="contained">ویزیت آنلاین</Button>
        {/* modal */}
        <DoctorModal open={open} setOpen={setOpen} data={data}/>
        </div>
        
     </div>

     <div className="flex flex-row justify-center items-center md:hidden basis-10 grow-0 shrink-0">
        <IoCaretBackCircleOutline className="text-2xl"/>

        
        </div>
    </div>
  )
}
export default DoctorItem;