import {
  Button,
  ClickAwayListener,
  IconButton,
  TextField,
} from "@mui/material";
import { textAlign } from "@mui/system";
import React, { useCallback, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

const TestItem = (props) => {
  const { item, tests, setTests } = props;
  const [openIcon, setOpenIcon] = useState(false);
  const [edit, setEdit] = useState(false);
  

  return (
    <div className="flex justify-around items-center border-0 border-b last:border-b-0 border-solid border-b-gray px-3 p-2">
      <ClickAwayListener onClickAway={() => setOpenIcon(false)}>
        <div className="flex flex-row basis-1/12 items-center text-lg">
          {openIcon ? (
            <>
              <IconButton 
                onClick={() =>
                  setTests(tests.filter((x) => x.id !== item.id))
                }
              >
                <DeleteOutlineIcon className="text-gray text-lg" />
              </IconButton>
              <IconButton onClick={() => setEdit(true)}>
                <EditIcon className="text-gray text-lg" />
              </IconButton>
            </>
          ) : (
            <div onClick={() => setOpenIcon(true)}>...</div>
          )}
        </div>
      </ClickAwayListener>
      <div className="basis-4/12">
        {edit ? (
          <ClickAwayListener onClickAway={() => setEdit(false)}>
            <TextField
              size="small"
              value={item.test_name}
              onChange={(e) =>
                setTests(
                  [
                    ...tests.filter((x) => x.id !== item.id),
                    { ...item, test_name: e.target.value },
                  ].sort((a, b) => a.id - b.id)
                )
              }
            ></TextField>
          </ClickAwayListener>
        ) : (
          item.test_name
        )}
      </div>
      <Button sx={{
        opacity: item.insurance ? 1 : 0.5,
        fontWeight: item.insurance ? 'bold' : 'normal',
      }} key={item.insurance} onClick={() => setTests(
        [
          ...tests.filter((x) => x.id !== item.id),
          { ...item, insurance: !item.insurance },
        ].sort((a, b) => a.id - b.id)
      )
      } className="basis-3/12">بیمه تکمیلی</Button>
      <Button sx={{
        opacity: item.sup_insurance ? 1 : 0.5,
        fontWeight: item.sup_insurance ? 'bold' : 'normal',
      }} onClick={(e) =>
        setTests(
          [
            ...tests.filter((x) => x.id !== item.id),
            { ...item, sup_insurance: !item.sup_insurance},
          ].sort((a, b) => a.id - b.id)
        )
      } className="basis-3/12">بیمه تامین اجتماعی</Button>
    </div>
  );
};

export default function Tests(props) {
  const {tests, setTests} =props;
  // const [tests, setTests] = useState([
  //   // {name, insurance, sup_insurance}
  // ]);
  const [lastId, setLastId] = useState(1);

  const getNewId = () => {
    const newId = lastId + 1;
    setLastId(newId);
    return newId;
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="text-grayBtn">آزمایش‌ها</div>

        <Button
          variant="outlined"
          className="flex items-center justify-center"
          onClick={() =>
            setTests([
              ...tests,
              {
                id: getNewId(),
                test_name: "",
                insurance: false,
                sup_insurance: false,
              },
            ])
          }
        >
          <AiOutlinePlus className="text-primary mx-2 " />
        </Button>
      </div>
      <div className="flex flex-col rounded-3xl border-solid border border-gray gap-2">
        {tests.map((item) => (
          <TestItem
            key={item.id}
            item={item}
            tests={tests}
            setTests={setTests}
          />
        ))}
      </div>
    </div>
  );
}
