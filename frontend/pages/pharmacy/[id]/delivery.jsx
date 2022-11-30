
import { Button, Divider } from "@mui/material";
import { add, eachDayOfInterval, format } from "date-fns-jalali";
import english_format from 'date-fns/format';
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../../components/navigation/Navigation";
import AddressSelection from "../../../components/ProfileFields/AddressSelection";
import { setPharmacyTimeAndPayment } from "../../../lib/slices/pharmacy";
import { stringifyPrice } from "../../../lib/utils";




const SetDay = (props) =>{
  const {selectedDay,setSelectedDay}=props
  const now = new Date();
  const days =  eachDayOfInterval({
    start: add(now, {days: 1}),
    end: add(now, {days: 7}),
  });
  console.log(days)
  return (
    <div className="flex flex-col rounded-lg border border-solid border-gray p-6 gap-3">
        <div className="text-sm md:text-base font-bold ">تاریخ مراجعه</div>
<div className="flex flex-row gap-3 overflow-x-auto ">

{days.map((d)=><div onClick={()=>setSelectedDay(d)} className={`${selectedDay && format(selectedDay, 'yyyy/MM/dd')==format(d, 'yyyy/MM/dd') ?'border-primary text-primary':'border-gray'}  border border-solid rounded-lg basis-[100px] shrink-0 h-[80px] flex flex-col justify-center items-center `}>
  <div className="text-base">{format(d, 'EEEE')}</div>
  <div className="text-sm"> {format(d, 'dd MMMM')}</div>
  </div>)}
</div>
</div>
  )

}

const times = [
  {id: '09:00:00', value: '۹ تا ۱۲'}, 
  {id: '12:00:00', value: '۱۲ تا ۱۵'}, 
  {id: '15:00:00', value: '۱۵ تا ۱۸'}, 
  {id: '18:00:00', value: '۱۸ تا ۲۱'}
]
export default function Delivery() {
  const [day,setDay]=useState();
  const [time,setTime]=useState();
  const prescription = useSelector(
    (state) => state.pharmacyReducer?.prescription
  );
  const dispatch = useDispatch();
  const router = useRouter()
  const {id} = router.query;
  const patient = useSelector((state) => state.patientReducer?.patient)

  const updatePrescription = async () => {
    try {
      const response = await dispatch(setPharmacyTimeAndPayment({
        day: english_format(day, "yyyy-MM-dd"),
        id,
        patient_id: patient.id,
        time: time.id,
      })).unwrap()

      var form = document.createElement("form");
      form.setAttribute("method", "POST");
      form.setAttribute("action", "https://sandbox.banktest.ir/ap/asan.shaparak.ir");
      form.setAttribute("target", "_self");
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("name", "RefId");
      hiddenField.setAttribute("value", response?.data?.payment?.ref_id);
      form.appendChild(hiddenField);
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form)
    } catch(e) {

    }
  }

  return(
    <div className="flex flex-col  w-full gap-6 p-8">
      
      
      <div className='text-sm text-grayBtn'>داروخانه</div>
      
      {/* with for */}
      <div className='text-lg font-bold '>نسخه های تحویلی</div>

      <Divider></Divider>
    <div className="flex flex-row gap-8 flex-wrap">
      <div className="flex flex-col basis-[60%] flex-grow gap-8 overflow-hidden">
      <AddressSelection addressId={prescription?.address} disabled></AddressSelection>
      <SetDay selectedDay={day} setSelectedDay={setDay}/>
      <div className="flex flex-col rounded-lg border border-solid border-gray p-6 gap-3">
        <div className="text-sm md:text-base font-bold ">تاریخ مراجعه</div>
<div className="flex flex-row gap-3 overflow-x-auto ">

{times.map((d)=><div onClick={()=>setTime(d)} className={`${time == d ?'border-primary text-primary':'border-gray'}  border border-solid rounded-lg basis-[100px] shrink-0 h-[80px] flex flex-col justify-center items-center `}>
  <div className="text-base">{d.value}</div>
  </div>)}
</div>
</div>
      </div>
      <div className="flex flex-col flex-grow min-w-[200px]">

      <div className="flex rounded-lg border border-solid border-gray flex-col p-5 gap-2">

        <div className="flex flex-row justify-between items-center">
          <div>هزینه سفارش:</div>
          <div className="font-bold">{stringifyPrice(prescription?.price || 0)}</div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div>هزینه ارسال:</div>
          <div className="font-bold">{stringifyPrice(prescription?.delivery_price || 0)}</div>
        </div>
        <Divider></Divider>
        <div className="flex flex-row justify-between items-center">
          <div>جمع کل:</div>
          <div className="font-bold">{stringifyPrice((prescription?.price || 0) + (prescription?.delivery_price || 0))}</div>
        </div>

        <Button variant="contained" onClick={updatePrescription}>تایید و پرداخت</Button>

      </div>

      </div>
    </div>
    </div>

  )
}
Delivery.getLayout = (page) => {
  return <Navigation>{page}</Navigation>;
};
