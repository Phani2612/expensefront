import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice from './slice/userslice.jsx';
import ExpenseSlice from './slice/expenseslice.jsx'
import IncomeSlice from './slice/incomeslice.jsx';
const rootReducer = combineReducers({
  user: userSlice,
  expense : ExpenseSlice,
  income : IncomeSlice
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
