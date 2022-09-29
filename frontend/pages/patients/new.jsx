//redux
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "../../components/DatePicker";
import LoginLayout from "../../components/LoginLayout";
import { addPatient } from "../../lib/slices/patients";
import { persianToEnglishDigits } from "../../lib/utils";
export default function NewPatient() {
  const dispatch = useDispatch();
  const router = useRouter();
  //state
  const [totalState, setTotalState] = useState({
    first_name: "",
    last_name: "",
  });
  const [nationalId, setnationalId] = useState();
  // birthdate
  const [birthdate, setBirthDate] = useState();
  //redux

  const submit = async (e) => {
    try {
      // setError(false);
      await dispatch(
        addPatient({
          national_id: persianToEnglishDigits(nationalId),
          date_of_birth: birthdate,
          first_name: totalState.first_name,
          last_name: totalState.last_name,
          // ...totalState,
        })
      ).unwrap();
      router.push("/patients/profile");
    } catch (e) {
      console.log(e);
      // setError(true);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center w-full pb-6 md:pb-0">
      <div className="flex justify-center items-center p-4">
        <div className="text-lg self-center text-center">
          لطفا کد‌ملی و تاریخ تولد خود را وارد کنید.
        </div>
      </div>
      <div className="flex flex-col p-3 my-4 md:my-0 gap-4 items-center">
        <TextField
          value={totalState.first_name}
          onChange={(e) =>
            setTotalState({ ...totalState, first_name: e.target.value })
          }
          label={"نام"}
          // placeholder={}
          InputProps={{
            sx: {
              textAlign: "center",
            },
          }}
          InputLabelProps={{ shrink: true }}
        ></TextField>
        <TextField
          value={totalState.last_name}
          onChange={(e) =>
            setTotalState({ ...totalState, last_name: e.target.value })
          }
          label={" نام خانوادگی"}
          // placeholder={}
          InputProps={{
            sx: {
              textAlign: "center",
            },
          }}
          InputLabelProps={{ shrink: true }}
        ></TextField>
        <TextField
          value={nationalId}
          onChange={(e) => setnationalId(e.target.value)}
          label={"کد‌ملی"}
          // placeholder={}
          InputProps={{
            sx: {
              textAlign: "center",
            },
          }}
          InputLabelProps={{ shrink: true }}
        ></TextField>
        <DatePicker
          value={birthdate}
          onChange={(value) => setBirthDate(value)}
          label={"تاریخ تولد"}
          TextFieldProps={
            {
              // helperText: 'test',
            }
          }
        ></DatePicker>
      </div>
      <Button
        variant="contained"
        color="primary"
        className="w-[320px] md:w-[400px] my-4 text-lg"
        onClick={submit}
        //  disabled={selectedPatient === null}
      >
        ثبت بیمار
      </Button>
    </div>
  );
}

NewPatient.getLayout = (page) => {
  return <LoginLayout>{page}</LoginLayout>;
};
