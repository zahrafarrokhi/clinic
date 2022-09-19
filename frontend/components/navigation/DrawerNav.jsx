import Drawer from '@mui/material/Drawer';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const drawerWidth = "240px"
export default function DrawerNav(props) {
  //
  const {open,setOpen } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (

    <Drawer
    open={open}
    onClose={()=>setOpen(false)}
    variant={isMobile ? "temporary" : "permanent"}
    anchor={isMobile ? "bottom" : "left"}
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      //desktop
      [`& .MuiDrawer-paperAnchorLeft`]: {
        width: drawerWidth, boxSizing: 'border-box'
      },
      //mobile
      [`& .MuiDrawer-paperAnchorBottom`]: {
        width: '97%',
        margin: '0 auto',
        boxSizing: 'border-box',
        height: '50px',
        borderTopLeftRadius: '1.5rem',
        borderTopRightRadius: '1.5rem',
      },
    }}
    >
    </Drawer>
  )

 }