import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { listAddress, setAddress } from "../../lib/slices/address";
import { ChevronLeft } from "@mui/icons-material";
import Address from "./FormRender/Address";
import EditIcon from "@mui/icons-material/Edit";
import { tabs } from "./TabComponent";
import MapComponent from "./MapComponent";

const AddressViewer = (props) => {
  const { address } = props;

  return (
    <div className="flex flex-row flex-wrap rounded-lg border border-solid border-gray p-6">
      <div className=" flex flex-row flex-wrap flex-grow gap-3 items-start content-start">
        <div className="text-sm md:text-base basis-[90%] font-bold ">به این آدرس ارسال می‌شود</div>
        <Typography className="text-base  basis-[90%] ">
          <LocationOnIcon className="text-sm md:text-lg" />
          {address?.address}
        </Typography>

        <Typography className="text-sm flex items-center gap-2 basis-[35%] flex-grow ">
          <FaceRetouchingNaturalIcon className="text-sm md:text-lg" />
          {address?.reciever}
        </Typography>
        <Typography className="text-sm flex items-center gap-2 basis-[35%] flex-grow ">
          <LocalPhoneIcon className="text-sm md:text-lg" />
          {address?.phone_number}
        </Typography>
        <Typography className="text-sm flex items-center gap-2 basis-[35%] flex-grow ">
          <MailOutlineIcon className="text-sm md:text-lg" />
          {address?.postal_code}
        </Typography>

      </div>

      <div className="w-[200px] h-[200px]">
        <MapComponent
          value={address?.location}
          active={false}
          className="m-0 mt-0"
        />
      </div>

    </div>
  );
};
export default AddressViewer;
