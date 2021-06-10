import { post, get, deleteAPI, put } from '../store';
import { message } from 'antd';

const api = (store) => (next) => async (action) => {
  let response;
  const token = store.getState()?.auth?.token;
  switch (action.type) {
    case 'GET_INVOICES':
      response = await get('/invoice/all', token); 
      action.payload = response?.data;
      return next(action);
    case 'ADD_INVOICE':
      response = await post('/invoice', action.payload, token);
      if (response.success) message.success('Successful!');
      return next(action); 
    case 'EDIT_INVOICE':
      response = await put('/invoice/'+action.payload.id, action.payload, token);
      if (response.success) message.success('Successful!');
      return next(action);
    case 'DELETE_INVOICE':
      response = await deleteAPI('/invoice/'+action.payload.id, action.payload, token);
      if (response.success) message.success('Successful!');
      return next(action);
    default:
      return next(action);
  }
};

export default api;
