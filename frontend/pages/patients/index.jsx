import LoginLayout from "../../components/LoginLayout";
import { Button, ToggleButton } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";
//redux
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";



export default function Patients() {
  const router = useRouter();
  //state
  const [selectedPatient, selectPatient] = useState(null);
  //redux
  const patients = useSelector((state) => state.patientReducer?.patients);
  const dispatch = useDispatch();
  const newPatient = async () => {
    router.push("/patients/new");
  };

  const Patients = async () => {
    try {
      // await dispatch(loadPatients()).unwrap();
    } catch (error) {}
  };
  const submit = () => {
    // dispatch(loginAsPatient(selectedPatient));
  };
  useEffect(() => {
    Patients();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex justify-center items-center p-4">
        <div className="text-base self-center text-center">
          خوش‌آمدید، با انتخاب هر یک از کاربران قبلی وارد
          <br/>
          همان پروفایل شوید یا
          پروفایل جدید بسازید
        </div>
      </div>
      {/* flex-col items-center => horizental min-width ,then blow btn get width So  horizental min-width = width btn*/}
      <div className="flex flex-col p-3 items-center">
        {/* {['mohamadi', 'alizade', 'set'] */}
        {[0, 1, 2]
          .map((i) => ({
            id: i,
            first_name: "patient",
            last_name: i,
          }))
          .map((p) => (
           
            <ToggleButton
              variant="list"
              className="m-2"
              fullWidth
              color="primary"
              key={p.id}
              onChange={() => selectPatient(p.id)}
              selected={selectedPatient === p.id}
            >
              
              
            
                {p.first_name} {p.last_name}
             
              </ToggleButton>
          ))}
        <Button variant="outlined" color="primary" className="w-[320px] my-2"
           onClick={newPatient}
        >
          
        <AiOutlinePlus  className="mx-2" />
          بیمار جدید</Button>
      </div>
      <Button variant="contained" color="primary" className="w-[320px] md:w-[400px] my-4 text-lg"
       onClick={submit}
       disabled={selectedPatient === null}
      >ورود</Button>
    </div>
  );
}
Patients.getLayout = (page) => {
  return <LoginLayout>{page}</LoginLayout>;
};
