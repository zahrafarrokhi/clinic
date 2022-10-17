import { Box, Tab, Tabs } from "@mui/material";
import { alpha, styled } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadDepartments } from "../../lib/slices/doctors";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { useRouter } from "next/router";
import axios from "axios";

const Svg = (props)=>{
  const {url} = props;
  const [svg,setSvg]=useState("")
  const router = useRouter();
  const loadSvg = async () => {
    try {
      const response = await axios.get(url)
      setSvg(response.data)
    } catch(e) {
      console.log(e)
    }
  }
  useEffect(()=>{
    loadSvg()
  },[url])
  useEffect(() => {
    router.events.on('routeChangeComplete', loadSvg)
    return () => {
      router.events.off('routeChangeComplete', loadSvg)
    }
  }, [])

  return (
    <div className="custom-svg" dangerouslySetInnerHTML={{ __html: svg }}></div>
  )

}

const StyledTab = styled(Tab)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    "& .MuiTab-iconWrapper": {
      display: "none",

      
    },
    //dont show svg icon on desktop
    '& .custom-svg ': {
      display: "none",
    },
  },
  [theme.breakpoints.down("md")]: {
    //  border :`1px solid ${theme.palette.primary.main}`
    backgroundColor: theme.palette.grayBtn.light,
    borderRadius: "0.45em",
    color: theme.palette.grayBtn.main,
    margin: "0 0.25em",
    '& .MuiTab-iconWrapper': {
      width: '1em !important',
      height: '1em !important',
    },
    '& .custom-svg, & .custom-svg svg': {
      width: '1.5em !important',
      height: '1.5em !important',
    },
    '& .custom-svg g': {
      opacity: 1,
    },
    '& .custom-svg path': {
      stroke: theme.palette.grayBtn.main,
    },
    ["&.Mui-selected"]: {
      backgroundColor: alpha(theme.palette.primary.main, 0.3),
      '& .custom-svg path': {
        stroke: theme.palette.primary.main,
      },
    },
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    ["& .MuiTabs-indicator"]: {
      backgroundColor: "transparent",
      top: 0,
      border: `2px solid ${theme.palette.primary.main}`,
      height: "auto",
      borderRadius: "0.45em",
    },
  },
}));

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
  const departments = useSelector((state) => state.doctorReducer?.departments);
  const dispatch = useDispatch();

  const load = async () => {
    try {
      await dispatch(loadDepartments()).unwrap();
    } catch (e) {}
  };

  useEffect(() => {
    load();
  }, []);

  //always first  tab selected
  // useEffect(() => {
  //   setSelectedTab(departments[0].id)
  // }, [departments])
  return (
    <Box
      className="flex justify-between"
      sx={(theme) => ({
        [theme.breakpoints.up("md")]: {
          borderBottom: 1,
          borderColor: "divider",
        },
      })}
    >
      <StyledTabs
        value={selectedTab}
        onChange={handleChange}
        variant="scrollable"
      >
        <StyledTab
          label={"همه‌‌ی دپارتمان‌ها"}
          icon={<LocalHospitalIcon />}
          iconPosition="bottom"
          value={null}
          className="text-sm md:text-base"
        />
        {departments?.map((tab) => (
          <StyledTab
            label={tab.faname}
            value={tab.id}
            key={tab.id}
            //icon
            icon={<Svg url={tab.icon}/>}
            iconPosition="bottom"
            className="text-sm md:text-base"
          />
        ))}
      </StyledTabs>
    </Box>
  );
};
export default DoctorsTab;
