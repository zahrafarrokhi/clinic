import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import MapComponent from "../MapComponent";

export default function Address(props) {
  const { formsTab,data } = props;
  const [state, setState] = useState({});
  const [active, setActive] = useState(false);

  useEffect(()=> {
    setState(data)
  }, [data])
  //redux
  const dispatch = useDispatch();
  const updateAddress = async ()=>{
    try {
      await dispatch(formsTab.updateData(state)).unwrap();
      setActive(false)
    } catch (error) {
      
    }
  }
  
  return (
    <div className="flex">
    <div className="flex flex-col basis-[68%]">
      <div className="flex justify-start items-start gap-9 flex-wrap my-12 ">
        {formsTab.form.map((field) => (
          <field.component
            className="basis-full md:basis-[49%] flex-grow flex-shrink-0 md:max-w-[calc(50%-1.5rem)] my-2 [&>.MuiOutlinedInput-root]:text-sm [&>label]:text-sm"
            value={state[field.id]}
            onChange={(e, val) => setState({ ...state, [field.id]: val })}
            label={field.label}
            options={field.options}
            validators={field.validators}
            state={state}
            active={active}

            //  InputProps={{InputLabelProps: {shrink: null}}}
          ></field.component>
        ))}
      </div>
      {/* BTN */}
      <Box className="flex gap-2">
        {active ? (
          <>
            <Button variant="contained" className="w-36" onClick={updateAddress} >ثبت</Button>
            <Button variant="outlined" className="w-36" onClick={() => {
              setActive(false)
              setState(data)
              }}>
              انصراف
            </Button>
          </>
        ) : (
          <Button variant="contained" className="w-auto" onClick={() => setActive(true)}>
            ویرایش اطلاعات
          </Button>
        )}
      </Box>
    </div>
<div className="basis-[30%] grow-0"><MapComponent value={state.location} onChange={(val) => setState({...state, location: val })}/></div>
    </div>
  );
}
