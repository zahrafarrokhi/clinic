import { Button, IconButton, TextField } from "@mui/material";
import React from "react";
import { useRef } from "react";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import Navigation from "../../components/navigation/Navigation";

export default function NewTicket() {
  const ref = useRef();

  return (
    <div className="flex flex-col px-8 gap-2">
      <div className="flex flex-wrap justify-between mt-4 my-2 items-center ">
        <div className="text-sm text-gray font-bold">پشتیبانی</div>
      </div>
      <div className="flex flex-wrap  font-bold text-lg items-center ">
        ارسال درخواست پشتیبانی سایت
      </div>
      <div className="flex flex-wrap italic text-sm text-justify items-center whitespace-normal">
        در این قسمت شما میتوانید مشکلات سایت و نرم افزار را اعلام نمایید. لازم
        به ذکر است موارد این قسمت توسط ادمین بررسی میشود
      </div>
      <div className="flex flex-row gap-4 md:gap-2 my-2 flex-wrap">
        <TextField
          className="flex-grow md:flex-grow-0"
          size="small"
          label="نام و نام خانوادگی"
        ></TextField>
        <TextField
          className="flex-grow md:flex-grow-0"
          size="small"
          label="پست الکترونیک"
        ></TextField>
        <TextField
          className="flex-grow md:flex-grow-0"
          size="small"
          label="شماره‌ی همراه"
        ></TextField>
      </div>

      <div className="flex flex-col gap-4 max-w-full md:max-w-[600px]">
        <TextField size="small" label="موضوع"></TextField>
        <TextField label="پیام" multiline rows={6}></TextField>
        <div>
          <input type="file" hidden ref={ref} />
          <Button
            className="flex items-center gap-2"
            color="grayBtn"
            onClick={() => ref.current.click()}
          >
            <DriveFolderUploadIcon />
            پیوست
          </Button>
        </div>
      </div>

      <div className="flex flex-row gap-2">
        <Button size="small" variant="contained">
          ارسال
        </Button>
        <Button size="small" variant="outlined">
          انصراف
        </Button>
      </div>
    </div>
  );
}

NewTicket.getLayout = (page) => {
  return <Navigation>{page}</Navigation>;
};
