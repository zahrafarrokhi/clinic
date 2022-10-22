import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Toolbar,
} from "@mui/material";
import Box from "@mui/material/Box";
import React, { useMemo, useState } from "react";
import DrawerNav from "./DrawerNav";
import Header from "./Header";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextLinkComposed } from "../NextLinkComposed";
import { RiStethoscopeFill } from "react-icons/ri";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import BiotechIcon from "@mui/icons-material/Biotech";

export default function Navigation(props) {
  const { children } = props;

  //use for openig  or closing drawer
  const [open, setOpen] = useState(false);

//Bottom navigation
  const router = useRouter();
  //  console.log("current path", router.asPath, router.asPath.split('/'),router.asPath.split("/")[1])
  const currentRoute = useMemo(() => {
    return router.asPath.split("/")[1];
  }, [router, router.asPath]); 

  return (
    <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
      <DrawerNav open={open} setOpen={setOpen} />
      <Box
        sx={{
          display: "flex ",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        <Header openDrawer={() => setOpen(true)} />
        <Box className="flex-grow flex flex-col">
          <Toolbar className="h-[80px]"></Toolbar>
          {children}
        </Box>
        <Paper className="md:hidden"sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>

        <BottomNavigation
          showLabels
          value={currentRoute}
          onChange={(event, newValue) => {
            // setValue(newValue);
          }}
        >
            <BottomNavigationAction
              label="پزشکان"
              value="doctors"
              to="/doctors/"
              LinkComponent={NextLinkComposed}
              icon={<RiStethoscopeFill className={`text-2xl`}/>}
            />
            <BottomNavigationAction
              label="آزمایشگاه"
              value="laboratory"
              to="/laboratory/"
              LinkComponent={NextLinkComposed}
              icon={<BiotechIcon />}
            />
            <BottomNavigationAction
              label="داروخانه"
              value="pharmacy"
              to="/pharmacy/"
              LinkComponent={NextLinkComposed}
              icon={<VaccinesIcon />}
            />
            <BottomNavigationAction
              label="ویزیت‌ها"
              value="visits"
              to="/visits/"
              LinkComponent={NextLinkComposed}
              icon={<HiOutlineDocumentDuplicate />}
            />
        </BottomNavigation>
        </Paper>
      </Box>
    </Box>
  );
}
