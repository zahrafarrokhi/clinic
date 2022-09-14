import { useState } from "react";
import LoginLayout from "../../components/LoginLayout";
import CityComponent from "../../components/ProfileFields/CityComponent";
import Insurance from "../../components/ProfileFields/Insurance";
import ProvinceComponent from "../../components/ProfileFields/ProvinceComponent";
import SelectField from "../../components/ProfileFields/SelectField";
import TextField from "../../components/ProfileFields/TextField";

const FIELDS = [
  //field
  {
    id: "national_id",    
    label: "کد ملی",
    // editable: true,
    component: TextField,
  },
  {
    id: "first_name",
    label: "نام",
    required: true,
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
    options: [{
      //value of id:backend
      id: "f",
      name:"زن"
    },
    {
      id: "m",
      name:"مرد"
    },
    ]
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
    id: 'insurance',
    label: 'بیمه تامین اجتماعی',
    defaultValue: 'none',
    // editable: false,
    component: SelectField,
    options: [
      {
        id: 'none',
        name: 'هیچ کدام',
      },
      {
        id: 'tamin',
        name: 'تامین اجتماعی',
      },
      {
        id: 'salamat',
        name: 'سلامت',
      },
      {
        id: 'mosalah',
        name: 'نیروهای مسلح',
      },
      {
        id: 'other',
        name: 'متفرقه',
      },
    ],


  },

  {
    id: "hasSupIns",
    label: "بیمه تکمیلی",
    // editable: false,
    component: SelectField,
    options: [{
      //id:backend
      id: true,
      name:"بله",
    },
    {
      id: false,
      name:"خیر",
    },
    ]

  },
  {
    id: "supplementary_insurance",
    label: "بیمه گذار",
    // editable: false,
    component: Insurance,
  },
];

const PatientInfo = () => {
  //state
  const [state, setState] = useState(
    //
    FIELDS.reduce((obj, field) => ({...obj , [field.id]: field.defaultValue}), {})
  );

  return(
    <div className="flex flex-col justify-center items-center w-full px-8">
      <div className="flex justify-start items-start gap-3 flex-wrap self-stretch m-4">
        {/* {[...Array(15)].map((f, i) => (
          <TextField
            value={state[i]}
            onChange={(e, val) => setState({...state, [i]: val})}
          
        ></TextField>))} */}

         {FIELDS.map((field) => (
          <field.component
            value={state[field.id]}
             onChange={(e, val) => setState({ ...state, [field.id]: val })}
             label={field.label}
             options={field.options}
             state={state}
        ></field.component>))}

    </div>

    </div>)
 }


 PatientInfo.getLayout = (page) => {
  return <LoginLayout>{page}</LoginLayout>;
 };

export default PatientInfo;