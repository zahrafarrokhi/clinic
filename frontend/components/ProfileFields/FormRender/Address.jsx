import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import MapComponent from "../MapComponent";

export default function Address(props) {
  const { formsTab,data,hide } = props;
  const [state, setState] = useState({});
  const [active, setActive] = useState(false);

  useEffect(()=> {
    setState(data)
    if (!data.id || hide) {
      setActive(true)
    }
  }, [data, hide])
  //redux
  const dispatch = useDispatch();
  const updateAddress = async ()=>{
    try {
      if (data.id) {
        await dispatch(formsTab.updateData(state)).unwrap();
        setActive(false)
        if(hide) hide()
      }
      else {
        await dispatch(formsTab.createData(state)).unwrap();
        setState({})
        hide ()
      }
     
    } catch (error) {
      
    }
  }
  
  return (
    <div className="flex flex-wrap">
    <div className="flex flex-col flex-grow basis-[68%]">
      <div className="flex justify-start items-start gap-9 flex-wrap my-12 ">
        {formsTab.form.map((field) => (
          <field.component
            className="basis-full md:basis-[40%] flex-grow flex-shrink-0 md:mx-2 my-2 [&>.MuiOutlinedInput-root]:text-sm [&>label]:text-sm"
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
      <Box className="hidden md:flex gap-2">
        {active ? (
          <>
            <Button variant="contained" className="w-36" onClick={updateAddress} >ثبت</Button>
           <Button variant="outlined" className="w-36" onClick={() => {
              setActive(false)
                setState(data)
                if (hide) {
                  hide()
                }
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
    <div className="basis-[30%] grow md:grow-0 shrink-0 min-w-[200px] min-h-[200px]">
      <MapComponent value={state.location} onChange={(val) => setState({...state, location: val })} active={active}/>
    </div>

<Box className="flex md:hidden w-full gap-2 my-10">
        {active ? (
          <>
            <Button variant="contained" className="flex basis-[45%] grow" onClick={updateAddress} >ثبت</Button>
            <Button variant="outlined" className="flex basis-[45%] grow" onClick={() => {
              setActive(false)
              setState(data)
              if (!data.id) {
                hide()
              }
              }}>
              انصراف
            </Button>
          </>
        ) : (
          <Button variant="contained" className="flex basis-[45%] grow" onClick={() => setActive(true)}>
            ویرایش اطلاعات
          </Button>
        )}
      </Box>
    </div>
  );
}
