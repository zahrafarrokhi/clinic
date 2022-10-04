import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAddress } from "../../../lib/slices/address";
import Address from "./Address";


export default function AddressList(props) { 
  const { formsTab, show, setShow } = props;
  const dispatch = useDispatch();
  const addresses = useSelector(formsTab.data)
  const getAddress = async ()=>{
    try {
      await dispatch(formsTab.loadData()).unwrap();
    } catch (error) {
      
    }
  }
  useEffect (()=>{
    getAddress()
  }, [])
  //show emty address when there isnt  any address 
  //1
  useEffect(() => {
    if (addresses.length === 0 ){ setShow(true)}
   
  }, [addresses])
  
  return (
    <div className="flex flex-col gap-4">
      {/* {(addresses.length === 0 || show) && <Address formsTab={formsTab} data={{}} hide={()=>{ setShow(false)} } /> }  */}
      {show && <Address formsTab={formsTab} data={{}} hide={()=>{ setShow(false)} } /> } 
      {/* {addresses.length === 0 ? <Address formsTab={formsTab} data={{}} hide={()=>{ setShow(false)} } /> : addresses?.map((ad) => <Address formsTab={formsTab } data={ad} key={ad.id} />)} */}
      {addresses?.map((ad) => <Address formsTab={formsTab } data={ad} key={ad.id} />)}
    
     
      </div>
  )

}