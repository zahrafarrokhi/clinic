import { Box, Button } from "@mui/material";
import { useState } from "react";
import Address from "./Address";

export default function AddressList(props) { 
  const { formsTab } = props;
  
  return (
    <div className="flex flex-col">
      {[0, 1, 2, 3].map((ad) => <Address formsTab={formsTab } />)}
      </div>
  )

}