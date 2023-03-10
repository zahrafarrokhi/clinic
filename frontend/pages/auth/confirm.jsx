import React, { useState, useRef, useEffect } from "react";
import LoginLayout from "../../components/LoginLayout";
import VerificationInput from "react-verification-input";
// import { persianToEnglishDigits } from "../../lib/utils";
import { Button } from "@mui/material";
import { GrRefresh } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { confirm } from "../../lib/slices/auth";
import { useRouter } from "next/router";

const CODE_LENGTH = 4;
const EXP_TIME = 120;

const Confirm = () => {
  //code
  const [code, setCode] = useState("");
  // timer (setInterval)
  const [time, setTime] = useState(EXP_TIME);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const timerInterval = setInterval(() => {
      // setTime(time - 1) // This is wrong because time is state and on every call will have the same value
      if (time > 0) setTime((t) => (t > 0 ? t - 1 : t));
      else clearInterval(timerRef.current);
    }, 1000);
    timerRef.current = timerInterval;
  };

  useEffect(() => {
    startTimer();
    // unmount
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);
  // redux
  const dispatch = useDispatch();
  const username = useSelector((state) => state.authReducer?.username);
  const method = useSelector((state) => state.authReducer?.method);
  //router
  const router = useRouter();
  const submit = async () => {
    let res;
    try {
      if (method === "phone") {
        res = await dispatch(
          confirm({
            //PhoneSerializer
            phoneNumber: username,
            otp: code,
          })
        ).unwrap();
      } else {
        res = await dispatch(
          confirm({
            //EamilSerializer
            email: username,
            otp: code,
          })
        ).unwrap();
      }
      if (res.user.type == "patient") router.push("/patients/");
      else if (res.user.type == "doctor") router.push("/visits/"); 
      else if (res.user.type == "support") router.push("/support/"); 
      else if (res.user.type == "pharmacy") router.push("/pharmacy/"); 
      else if (res.user.type == "laboratory") router.push("/laboratory/"); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center md:justify-around grow py-8">
      <div className="flex flex-col items-center ">
        <div
          className={`flex flex-row text-black font-bold text-sm text-center `}
        >
          ???????? ???? ?????????? ?????? ???? {method === "phone" ? "??????????" : "??????????"}
        </div>
        <div className={`flex flex-row text-primary font-semibold `}>
          {username}
        </div>
        <div
          className={`flex flex-row  text-black font-bold text-sm text-center`}
        >
          ???????? ????????????
        </div>
      </div>
      {/* VerificationInput */}
      <div className="my-24 md:my-4">
        <VerificationInput
          length={CODE_LENGTH}
          placeholder=""
          validChars="0-9??-??"
          onChange={() => {}}
          removeDefaultStyles
          autoFocus
          dir="ltr"
          classNames={{
            container: `flex flex-row justify-center h-[45px] w-[200px] md:w-[260px] md:h-[50px]`,
            character: `flex justify-center items-center rounded-lg m-1 border border-border border-solid `,
            characterInactive: `rounded-lg m-1 border border-border `,
            characterSelected: `rounded-lg m-1 border border-borderColor  `,
          }}
          value={code}
          onChange={(e) => setCode(e)}
        />
      </div>
      {/* btn & timer  */}
      <div className="flex flex-col mb-12">
        <Button
          variant="contained"
          className="w-[240px] md:w-[400px] h-[3.5em] rounded-[10px] p-3"
          color="primary"
          onClick={submit}
          //validation
          disabled={time === 0 || code.length !== 4}
        >
          ????????????? ??????
        </Button>
        <div className="m-3 flex  flex-row justify-between ">
          <div
            className={`flex text-sm ${
              time === 0 ? "text-primary" : "text-textSecondaryDark"
            } cursor-pointer `}
            // onClick={resendCode}
            disabled={time !== 0}
          >
            ?????????? ???????? ????
          </div>
          <div className="flex items-center ">
            <GrRefresh className="w-[25px] h-[25px] p-[5px]" />
            {/* 90/60 = 1.5 => floor(1.5) -> 1 =>str(1)=>'1 */}
            {/* '1'.padStart(2, '0') = '01' */}
            {String(Math.floor(time / 60)).padStart(2, "0")}:
            {/*90 %60 =>30 =>'30' =>   */}
            {/* 01:30*/}
            {String(time % 60).padStart(2, "0")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;

Confirm.getLayout = (page) => <LoginLayout>{page}</LoginLayout>;
