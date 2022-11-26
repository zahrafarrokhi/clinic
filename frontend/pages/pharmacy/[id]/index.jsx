import { Chip } from "@mui/material";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useEffect } from "react";
import { CgDanger } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../../components/navigation/Navigation";
import { getPrescriptionPatient, getPrescriptionPharmacy } from "../../../lib/slices/pharmacy";
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
  const loadAction = useMemo(() => user.type == 'patient'?getPrescriptionPatient:getPrescriptionPharmacy, [user]);
  const getPrescription = async () => {
    try {
      await dispatch(
        loadAction({ patient_id: patient?.id, id: id })
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
        </div>
        <div className="flex flex-row gap-4">
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
        </div>
      </div>
      <div className="flex gap-2 items-center text-sm italic">
        <CgDanger />
        کاربر گرامی نسخه شما توسط داروخانه بررسی نشده است. پس از تایید توسط داروخانه هزینه نسخه برای شما پیامک میشود       </div>
    </div>
  );
}

Prescription.getLayout = (page) => {
  return <Navigation>{page}</Navigation>;
};
