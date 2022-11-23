import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import { listAddress } from "../../lib/slices/address";
import { ChevronLeft } from "@mui/icons-material";
import Address from "./FormRender/Address";
import EditIcon from "@mui/icons-material/Edit";
import { tabs } from "./TabComponent";
import MapComponent from "./MapComponent";

const AddressTab = tabs.find(form => form.id === 'address')

const AddressItem = (props) => {
  const {ad} = props
  return (<>
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
                  handleClose()
                }}
              >
                انتخاب این آدرس
                <ChevronLeft />
              </Button>
              <Button variant="text" color="primary" onClick={() => {
                setOpenEdit(true)
                handleClose()
                setSelectAdress(ad)
                }}>
          <EditIcon className="text-sm mx-2"/>
          ویرایش
        </Button>
            </div>
  <Dialog open={openEdit} keepMounted onClose={handleCloseEdit}>
        <Address  formsTab={AddressTab} data={ad} hide={()=>handleCloseEdit()}/>
      </Dialog>
  </>)
}

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

  const [selectAdress,setSelectAdress]=useState({})
  // 
  const [addressId, setAddressId] = useState();
  const address = addressId ? addresses.find(ad=>ad.id === addressId) : {}
  const dispatch = useDispatch();
  const loadAddress = async () => {
    try {
      const res = await dispatch(listAddress()).unwrap();
      if(res.length) setAddressId(res[0].id)
    } catch (error) {}
  };
  useEffect(() => {
    loadAddress();
  }, []);
  return (
    <div className="flex flex-row rounded-lg border border-solid border-gray">
      <div className="flex flex-col flex-grow">
         
      <div>به این آدرس ارسال می‌شود</div>
      <Typography className="text-base">
        <LocationOnIcon className="text-sm" />
        {address.address}
      </Typography>

      <Typography className="text-sm flex items-center gap-2">
        <FaceRetouchingNaturalIcon className="text-sm" />
        {address.reciever}
      </Typography>
      <Typography className="text-sm flex items-center gap-2">
        <LocalPhoneIcon className="text-sm" />
        {address.phone_number}
      </Typography>
      <Typography className="text-sm flex items-center gap-2">
        <MailOutlineIcon className="text-sm" />
        {address.postal_code}
      </Typography>
      

      <Button onClick={() => setOpen(true)}>
        تغییر یا افزودن آدرس دیگر
        <ChevronLeft />
      </Button>           
      </div>


      <div className="basis-[30%] grow md:grow-0 shrink-0 min-w-[200px] min-h-[200px]">
      <MapComponent value={address.location} active={false}/>
    </div>

      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>انتخاب آدرس</DialogTitle>
        <DialogContent>
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
                  handleClose()
                }}
                color={addressId!== ad.id ? 'primary': 'chip_success'}
              >
              {addressId!== ad.id ? "انتخاب این آدرس" : "انتخاب شده"}
              {addressId!== ad.id && <ChevronLeft />}
              </Button>
              <Button variant="text" color="primary" onClick={() => {
                setOpenEdit(true)
                handleClose()
                setSelectAdress(ad)
                }}>
          <EditIcon className="text-sm mx-2"/>
          ویرایش
        </Button>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            handleClose()
            setOpenNew(true)
          }}>افزودن یک آدرس جدید</Button>
        </DialogActions>
      </Dialog>
      {/* Dialog for new address */}
      <Dialog open={openNew}  onClose={handleCloseNew}>
        <Address  formsTab={AddressTab} data={{}} hide={()=>handleCloseNew()}/>
      </Dialog>
      {/* Dialog for edit address */}
      <Dialog open={openEdit}  onClose={handleCloseEdit}>
        <Address  formsTab={AddressTab} data={selectAdress} hide={()=>handleCloseEdit()}/>
      </Dialog>
    </div>
  );
};
export default AddressSelection;
