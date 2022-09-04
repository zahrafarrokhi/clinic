import React, { useState } from "react";
import {
  ToggleButtonGroup,
  ToggleButton,
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import LoginLayout from "../../components/LoginLayout";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { loginWithEmail, loginWithSms } from "../../lib/slices/auth";
import { useRouter } from "next/router";

const PHONENUMBER = "phone_number";
const EMAIL = "email";

export default function Login() {
  const [selected, setSelected] = useState(PHONENUMBER);
  const [username, setUsername] = useState("");
  const theme = useTheme();
  const router = useRouter();
    // redux
  const dispatch = useDispatch();
    const submit = async () => {
    try {
      if (selected === PHONENUMBER) {
        await dispatch(
          loginWithSms({
            //PhoneSerializer
            phone_number:username
          }),
        ).unwrap();
      }
      // else {
      //   await dispatch(
      //     loginWithEmail({
      //       //EmailSerializer
      //       email:username
      //     }),
      //   ).unwrap();
      // }
      //2
      else {
        await dispatch(
          loginWithEmail(username),
        ).unwrap();
      }

      router.push("/auth/confirm/")
         
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="flex flex-col items-center justify-evenly md:justify-around flex-grow py-6 md:my-4">
      <div className="flex w-full justify-center">
        <ToggleButtonGroup
          value={selected}
          // onChange={(e, val) => {
          //   if(val)
          //     setSelected(val)
          // }}
          onChange={(e, val) => val && setSelected(val)}
          // Fix newValue.splice error
          exclusive
          sx={{
            border: `1px solid ${theme.palette.border.main}`,
            borderRadius: "0.5em !important",
            [theme.breakpoints.down("md")]: {
              padding: "0.25em",
              flexBasis: "80%",
            },
            "& .MuiToggleButtonGroup-grouped": {
              border: 0,
              borderRadius: "0.5em !important",
              width: "50%",
              [theme.breakpoints.up("md")]: {
                width: "12em",
              },
            },
          }}
          // color="primary"
        >
          <ToggleButton value={PHONENUMBER}>تلفن همراه</ToggleButton>
          <ToggleButton value={EMAIL}>ایمیل</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <FormControl>
        <FormLabel>
          {selected === PHONENUMBER ? "تلفن همراه" : "ایمیل"}
        </FormLabel>
        <TextField
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        // label={selected === PHONENUMBER ? "تلفن همراه" : "ایمیل"}
        ></TextField>
      </FormControl>
      <div className="flex flex-col   ">
        <Button
          variant="contained"
          className="w-[240px] md:w-[400px] h-[3.2em] rounded-[10px] text-lg "
          color="primary"
          onClick={submit }

        >
          مرحله‌ بعد
        </Button>
      </div>
    </div>
  );
}
// //tag
// Login.getLayout = (page)=><LoginLayout>{page}</LoginLayout>

// //arrow func
// Login.getLayout = (page)=>(<LoginLayout>{page}</LoginLayout>)

//return
Login.getLayout = (page) => {
  return <LoginLayout>{page}</LoginLayout>;
};
