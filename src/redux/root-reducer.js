import { combineReducers } from 'redux';
import authReducer from './authentication/reducer'
import invoiceReducer from './invoice/reducer'; 

export default combineReducers({ 
  auth: authReducer, 
  invoice: invoiceReducer,
});