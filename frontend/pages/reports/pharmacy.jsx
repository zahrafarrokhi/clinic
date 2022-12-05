import React, { useMemo } from 'react'
import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../../components/navigation/Navigation';
import { getChart, getFields } from '../../lib/slices/pharmacy';
import { convertStrToJalali, stringifyPrice } from '../../lib/utils';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
} from 'chart.js';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';


// chart
ChartJS.register(
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
);


export default function PharmacyReport() {
  const fields = useSelector(state=>state.pharmacyReducer?.fields)
  const chart = useSelector(state=>state.pharmacyReducer?.chart)
  const dispatch = useDispatch()
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const loadChart = async () => {
    try {
      await dispatch(getChart()).unwrap()
    } catch (e) {}
  }
  const loadFields = async () => {
    try {
      await dispatch(getFields()).unwrap()
    } catch (e) {}
  }

  useEffect(() => {
    loadChart();
    loadFields();
  }, [])

  const info = useMemo(() => {
    const data = {
      labels: chart?.map((cat) => convertStrToJalali(cat.date)),
      datasets: [
        {
          label: 'تعداد نسخه‌ها',

          data: chart?.map((cat) => cat.prescription),
          backgroundColor: [
            'rgba(54, 162, 235, 0.5)',
          ],
          borderColor: 'rgba(54, 162, 235, 0.5)',
          borderWidth: 1,
        },
      ],
    };
    return data;
  }, [chart]);


  return (
    <div className='p-6 h-full'>
      <div className="flex flex-col h-full gap-4">

        <div className='text-lg text-gray'>گزارش ها</div>
        <div className='h-[400px] md:h-[50%]'>
        <Line
                data={info}
                options={{
                  plugins: {
                    legend: {
                      position: isMobile ? 'bottom' : 'right',
                    },
                  },
                  maintainAspectRatio: false,
                }}
                height="100%"
                width="100%"
              />

        </div>
        <div className='flex flex-row flex-wrap-reverse gap-4'>
        {fields?.reduce((acc, item)=> [item].concat(acc), []).map((item)=>(
          <div className='flex flex-col md:basis-[23%] flex-grow justify-around gap-3 items-center rounded-lg border border-solid border-gray p-4'>
            <div className='text-lg text-center'>{item.title}</div>
            <div className='text-lg text-primary'>{String(item.value).length > 4 ? stringifyPrice(item.value) : item.value}</div>
          </div>
          ))}
          
        
        </div>
      </div>

    </div>
  )
}


PharmacyReport.getLayout = (page) => {
  return <Navigation>{page}</Navigation>;
};
