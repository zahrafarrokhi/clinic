import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginLayout from "../../components/LoginLayout";
import CityComponent from "../../components/ProfileFields/CityComponent";
import Insurance from "../../components/ProfileFields/Insurance";
import ProvinceComponent from "../../components/ProfileFields/ProvinceComponent";
import SelectField from "../../components/ProfileFields/SelectField";
import TextField from "../../components/ProfileFields/TextField";
import { NotNull, OnlyDigits, StringLength } from "../../components/ProfileFields/validators";
import { updatePatient } from "../../lib/slices/patients";

const FIELDS = [
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
  // redux 
  const dispatch = useDispatch();
  const router = useRouter()
  
  const patient = useSelector((state) => state.patientReducer?.patient);
  const cities = useSelector((state) => state.constantDataReducer?.cities);

  //state
  const [state, setState] = useState(
    {...FIELDS.reduce((obj, field) => ({...obj , [field.id]: field.defaultValue}), {}), ...patient}  
  );

  const submit = async (e) => {
    try {
      // setError(false);
      await dispatch(
        updatePatient({...state})
      ).unwrap();
      router.push("/");
    } catch (e) {
      console.log(e)
      // setError(true);
    }
  };

  useEffect(() => {
    if (cities && cities.length > 0 && patient.city) {
      const city = cities.filter(item => item.id === patient.city)[0]
      console.log('city', city)
      setState({...state,province:city.parent})
    }
  }, [cities, patient]);

  return(
    <div className="flex flex-col justify-center items-center w-full px-3 md:px-8 py-8">
      <div className="flex justify-start items-start gap-9 flex-wrap self-stretch m-4">
        {/* {[...Array(15)].map((f, i) => (
          <TextField
            value={state[i]}
            onChange={(e, val) => setState({...state, [i]: val})}
          
        ></TextField>))} */}

         {FIELDS.map((field) => (
           <field.component
      className="basis-full md:basis-[30%] flex-grow flex-shrink-0 md:max-w-[calc(33%-1.5rem)] my-2"
            value={state[field.id]}
             onChange={(e, val) => setState({ ...state, [field.id]: val })}
             label={field.label}
             options={field.options}
             validators={field.validators}
             state={state}
           ></field.component>))}

      </div>
      <Button variant="contained" className="w-full md:w-[400px] p-5 mt-8 mb-2 text-lg font-bold "
      onClick={submit}
      >
        تکمیل ثبت نام
      </Button>

    </div>)
 }


 PatientInfo.getLayout = (page) => {
  return <LoginLayout>{page}</LoginLayout>;
 };

export default PatientInfo;