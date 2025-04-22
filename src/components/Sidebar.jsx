import { useState, createContext, useContext } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
  AttachMoney,
  MoneyOff,
  Search,
  InsertChart,
  Download,
} from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import ExpenseForm from './forms/ExpenseForm';
import { MyBox } from '../context/Mybox.jsx';
import DescriptionIcon from '@mui/icons-material/Description';
import { useSelector } from 'react-redux';
import {
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import Papa from 'papaparse';
import jsPDF from 'jspdf';

const Sidebar = () => {
  const [open, setopen] = useState(false);
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);

  const context = useContext(MyBox);

  const ExpenseData = useSelector((output) => {
    return output.expense?.expense?.data || [];
  });

  const IncomeData = useSelector((output) => {
    return output.income?.income?.data || [];
  });

  if (!ExpenseData || !IncomeData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  const Navigate = useNavigate();

  if (!context) {
    return null; // or show a fallback UI
  }

  const { setShowExpense, setShowIncome } = context;

  const toggleDrawer = (newOpen) => () => {
    setopen(newOpen);
  };

  const TextandIcondata = {
    'Add Expense': <AttachMoney />,
    'Add Income': <MoneyOff />,
    'Expense report': <DescriptionIcon />,
    'Income report': <DescriptionIcon />,
    Graph: <InsertChart />,
    Download: <Download />,
  };

  const actionMap = {
    'Add Expense': () => setShowExpense(true),
    'Add Income': () => setShowIncome(true),
    Graph: () => Navigate('/dashboard/graph'),
    'Expense report': () => Navigate('/dashboard/expense'),
    'Income report': () => Navigate('/dashboard/income'),
    Download: () => setDownloadDialogOpen(true),
  };

  const checkItem = (key) => {
    const action = actionMap[key];
    if (action) action();
  };

  const downloadCSV = (expenseData, incomeData) => {
    const expenseCsv = Papa.unparse({
      fields: Object.keys(expenseData[0] || {}),
      data: expenseData.map(Object.values),
    });

    const incomeCsv = Papa.unparse({
      fields: Object.keys(incomeData[0] || {}),
      data: incomeData.map(Object.values),
    });

    const combinedCsv = `Expense Data\n${expenseCsv}\n\nIncome Data\n${incomeCsv}`;

    const blob = new Blob([combinedCsv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'Expense_and_Income.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadPDF = (expenseData, incomeData) => {
    const doc = new jsPDF();
    doc.text('Expense Data', 10, 10);
    expenseData.forEach((item, index) => {
      doc.text(JSON.stringify(item), 10, 20 + index * 10);
    });
    let yOffset = 20 + expenseData.length * 10 + 10;
    doc.text('Income Data', 10, yOffset);
    incomeData.forEach((item, index) => {
      doc.text(JSON.stringify(item), 10, yOffset + 10 + index * 10);
    });
    doc.save('Expense_and_Income.pdf');
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {Object.entries(TextandIcondata).map(([key, value], index) => {
          return (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => checkItem(key)}>
                <ListItemIcon>{value}</ListItemIcon>
                <ListItemText primary={key} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <div className="sm:hidden">
        <List>
          {[
            ['Dashboard', <DashboardIcon />],
            ['Profile', <AccountCircle />],
            ['Settings', <SettingsIcon />],
          ].map(([text, value], index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>{value}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    </Box>
  );
  return (
    <div>
      <Dialog
        open={downloadDialogOpen}
        onClose={() => setDownloadDialogOpen(false)}
      >
        <DialogTitle>Select Download Format</DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              downloadCSV(ExpenseData, IncomeData);
              setDownloadDialogOpen(false);
            }}
          >
            Download as CSV
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              downloadPDF(ExpenseData, IncomeData);
              setDownloadDialogOpen(false);
            }}
          >
            Download as PDF
          </Button>
        </DialogActions>
      </Dialog>

      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default Sidebar;
