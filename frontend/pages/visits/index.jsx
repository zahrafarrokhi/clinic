import { Paper, Table, TableHead, TableRow } from "@mui/material";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Navigation from "../../components/navigation/Navigation";
import TableContainer from '@mui/material/TableContainer';
import { ArrowBackIos } from "@mui/icons-material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({

  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.backgroundGray.main,
    fontSize: 16,
    fontWeight:"bold"
    // color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
   
    fontSize: 14,
    fontWeight:"bold"
  },
  

}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
 
}));

const Visits = ()=>{
  return(
    <div className="flex flex-col p-8">
       <TableContainer component={Paper} variant="outlined">
     <Table>

     <TableHead>
          <TableRow>
            
            <StyledTableCell align="center">ردیف</StyledTableCell>
            <StyledTableCell align="center"> تاریخ</StyledTableCell>
            <StyledTableCell align="center">نام دکتر</StyledTableCell>
            <StyledTableCell align="center">پزشک</StyledTableCell>
            <StyledTableCell align="center">شماره ویزیت</StyledTableCell>
            <StyledTableCell align="center">وضعیت</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {[0,1,2,3].map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="center">1</StyledTableCell>
            <StyledTableCell align="center"> 1400-12-12</StyledTableCell>
            <StyledTableCell align="center">نام دکتر</StyledTableCell>
            <StyledTableCell align="center">پزشک</StyledTableCell>
            <StyledTableCell align="center">شماره ویزیت</StyledTableCell>
            <StyledTableCell align="center"> پاسخ داده شده</StyledTableCell>
            <StyledTableCell align="center"><ArrowBackIos color="backgroundGray"/></StyledTableCell>
             
            </StyledTableRow>
          ))}
        </TableBody>
        </Table>
        </TableContainer>
    </div>
  )
}
Visits.getLayout = (page) => {
  return <Navigation>{page}</Navigation>;
};
export default Visits;