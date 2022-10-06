import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DoctorItem from "../../components/doctors/DoctorItem";
import DoctorsTab from "../../components/doctors/DoctorsTab";
import Navigation from "../../components/navigation/Navigation";
import { loadDoctors } from "../../lib/slices/doctors";

function Doctors() {
  //def state becuse child cant pass props to parent
  const [selectedTab, setSelectedTab] = useState(null);

   //redux
   const doctors = useSelector(state => state.doctorReducer?.doctors)
   const dispatch = useDispatch();
 
   const doctorList = async () => {
     try{ await dispatch(loadDoctors()).unwrap() }
     catch(e){
       }
     }
    
  useEffect(() => { doctorList() }, [])
  
  return (
    <div className="mx-auto w-[85%] py-4">
     {/* props */}
      <DoctorsTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div className="flex flex-wrap gap-2 py-10">
        {/* {doctors?.map((doc) => <div> {doc.first_name} {doc.last_name} </div>)} */}
        {/*
          // at the first
          {doctors?.map((doc) => <DoctorItem data={doc} /> )}
          // department doctors
          {doctors?.filter(doc=>  doc.department.id === selectedTab).map((doc) => <DoctorItem data={doc} /> )}
          // all departments &  department doctors
          {doctors?.filter(doc=> selectedTab ? doc.department.id === selectedTab : true).map((doc) => <DoctorItem data={doc} /> )}
        */}
        {doctors?.filter(doc=> selectedTab ? doc.department.id === selectedTab : true).map((doc) => <DoctorItem data={doc} /> )}
        </div>
    
    </div>
  );
}

Doctors.getLayout = (page) => {
  return <Navigation>{page}</Navigation>;
};

export default Doctors;
