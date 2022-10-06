import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { loadDepartments } from "../../lib/slices/doctors";



const DoctorsTab = (props) => {
  const { selectedTab, setSelectedTab } = props;
  //state at the first time
  // const [selectedTab, setSelectedTab] = useState(null);

  //the point is 
  // const handleChange = (event) => {
  //   setSelectedTab(event.target.value);
  // };
  //mui => event, (newValue === event.target.value)
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  //redux
  const departments = useSelector(state => state.doctorReducer?.departments)
  const dispatch = useDispatch();

  
  const load = async () => {
    try{ await dispatch(loadDepartments()).unwrap() }
    catch(e){
      }
    }
   
  useEffect(() => { load() }, [])
  
  //always first  tab selected
  // useEffect(() => {
  //   setSelectedTab(departments[0].id)
  // }, [departments])
  return (
    <Box className="flex justify-between" sx={{ borderBottom: 1, borderColor: "divider" }}>
      

      <Tabs value={selectedTab} onChange={handleChange}>
      <Tab label={'همه‌‌ی دپارتمان‌ها'} value={null} className="text-base"/>
        {departments?.map((tab)=>
          <Tab label={tab.faname} value={tab.id} key={tab.id} className="text-base"/>
          )
        }

      </Tabs>
    </Box>
  )
}
export default DoctorsTab;