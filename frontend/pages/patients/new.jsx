//redux
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "../../components/DatePicker";
import LoginLayout from "../../components/LoginLayout";
export default function NewPatient() {
  const [nationalId, setnationalId] = useState();
    // birthdate
  const [birthdate, setBirthDate] = useState();
  //redux

  const submit = async (e) => {
    try {
      setError(false);
      await dispatch(
        addPatient({
          nationalId: persianToEnglishDigits(nationalId.current.value),
          dateOfBirth: birthdate,
        })
      ).unwrap();
      router.push("/patients/profile");
    } catch (e) {
      setError(true);
    }
  };
  return(
  <div className="flex flex-col justify-center items-center w-full">

<div className="flex justify-center items-center p-4">
        <div className="text-lg self-center text-center">
        لطفا کد‌ملی و تاریخ تولد خود را وارد کنید.
       
        </div>
    </div>
    <div className="flex flex-col p-3 gap-4 items-center">

    <TextField
          value={nationalId}
          onChange={(e)=>setnationalId(e.target.value)}
        label={"کد‌ملی"}
        // placeholder={}
        InputProps={{
          sx: {
            textAlign: 'center',
          }
        }}
        ></TextField>
         <TextField
          value={birthdate}
          onChange={e => setBirthDate(e.target.value)}
        label={"تاریخ تولد"}
        // placeholder={}
        InputProps={{
          sx: {
            textAlign: 'center',
          }
        }}
        ></TextField>
        <DatePicker></DatePicker>
      </div>
      <Button variant="contained" color="primary" className="w-[320px] md:w-[400px] my-4 text-lg"
      //  onClick={submit}
      //  disabled={selectedPatient === null}
      >ثبت بیمار</Button>
  </div>)
 }

NewPatient.getLayout = (page) => {
  return <LoginLayout>{page}</LoginLayout>;
};