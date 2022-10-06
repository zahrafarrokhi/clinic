import { Button } from "@mui/material";
import Image from "next/image";
import {IoCaretBackCircleOutline } from 'react-icons/io5'

const DoctorItem = (props) => {
  const { data } = props;
  return (
    <div className="flex basis-full h-[220px] rounded-xl border border-solid border-backgroundGray md:basis-[45%] md:max-w-[calc(50%-0.5rem)] flex-grow flex-shrink-0 p-2 md:p-4 gap-2">

      <div className="basis-[90px] md:basis-[90px] relative shrink-0">
        <Image layout="fill" objectFit="contain" src={data.image ?? '/defaultDoctorPic/doctor.jpeg'} />
     </div>
     <div className="flex flex-col flex-grow">
     <div className="text-primary text-base font-bold py-2 italic"> {data.department.name} </div>
        <div className="text-lg font-medium"> {data.first_name} {data.last_name} </div>
        <div  className="hidden md:flex text-lg font-medium"> شماره نظام پزشکی: {data.medical_code} </div>
        <div className=" py-2"> {data.degree} </div>

        <div className="hidden md:flex flex-row justify-end gap-1">
        <Button className="rounded-xl" variant="outlined">مشاهده پروفایل </Button>
        <Button className="rounded-xl" variant="contained">درخواست ویزیت آنلاین</Button>
        
        </div>
        
     </div>

     <div className="flex flex-row justify-center items-center text-lg flex-grow md:hidden ">
        <IoCaretBackCircleOutline/>

        
        </div>
    </div>
  )
}
export default DoctorItem;