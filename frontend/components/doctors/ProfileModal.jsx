import {
  AppBar,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  Slide,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import MapComponent from "../ProfileFields/MapComponent";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import PaymentDialog from "./PaymentDialog";

const TabPanel = (props) => {
  const { children, value, selectedTab } = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return <>{(isDesktop || value === selectedTab) && children}</>;
};

const ProfileModal = (props) => {
  const { open, setOpen,  data } = props;
  const [selectedTab, setSelectedTab] = useState("profile");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  //payment modal
  const [openPayment,setOpenPayment] = useState(false)
 
 
  return (
    <>
    <Dialog
      onClose={() => setOpen(false)}
      open={open}
      maxWidth={"md"}
      fullWidth
      fullScreen={isMobile}
      TransitionComponent={Slide}
    TransitionProps={{
      direction: 'up',
    }}
    PaperProps={{
      sx: {
        overflow: 'visible',
        [theme.breakpoints.up('md')]: {
          borderRadius:'15px'
        }
        
      }
    }}
    >
      {/* <DialogTitle>Set backup account</DialogTitle> */}
      <Button onClick={()=>setOpen(false)} className="rounded-full absolute h-8 w-8 -top-2 -left-2 min-w-0 p-2 shadow-lg" variant="contained" color="white" sx={{

      }}>
        <CloseOutlinedIcon className="text-3xl"/>
      </Button>
      {/* for handling overflow */}
      <div className="w-full h-full overflow-auto">
      <AppBar color='white' elevation={0} className="md:hidden">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpen(false)}
            aria-label="close"
          >
            <ArrowForwardOutlinedIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {data?.first_name} {data?.last_name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar className="md:hidden"/>
      <div className="block md:hidden w-full border-b border-b-solid border-b-backgroundGray">
        <Tabs
          value={selectedTab}
          onChange={(e, val) => setSelectedTab(val)}
          className="w-full"
        >
          <Tab value={"profile"} label="پروفایل" className="w-1/2 max-w-none" />
          <Tab
            value={"office"}
            label="اطلاعات مطب"
            className="w-1/2 max-w-none"
          />
        </Tabs>
      </div>
      <Stack direction="row" spacing={2} sx={{ p: "2rem" }}>
        <TabPanel value="profile" selectedTab={selectedTab}>
          <div className="flex flex-col basis-full md:basis-[70%] max-w-full  overflow-visible ">
            <div className="flex min-h-[190px] rounded-xl border border-solid border-backgroundGray flex-shrink-0 p-2 md:p-4 gap-2">
              <div className="basis-[90px] md:basis-[90px] relative shrink-0">
                <Image
                  layout="fill"
                  objectFit="contain"
                  src={data?.image ?? "/defaultDoctorPic/doctor.jpeg"}
                  objectPosition="center"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <div className="text-primary text-base font-bold italic">
                  {" "}
                  {data?.department.faname}{" "}
                </div>
                <div className="text-lg font-medium">
                  {" "}
                  {data?.first_name} {data?.last_name}{" "}
                </div>
                <div className="hidden md:flex text-lg font-medium">
                  {" "}
                  شماره نظام پزشکی: {data?.medical_code}{" "}
                </div>
                <div className=""> {data?.degree} </div>

                <div className="hidden md:flex flex-wrap flex-row justify-end gap-1">
                  <Button className="rounded-xl w-40" variant="contained" onClick={()=>{setOpenPayment(true); setOpen(false)}}>
                    ویزیت آنلاین
                  </Button>
                  {/* modal */}
                  {/* PaymentDialog put there has error for fix that we need fragment and put PaymentDialog on line:179  */} 
                  {/* <PaymentDialog open={openPayment} setOpen={setOpenPayment} data={data}/> */}
                </div>
              </div>
            </div>
            <div className="px-1 py-4">{data?.description}</div>
          </div>
        </TabPanel>
        <TabPanel value="office" selectedTab={selectedTab}>
          <div className="flex flex-col basis-full md:basis-[30%] rounded-xl border border-solid border-backgroundGray overflow-hidden">
            {data?.office?.location && (
              <div className="h-[250px] w-full">
                <MapComponent
                  value={data?.office?.location}
                  center={data?.office?.location}
                  className={"m-0 mt-0"}
                />
              </div>
            )}

            {/* div*4.flex.flex-row.items-center>div*2 */}
            <div className="flex flex-row items-center text-lg my-2 mt-4 gap-2 px-2">
              <LocalPhoneOutlinedIcon className="text-primary text-2xl" />
              <div>{data?.office?.phone_number}</div>
            </div>
            <div className="flex flex-row items-center text-lg my-2 gap-2 px-2">
              <LocationOnOutlinedIcon className="text-primary text-2xl" />
              <div>{data?.office?.address}</div>
            </div>
            <div className="flex flex-row items-center text-lg my-2 gap-2 px-2">
              <QueryBuilderOutlinedIcon className="text-primary text-2xl" />
              <div>{data?.office?.open_hours}</div>
            </div>
          </div>
        </TabPanel>
      </Stack>
      {/* mobile */}
      <Button className="rounded-xl opacity-0 md:hidden" variant="contained">
      </Button>
      <Button className="rounded-xl absolute left-10 right-10 bottom-4 md:hidden" variant="contained" onClick={()=>{setOpenPayment(true); setOpen(false)}}>
        ویزیت آنلاین
      </Button>
      </div>
    </Dialog>
                 <PaymentDialog open={openPayment} setOpen={setOpenPayment} data={data}/>
                 </>
  );
};
export default ProfileModal;
