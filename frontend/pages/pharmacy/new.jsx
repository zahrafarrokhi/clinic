import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  FormControlLabel,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
  useRadioGroup,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Navigation from "../../components/navigation/Navigation";
import Header from "../../components/pharmacy/Header";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import {
  createPrescription,
  createPrescriptionPic,
} from "../../lib/slices/pharmacy";
import { Description } from "@mui/icons-material";
import { CgDanger } from "react-icons/cg";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import AddressSelection from "../../components/ProfileFields/AddressSelection";
import { loadPatientPrescriptions } from "../../lib/slices/visits";
import { convertStrToJalali } from "../../lib/utils";
import Image from "next/image";
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import SquareRoundedIcon from '@mui/icons-material/SquareRounded';

// const CustomRadioButton = (props) => {

//   return <Radio {...props} icon={<CheckBoxOutlineBlankIcon/>} checkedIcon={<SquareRoundedIcon/>}/>
// }

const StyledFormControlLabel = styled((props) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  ".MuiFormControlLabel-label": {
    fontSize: "0.9em",
    ...(checked && {
      color: theme.palette.primary.main,
    }),
  },
}));

const CustomFormControlLabel = (props) => {
  const { value } = props;
  const checked = useRadioGroup();
  return (
    <StyledFormControlLabel
      {...props}
      value={value}
      control={<Radio />}
      checked={checked.value === value}
      // sx={[{
      //   color: checked.value === value ? "primary.main" : undefined,
      // }, props.sx]}
    />
  );
};
//panel

const Panel = (props) => {
  const { selected, value, children, ...other } = props;
  return (
    <div role="tabpanel" hidden={selected !== value} {...other}>
      {selected === value && children}
    </div>
  );
};

