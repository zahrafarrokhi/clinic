import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function Form(props) {
  const { formsTab } = props;
  const [state, setState] = useState({});
  const [active, setActive] = useState(false);
  //redux
  const dispatch = useDispatch();
  //loadData
  const data = useSelector(formsTab.data)
  useEffect(()=> {
    setState(data)
  }, [data])
  //updateData
  const update = async ()=>{
    try {
      await dispatch(formsTab.updateData(state)).unwrap();
      setActive(false)
    } catch (error) {
      
    }
  }
  return (
    <div className="flex flex-col">
      <div className="flex justify-start items-start gap-9 flex-wrap self-stretch my-12">
        {formsTab.form.map((field) => (
          <field.component
            className="basis-full md:basis-[30%] flex-grow flex-shrink-0 md:max-w-[calc(33%-1.5rem)] my-2 [&>.MuiOutlinedInput-root]:text-sm [&>label]:text-sm"
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
            <Button variant="contained" className="flex basis-[45%] grow md:block md:basis-auto md:grow-0 md:w-36" onClick={update} >ثبت</Button>
            <Button variant="outlined" className="flex basis-[45%] grow md:block md:basis-auto md:grow-0 md:w-36" onClick={() => {
              setActive(false)
              setState(data)
              }}>
              انصراف
            </Button>
          </>
        ) : (
          <Button variant="contained" className="flex basis-[45%] grow md:block md:basis-auto md:grow-0 md:w-auto" onClick={() => setActive(true)}>
            ویرایش اطلاعات
          </Button>
        )}
      </Box>
    </div>
  );
}
