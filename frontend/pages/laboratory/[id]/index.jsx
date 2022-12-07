import { Button, Chip, Divider, IconButton } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useEffect } from "react";
import { CgDanger } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../../components/navigation/Navigation";
import {
  getPrescriptionPatient,
} from "../../../lib/slices/laboratory";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { convertStrToJalali, stringifyPrice } from "../../../lib/utils";
import Tests from "../../../components/laboratory/Tests";

const PRESCRIPTION_STATUS_TEXT = {
  waiting_for_response: "در انتظار پاسخ",
  waiting_for_payment: "در انتظار پرداخت",
  waiting_for_test: "در انتظار نمونه‌گیر",
  result: "نتیجه‌ی آزمایش",
  canceled: "لغو شده",
};
const PRESCRIPTION_STATUS_COLOR = {
  waiting_for_response: "warning",
  waiting_for_payment: "error",
  waiting_for_test: "primary",
  result: "success",
  canceled: "default",
};

export default function Prescription() {
  const prescription = useSelector(
    (state) => state.laboratoryReducer?.prescription
  );
  const patient = useSelector((state) => state.patientReducer?.patient);
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const user = useSelector((state) => state.authReducer?.user);
  // const loadAction = useMemo(() => user.type == 'patient'?getPrescriptionPatient:getPrescriptionPharmacy, [user]);
  const getPrescription = async () => {
    try {
      await dispatch(
        getPrescriptionPatient({ patient_id: patient?.id, id: id })
      ).unwrap();
    } catch (error) {}
  };
  useEffect(() => {
    if (id && patient) getPrescription();
  }, [patient, id]);


  return (
    <div className="flex flex-col p-6 gap-4">
      <div className="flex flex-col rounded-3xl border-solid border border-gray p-4 gap-2">
        <div className="flex flex-row p-2 items-center justify-start gap-6">
          <div className="before:w-2 before:h-2 before:rounded-full before:bg-primary before:flex font-bold text-primary">
            {" "}
            اطلاعات سفارش
          </div>
          <div>
            <Chip
              variant="status"
              label={PRESCRIPTION_STATUS_TEXT[prescription?.status]}
              color={PRESCRIPTION_STATUS_COLOR[prescription?.status]}
            ></Chip>
          </div>
          <div className="flex justify-end flex-grow">
            <IconButton onClick={() => router.back()} className="border border-solid border-backgroundGray text-sm">
              <ArrowBackIosNewIcon color="backgroundGray text-sm" />
            </IconButton>
          </div>
        </div>
        <div className="flex flex-row gap-4 flex-wrap">
          <div className="flex flex-row items-center gap-2 md:rounded-lg basis-full md:basis-auto flex-grow md:flex-grow-0  border-0 last:border-b-0 md:last:border-b border-b md:border border-solid border-gray p-1 px-2">
            <div className="text-sm basis-[40%] text-left md:text-right md:basis-auto ">
              تاریخ:
            </div>
            <div className="text-sm font-bold">
              {convertStrToJalali(prescription?.created_at)}
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 md:rounded-lg basis-full md:basis-auto flex-grow md:flex-grow-0  border-0 last:border-b-0 md:last:border-b border-b md:border border-solid border-gray p-1 px-2">
            <div className="text-sm basis-[40%] text-left md:text-right md:basis-auto ">
              نوع سفارش:
            </div>
            <div className="text-sm font-bold">value</div>
          </div>
          <div className="flex flex-row items-center gap-2 md:rounded-lg basis-full md:basis-auto flex-grow md:flex-grow-0  border-0 last:border-b-0 md:last:border-b border-b md:border border-solid border-gray p-1 px-2">
            <div className="text-sm basis-[40%] text-left md:text-right md:basis-auto ">
              شماره سفارش:
            </div>
            <div className="text-sm font-bold">{prescription?.id}</div>
          </div>
          <div className="flex flex-row items-center gap-2 md:rounded-lg basis-full md:basis-auto flex-grow md:flex-grow-0  border-0 last:border-b-0 md:last:border-b border-b md:border border-solid border-gray p-1 px-2">
            <div className="text-sm basis-[40%] text-left md:text-right md:basis-auto ">
              شامل بیمه :
            </div>
            <div className="text-sm font-bold">value</div>
          </div>
        </div>
      </div>
      {prescription?.status === "waiting_for_response" && (
        <div className="flex gap-2 items-center text-sm italic">
          <div>
            <CgDanger />
          </div>
          کاربر گرامی نسخه شما توسط آزمایشگاه بررسی نشده است. پس از تایید توسط
          آزمایشگاه هزینه نسخه برای شما پیامک میشود
        </div>
      )}
      {prescription?.status != "waiting_for_response" && (
        <Tests disabled tests={prescription?.tests || []}/>
      )}
      {prescription?.status != "waiting_for_response" && (
        <div className="flex flex-col rounded-3xl border-solid border border-gray p-4 gap-12">
          
          <div className="">
            <span className="text-sm text-gray">توضیحات:</span>
            <span className="text-lg font-bold">
              {prescription?.laboratory_description}
            </span>
          </div>
         
          <div className="justify-between flex flex-row gap-2 flex-wrap">
            
          <div className="flex gap-4 items-center">
              <div className="text-sm font-bold">هزینه‌ی آزمایش:</div>
              <div className="text-lg font-bold text-primary">
                {stringifyPrice(
                  prescription?.price + prescription?.delivery_price
                )}
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="text-sm font-bold">هزینه‌ی مراجعه:</div>
              <div className="text-lg font-bold text-primary">
                {stringifyPrice(
                  prescription?.delivery_price
                )}
              </div>
            </div>

            <div className="flex gap-4 items-center">
            <Divider orientation="vertical"/>
              <div className="text-sm font-bold">جمع کل:</div>
              <div className="text-lg font-bold text-primary">
                {stringifyPrice(
                  prescription?.price + prescription?.delivery_price
                )}
              </div>
            </div>
          </div>
        </div>
      )}


      {prescription?.status == "waiting_for_payment" && (
        <div className="flex gap-2 justify-end md:flex-grow-0">
          <Button
            onClick={() => router.push(`/laboratory/${id}/delivery`)}
            className="basis-[45%] md:0 md:basis-[10em] md:flex-grow-0 md:w-32"
            variant="contained"
          >
            تکمیل سفارش
          </Button>
          <Button
            // onClick={cancel}
            className="basis-[45%] flex-grow md:flex-grow-0 md:basis-[10em] md:w-32"
            variant="outlined"
          >
            انصراف
          </Button>
        </div>
      )}

      {prescription?.status === "canceled" && (
        <div className="flex gap-2 items-center text-sm italic">
          <div>
            <CgDanger />
          </div>
          کاربر گرامی اعتبار پرداخت نسخه شما به پایان رسید و سفارش شما لغو
          گردید. در صورت علاقه میتوانید مجددا درخواست خود را ثبت نمایید.
        </div>
      )}
    </div>
  );
}

Prescription.getLayout = (page) => {
  return <Navigation>{page}</Navigation>;
};
