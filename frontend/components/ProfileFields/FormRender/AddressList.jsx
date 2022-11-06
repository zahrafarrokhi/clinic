import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAddress } from "../../../lib/slices/address";
import Address from "./Address";
import AddressMobileItem from "./AddressMobileItem";


export default function AddressList(props) { 
  const { formsTab, show, setShow } = props;
  const dispatch = useDispatch();
  const addresses = useSelector(formsTab.data)
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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

  const ItemComponent = useMemo(() => isMobile ? AddressMobileItem : Address, [isMobile]);
  
  return (
    <div className="flex flex-col gap-4">
      {/* {(addresses.length === 0 || show) && <Address formsTab={formsTab} data={{}} hide={()=>{ setShow(false)} } /> }  */}
      {show && <Address formsTab={formsTab} data={{}} hide={()=>{ setShow(false)} } /> } 
      {/* {addresses.length === 0 ? <Address formsTab={formsTab} data={{}} hide={()=>{ setShow(false)} } /> : addresses?.map((ad) => <Address formsTab={formsTab } data={ad} key={ad.id} />)} */}
      {addresses?.map((ad) => <ItemComponent formsTab={formsTab } data={ad} key={ad.id} />)}
      
     
      </div>
  )

}