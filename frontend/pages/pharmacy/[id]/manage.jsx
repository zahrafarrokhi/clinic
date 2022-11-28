import { Button, Chip, Divider, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { CgDanger } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../../components/navigation/Navigation";
import {
  getPrescriptionPatient,
  getPrescriptionPharmacy,
  updatePrescriptionPharmacy,
} from "../../../lib/slices/pharmacy";
import { convertStrToJalali } from "../../../lib/utils";

const PRESCRIPTION_STATUS_TEXT = {
  waiting_for_response: "در انتظار پاسخ",
  waiting_for_payment: "در انتظار پرداخت",
  waiting_for_delivery: "در انتظار ارسال",
  delivered: "ارسال شده",
  canceled: "لغو شده",
};
const PRESCRIPTION_STATUS_COLOR = {
  waiting_for_response: "warning",
  waiting_for_payment: "error",
  waiting_for_delivery: "primary",
  delivered: "success",
  canceled: "default",
};

export default function Prescription() {
  const prescription = useSelector(
    (state) => state.pharmacyReducer?.prescription
  );
  const patient = useSelector((state) => state.patientReducer?.patient);
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const user = useSelector((state) => state.authReducer?.user);
  const getPrescription = async () => {
    try {
      await dispatch(getPrescriptionPharmacy({ id: id })).unwrap();
    } catch (error) {}
  };
  useEffect(() => {
    getPrescription();
  }, [id]);
  // Price & description
  const [price,setPrice]= useState()
  const [description,setDescription]=useState()

  const updatePrescription = async () => {
    try {
      await dispatch(updatePrescriptionPharmacy({ id: id,price, pharmacy_description:description })).unwrap();
    } catch (error) {}
  };

  return (
    <div className="flex flex-col p-6 gap-4">
      <Divider></Divider>
      <div className="flex flex-col gap-6 px-6">
        <div className="flex text-sm text-gray">درخواست‌ها</div>
        <div className="flex justify-between items-center mx-2">
          <div className="flex gap-12 items-center ">
            <div className="text-lg font-bold">{prescription.id}</div>
            <Chip
              variant="status"
              label={PRESCRIPTION_STATUS_TEXT[prescription?.status]}
              color={PRESCRIPTION_STATUS_COLOR[prescription?.status]}
            ></Chip>
          </div>
        </div>
      </div>
      <Divider></Divider>
      <div className="flex gap-2 flex-wrap">
        <div className="flex flex-col basis-[65%] grow min-w-[200px]  rounded-3xl border-solid border border-gray p-4 gap-2">
          <div className="flex flex-row p-2 items-center justify-start gap-6">
            <div className="before:w-2 before:h-2 before:rounded-full before:bg-primary before:flex font-bold text-primary">
              {" "}
              اطلاعات بیمار
            </div>
          </div>
          <div className="flex flex-row gap-4 flex-wrap">
            <div className="flex flex-row items-center gap-2 rounded-lg border border-solid border-gray p-1 px-2">
              <div className="text-sm ">نام بیمار :</div>
              <div className="text-sm font-bold">
                {prescription.patient.first_name}{" "}
                {prescription.patient.last_name}
              </div>
            </div>
            <div className="flex flex-row items-center gap-2 rounded-lg border border-solid border-gray p-1 px-2">
              <div className="text-sm ">تاریخ:</div>
              <div className="text-sm font-bold">
                {convertStrToJalali(prescription.created_at)}
              </div>
            </div>
            <div className="flex flex-row items-center gap-2 rounded-lg border border-solid border-gray p-1 px-2">
              <div className="text-sm ">نوع سفارش:</div>
              <div className="text-sm font-bold">value</div>
            </div>
            <div className="flex flex-row items-center gap-2 rounded-lg border border-solid border-gray p-1 px-2">
              <div className="text-sm ">شماره سفارش:</div>
              <div className="text-sm font-bold">{prescription.id}</div>
            </div>
            <div className="flex flex-row items-center gap-2 rounded-lg border border-solid border-gray p-1 px-2">
              <div className="text-sm ">شامل بیمه :</div>
              <div className="text-sm font-bold">value</div>
            </div>
            <div className="flex flex-row items-center gap-2 rounded-lg border border-solid border-gray p-1 px-2">
              <div className="text-sm ">کد ملی :</div>
              <div className="text-sm font-bold">
                {prescription.patient.national_id}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col basis-[20%] min-w-[100px] grow rounded-3xl border-solid border border-gray p-4 gap-2">
          <div className="before:w-2 before:h-2 before:rounded-full before:bg-primary before:flex font-bold text-primary">
            {" "}
            توضیحات بیمار
          </div>
          <div className="text-sm text-gray">{prescription.description}</div>
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        <div className="flex flex-col basis-[20%] min-w-[100px] grow rounded-3xl border-solid border border-gray p-4 gap-2">
          <div className="before:w-2 before:h-2 before:rounded-full before:bg-primary before:flex font-bold text-primary">
            {" "}
            اطلاعات سفارش
          </div>
          <div className="flex gap-2 felx-wrap">
            <div className="flex flex-col flex-grow basis-[20%]">

            <TextField 
                label="جمع کل"
                fullWidth
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
                
                InputLabelProps={{
                  shrink: true,

                }}
                InputProps={{
                  sx: {
                    marginTop: '1.5em',
                    '& legend': {
                      display: 'none'
                    }
                  }
                }}

              >

            </TextField>

            </div>
            <div className="flex-grow basis-[70%]">
              <TextField 
                label="توضیحات"
                fullWidth
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                
                InputLabelProps={{
                  shrink: true,

                }}
                InputProps={{
                  sx: {
                    marginTop: '1.5em',
                    '& legend': {
                      display: 'none'
                    }
                  }
                }}
                multiline
                rows={5}
              >

            </TextField>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button onClick={()=> updatePrescription()} className="flex-grow md:flex-grow-0 md:w-32" variant="contained">ثبت و ارسال</Button>
            <Button onClick={()=>{setPrice();setDescription()} } className="flex-grow md:flex-grow-0 md:w-32" variant="outlined">انصراف</Button>
          </div>
        </div>


      </div>
      <div className="flex gap-2 items-center text-sm italic">
        <CgDanger />
        کاربر گرامی نسخه شما توسط داروخانه بررسی نشده است. پس از تایید توسط
        داروخانه هزینه نسخه برای شما پیامک میشود{" "}
      </div>
    </div>
  );
}

Prescription.getLayout = (page) => {
  return <Navigation>{page}</Navigation>;
};
