// MyBox.js
import { createContext, useState , useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getUser } from '../redux/slice/userslice';
export const MyBox = createContext();

export const MyBoxProvider = ({ children }) => {
  const [datafrom, setDataFrom] = useState(null);
  const [showExpense, setShowExpense] = useState(false);
  const [showIncome, setShowIncome] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [userData, setUserData] = useState(null);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [disabled , setdisabled] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (currentUser) {
      setUserData(currentUser.data.user); // Update state when Redux data is available
    }
  }, [currentUser]);

 

  const updateItem = (data) => {
    /* logic here */
    setShowExpense(true)
    setDataFrom(data)
  };
  const updateIncomeItem = (data) => {
    /* logic here */
    setShowIncome(true)
    setDataFrom(data)
  };

  const ViewItem = (view , data)=>{

    setdisabled(true)

    if(view === 'expense'){
      setShowExpense(true)
      setDataFrom(data)
    }

    else{
      setShowIncome(true)
      setDataFrom(data)
    }
  }




  return (
    <MyBox.Provider
      value={{
        datafrom,
        setDataFrom,
        showExpense,
        setShowExpense,
        showIncome,
        setShowIncome,
        updateItem,
        updateIncomeItem,
        userData,
        totalExpense,
        setTotalExpense,
        totalIncome,
        setTotalIncome,
        disabled , 
        setdisabled,
        ViewItem,
        setUserData,
        
      }}
    >
      {children}
    </MyBox.Provider>
  );
};

