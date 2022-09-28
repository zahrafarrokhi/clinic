import { NotNull, OnlyDigits, StringLength } from "./validators";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import Insurance from "./Insurance";
import SelectField from "./SelectField";
import CityComponent from "./CityComponent";
import ProvinceComponent from "./ProvinceComponent";
import TextField from "./TextField";
import Form from "./FormRender/Form";
import AddressList from "./FormRender/AddressList";
import { listAddress, updateAddress } from "../../lib/slices/address";
import { updatePatient } from "../../lib/slices/patients";
//
export const tabs = [
  //f => patientinfo or address
  {
    id: "patientinfo",
    name: "اطلاعات کاربری",
    users: [],
    updateData: updatePatient,
    data: (state) => state.patientReducer?.patient,
    form: [
      //field
      {
        id: "national_id",
        label: "کد ملی",
        // editable: true,
        validators: [NotNull, StringLength(10), OnlyDigits],
        component: TextField,
      },
      // {
      //   id: "phone_number",
      //   label: "شماره‌ی همراه",
      //   // editable: true,
      //   validators: [NotNull, OnlyDigits, StringLength(11)],
      //   component: TextField,
      // },
      {
        id: "first_name",
        label: "نام",
        required: true,
        validators: [NotNull],
        // editable: false,
        component: TextField,
      },
      {
        id: "last_name",
        label: "نام خانوادگی",
        required: true,
        // editable: false,
        component: TextField,
      },
      {
        id: "date_of_birth",
        label: "تاریخ تولد",
        editable: false,
        component: TextField,
      },
      {
        id: "gender",
        label: "جنسیت",
        required: true,
        // editable: false,
        component: SelectField,
        options: [
          {
            //value of id:backend
            id: "f",
            name: "زن",
          },
          {
            id: "m",
            name: "مرد",
          },
        ],
      },
      {
        id: "province",
        label: "استان",
        type: "province",
        // editable: false,
        component: ProvinceComponent,
      },
      {
        id: "city",
        label: "شهر",
        type: "city",
        // editable: false,
        component: CityComponent,
      },
      {
        id: "insurance",
        label: "بیمه تامین اجتماعی",
        defaultValue: "none",
        // editable: false,
        component: SelectField,
        options: [
          {
            id: "none",
            name: "هیچ کدام",
          },
          {
            id: "tamin",
            name: "تامین اجتماعی",
          },
          {
            id: "salamat",
            name: "سلامت",
          },
          {
            id: "mosalah",
            name: "نیروهای مسلح",
          },
          {
            id: "other",
            name: "متفرقه",
          },
        ],
      },

      {
        id: "hasSupIns",
        label: "بیمه تکمیلی",
        // editable: false,
        component: SelectField,
        options: [
          {
            //id:backend
            id: true,
            name: "بله",
          },
          {
            id: false,
            name: "خیر",
          },
        ],
      },
      {
        id: "supplementary_insurance",
        label: "بیمه گذار",
        // editable: false,
        component: Insurance,
      },
    ],
    formComponent: Form,
  },
  {
    id: "address",
    name: "مدیریت آدرس ها",
    loadData: listAddress,
    data: (state) => state.addressReducer?.addresses,
    updateData: updateAddress,
    users: [],
    form: [
      {
        id: "address_name",
        label: "نام آدرس",
        component: TextField,
      },
      {
        id: "postal_code",
        label: "کد پستی",
        required: true,
        validators: [NotNull, StringLength(10), OnlyDigits],
        component: TextField,
      },
      {
        id: "phone_number",
        label: "تلفن ثابت",
        required: true,
        validators: [NotNull, StringLength(11), OnlyDigits],
        component: TextField,
      },
      {
        id: "reciever",
        label: "نام",
        validators: [NotNull],
        editable: false,
        component: TextField,
      },
      {
        id: "address",
        label: "آدرس",
        required: true,
        component: TextField,
        validators: [NotNull],
      },
      {
        id: "location",
        label: " موقعیت در نقشه",
        // editable: false,
        component: TextField,
      },
    ],
    formComponent: AddressList,
  },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {/* {value === index && ( */}
      {/* <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box> */}
      {/* )} */}
      {children} {/*  children is formComponent */}
    </div>
  );
}

export default function TabComponent() {
  const [selectedTab, setSelectedTab] = useState();
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        {/* Tab -> onClick -> Tabs.onChange(event, Tab.value) */}
        {/* Tab-> value -> which tab is selected -> value={selectedTab} ,{value} === const [selectedTab,setSelectedTab]=useState();*/}
        <Tabs value={selectedTab} onChange={handleChange}>
          {/* each tab has  label & value(has default index)*/}
          {tabs.map((t) => (
            <Tab label={t.name} value={t.id} />
          ))}
        </Tabs>
      </Box>
      {tabs.map((f) => (
        //which tab is  selected=> value={selectedTab} ,which tab  information blongs to => index={f.id}
        <TabPanel value={selectedTab} index={f.id} key={f.id}>
          {/* {f.name} */}
          {/* f => for example address form
           {
    id: "address",
    name: "مدیریت آدرس ها",
    users: [],
    form: [
      {
        id: "address_name",
        label: "نام آدرس",
        component: TextField,
      },
      {
        id: "postal_code",
        label: "کد پستی",
        required: true,
        validators: [NotNull, StringLength(10), OnlyDigits],
        component: TextField,
      },
      {
        id: "phone_number",
        label: "تلفن ثابت",
        required: true,
        validators: [NotNull, StringLength(11), OnlyDigits],
        component: TextField,
      },
      {
        id: "reciever",
        label: "نام",
        validators: [NotNull],
        editable: false,
        component: TextField,
      },
      {
        id: "address",
        label: "آدرس",
        required: true,
        component: TextField,
        validators: [NotNull],
      },
      {
        id: "location",
        label: " موقعیت در نقشه",
        // editable: false,
        component: TextField,
      },
    ],
    formComponent: Address,
  },
         
          */}
          {/* formsTab => props */}
          <f.formComponent formsTab={f} />
        </TabPanel>
      ))}
    </Box>
  );
}
