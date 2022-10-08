import { Table, TableHead, TableRow } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({

}));

const Visits = ()=>{
  return(
    <div className="flex flex-col">
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
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
             
            </StyledTableRow>
          ))}
        </TableBody>
     </Table>
    </div>
  )
}
export default Visits;