import Drawer from "@mui/material/Drawer";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { RiStethoscopeFill } from "react-icons/ri";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import BiotechIcon from "@mui/icons-material/Biotech";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoLogoGitlab } from "react-icons/io5";
import PatientSelection from "./PatientSelection";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../lib/utils";
import { useEffect } from "react";

const NavFields = [
  //field
  {
    items: [
      {
        id: "doctors",
        name: "پزشکان",
        route: "/doctors/",
        isActive: () => /^\/doctors/g,
        // icon: RiStethoscopeFill,
        icon: (props) => (
          <RiStethoscopeFill
            {...props}
            className={`${props.className} text-2xl`}
          />
        ),

        users: [""],
      },
      {
        id: "pharmacy",
        name: "داروخانه",
        route: "/pharmacy/",
        isActive: () => /^\/pharmacy/g,
        icon: VaccinesIcon,
        users: [""],
      },
      {
        id: "laboratory",
        name: "آزمایشگاه",
        route: "/laboratory/",
        isActive: () => /^\/laboratory/g,
        icon: BiotechIcon,
        users: [""],
      },
    ],
  },
  {
    items: [
      {
        id: "visits",
        name: "ویزیت ها",
        route: "/visits/",
        isActive: () => /^\/visits/g,
        icon: (props) => (
          <HiOutlineDocumentDuplicate
            {...props}
            className={`${props.className} text-2xl`}
          />
        ),
        users: [""],
      },
    ],
  },
  {
    items: [
      {
        id: "transactions",
        name: "تراکنش ها",
        route: "/transactions/",
        isActive: () => /^\/transactions/g,
        icon: CreditScoreIcon,
        users: [""],
      },
      {
        id: "profile",
        name: "ناحیه کاربری",
        route: "/profile/",
        isActive: () => /^\/profile/g,
        icon: ManageAccountsIcon,
        users: [""],
      },
    ],
  },
  {
    items: [
      {
        id: "support",
        name: "پشتیبانی",
        route: "/support/",
        isActive: () => /^\/support/g,
        icon: SupportAgentIcon,
        users: [""],
      },
    ],
  },
];
const drawerWidth = "240px";
export default function DrawerNav(props) {
  //redux
  const user = useSelector((state) => state.authReducer?.user);
  const { open, setOpen } = props;
  const [patientSelection, setPatientSelection] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
 //logout
 const refresh = useSelector((state) => state.authReducer?.refresh);
  const dispatch = useDispatch();

  // useEffect(()=>{},[])
  
  useEffect(() => {
    if (refresh === null) {
      router.push('/auth/login/')
    }
  },[refresh])
  return (
    <SwipeableDrawer
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      variant={isMobile ? "temporary" : "permanent"}
      anchor={isMobile ? "bottom" : "left"}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        //desktop
        [`& .MuiDrawer-paperAnchorLeft`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
        //mobile
        [`& .MuiDrawer-paperAnchorBottom`]: {
          width: "97%",
          margin: "0 auto",
          boxSizing: "border-box",
          // height: '50px',
          borderTopLeftRadius: "1.5rem",
          borderTopRightRadius: "1.5rem",
          top: patientSelection ? "100%" : undefined,
        },
      }}
      SwipeAreaProps={{
        sx: {
          height: '0px !important',
        }
      }}
    >
      {/* Divider show on mobile */}
      <Divider
        className="md:hidden w-[30%] mx-auto my-2 border-b-[.125rem] rounded-full"
        variant="middle"
      ></Divider>
      {/* Logo */}
      <Box className="flex flex-row items-center my-6 mx-8">
        <IoLogoGitlab className="text-3xl ml-2 text-primary" />
        <Typography variant="h6" color="primary">
          کلینیک آوا
        </Typography>
      </Box>

      <Box className="flex flex-row md:hidden items-center mx-8">
        <PatientSelection
          onOpen={() => setPatientSelection(true)}
          onClose={() => setPatientSelection(false)}
        />
      </Box>
      {/* Divider with Chip */}
      <Divider className="md:hidden mx-auto w-[80%]" variant="middle">
        <Chip label="منو"></Chip>
      </Divider>
      <List dense className="md:flex md:flex-col md:h-[90%]">
        {NavFields?.map((field) => {
          return (
            <>
              {field.items.map((nav) => {
                const isActive = nav.isActive().test(router.asPath);
                return (
                  <ListItem key={nav.id}>
                    <Link href={nav.route} passHref>
                      <ListItemButton
                        className={`${isActive ? "text-primary" : ""}`}
                      >
                        <ListItemIcon className="min-w-[40px]">
                          <nav.icon
                            className={`${isActive ? "text-primary" : ""}`}
                          />
                        </ListItemIcon>
                        <ListItemText className="[&_.MuiListItemText-primary]:md:text-base" primary={nav.name}></ListItemText>
                      </ListItemButton>
                    </Link>
                  </ListItem>
                );
              })}
              {/* Divider hiddenlastitem =>(className="last:hidden") center (with =>variant="middle" ) */}
              <Divider
                className="last:hidden my-2 mx-auto w-[80%]"
                variant="middle"
              ></Divider>
            </>
          );
        })}
        <div className="hidden md:flex flex-grow"/>
        <ListItem >
          <ListItemButton onClick={() => logout(dispatch)}>
            <ListItemIcon className="min-w-[40px]">
              <LogoutIcon className="text-danger" />
            </ListItemIcon>
            <ListItemText className="[&_.MuiListItemText-primary]:md:text-[0.9rem]" primary="خروج از حساب کاربری" ></ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </SwipeableDrawer>
  );
}
