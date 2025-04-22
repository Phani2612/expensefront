import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import dayjs from 'dayjs';
import {
  deleteIncome,
  FilterIncome,
  getAllIncomes,
} from '../../redux/slice/incomeslice';
import { toast } from 'react-toastify';
import { MyBox } from '../../context/Mybox';
import { useContext, useState } from 'react';
import { MenuItem, Menu } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Type',
  },
  {
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: 'Title',
  },
  {
    id: 'amount',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
  },
  {
    id: 'category',
    numeric: false,
    disablePadding: false,
    label: 'Category',
  },

  {
    id: 'payment',
    numeric: false,
    disablePadding: false,
    label: 'Payment',
  },

  {
    id: 'notes',
    numeric: false,
    disablePadding: false,
    label: 'Notes',
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Action',
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, itemSelected, filterTimeline, clearFilters } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [subMenuAnchorEl, setSubMenuAnchorEl] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [showclear, setshowclear] = useState(false);

  const currentYear = new Date().getFullYear();
  const yearOptions = [currentYear, currentYear - 1, currentYear - 2]; // Dynamic year list
  const monthOptions = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setAnchorEl(null);
    setSubMenuAnchorEl(anchorEl);
    setshowclear(true);
  };

  const handleValueSelect = (value) => {
    filterTimeline({ type: selectedType, value: value });
    setSubMenuAnchorEl(null);
    setSelectedType(null);
  };

  const handleClearFilters = () => {
    // Call the `clearFilters` function passed from the parent component
    clearFilters();
    setSelectedType(null);
    setSubMenuAnchorEl(null);
    setshowclear(false);
  };

  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Income
        </Typography>
      )}
      {numSelected > 0 ? (
        <div className="flex">
          <Tooltip title="Delete">
            <IconButton onClick={() => DeleteItem(itemSelected)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      ) : (
        <>
          <Tooltip title="Filter list">
            <IconButton onClick={handleClick}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => handleTypeSelect('Week')}>Weekly</MenuItem>
            <MenuItem onClick={() => handleTypeSelect('Month')}>
              Monthly
            </MenuItem>
            <MenuItem onClick={() => handleTypeSelect('Year')}>Yearly</MenuItem>
          </Menu>

          {/* Sub Menu for Year / Month / Date selection */}
          <Menu
            anchorEl={subMenuAnchorEl}
            open={Boolean(subMenuAnchorEl)}
            onClose={() => setSubMenuAnchorEl(null)}
          >
            {selectedType === 'Year' &&
              yearOptions.map((year) => (
                <MenuItem
                  key={year}
                  onClick={() => handleValueSelect(`${year}`)}
                >
                  {year}
                </MenuItem>
              ))}

            {selectedType === 'Month' &&
              monthOptions.map((month, index) => (
                <MenuItem
                  key={month}
                  onClick={() =>
                    handleValueSelect(`${currentYear}-${index + 1}`)
                  }
                >
                  {month}
                </MenuItem>
              ))}

            {selectedType === 'Week' && (
              <MenuItem
                onClick={() =>
                  handleValueSelect(new Date().toISOString().split('T')[0])
                }
              >
                Current Week (Auto Picks Today's Date)
              </MenuItem>
            )}
          </Menu>

          {showclear && (
            <Tooltip title="Clear Filters">
              <IconButton onClick={handleClearFilters}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          )}
        </>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function IncomeTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('amount');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [localRows, setLocalRows] = React.useState([]);

  const dispatch = useDispatch();

  const rows = useSelector((output) => {
    return output.income.income.data;
  });

  if (!rows) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  const Data = useContext(MyBox);

  if (!Data) {
    return null;
  }

  const { updateIncomeItem, userData } = Data;

  React.useEffect(() => {
    setLocalRows(rows || []);
  }, [rows]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);

    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [rows, order, orderBy, page, rowsPerPage]
  );

  const UpdateItem = async (data) => {
    updateIncomeItem(data);
  };

  const DeleteItem = async (data) => {
    // setLocalRows(prev => prev.filter(item => item._id !== data));  // immediate UI feedback
    const apiResult = await dispatch(deleteIncome(data));
    if (deleteIncome.fulfilled.match(apiResult)) {
      toast.success('Successfully deleted');
    } else {
      const errorMessage = apiResult?.payload || 'Something went wrong';

      toast.error(errorMessage);
      setLocalRows(rows); // rollback to original if error
    }
  };

  const FilterByTimeline = async (data) => {
    const newData = {
      user_id: userData._id,
      type: data.type,
      value: data.value,
    };
    const apiResult = await dispatch(FilterIncome(newData));
    if (FilterIncome.fulfilled.match(apiResult)) {
    } else {
      const errorMessage = apiResult?.payload || 'Something went wrong';

      toast.error(errorMessage);
    }
  };

  const cleanFIlterItems = async () => {
    await dispatch(getAllIncomes(userData));
  };

  return (
    <div className="bg-gray-50 ">
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2, boxShadow: 4, borderRadius: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            itemSelected={selected}
            filterTimeline={FilterByTimeline}
            clearFilters={cleanFIlterItems}
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = selected.includes(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': { backgroundColor: '#f0f4ff' },
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {dayjs(row.date).format('MMMM D, YYYY')}{' '}
                        {/* Correct format */}
                      </TableCell>

                      <TableCell>{row.type}</TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.amount}</TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell>{row.payment}</TableCell>
                      <TableCell>{row.notes}</TableCell>
                      <TableCell>
                        <Tooltip
                          title="Delete"
                          onClick={() => DeleteItem(row._id)}
                        >
                          <IconButton>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Update" onClick={() => UpdateItem(row)}>
                          <IconButton>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            className="p-3"
            label="Dense padding"
          />
        </Paper>
      </Box>
    </div>
  );
}