// درخواست دارو => RequestPrescription
export default function RequestPrescription() {
  const [checked, setChecked] = useState("pres");
  const [attachment, setAttachment] = useState([]);
  const ref = useRef();
  const router = useRouter();

  // dialog
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    router.push("/pharmacy/");
  };
  //redux
  const patient = useSelector((state) => state.patientReducer?.patient);
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  // const address = useSelector((state) => state.addressReducer?.address);
  const [addressId, setAddressId] = useState();
  // select pannel result
  const [panelSelected, setPanelSelected] = useState();

  const submit = async () => {
    try {
      const res = await dispatch(
        createPrescription({
          // models in backend
          patient: patient.id,
          code: code,
          description: description,
          address: addressId,
          doctor_prescription: panelSelected?.id,
          // address: address.id,
        })
      ).unwrap();
      for (let attach of attachment) {
        await dispatch(
          createPrescriptionPic({
            pic: attach,
            pre: res.data.id,
          })
        ).unwrap();
      }
      setOpen(true);
    } catch (error) {}
  };

  const prescriptions = useSelector(
    (state) => state?.visitReducer?.prescriptions
  );
  const loadPrescriptions = async () => {
    try {
      await dispatch(
        loadPatientPrescriptions({ patient_id: patient?.id, type: "pharmacy" })
      ).unwrap();
    } catch (e) {}
  };

  useEffect(() => {
    loadPrescriptions();
  }, []);

  return (
    <div className="px-6 py-4 w-full">
      <Header state="send" />

      <RadioGroup
        className="flex flex-row gap-4 m-6"
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={checked}
        onChange={(e) => setChecked(e.target.value)}
      >
        <CustomFormControlLabel
          value="pres"
          // control={<Radio />}
          label="سفارش با نسخه‌ی پزشک"
          // sx={{
          //   color: checked === "pres" ? "primary.main" : undefined,
          // }}
        />
        <CustomFormControlLabel
          value="pic"
          control={<Radio />}
          label="بارگذاری عکس نسخه"
        />
      </RadioGroup>

      <Panel selected={checked} value={"pres"}>
        {!panelSelected &&
          prescriptions.map((item) => {
            return (
              <div className="rounded-lg border border-solid border-backgroundGray flex flex-row gap-2 justify-around p-4 h-[150px] w-[300px] max-w-full items-center">
                <div className="relative h-[90%] w-1/4 overflow-hidden rounded-lg ">
                  <Image src={item?.visit.doctor.image} layout="fill" />
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <div className="text-base font-bold text-primary">
                    {item?.visit?.doctor.department.name}
                  </div>
                  <div className="text-base font-bold">
                    {item?.visit?.doctor.first_name}{" "}
                    {item?.visit?.doctor.last_name}
                  </div>
                  <div className="text-base text-gray">
                    {convertStrToJalali(item?.created_at)}
                  </div>
                  <div className="text-sm ">
                    <Button
                      variant="contained"
                      className="p-1"
                      onClick={() => setPanelSelected(item)}
                    >
                      انتخاب
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        {panelSelected && (
          <div className="flex flex-col mx-6 gap-4">
            <TextField
              label="کد رهگیری"
              className="self-start"
              size="small"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              // label top
              InputLabelProps={{
                shrink: true,
              }}
              // label top

              InputProps={{
                sx: {
                  marginTop: "1em",
                  "& legend": {
                    display: "none",
                  },
                },
              }}
            ></TextField>
            <div></div>
            <div className="flex gap-2 overflow-auto w-full">
              {panelSelected.image.map((item) => (
                <div
                  className="relative  max-w-full md:w-[400px] md:h-[300px] flex justify-center items-center "
                  key={item}
                >
                  <Image
                    src={item.image}
                    alt=""
                    layout="fill"
                    className="max-w-[400px] max-h-[400px] rounded-lg"
                  />
                </div>
              ))}
            </div>
            <TextField
              label="توضیحات به آزمایشگاه"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                sx: {
                  marginTop: "1.5em",
                  "& legend": {
                    display: "none",
                  },
                },
              }}
              multiline
              rows={5}
            ></TextField>
            <AddressSelection
              addressId={addressId}
              setAddressId={setAddressId}
            />

            <div className="flex gap-2 items-center text-sm italic">
              <CgDanger />
              پس از تایید شما توسط آزمایشگاه بر اساس قوانین و مقررات هزینه
              آزمایش برای شما پیامک میشود.
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Button
                size="small"
                variant="contained"
                onClick={submit}
                className="p-2 px-4"
              >
                ارسال درخواست
              </Button>

              <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    سفارش شما ثبت و به آزمایشگاه ارسال گردید.
                    <br />
                    نتیجه آن توسط پیامک و پنل کاربری اطلاع داده خواهد شد.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>ادامه</Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        )}
      </Panel>

      <Panel
        selected={checked}
        value={"pic"}
        className="flex flex-col mx-6 gap-4"
      >
        <TextField
          label="کد رهگیری"
          className="self-start"
          size="small"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            sx: {
              marginTop: "1em",
              "& legend": {
                display: "none",
              },
            },
          }}
        ></TextField>
        <div>
          <Button
            className="flex items-center gap-2"
            // color="grayBtn"
            onClick={() => ref.current.click()}
          >
            <AddIcon className="text-lg p-1 w-8 h-8 rounded border border-solid border-primary" />
            افزودن عکس
          </Button>
        </div>
        <div className="flex gap-2 overflow-auto w-full">
          <input
            type="file"
            hidden
            ref={ref}
            multiple
            onChange={(e) => setAttachment([...attachment, ...e.target.files])}
          />
          {attachment.map((item) => (
            <div
              className="relative  max-w-full md:w-[400px] md:h-[300px] flex justify-center items-center "
              key={item}
            >
              <img
                src={URL.createObjectURL(item)}
                alt=""
                className="max-w-[400px] max-h-[400px] rounded-lg"
              />
              <Button
                variant="outlined"
                onClick={() =>
                  setAttachment(attachment.filter((i) => item !== i))
                }
                className="absolute left-1 bottom-1 rounded-full aspect-square p-2 min-w-fit"
              >
                <DeleteOutlineIcon className="text-xl " />
              </Button>
            </div>
          ))}
        </div>
        <TextField
          label="توضیحات به آزمایشگاه"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            sx: {
              marginTop: "1.5em",
              "& legend": {
                display: "none",
              },
            },
          }}
          multiline
          rows={5}
        ></TextField>
        <AddressSelection addressId={addressId} setAddressId={setAddressId} />

        <div className="flex gap-2 items-center text-sm italic">
          <CgDanger />
          پس از تایید شما توسط آزمایشگاه بر اساس قوانین و مقررات هزینه آزمایش
          برای شما پیامک میشود.
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Button
            size="small"
            variant="contained"
            onClick={submit}
            className="p-2 px-4"
          >
            ارسال درخواست
          </Button>

          <Dialog
            open={open}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                سفارش شما ثبت و به آزمایشگاه ارسال گردید.
                <br />
                نتیجه آن توسط پیامک و پنل کاربری اطلاع داده خواهد شد.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>ادامه</Button>
            </DialogActions>
          </Dialog>
        </div>
      </Panel>
    </div>
  );
}

RequestPrescription.getLayout = (page) => {
  return <Navigation>{page}</Navigation>;
};
