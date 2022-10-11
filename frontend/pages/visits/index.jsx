import {
  Chip,
  InputAdornment,
  Paper,
  Table,
  TableHead,
  TableRow,
  tableRowClasses,
  TableSortLabel,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Navigation from "../../components/navigation/Navigation";
import TableContainer from "@mui/material/TableContainer";
import { ArrowBackIos } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadVisitsPatient } from "../../lib/slices/visits";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import SearchIcon from '@mui/icons-material/Search';
import Select from "@mui/material/Select";

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
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  [`&.${tableRowClasses.head}`]: {
    borderTop: 0,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
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
const Visits = () => {
  //ordering
     //desc or asc
  const [order, setOrder] = useState("desc");
     //which column is active
  const [orderBy, setOrderBy] = useState("created_at");
  //search
  const [search,setSearch]= useState("");
  // filters
  const [status, setStatus] = useState("");

  //redux
  const visits = useSelector((state) => state.visitReducer?.visits);
  const patient = useSelector((state) => state.patientReducer?.patient);
  const dispatch = useDispatch();

  const lstVisits = async () => {
    try {
      await dispatch(
        loadVisitsPatient({
          // url params
          patient_id: patient.id,
          // queryparam-> backend: state
          //ordering
          ordering: `${order === "asc" ? "" : "-"}${orderBy}`,
          //filter
          status: status || undefined,
          //search
          search,
        })
      ).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    lstVisits();
  }, [patient, orderBy, order, status, search]);
  // ordering
  const handleSort = (col) => {
    if (orderBy === col) {
      setOrder((order) => (order === "desc" ? "asc" : "desc"));
    } else {
      setOrderBy(col);
      setOrder("asc");
    }
  };

  return (
    <div className="flex flex-col p-8">
      <div className="flex justify-between my-2 items-center">
        <div>{/* Search */}
        <TextField
        label="جستجو"
        value ={search}
        onChange={(e)=>setSearch(e.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
        }}
        size="small"
       />
        
        </div>
        <div className="flex">
          {/* Filters */}
          <FormControl>
            <InputLabel id="demo-simple-select-label" shrink>
              وضعیت
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status || ""}
              label="وضعیت"
              onChange={(e) => setStatus(e.target.value)}
              displayEmpty
              // size select
              size="small"
              //fontSize
              sx={{
                '& .MuiSelect-select': {
                  fontSize: '0.9em'
                },
              }}
              MenuProps={{
                sx: {
                  '& .MuiMenuItem-root': {
                    fontSize: '0.9em',
                  }
                }
              }}
            >
              <MenuItem value={""}>مشاهده‌ی همه</MenuItem>

              {Object.keys(VISIT_STATUS_TEXT).map((item) => {
                return (
                  <MenuItem value={item}>{VISIT_STATUS_TEXT[item]}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </div>
      <TableContainer
        component={Paper}
        variant="outlined"
        className="rounded-3xl border-t-0"
      >
        <Table>
          <TableHead>
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
              <StyledTableRow key={row.name}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell align="center">
                  {" "}
                  {row.created_at}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.doctor.first_name} {row.doctor.last_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.doctor.department.faname}
                </StyledTableCell>
                <StyledTableCell align="center">{row.id}</StyledTableCell>
                <StyledTableCell align="center">
                  <Chip
                    variant="status"
                    label={VISIT_STATUS_TEXT[row.status]}
                    color={VISIT_STATUS_COLOR[row.status]}
                  ></Chip>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <ArrowBackIos color="backgroundGray" />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
Visits.getLayout = (page) => {
  return <Navigation>{page}</Navigation>;
};
export default Visits;
