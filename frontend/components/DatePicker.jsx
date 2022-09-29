import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import AdapterJalali from '@date-io/date-fns-jalali';
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns-jalali';
//
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';

class CustomAdapter extends AdapterJalali {
  getWeekdays = () => {
    const now = new Date();
    return eachDayOfInterval({
      start: startOfWeek(now),
      end: endOfWeek(now),
    }).map((val) => format(val, 'EEEE'));
  }
}

export default function ResponsiveDatePickers(props) {
  const { label, disabled, TextFieldProps, ...others } = props;
  // const [value, setValue] = useState(new Date());
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  return (
    //dateAdapter
    <LocalizationProvider dateAdapter={CustomAdapter} dateFormats={{
      monthShort: 'MMMM',
    }} localeText={{
      cancelButtonLabel: 'لغو',
      okButtonLabel: 'تایید',
    }}>
   
        <MobileDatePicker
        label={label}
        disabled={disabled}
          orientation={isMobile?'portrait':'landscape'} 
          // value={value}
          // onChange={(newValue) => {
          //   setValue(newValue);
          // }}
          // dayOfWeekFormatter={(day) => day}
        renderInput={(params) => <TextField {...params} {...TextFieldProps} />}
        {...others}
        />
       
  
    </LocalizationProvider>
  );
}
