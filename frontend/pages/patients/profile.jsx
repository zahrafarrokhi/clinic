import { useState } from "react";
import LoginLayout from "../../components/LoginLayout";
import CityComponent from "../../components/ProfileFields/CityComponent";
import ProvinceComponent from "../../components/ProfileFields/ProvinceComponent";
import SelectField from "../../components/ProfileFields/SelectField";
import TextField from "../../components/ProfileFields/TextField";

const FIELDS = [
  //field
  {
    id: "national_id",    
    defaultValue: '0123456789',
    label: "کد ملی",
    editable: true,
    component: TextField,
  },
  {
    id: "first_name",
    defaultValue: 'test',
    label: "نام",
    required: true,
    editable: false,
    component: TextField,
  },
  {
    id: "last_name",
    defaultValue: 'last test',
    label: "نام خانوادگی",
    required: true,
    editable: false,
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
    editable: false,
    component: SelectField,
    options: [{
      //id:backend
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
    editable: false,
    component: ProvinceComponent,
  },
  {
    id: "city",
    label: "شهر",
    type: "city",
    editable: false,
    component: CityComponent,
  },
  {
    id: 'insurance',
    label: 'بیمه تامین اجتماعی',
    editable: false,
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
  // {
  //   id: "insurance",
  //   label: "بیمه",
  //   editable: false,
  //   component: InputInsuranceComponent,
  // },
  {
    id: "hasSupIns",
    label: "بیمه تکمیلی",
    editable: false,
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
  // {
  //   id: "supplementary_insurance",
  //   label: "بیمه گذار",
  //   editable: false,
  //   component: InputSupplementaryInsurance,
  // },
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
        ></field.component>))}

    </div>

    </div>)
 }


 PatientInfo.getLayout = (page) => {
  return <LoginLayout>{page}</LoginLayout>;
 };

export default PatientInfo;