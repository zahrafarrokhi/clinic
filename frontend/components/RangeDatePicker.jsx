import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import AdapterJalali from '@date-io/date-fns-jalali';
import { add, eachDayOfInterval, endOfWeek, format, isAfter, isBefore, isSameDay, isSameWeek, isWithinInterval, startOfWeek } from 'date-fns-jalali';
//
import { useTheme } from '@emotion/react';
import { Box, Button, styled, useMediaQuery } from '@mui/material';
import { PickersDay } from '@mui/x-date-pickers';

//same as before
class CustomAdapter extends AdapterJalali {
  getWeekdays = () => {
    const now = new Date();
    return eachDayOfInterval({
      start: startOfWeek(now),
      end: endOfWeek(now),
    }).map((val) => format(val, 'EEEE'));
  }
}


const CustomActions = (props) => {
  const {
    onAccept, onClear, onCancel, onSetToday, actions,
  } = props;

  return (
    <div className="flex justify-end p-3">
      <Button color="blue" onClick={onClear}>لغو</Button>
      <Button color="blue" variant="contained" onClick={onCancel}>تایید</Button>
    </div>
  );
};


const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
})(({ theme, dayIsBetween, isFirstDay, isLastDay, today }) => ({
  ...(today && {
    border: '0px !important',
    backgroundColor: 'white !important',
    color: 'black !important',
    border: '1px solid',
    borderColor: theme.palette.primary.main
  }),
  ...((dayIsBetween || isFirstDay || isLastDay) && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),
  ...(isLastDay && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
}));

export default function RangeDatePicker(props) {
  // const [start, setStart] = useState(new Date());
  // const [end, setEnd] = useState(new Date());
  const { label, disabled, TextFieldProps, start, setStart, end, setEnd, ...others } = props;

  const renderDay = (date, selectedDates, pickersDayProps) => {
    if (!start || !end) {
      return <PickersDay {...pickersDayProps} />;
    }

 
    const isBetween = isWithinInterval(date, { start, end });
    const isFirstDay = isSameDay(date, start);
    const isLastDay = isSameDay(date, end);
    // console.log(date, isLastDay, isFirstDay, isBetween)


    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={isBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    );
  };

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  return (
    //LocalizationProvider
    <LocalizationProvider dateAdapter={CustomAdapter} dateFormats={{
      //same as before
      monthShort: 'MMMM',
    }} localeText={{
      clearButtonLabel: 'لغو',
      okButtonLabel: 'تایید',
    }}>
   
        <MobileDatePicker
         renderDay={renderDay}
        label={label}
        disabled={disabled}
        value={start}
        onChange={(value) => {
          if(!value) {
            setStart();
            setEnd();
          }
          if (isSameDay(value, start)) {
            return
          }
          if(!start || !end) {
            setStart(value)
            setEnd(value)
          } else if(isAfter(value, end)) {
            setEnd(value)
          } else if(isBefore(value, start)) {
            setStart(value)
          } else {
            setEnd(value)
            setStart(value)
          }
        }}
          orientation={isMobile?'portrait':'landscape'} 
        renderInput={(params) => {
        return (<Box className="flex flex-row gap-2">
          <TextField {...params} size='small' className="w-32" {...TextFieldProps} label="از تاریخ" inputProps={{...params.inputProps, value: start ? format(start, 'yyyy/MM/dd') : ''}}/>
          <TextField {...params} size='small' className="w-32" {...TextFieldProps} label="تا تاریخ" inputProps={{...params.inputProps, value: end ? format(end, 'yyyy/MM/dd') : ''}}/>
          </Box>)
        }}
        componentsProps={{
          actionBar: {
            actions: ['clear', 'accept']
          }
        }}

        // {...others}
        />
       
  
    </LocalizationProvider>
  );
}
