import {
  AppBar,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  InputAdornment,
  ListItemText,
  Pagination,
  Paper,
  Portal,
  Slide,
  Tab,
  Table,
  TableHead,
  TableRow,
  tableRowClasses,
  TableSortLabel,
  Tabs,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Navigation from "../../components/navigation/Navigation";
import TableContainer from "@mui/material/TableContainer";
import { ArrowBackIos } from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadVisitsPatient } from "../../lib/slices/visits";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import Select from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import throttle from "lodash.throttle";
import RangeDatePicker from "../../components/RangeDatePicker";
import { format } from "date-fns";
import { convertStrToJalali } from "../../lib/utils";
import Image from "next/image";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useTheme } from "@mui/system";
import { useRef } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.backgroundGray.main,
    fontSize: 16,
    fontWeight: "bold",
    // color: theme.palette.common.white,
  },
  //sort
  [`& .MuiTableSortLabel-root`]: {
    fontSize: 16,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: "bold",
  },
  //mobile
  [theme.breakpoints.down("md")]: {
    borderBottom: 0,
    padding: "0.25em",
    display: "flex",
    alignItems: "center",
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
      // fontWeight: "normal",
    },
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  [`&.${tableRowClasses.head}`]: {
    borderTop: 0,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  //mobile
  [theme.breakpoints.down("md")]: {
    borderRadius: "1em",
    border: `1px solid ${theme.palette.backgroundGray.main}`,
    padding: "0.5em",
    margin: "0.5em 0",
  },
}));
const CustomTableSortLabel = (props) => {
  const { children, order, orderBy, id, onClick } = props;
  return (
    <StyledTableCell align="center">
      <TableSortLabel
        active={orderBy === id}
        direction={orderBy === id ? order : "asc"}
        onClick={onClick}
      >
        {children}
      </TableSortLabel>
    </StyledTableCell>
  );
};
const VISIT_STATUS_TEXT = {
  started: "شروع شده",
  waiting_for_response: "در انتظار پاسخ",
  responded: "پاسخ داده شده",
  closed: "بسته شده",
  waiting_for_payment: "در انتظار پرداخت",
  payment_failed: "پرداخت ناموفق",
};
const VISIT_STATUS_COLOR = {
  started: "success",
  waiting_for_response: "warning",
  responded: "success",
  closed: "default",
  waiting_for_payment: "warning",
  payment_failed: "error",
};
// const DEFAULT_FILTERS = {
//   search: '',
//   status: [''],
//   start: null,
//   end: null
// }
const Visits = () => {
  //ordering
  //desc or asc
  const [order, setOrder] = useState("desc");
  //which column is active
  const [orderBy, setOrderBy] = useState("created_at");
  //search
  const [search, setSearch] = useState("");
  // filters
  const [status, setStatus] = useState([""]);
  //picker
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  // const [filters, setFilters] = useState(DEFAULT_FILTERS)
  //pagination
  const LIMIT = 10;
  const count = useSelector((state) => state.visitReducer?.visits?.count);
  const [offset, setOffset] = useState(0);
  const current_page = useMemo(() => offset / LIMIT + 1, [offset]);
  const number_of_pages = useMemo(() => Math.ceil(count / LIMIT), [count]);
  //redux
  const visits = useSelector((state) => state.visitReducer?.visits?.results);
  const patient = useSelector((state) => state.patientReducer?.patient);
  const dispatch = useDispatch();

  const lstVisits = useMemo(
    () =>
      throttle(async ({ search }) => {
        try {
          await dispatch(
            loadVisitsPatient({
              // url params
              patient_id: patient.id,
              // queryparam-> backend: state
              //ordering
              ordering: `${order === "asc" ? "" : "-"}${orderBy}`,
              // date
              created_at__date__lte: end
                ? format(end, "yyyy-MM-dd")
                : undefined,
              created_at__date__gte: start
                ? format(start, "yyyy-MM-dd")
                : undefined,
              //filter
              status__in: status.join(",") || undefined,
              //search
              search,
              // pagination
              limit: LIMIT,
              offset,
            })
          ).unwrap();
        } catch (error) {
          console.log(error);
        }
      }, 1000),
    [patient, orderBy, order, status, offset, start, end]
  );

  useEffect(() => {
    lstVisits({ search });
  }, [patient, orderBy, order, status, search, offset, start, end]);
  // ordering
  const handleSort = (col) => {
    if (orderBy === col) {
      setOrder((order) => (order === "desc" ? "asc" : "desc"));
    } else {
      setOrderBy(col);
      setOrder("asc");
    }
  };
  //mobile filter
  const [openModal, setOpenModal] = useState(false);
// mobile tab
const [selectedTab,setSelectedTab] = useState('open')
  return (
    <div className="flex flex-col p-4 md:p-8">
      <Box sx={(theme) => ({
        borderBottom: 1, 
        borderColor: 'divider',
        [theme.breakpoints.up('md')]: {
          display: 'none',
        }
      })}>
       <Tabs value={selectedTab} onChange={(e, newValue) => {
        setSelectedTab(newValue)

        if(newValue === 'open')
          setStatus(['started', 'waiting_for_response', 'responded'])
        else 
          setStatus(['closed'])
        }} aria-label="basic tabs example">
        <Tab label="ویزیت های فعال"  value="open" className="flex-grow"/>
        
          <Tab label="ویزیت های بسته شده" value="closed" className="flex-grow"/>
        </Tabs>
        </Box>
      {/* search & filter */}
      <div className="flex flex-wrap justify-between my-4 items-center px-1">
        <div className="flex gap-5 w-full md:w-auto">
          {/* Search */}

          <TextField
            label="جستجو"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {/* clear search */}
                  {search && (
                    <IconButton onClick={() => setSearch("")}>
                      <CloseIcon className="text-base" />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
            size="small"
            className="flex-grow md:flex-grow-0 "
          />
          <Button
            color="filter"
            variant="outlined"
            size="small"
            className="py-0 md:hidden"
            onClick={() => setOpenModal(true)}
          >
            <FilterAltOutlinedIcon className="" />
          </Button>
          <Dialog
            open={openModal}
            onClose={() => setOpenModal(false)}
            fullScreen
            //transition
            TransitionComponent={Slide}
            TransitionProps={{
              direction: "left",
            }}
          >
            <AppBar color="white" elevation={0} className="md:hidden">
              <Toolbar>
                {/* back arrow */}
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={() => setOpenModal(false)}
                  aria-label="close"
                >
                  <ArrowForwardOutlinedIcon />
                </IconButton>
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  فیلتر‌ها
                </Typography>
              </Toolbar>
            </AppBar>
            <Toolbar className="md:hidden" />
            <DialogContent>
              <Box className="flex flex-col gap-4">
                {/* datepicker */}
                <Typography component="h4" variant="h5">
                  تاریخ
                </Typography>
                <RangeDatePicker
                  start={start}
                  end={end}
                  setStart={setStart}
                  setEnd={setEnd}
                />
                <Divider variant="inset"></Divider>
                {/* Filters */}
                <Typography component="h4" variant="h5">
                  وضعیت
                </Typography>
                <FormControl size="small">
                  <InputLabel id="demo-simple-select-label" shrink>
                    وضعیت
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status || ""}
                    label="وضعیت"
                    // onChange={(e) => setStatus(e.target.value)}
                    onChange={(e) => {
                      //get value from e.target
                      const {
                        target: { value },
                      } = e; // e.target.value
                      const newStatus =
                        typeof value === "string" ? value.split(",") : value;
                      setStatus((prevStatus) => {
                        if (
                          newStatus.indexOf("") > -1 &&
                          prevStatus.indexOf("") === -1
                        ) {
                          return [""];
                        } else if (newStatus.length === 1) {
                          return newStatus;
                        } else if (newStatus.length === 0) {
                          return [""];
                        } else {
                          return newStatus.filter((item) => item !== "");
                        }
                      });
                    }}
                    renderValue={(selected) =>
                      selected
                        .map(
                          (item) => VISIT_STATUS_TEXT[item] || "مشاهده‌ی همه"
                        )
                        .join(", ")
                    }
                    // renderValue={(selected) => (
                    //   <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    //     {selected.map((value) => (
                    //       <Chip key={value} label={VISIT_STATUS_TEXT[value] || "مشاهده‌ی همه"} color={VISIT_STATUS_COLOR[value] || 'default'} sx={{
                    //         '& .MuiChip-label': {
                    //           fontSize: '0.875em'
                    //         }
                    //       }}/>
                    //     ))}
                    //   </Box>
                    // )}
                    // Default(select all)
                    displayEmpty
                    // Multiselect
                    multiple
                    // size select
                    size="small"
                    //fontSize
                    sx={{
                      "& .MuiSelect-select": {
                        fontSize: "0.875em",
                      },
                    }}
                    InputProps={{
                      size: "small",
                    }}
                    MenuProps={{
                      sx: {
                        "& .MuiMenuItem-root": {
                          fontSize: "0.9em",
                        },
                      },
                    }}
                  >
                    {/* <MenuItem value={""}>مشاهده‌ی همه</MenuItem> */}
                    <MenuItem value={""}>
                      <Checkbox checked={status.indexOf("") > -1} />
                      <ListItemText primary={"مشاهده‌ی همه"} />
                    </MenuItem>

                    {Object.keys(VISIT_STATUS_TEXT).map((item) => {
                      return (
                        // <MenuItem value={item}>{VISIT_STATUS_TEXT[item]}</MenuItem>
                        <MenuItem key={item} value={item}>
                          <Checkbox checked={status.indexOf(item) > -1} />
                          <ListItemText primary={VISIT_STATUS_TEXT[item]} />
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <Divider variant="inset"></Divider>
              </Box>
              <Box className="flex gap-2 my-4">
                <Button
                  onClick={() => {
                    setSearch("");
                    setStatus([""]);
                    setStart();
                    setEnd();
                    setOpenModal(false);
                  }}
                  variant="outlined"
                  color="error"
                  className="flex-grow"
                >
                  حذف فیلترها
                </Button>
                <Button
                  onClick={() => {
                    setOpenModal(false);
                  }}
                  autoFocus
                  variant="contained"
                  className="flex-grow"
                >
                  اعمال
                </Button>
              </Box>
            </DialogContent>
            {/* <DialogActions>
            </DialogActions> */}
          </Dialog>
        </div>

        <div className="hidden md:flex flex-wrap gap-2">
          {/* datepicker */}
          <RangeDatePicker
            start={start}
            end={end}
            setStart={setStart}
            setEnd={setEnd}
          />
          {/* Filters */}
          <FormControl size="small">
            <InputLabel id="demo-simple-select-label" shrink>
              وضعیت
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status || ""}
              label="وضعیت"
              // onChange={(e) => setStatus(e.target.value)}
              onChange={(e) => {
                //get value from e.target
                const {
                  target: { value },
                } = e; // e.target.value
                const newStatus =
                  typeof value === "string" ? value.split(",") : value;
                setStatus((prevStatus) => {
                  if (
                    newStatus.indexOf("") > -1 &&
                    prevStatus.indexOf("") === -1
                  ) {
                    return [""];
                  } else if (newStatus.length === 1) {
                    return newStatus;
                  } else if (newStatus.length === 0) {
                    return [""];
                  } else {
                    return newStatus.filter((item) => item !== "");
                  }
                });
              }}
              renderValue={(selected) =>
                selected
                  .map((item) => VISIT_STATUS_TEXT[item] || "مشاهده‌ی همه")
                  .join(", ")
              }
              // renderValue={(selected) => (
              //   <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              //     {selected.map((value) => (
              //       <Chip key={value} label={VISIT_STATUS_TEXT[value] || "مشاهده‌ی همه"} color={VISIT_STATUS_COLOR[value] || 'default'} sx={{
              //         '& .MuiChip-label': {
              //           fontSize: '0.875em'
              //         }
              //       }}/>
              //     ))}
              //   </Box>
              // )}
              // Default(select all)
              displayEmpty
              // Multiselect
              multiple
              // size select
              size="small"
              //fontSize
              sx={{
                "& .MuiSelect-select": {
                  fontSize: "0.875em",
                },
              }}
              InputProps={{
                size: "small",
              }}
              MenuProps={{
                sx: {
                  "& .MuiMenuItem-root": {
                    fontSize: "0.9em",
                  },
                },
              }}
            >
              {/* <MenuItem value={""}>مشاهده‌ی همه</MenuItem> */}
              <MenuItem value={""}>
                <Checkbox checked={status.indexOf("") > -1} />
                <ListItemText primary={"مشاهده‌ی همه"} />
              </MenuItem>

              {Object.keys(VISIT_STATUS_TEXT).map((item) => {
                return (
                  // <MenuItem value={item}>{VISIT_STATUS_TEXT[item]}</MenuItem>
                  <MenuItem key={item} value={item}>
                    <Checkbox checked={status.indexOf(item) > -1} />
                    <ListItemText primary={VISIT_STATUS_TEXT[item]} />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </div>
      {/* Table */}
      <TableContainer
        component={Paper}
        variant="outlined"
        className="border-0 md:border md:rounded-3xl md:border-t-0"
      >
        <Table>
          <TableHead className="hidden md:table-header-group">
            <TableRow>
              <StyledTableCell align="center">ردیف</StyledTableCell>
              <CustomTableSortLabel
                order={order}
                orderBy={orderBy}
                id={"created_at"}
                onClick={() => handleSort("created_at")}
              >
                تاریخ
              </CustomTableSortLabel>
              <CustomTableSortLabel
                order={order}
                orderBy={orderBy}
                id={"doctor__last_name"}
                onClick={() => handleSort("doctor__last_name")}
              >
                نام دکتر
              </CustomTableSortLabel>
              <StyledTableCell align="center">پزشک</StyledTableCell>
              <CustomTableSortLabel
                order={order}
                orderBy={orderBy}
                id={"id"}
                onClick={() => handleSort("id")}
              >
                شماره ویزیت
              </CustomTableSortLabel>
              <CustomTableSortLabel
                order={order}
                orderBy={orderBy}
                id={"status"}
                onClick={() => handleSort("status")}
              >
                وضعیت
              </CustomTableSortLabel>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visits?.map((row, index) => (
              <StyledTableRow
                className="grid grid-cols-12 gap-2 md:table-row"
                key={row.name}
              >
                {/* image show on mobile */}
                <StyledTableCell
                  className="order-first col-span-3 row-span-2 relative md:hidden"
                  align="center"
                >
                  <Image
                    layout="fill"
                    objectFit="contain"
                    src={row.image ?? "/defaultDoctorPic/doctor.jpeg"}
                    objectPosition="center"
                  />
                </StyledTableCell>

                <StyledTableCell
                  className="hidden md:table-cell "
                  align="center"
                >
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell
                  className="order-4 col-span-5 text-textGray md:text-black "
                  align="center"
                >
                  <CalendarMonthIcon className="mx-2 my-auto align-middle text-sm" />
                  {convertStrToJalali(row.created_at)}
                </StyledTableCell>
                <StyledTableCell className="order-1 col-span-4" align="center">
                  {row.doctor.first_name} {row.doctor.last_name}
                </StyledTableCell>
                <StyledTableCell
                  className="order-3 col-span-4 text-textGray md:text-black"
                  align="center"
                >
                  {row.doctor.department.faname}
                </StyledTableCell>
                <StyledTableCell
                  className="hidden md:table-cell"
                  align="center"
                >
                  {row.id}
                </StyledTableCell>
                <StyledTableCell className="order-2 col-span-5" align="center">
                  <Chip
                    variant="status"
                    label={VISIT_STATUS_TEXT[row.status]}
                    color={VISIT_STATUS_COLOR[row.status]}
                  ></Chip>
                </StyledTableCell>
                <StyledTableCell
                  className="hidden md:table-cell"
                  align="center"
                >
                  <ArrowBackIos color="backgroundGray" />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* pagination */}
      <div className="flex justify-end my-4">
        <Pagination
          count={number_of_pages}
          page={current_page}
          onChange={(e, val) => setOffset((val - 1) * LIMIT)}
          variant="outlined"
          color="primary"
        />
      </div>
    </div>
  );
};
Visits.getLayout = (page) => {
  return <Navigation>{page}</Navigation>;
};
export default Visits;
