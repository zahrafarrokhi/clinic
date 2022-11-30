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

const AddressTab = tabs.find((form) => form.id === "address");

const AddressItem = (props) => {
  const { ad } = props;
  return (
    <>
      <div>
        <Typography className="text-lg font-bold">{ad.name}</Typography>
        <Typography className="text-base">
          <LocationOnIcon className="text-sm" />
          {ad.address}
        </Typography>

        <Typography className="text-sm flex items-center gap-2">
          <FaceRetouchingNaturalIcon className="text-sm" />
          {ad.reciever}
        </Typography>
        <Typography className="text-sm flex items-center gap-2">
          <LocalPhoneIcon className="text-sm" />
          {ad.phone_number}
        </Typography>
        <Typography className="text-sm flex items-center gap-2">
          <MailOutlineIcon className="text-sm" />
          {ad.postal_code}
        </Typography>
        <Button
          onClick={() => {
            setAddressId(ad.id);
            handleClose();
          }}
        >
          انتخاب این آدرس
          <ChevronLeft />
        </Button>
        <Button
          variant="text"
          color="primary"
          onClick={() => {
            setOpenEdit(true);
            handleClose();
            setSelectAdress(ad);
          }}
        >
          <EditIcon className="text-sm mx-2" />
          ویرایش
        </Button>
      </div>
      <Dialog open={openEdit} keepMounted onClose={handleCloseEdit}>
        <Address
          formsTab={AddressTab}
          data={ad}
          hide={() => handleCloseEdit()}
        />
      </Dialog>
    </>
  );
};

const AddressSelection = (props) => {
  //address
  const addresses = useSelector((state) => state.addressReducer?.addresses);
  // dialog
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  //dialog for new address
  const [openNew, setOpenNew] = useState(false);
  const handleCloseNew = () => {
    setOpenNew(false);
  };
  //dialog for eidt address
  const [openEdit, setOpenEdit] = useState(false);
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const [selectAdress, setSelectAdress] = useState({});
  //
  // const [addressId, setAddressId] = useState();
  const { addressId, setAddressId, disabled } = props;
  const address = addressId ? addresses.find((ad) => ad.id === addressId) : {};
  // const address = useSelector((state) => state.addressReducer?.address);
  const dispatch = useDispatch();
  const loadAddress = async () => {
    try {
      const res = await dispatch(listAddress()).unwrap();
      if (res.length && !disabled) setAddressId(res[0].id);
      // if(res.length) dispatch(setAddress(res[0].id))
    } catch (error) {}
  };
  useEffect(() => {
    loadAddress();
  }, []);
  return (
    <div className="flex flex-row rounded-lg border border-solid border-gray p-6">
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

        {!disabled && (
          <Button
            onClick={() => setOpen(true)}
            className="self-start text-xs md:text-base"
          >
            تغییر یا افزودن آدرس دیگر
            <ChevronLeft />
          </Button>
        )}
      </div>

      <div className="w-[200px] h-[200px]">
        <MapComponent
          value={address?.location}
          active={false}
          className="m-0 mt-0"
        />
      </div>

      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        size={"md"}
        fullWidth
        PaperProps={{
          className: "rounded-xl",
        }}
      >
        <DialogTitle className="text-base md:text-lg">انتخاب آدرس</DialogTitle>
        <Divider />
        <DialogContent className="pb-3">
          {addresses.map((ad) => (
            <div key={ad.id}>
              <Typography className="text-lg font-bold">{ad.name}</Typography>
              <Typography className="text-base">
                <LocationOnIcon className="text-sm" />
                {ad.address}
              </Typography>

              <Typography className="text-sm flex items-center gap-2">
                <FaceRetouchingNaturalIcon className="text-sm" />
                {ad.reciever}
              </Typography>
              <Typography className="text-sm flex items-center gap-2">
                <LocalPhoneIcon className="text-sm" />
                {ad.phone_number}
              </Typography>
              <Typography className="text-sm flex items-center gap-2">
                <MailOutlineIcon className="text-sm" />
                {ad.postal_code}
              </Typography>
              <Button
                onClick={() => {
                  setAddressId(ad.id);
                  // dispatch(setAddress(ad.id))
                  handleClose();
                }}
                color={address?.id !== ad.id ? "primary" : "chip_success"}
              >
                {address?.id !== ad.id ? "انتخاب این آدرس" : "انتخاب شده"}
                {address?.id !== ad.id && <ChevronLeft />}
              </Button>
              <Button
                variant="text"
                color="primary"
                onClick={() => {
                  setOpenEdit(true);
                  handleClose();
                  setSelectAdress(ad);
                }}
              >
                <EditIcon className="text-sm mx-2" />
                ویرایش
              </Button>
              <Divider variant="inset" />
            </div>
          ))}
        </DialogContent>
        <DialogActions className="flex items-center justify-center pb-3">
          <Button
            variant="outlined"
            onClick={() => {
              handleClose();
              setOpenNew(true);
            }}
          >
            افزودن یک آدرس جدید
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog for new address */}
      <Dialog open={openNew} onClose={handleCloseNew}>
        <Address
          formsTab={AddressTab}
          data={{}}
          hide={() => handleCloseNew()}
        />
      </Dialog>
      {/* Dialog for edit address */}
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <Address
          formsTab={AddressTab}
          data={selectAdress}
          hide={() => handleCloseEdit()}
        />
      </Dialog>
    </div>
  );
};
export default AddressSelection;
