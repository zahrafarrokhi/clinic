import React, { useState,useRef,useEffect } from 'react';
import LoginLayout from "../../components/LoginLayout";
import VerificationInput from "react-verification-input";
// import { persianToEnglishDigits } from "../../lib/utils";
import { Button } from "@mui/material";
import { GrRefresh } from "react-icons/gr";

const CODE_LENGTH = 4;
const EXP_TIME = 120;

const Confirm = () => {
  const [code, setCode] = useState("");
    // timer (setInterval)
    const [time, setTime] = useState(EXP_TIME);
    const timerRef = useRef(null);
  
    const startTimer = () => {
      if (timerRef.current) clearInterval(timerRef.current);
      const timerInterval = setInterval(() => {
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
  return ( 
    <div className="flex flex-col items-center justify-center md:justify-around grow py-8">
      <div className="flex flex-col items-center ">
        <div
          className={`flex flex-row text-black font-bold text-sm text-center `}
        >
          لطفا کد ارسال شده به شماره
        </div>
        <div className={`flex flex-row text-primary font-semibold `}>
          {"09122222277"}
        </div>
        <div
          className={`flex flex-row  text-black font-bold text-sm text-center`}
        >
          وارد نمایید
        </div>
      </div>
      {/* VerificationInput */}
      <div className="my-24 md:my-4">
        
     <VerificationInput
            length={CODE_LENGTH}
            placeholder=""
            validChars="0-9۰-۹"
            onChange={() =>{}}
            removeDefaultStyles
            autoFocus
            dir="ltr"
            classNames={{
              container: `flex flex-row justify-center h-[45px] w-[200px] md:w-[260px] md:h-[50px]`,
              character: `flex justify-center items-center rounded-lg m-1 border border-border border-solid `,
              characterInactive: `rounded-lg m-1 border border-border `,
              characterSelected: `rounded-lg m-1 border border-borderColor  `,
            }}
            />
      
            </div>
        {/* btn & timer  */}
        <div className="flex flex-col mb-12">

        <Button
            variant="contained"
            className="w-[240px] md:w-[400px] h-[3.5em] rounded-[10px] p-3"
            color="primary"
            // onClick={submit}
            //validation
            disabled={time === 0 || code.length !== 4}
          >
            مرحله‌ بعد
        </Button>
        <div className="m-3 flex  flex-row justify-between ">
            <div
              className={`flex text-sm ${
                time === 0 ? "text-primary" : "text-textSecondaryDark"
              } cursor-pointer `}
              // onClick={resendCode}
              disabled={time !== 0}
            >
              ارسال مجدد کد
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
}
 
export default Confirm;

Confirm.getLayout = (page) => <LoginLayout>{page}</LoginLayout>