import axios from "axios";
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "@mui/material";
import { NextLinkComposed } from "../../components/NextLinkComposed";

const VerifyPayment = (props) => {
  const {id, payment} = props;
  //test
  // const payment = {status: 'failed'}

  //icon with useEffect
  // const [icon,setIcon] = useState("")

  // useEffect(() => {
  //   if(payment.status === 'successful') {
  //     setIcon(<TaskAltOutlinedIcon className="text-success w-12 h-12"/>)
  //   } else {
  //     setIcon(<HighlightOffOutlinedIcon className="text-danger w-12 h-12"/>)
  //   }
  // }, [payment])


  // <div>{icon}</div>


  const TEXTS = {
    successful: {
      title: 'پرداخت با موفقیت انجام شد.',
      subtitle: '',
    }, 
    failed: {
      title: 'پرداخت ناموفق',
      subtitle: 'لطفا مجددا تلاش نمایید',
    }, 
    pending: {

    }
  }
  console.log(payment)
  return (
    //vw => w-screen vh => h-screen
    <div className="flex items-center justify-center h-screen w-screen">
      {/* mobile => max-w-[90%] */}
      <div className={`flex flex-col items-center justify-around py-6 rounded-3xl border border-solid ${payment.status === 'successful' ? 'border-success' : 'border-danger'} bg-backgroundGray h-96 max-w-[90%] w-[600px]`}>
        <div>
          {payment.status === 'successful' ? <TaskAltOutlinedIcon className="text-success w-12 h-12"/> : <HighlightOffOutlinedIcon className="text-danger w-12 h-12"/>}
        </div>
        <div>
          <div className="text-black text-2xl text-center">{TEXTS[payment.status].title}</div>
          <div className="text-darkgray text-lg text-center">{TEXTS[payment.status].subtitle}</div>
        </div>
        <Link component={NextLinkComposed} to={'/'} className="no-underline">
          بازگشت به کلینیک غدد
        </Link>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {

  const response = await axios.patch(`${process.env.BACKEND_BASE_URL}/api/payments/payment-verify/${context.params.id}/`, {});
  console.log(response.data)
  return {
    props: {
      id: context.params.id,
      payment: response.data,
    }, 
  }
}

export default VerifyPayment;