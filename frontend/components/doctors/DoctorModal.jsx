import { Button, Dialog, DialogTitle, Stack, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import MapComponent from "../ProfileFields/MapComponent";
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const TabPanel = (props) => {
  const {children, value, selectedTab} = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return <>
  {(isDesktop || value === selectedTab) && children}
  </>
}


const DoctorModal = (props) => {
  const { open, setOpen, data } = props;
  const [selectedTab, setSelectedTab] = useState('profile');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Dialog onClose={() => setOpen(false)} open={open} maxWidth={'md'} fullWidth fullScreen={isMobile}>
      {/* <DialogTitle>Set backup account</DialogTitle> */}
      {/* <Button className="rounded-full absolute h-8 w-8 -top-2 -left-2 z-10 min-w-0 p-2" variant="contained" color="white">
        <CloseOutlinedIcon className="text-3xl"/>
      </Button> */}
      <div className="block md:hidden w-full border-b border-b-solid border-b-backgroundGray">
        <Tabs value={selectedTab} onChange={(e, val) => setSelectedTab(val)} className="w-full">
        <Tab value={'profile'} label="پروفایل" className="w-1/2 max-w-none"/>
        <Tab value={'office'} label="اطلاعات مطب" className="w-1/2 max-w-none"/>

        </Tabs>
      </div>
      <Stack direction="row" spacing={2} sx={{p: '2rem'}}>
        <TabPanel value="profile" selectedTab={selectedTab}>
        <div className="flex flex-col basis-full md:basis-[70%] overflow-visible ">
          <div className="flex min-h-[190px] rounded-xl border border-solid border-backgroundGray flex-shrink-0 p-2 md:p-4 gap-2">
            <div className="basis-[90px] md:basis-[90px] relative shrink-0">
              <Image
                layout="fill"
                objectFit="contain"
                src={data.image ?? "/defaultDoctorPic/doctor.jpeg"}
                objectPosition="center"
              />
            </div>
            <div className="flex flex-col flex-grow">
              <div className="text-primary text-base font-bold italic">
                {" "}
                {data.department.faname}{" "}
              </div>
              <div className="text-lg font-medium">
                {" "}
                {data.first_name} {data.last_name}{" "}
              </div>
              <div className="hidden md:flex text-lg font-medium">
                {" "}
                شماره نظام پزشکی: {data.medical_code}{" "}
              </div>
              <div className=""> {data.degree} </div>

              <div className="hidden md:flex flex-wrap flex-row justify-end gap-1">
                <Button className="rounded-xl w-40" variant="contained">
                  ویزیت آنلاین
                </Button>
                {/* modal */}
              </div>
            </div>
          </div>
          <div className="px-1 py-4">
            {data.description}
          </div>
        </div>
        </TabPanel>
        <TabPanel value="office" selectedTab={selectedTab}>
        <div className="flex flex-col basis-full md:basis-[30%] rounded-xl border border-solid border-backgroundGray overflow-hidden">
          {data?.office?.location && <div className="h-[250px] w-full">
            <MapComponent value={data?.office?.location} center={data?.office?.location} className={'m-0 mt-0'} />

            </div>}

          {/* div*4.flex.flex-row.items-center>div*2 */}
          <div className="flex flex-row items-center text-lg my-2 mt-4 gap-2 px-2">
            <LocalPhoneOutlinedIcon className="text-primary text-2xl"/>
            <div>{data?.office?.phone_number}</div>
          </div>
          <div className="flex flex-row items-center text-lg my-2 gap-2 px-2">
            <LocationOnOutlinedIcon className="text-primary text-2xl"/>
            <div>{data?.office?.address}</div>
          </div>
          <div className="flex flex-row items-center text-lg my-2 gap-2 px-2">
            <QueryBuilderOutlinedIcon className="text-primary text-2xl"/>
            <div>{data?.office?.open_hours}</div>
          </div>

        </div>
        </TabPanel>
      </Stack>
    </Dialog>
  );
};
export default DoctorModal;
