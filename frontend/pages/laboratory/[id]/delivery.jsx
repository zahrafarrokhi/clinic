import { Button, Divider } from "@mui/material";
import { add, eachDayOfInterval, format } from "date-fns-jalali";
import english_format from "date-fns/format";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../../components/navigation/Navigation";
import AddressSelection from "../../../components/ProfileFields/AddressSelection";
import { getPrescriptionPaymentPatient } from "../../../lib/slices/laboratory";
import { convertStrToDate, stringifyPrice } from "../../../lib/utils";

const SetDay = (props) => {
  const { selectedDay, setSelectedDay } = props;
  const prescription = useSelector(
    (state) => state.laboratoryReducer?.prescription
  );
  const now = new Date();
  const days = eachDayOfInterval({
    start: add(now, { days: 1 }),
    end: add(now, { days: 7 }),
  });
  return (
    <div className="flex flex-col rounded-lg border border-solid border-gray p-6 gap-3">
      <div className="text-sm md:text-base font-bold ">تاریخ مراجعه</div>
      <div className="flex flex-row gap-3 overflow-x-auto ">
        {prescription?.time.filter((item, index, array) => index == array.findIndex((newItem) => newItem.date == item.date)).map((d) => (
          <div
            onClick={() => setSelectedDay(d.date)}
            className={`${
              selectedDay &&
              selectedDay == d.date
                ? "border-primary text-primary"
                : "border-gray"
            }  border border-solid rounded-lg basis-[100px] shrink-0 h-[80px] flex flex-col justify-center items-center `}
          >
            <div className="text-base">{format(convertStrToDate(`${d.date}`), "EEEE")}</div>
            <div className="text-sm"> {format(convertStrToDate(`${d.date}`), "dd MMMM")}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const times = {
  "09:00:00": "۹ تا ۱۲",
  "12:00:00": "۱۲ تا ۱۵",
  "15:00:00": "۱۵ تا ۱۸",
  "18:00:00": "۱۸ تا ۲۱",
};
export default function Delivery() {
  const [day, setDay] = useState();
  const [time, setTime] = useState();
  const prescription = useSelector(
    (state) => state.laboratoryReducer?.prescription
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const patient = useSelector((state) => state.patientReducer?.patient);

  const updatePrescription = async () => {
    try {
      const response = await dispatch(getPrescriptionPaymentPatient({
        selected_time: time,
        id,
        patient_id: patient.id,
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
  };

  return (
    <div className="flex flex-col  w-full gap-6 p-8">
      <div className="text-sm text-grayBtn">آزمایشگاه</div>

      {/* with for */}
      <div className="text-lg font-bold ">نسخه های تحویلی</div>

      <Divider></Divider>
      <div className="flex flex-row gap-8 flex-wrap">
        <div className="flex flex-col basis-[60%] flex-grow gap-8 overflow-hidden">
          <AddressSelection
            addressId={prescription?.address}
            disabled
          ></AddressSelection>
          <SetDay selectedDay={day} setSelectedDay={setDay} />
          <div className="flex flex-col rounded-lg border border-solid border-gray p-6 gap-3">
            <div className="text-sm md:text-base font-bold ">تاریخ مراجعه</div>
            <div className="flex flex-row gap-3 overflow-x-auto ">
              {prescription?.time.filter(item => item.date == day).map((d) => (
                <div
                  onClick={() => setTime(d)}
                  className={`${
                    time == d ? "border-primary text-primary" : "border-gray"
                  }  border border-solid rounded-lg basis-[100px] shrink-0 h-[80px] flex flex-col justify-center items-center `}
                >
                  <div className="text-base">{times[d.start_time]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-grow min-w-[200px]">
          <div className="flex rounded-lg border border-solid border-gray flex-col p-5 gap-2">
            <div className="flex flex-row justify-between items-center">
              <div>هزینه سفارش:</div>
              <div className="font-bold">
                {stringifyPrice(prescription?.price || 0)}
              </div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <div>هزینه ارسال:</div>
              <div className="font-bold">
                {stringifyPrice(prescription?.delivery_price || 0)}
              </div>
            </div>
            <Divider></Divider>
            <div className="flex flex-row justify-between items-center">
              <div>جمع کل:</div>
              <div className="font-bold">
                {stringifyPrice(
                  (prescription?.price || 0) +
                    (prescription?.delivery_price || 0)
                )}
              </div>
            </div>

            <Button variant="contained" onClick={updatePrescription} disabled={time == null}>
              تایید و پرداخت
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
Delivery.getLayout = (page) => {
  return <Navigation>{page}</Navigation>;
};
