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
    pharmacy: {
      title: 'داروخانه', 
      items: {
        send: {
          title: 'درخواست دارو',
          id: 'send',
          route: '/pharmacy/new',
        },
        delivery: {
          title: 'نسخه های تحویلی',
          id: 'delivery',
          route: '/pharmacy/',
        },
      }
    },
    laboratory: {
      title: 'آزمایشگاه', 
      items: {
        send: {
          title: 'درخواست آزمایش',
          id: 'send',
          route: '/laboratory/new',
        },
        status: {
          title: 'وضعیت درخواست‌ها',
          id: 'status',
          route: '/laboratory/',
        },
        testResult: {
          title: 'نتایج آزمایش',
          id: 'testResult',
          route: '/laboratory/',
        },
      }
    },
  }

  console.log(router.asPath)

  const routeResult = router.asPath.split('/')[1]
  // const tabs = 'pharmacy'===routeResult?tabsList.pharmacy :tabsList.laboratory ;
  const tabs = tabsList[routeResult];
  
  const handleChange=(e,newValue)=>{
   
    //  'delivery' ===  newValue ?router.push('/pharmacy/'):router.push('/pharmacy/new/')
    //  'delivery' ===  newValue ? router.pu  sh(tabsList['delivery'].route) : router.push(tabsList['send'].route)
     router.push(tabs.items[newValue].route)
  }

  return (
    <div className='flex flex-col gap-4'>

      <div className='text-sm text-grayBtn'>{tabs.title}</div>
      
      {/* with for */}
      <div className='text-lg font-bold '>{tabs.items[state].title}</div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', }} className="mx-6">
        <Tabs value={state}  aria-label="basic tabs example" onChange={handleChange}>
        {Object.keys(tabs.items).map(p => <Tab key={p} value={tabs.items[p].id} label={tabs.items[p].title} className="text-xs md:text-base"/>)}
        </Tabs>
      </Box>
    </div>
  )
}
