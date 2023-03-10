import { Button, Dialog, Slide, useMediaQuery, useTheme } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useDispatch, useSelector } from "react-redux";
import { createVisitPatient } from "../../lib/slices/visits";
import { stringifyPrice } from "../../lib/utils";

const PaymentDialog = (props)=>{
  const { open, setOpen,data } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  //redux
  const dispatch = useDispatch()
  const patient = useSelector((state) => state.patientReducer?.patient);
  const visitPayment = async()=>{
    console.log(data)
    try {
      const response = await dispatch(createVisitPatient({doctor_id: data.user,patient:patient.id})).unwrap()
      console.log(response)
      
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

    } catch (error) {
      
    }
    
  }
   return(

    <Dialog
    onClose={() => setOpen(false)}
    open={open}
    maxWidth={"sm"}
    fullWidth
    // fullScreen={isMobile}
    TransitionComponent={Slide}
  TransitionProps={{
    direction: 'up',
  }}
  PaperProps={{
    sx: {
      overflow: 'visible',
      [theme.breakpoints.up('md')]: {
        borderRadius:'15px'
      },
      [theme.breakpoints.down('md')]: {
        position: 'fixed',
        bottom:'0',
        width: '90%',
        maxWidth: 'unset',
        m: 0,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: '1em',
        borderTopLeftRadius: '1em',
      }
    }
  }}
  >
  <Button onClick={()=>setOpen(false)} className="hidden md:block rounded-full absolute h-8 w-8 -top-2 -left-2 min-w-0 p-2 shadow-lg" variant="contained" color="white" sx={{

}}>
  <CloseOutlinedIcon className="text-3xl"/>
</Button>
    <div className="flex flex-col ">
      <div className="hidden md:flex flex-row rounded-lg border border-solid border-backgroundGray m-8 p-4 pt-6 relative  text-lg">

        <div className="bg-white text-primary font-bold text-base absolute -top-3 right-3 px-2">
        اطلاعات پزشک
        </div>


        <div  className="flex flex-col basis-[50%] gap-3">
          <div className="text-lg ">  {data?.first_name} {data?.last_name}</div>
          <div className="text-lg ">شماره نظام پزشکی:{data?.medical_code}</div>
        
         

        </div>
        <div className="flex flex-col basis-[45%] gap-3 ">
        <div className="text-lg text-primary italic">   {data?.department?.faname} </div>
          <div className="text-lg ">{data?.degree}</div>
        

          
        </div>
      </div>
      <div className="flex flex-row rounded-lg border border-solid border-backgroundGray m-8 p-4 pt-6 relative text-sm md:text-lg">

<div className="bg-white text-primary font-bold text-base absolute -top-3 right-3 px-2">
توضیحات
</div>
کاربر گرامی
<br/>
برای مشکلات اورژانسی سریعا به بیمارستان مراجعه کنید.
دقت کنید که درخواست شما تا 48 ساعت پس از پرداخت پاسخ داده می‌شود.
<br/>
لازم به ذکر است، لغو ویزیت پس از پرداخت امکان‌پذیر نیست.
<br/>
توجه داشته باشید که ویزیت شما به صورت‌ آنلاین است و برای ویزیت در مطب باید با شماره‌های مطب تماس بگیرید.
      </div>
      <div className="flex flex-col md:flex-row mx-8 mb-8 md:mt-2 justify-end gap-3">
        <span className="flex text-lg font-bold text-primary items-center justify-center">
          {stringifyPrice(data?.amount)}
          <span className="flex text-sm italic font-bold mx-2 text-primary items-center justify-center">
            
            ({stringifyPrice(data?.amount / 10, 'تومان')})
          </span>
        </span>

        <Button variant="contained" color="primary" className="md:text-lg" onClick={visitPayment}>تایید و پرداخت</Button>
      </div>
    </div>
    </Dialog>
   )
}
export default PaymentDialog;