import {
  Button,
  Dialog,
  Slide,
  Tab,
  Tabs,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatientProfile } from "../lib/slices/visits";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { styled } from "@mui/system";
import { convertStrToJalali } from "../lib/utils";
import { formatDistance } from "date-fns-jalali";
// tab panel
const TabPanel = (props) => {
  const { children, value, selectedTab } = props;
  const theme = useTheme();

  return <>{(value === selectedTab) && children}</>;
};

const UpLabelTextField = styled((props) => <TextField InputLabelProps={{shrink: true}} size="small" {...props}/>)(({theme}) => ({
  paddingTop: '1em',
  marginTop: '1em',
  '& legend': {
    display: 'none',
  },
  flexBasis: '45%',
  [theme.breakpoints.down('md')]: {
    flexBasis: '90%',
  },
  flexGrow: 1
}))

export default function PatientProfile(props) {
  const { open, setOpen } = props;
  const visit_id = useSelector((state) => state.visitReducer?.visit?.id);
  const profile = useSelector((state) => state.visitReducer?.patient_profile);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // tab state
  const [selectedTab, setSelectedTab] = useState("profile");

  const Profile = async () => {
    try {
      // pk from url param
      await dispatch(getPatientProfile({ pk: visit_id })).unwrap();
    } catch (error) {}
  };
  useEffect(() => {
    Profile();
  }, [visit_id]);
  // date
  const calBirth = useMemo(()=>{
    const now = new Date();
    if (!profile?.patient?.date_of_birth) return 0

    return formatDistance(new Date(profile?.patient?.date_of_birth), now, { addSuffix: false })
  }, [profile]);
  return (
    <Dialog
      onClose={() => setOpen(false)}
      open={open}
      maxWidth={"md"}
      fullWidth
      fullScreen={isMobile}
      TransitionComponent={Slide}
      TransitionProps={{
        direction: "up",
      }}
      PaperProps={{
        sx: {
          overflow: "visible",
          [theme.breakpoints.up("md")]: {
            borderRadius: "15px",
            height: '50%',
          },
        },
      }}
    >
      {/* <DialogTitle>Set backup account</DialogTitle> */}
      <Button
        onClick={() => setOpen(false)}
        className="hidden md:flex rounded-full absolute h-8 w-8 -top-2 -left-2 min-w-0 p-2 shadow-lg"
        variant="contained"
        color="white"
        sx={{}}
      >
        <CloseOutlinedIcon className="text-3xl" />
      </Button>
      <div className="w-full h-full overflow-auto p-6 ">
        <div className="block w-full border-0 border-b border-solid border-backgroundGray my-4">
          <Tabs
            value={selectedTab}
            onChange={(e, val) => setSelectedTab(val)}
            className="w-full"
          >
            <Tab value={"profile"} label="پروفایل" className="" />
            <Tab value={"visits"} label="ویزیت‌های قبلی" className="" />
            <Tab value={"tests"} label="آزمایش‌ها" className="" />
            <Tab value={"drugs"} label="دارو‌ها" className="" />
          </Tabs>
        </div>

        <TabPanel value="profile" selectedTab={selectedTab}>
          <div className="flex flex-row flex-wrap gap-4">
            <UpLabelTextField label="سن" value={calBirth}/>
            <UpLabelTextField label="جنسیت"  value={profile?.patient?.gender === "f" ?"زن":"مرد"}/>
            <UpLabelTextField label="تاریخ تولد"  value={convertStrToJalali(profile?.patient?.date_of_birth)}/>
            <UpLabelTextField label="کد ملی"  value={profile?.patient?.national_id}/>
          </div>
        </TabPanel>
        <TabPanel value="visits" selectedTab={selectedTab}>
          <div className="flex flex-col gap-4">
          {profile?.visits?.map((item)=> <div className="flex flex-row gap-2 justify-around items-center flex-wrap p-4 rounded-lg border border-solid border-backgroundGray">
              <div className="max-md:basis[25%] md:font-bold">{convertStrToJalali(item?.created_at)}</div>
              <div className="max-md:basis[25%] md:font-bold">پزشک معالج:{item?.doctor?.last_name} </div>
              <div className="max-md:basis[25%] md:font-bold" >شماره‌ی پذیرش:{item?.id} </div>
              {/* <div className="max-md:basis[25%]"><Button variant="contained" size="small">مشاهده‌ی ویزیت</Button></div> */}
            </div>) }
          </div>
        </TabPanel>
        <TabPanel value="tests" selectedTab={selectedTab}>
        <div className="flex flex-col gap-4">
          {profile?.laboratory?.map((item)=> <div className="flex flex-row gap-2 justify-around items-center flex-wrap p-4 rounded-lg border border-solid border-backgroundGray">
              <div className="max-md:basis[25%] md:font-bold">{convertStrToJalali(item?.created_at)}</div>
              <div className="max-md:basis[25%] md:font-bold">پزشک معالج:{item?.doctor?.last_name} </div>
              <div className="max-md:basis[25%] md:font-bold" >شماره‌ی پذیرش:{item?.id} </div>
              {/* <div className="max-md:basis[25%]"><Button variant="contained" size="small">مشاهده‌ی ویزیت</Button></div> */}
            </div>) }
          </div>
        </TabPanel>
        <TabPanel value="drugs" selectedTab={selectedTab}>
        <div className="flex flex-col gap-4">
          {profile?.pharmacy?.map((item)=> <div className="flex flex-row gap-2 justify-around items-center flex-wrap p-4 rounded-lg border border-solid border-backgroundGray">
              <div className="max-md:basis[25%] md:font-bold">{convertStrToJalali(item?.created_at)}</div>
              <div className="max-md:basis[25%] md:font-bold">پزشک معالج:{item?.doctor_name} </div>
              <div className="max-md:basis[25%] md:font-bold" >شماره‌ی پذیرش:{item?.id} </div>
              {/* <div className="max-md:basis[25%]"><Button variant="contained" size="small">مشاهده‌ی ویزیت</Button></div> */}
            </div>) }
          </div>
        </TabPanel>
      </div>
    </Dialog>
  );
}
