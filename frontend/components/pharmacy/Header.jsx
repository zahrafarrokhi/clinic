import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/material';
import { Router } from '@mui/icons-material';
import { useRouter } from 'next/router';

export default function Header(props) {
  const {state} =props;
  const router = useRouter();
  const tabsList = {
    send: {
      title: 'درخواست دارو',
      id: 'send',
      route: '/pharmacy/new',
    },
    delivery: {
      title: 'نسخه های تحویلی',
      id: 'delivery',
      route: '/pharmacy/',
    }
  }

  const handleChange=(e,newValue)=>{
   
    //  'delivery' ===  newValue ?router.push('/pharmacy/'):router.push('/pharmacy/new/')
    //  'delivery' ===  newValue ? router.pu  sh(tabsList['delivery'].route) : router.push(tabsList['send'].route)
     router.push(tabsList[newValue].route)
  }
  return (
    <div className='flex flex-col gap-4'>

      <div className='text-sm text-grayBtn'>داروخانه</div>
      
      {/* with for */}
      <div className='text-lg font-bold '>{tabsList[state].title}</div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', }} className="mx-6">
        <Tabs value={state}  aria-label="basic tabs example" onChange={handleChange}>
          {Object.keys(tabsList).map(item => <Tab key={item} value={tabsList[item].id} label={tabsList[item].title} />)}
        </Tabs>
      </Box>
    </div>
  )
}
