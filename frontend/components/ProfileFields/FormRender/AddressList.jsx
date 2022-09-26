import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAddress } from "../../../lib/slices/address";
import Address from "./Address";

export default function AddressList(props) { 
  const { formsTab } = props;
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
  },[])
  return (
    <div className="flex flex-col">
      {addresses?.map((ad) => <Address formsTab={formsTab } data={ad} key={ad.id} />)}
      </div>
  )

}