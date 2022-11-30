
import { Button, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import Navigation from "../../../components/navigation/Navigation";
import AddressSelection from "../../../components/ProfileFields/AddressSelection";
import { stringifyPrice } from "../../../lib/utils";

export default function Delivery() {
  const prescription = useSelector(
    (state) => state.pharmacyReducer?.prescription
  );
  return(
    <div className="flex flex-col w-full gap-6 p-8">
      
      
      <div className='text-sm text-grayBtn'>داروخانه</div>
      
      {/* with for */}
      <div className='text-lg font-bold '>نسخه های تحویلی</div>

      <Divider></Divider>
    <div className="flex flex-row gap-8">
      <div className="flex flex-col basis-[60%] gap-8">
      <AddressSelection addressId={prescription?.address} disabled></AddressSelection>
      <div className="flex rounded-lg border border-solid border-gray"></div>
      <div className="flex rounded-lg border border-solid border-gray"></div>
      </div>
      <div className="flex flex-col flex-grow">

      <div className="flex rounded-lg border border-solid border-gray flex-col p-5 gap-2">

        <div className="flex flex-row justify-between items-center">
          <div>هزینه سفارش:</div>
          <div className="font-bold">{stringifyPrice(prescription?.price || 0)}</div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div>هزینه ارسال:</div>
          <div className="font-bold">{stringifyPrice(prescription?.delivery_price || 0)}</div>
        </div>
        <Divider></Divider>
        <div className="flex flex-row justify-between items-center">
          <div>جمع کل:</div>
          <div className="font-bold">{stringifyPrice((prescription?.price || 0) + (prescription?.delivery_price || 0))}</div>
        </div>

        <Button variant="contained">تایید و پرداخت</Button>

      </div>

      </div>
    </div>
    </div>

  )
}
Delivery.getLayout = (page) => {
  return <Navigation>{page}</Navigation>;
};
