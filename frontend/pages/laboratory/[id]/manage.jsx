import { ArrowBackIos } from "@mui/icons-material";
import {
  Button,
  Chip,
  Divider,
  InputAdornment,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { CgDanger } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../../components/navigation/Navigation";
import {
  convertStrToJalali,
  persianToEnglishDigits,
  preventLettersTyping,
  stringifyPrice,
} from "../../../lib/utils";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { getPrescriptionLaboratory, updatePrescriptionLaboratory } from "../../../lib/slices/laboratory";
import AddressSelection from "../../../components/ProfileFields/AddressSelection";
import Tests from "../../../components/laboratory/Tests";

const PRESCRIPTION_STATUS_TEXT = {
  waiting_for_response: "در انتظار پاسخ",
  waiting_for_payment: "در انتظار پرداخت",
  waiting_for_test: "در انتظار نمونه‌گیر",
  waiting_for_results: "در انتظار نتیجه",
  result: "نتیجه‌ی آزمایش",
  canceled: "لغو شده",
};
const PRESCRIPTION_STATUS_COLOR = {
  waiting_for_response: "warning",
  waiting_for_payment: "error",
  waiting_for_test: "primary",
  waiting_for_results: "primary",
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
  // Price & description
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [doctorName, setDoctorName] = useState("");
  // send
  const [send,setSend]= useState(0)
  //attachment pic
  const [attachment, setAttachment] = useState([]);
  const ref = useRef();
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
// test
const [tests, setTests] = useState([
  // {name, insurance, sup_insurance}
]);
  const getPrescription = async () => {
    try {
      const res = await dispatch(getPrescriptionLaboratory({ id: id })).unwrap();
      setPrice(res.data.price || 0);
      setSend(res.data.delivery_price || 0);
      setDescription(res.data.laboratory_description);
      setImage(res.data.pic[0]);
      setDoctorName(res.data.doctor_name)
      setTests(res.data.tests);
    } catch (error) {}
  };
  useEffect(() => {
    getPrescription();
  }, [id]);
  
  const updatePrescription = async () => {
    try {
      await dispatch(
        updatePrescriptionLaboratory({
          id: id,
          price,
          laboratory_description: description,
          delivery_price:send,
          doctor_name: doctorName,
          tests,

        })
      ).unwrap();
      // for (let attach of attachment){
      //   await dispatch(createPrescriptionPicPharmacy({
      //     pic:attach,
      //     pre: id
        
      //   })).unwrap()
      // }
    } catch (error) {
      console.log(error);
    }
  };

  // 
  const deliver = async () => {
    try {
      // await dispatch(
      //   deliverPrescription({
      //     id: id,

      //   })
      // ).unwrap();
    } catch (error) {
      
    }
  }

  // pic
  const [image, setImage] = useState();
  // close
  const [close, setClose] = useState(true);
  return (
    <div className="flex flex-col p-6 gap-4">
      <Divider></Divider>
      <div className="flex flex-col gap-6 px-6">
        <div className="flex text-sm text-gray">درخواست‌ها</div>
        <div className="flex justify-between items-center mx-2">
          <div className="flex gap-12 items-center ">
            <div className="text-lg font-bold">{prescription?.id}</div>
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
        <div className="flex flex-col basis-full md:basis-[65%] grow min-w-[150px]  rounded-3xl border-solid border border-gray p-4 gap-2">
          <div className="flex flex-row p-2 items-center justify-start gap-6">
            <div className="before:w-2 before:h-2 before:rounded-full before:bg-primary before:flex font-bold text-primary">
              {" "}
              اطلاعات بیمار
            </div>
          </div>
          <div className="flex flex-row gap-4 flex-wrap ">
            <div className="flex flex-row items-center gap-2 md:rounded-lg basis-full md:basis-auto flex-grow md:flex-grow-0  border-0 last:border-b-0 md:last:border-b border-b md:border border-solid border-gray p-1 px-2">
              <div className="text-sm basis-[40%] text-left md:text-right md:basis-auto">نام بیمار :</div>
              <div className="text-sm font-bold">
                {prescription?.patient.first_name}{" "}
                {prescription?.patient.last_name}
              </div>
            </div>
            <div className="flex flex-row items-center gap-2 md:rounded-lg basis-full md:basis-auto flex-grow md:flex-grow-0  border-0 last:border-b-0 md:last:border-b border-b md:border border-solid border-gray p-1 px-2">
              <div className="text-sm basis-[40%] text-left md:text-right md:basis-auto">تاریخ:</div>
              <div className="text-sm font-bold">
                {convertStrToJalali(prescription?.created_at)}
              </div>
            </div>
            <div className="flex flex-row items-center gap-2 md:rounded-lg basis-full md:basis-auto flex-grow md:flex-grow-0  border-0 last:border-b-0 md:last:border-b border-b md:border border-solid border-gray p-1 px-2">
              <div className="text-sm basis-[40%] text-left md:text-right md:basis-auto">نوع سفارش:</div>
              <div className="text-sm font-bold">value</div>
            </div>
            <div className="flex flex-row items-center gap-2 md:rounded-lg basis-full md:basis-auto flex-grow md:flex-grow-0  border-0 last:border-b-0 md:last:border-b border-b md:border border-solid border-gray p-1 px-2">
              <div className="text-sm basis-[40%] text-left md:text-right md:basis-auto">شماره سفارش:</div>
              <div className="text-sm font-bold">{prescription?.id}</div>
            </div>
            <div className="flex flex-row items-center gap-2 md:rounded-lg basis-full md:basis-auto flex-grow md:flex-grow-0  border-0 last:border-b-0 md:last:border-b border-b md:border border-solid border-gray p-1 px-2">
              <div className="text-sm basis-[40%] text-left md:text-right md:basis-auto">شامل بیمه :</div>
              <div className="text-sm font-bold">value</div>
            </div>
            <div className="flex flex-row items-center gap-2 md:rounded-lg basis-full md:basis-auto flex-grow md:flex-grow-0  border-0 last:border-b-0 md:last:border-b border-b md:border border-solid border-gray p-1 px-2">
              <div className="text-sm basis-[40%] text-left md:text-right md:basis-auto">کد ملی :</div>
              <div className="text-sm font-bold">
                {prescription?.patient.national_id}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col basis-[22%] min-w-[100px] grow rounded-3xl border-solid border border-gray p-4 gap-2">
          <div className="before:w-2 before:h-2 before:rounded-full before:bg-primary before:flex font-bold text-primary">
            {" "}
            توضیحات بیمار
          </div>
          <div className="text-sm text-gray">{prescription?.description}</div>
        </div>
      </div>
      <div
        className={`flex flex-row ${
          close ? "relative" : "md:relative md:-right-6 md:w-[calc(100%+3em)] md:pr-6 gap-2"
        } flex-wrap md:flex-nowrap`}
      >
        <div
          className={`bg-backgroundPrimary md:order-1 ${
            close ? "w-0 static md:relative" : "relative flex-grow rounded-lg md:rounded-none md:flex-grow-0 md:w-[29.5%] p-4 min-w-full md:min-w-fit"
          }  flex flex-col  transition-all duration-300 `}
        >
          <Button
            variant="contained"
            color="primary"
            className={`z-10 absolute w-8 px-0 py-4 min-w-0 h-4 ${
              close
                ? (isMobile ? "rounded-full rounded-t-none top-0" : "rounded-full rounded-l-none left-[100%] pr-2")
                : (isMobile ? "rounded-full rounded-b-none bottom-0" : "rounded-full top-0 rounded-r-none -right-0 pl-2")
            } left-[50%] -translate-x-[50%] md:translate-x-0 md:top-[50%] md:translate-y-[-50%] shadow-none  transition-all duration-300`}
            onClick={() => setClose(!close)}
          >
            <ArrowBackIos
              color="backgroundGray"
              className={`${close ? "-rotate-90 md:rotate-180" : "rotate-90 md:rotate-0"} text-sm`}
            />
          </Button>
          {!close && (
            <>
              <div className="before:w-2 before:h-2 before:rounded-full before:bg-primary before:flex font-bold text-primary">
                {" "}
                نسخه بیمار
              </div>

              <div className="h-[400px] relative">
                <Image
                  objectFit="contain"
                  layout="fill"
                  src={image?.image}
                ></Image>
              </div>
              <div className="flex gap-2 overflow-auto">
                {prescription?.pic?.map((p) => (
                  <div
                    className={`${
                      p.id === image?.id
                        ? "border-2 border-solid border-primary"
                        : "border-2 border-opacity-0 border-primary border-solid"
                    } w-[50px] aspect-square relative`}
                    onClick={() => setImage(p)}
                    key={p.id}
                  >
                    <Image
                      objectFit="contain"
                      layout="fill"
                      src={p.image}
                    ></Image>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col basis-[20%] min-w-[100px] grow gap-4 self-start">
        <div className="flex flex-col rounded-3xl border-solid border border-gray p-4 gap-4  flex-wrap">
          <div className="before:w-2 before:h-2 before:rounded-full before:bg-primary before:flex font-bold text-primary">
            {" "}
            اطلاعات سفارش
          </div>
          <div className="flex flex-col gap-4 flex-wrap">
            <div className="w-full md:w-fit">
              <TextField
                label="نام دکتر"
                fullWidth
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)
                }
                disabled={prescription?.status!= 'waiting_for_response'}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  sx: {
                    marginTop: "1.5em",
                    "& legend": {
                      display: "none",
                    },
                  },
                }}
                className="self-start"
              ></TextField>
              </div>

              <Tests tests={tests} setTests={setTests}/>
                
              
              <TextField
                label="توضیحات"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={prescription?.status!= 'waiting_for_response'}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  sx: {
                    marginTop: "1.5em",
                    "& legend": {
                      display: "none",
                    },
                  },
                }}
                multiline
                rows={5}
              ></TextField>
               <div className="w-full md:w-fit">
              <TextField
                label="جمع کل"
                fullWidth
                value={stringifyPrice(price, "")}
                onChange={(e) =>
                  setPrice(
                    Number(
                      persianToEnglishDigits(
                        preventLettersTyping(e.target.value)
                      )
                    )
                  )
                }
                disabled={prescription?.status!= 'waiting_for_response'}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  sx: {
                    marginTop: "1.5em",
                    "& legend": {
                      display: "none",
                    },
                  },
                  endAdornment: (
                    <InputAdornment position="end">ریال</InputAdornment>
                  ),
                }}
                className="self-start"
              ></TextField>
              </div>
          </div>
          
          {prescription?.status == "waiting_for_delivery" && (
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => deliver()}
                className="flex-grow md:flex-grow-0 md:w-32"
                variant="contained"
              >
                ارسال شد
              </Button>
              
            </div>
          )}
        </div>
        <div className="flex flex-col rounded-3xl border-solid border border-gray p-4 gap-4  flex-wrap">
          <div className="before:w-2 before:h-2 before:rounded-full before:bg-primary before:flex font-bold text-primary">
            {" "}
            ساعت و تاریخ مراجعه
          </div>
          {/* <AddressSelection disabled addressId={prescription.address}/> */}
          <div className="w-full md:w-fit">
              <TextField
                label="هزینه مراجعه"
                fullWidth
                value={stringifyPrice(send, "")}
                onChange={(e) =>
                  setSend(
                    Number(
                      persianToEnglishDigits(
                        preventLettersTyping(e.target.value)
                      )
                    )
                  )
                }
                disabled={prescription?.status!= 'waiting_for_response'}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  sx: {
                    marginTop: "1.5em",
                    "& legend": {
                      display: "none",
                    },
                  },
                  endAdornment: (
                    <InputAdornment position="end">ریال</InputAdornment>
                  ),
                }}
                className="self-start"
              ></TextField>
              </div>
          </div>
        {prescription?.status == "waiting_for_response" && (
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => updatePrescription()}
                className="flex-grow md:flex-grow-0 md:w-32"
                variant="contained"
              >
                ثبت و ارسال
              </Button>
              <Button
                onClick={() => {
                  setPrice(0);
                  setDescription("");
                }}
                className="flex-grow md:flex-grow-0 md:w-32"
                variant="outlined"
              >
                انصراف
              </Button>
            </div>
          )}
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
