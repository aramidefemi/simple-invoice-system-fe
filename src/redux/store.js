import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './root-reducer';
import auth from './authentication/api';
import invoice from './invoice/api';  
import axios from 'axios';
import { message } from 'antd';

export const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

export const errorNotification = (error) => {
  message.error(error)
};
const local = 'http://localhost:4000';


const handleError = (e) => {
  console.error(e.message)
  console.error(e)
  if (e.response) {
    // Request made and server responded
    console.log(e.response.data);
    console.log(e.response.status);
    console.log(e.response.headers);
    message.error(e?.response?.data?.error || `An error occurred, please try again.`);
  } else if (e.request) {
    // The request was made but no response was received
    console.log(e.request);
    message.error(`A ${e.message} occurred with our servers, please try again in 5 minutes`);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', e.message);
    message.error(e?.response?.data?.error || 'An error occurred please try again in 5 minutes');
  } 
} 
export const post = async (url, body, token) => {
  try {
    const response = await axios.post(local + url, body, {
      headers: {
        Authorization: 'Bearer ' + token, //the token is a variable which holds the token
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    handleError(error)
    return { success: false };
  }
};
 
export const put = async (url, body, token) => {
  try {
    const response = await axios.put(local + url, body, {
      headers: {
        Authorization: 'Bearer ' + token, //the token is a variable which holds the token
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    handleError(error)
    return { success: false };
  }
};
export const deleteAPI = async (url,  token) => {
  try {
    const response = await axios.delete(local + url, {
      headers: {
        Authorization: 'Bearer ' + token, //the token is a variable which holds the token
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    handleError(error)
    return { success: false };
  }
};

export const get = async (url, token = null) => {
  try {
    const response = await axios.get(local + url, {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + token, //the token is a variable which holds the token
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    handleError(error)
    return { success: false };
  }
};



const initialstate = {};

const middleware = [thunk, logger, auth, invoice];
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : (f) => f;

export const store = createStore(
  rootReducer,
  initialstate,
  compose(applyMiddleware(...middleware), devTools)
);
