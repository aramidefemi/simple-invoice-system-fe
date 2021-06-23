import { post, get, deleteAPI, put } from '../store';
import { message } from 'antd';

const api = (store) => (next) => async (action) => {
  let response;
  console.log('store',store)
  const token = store.getState()?.auth?.token;
  switch (action.type) {
    case 'GET_INVOICE':
      response = await get(action.payload, token); 
      action.payload = response?.data;
      return next(action);
    case 'GET_INVOICES':
      response = await get('/invoice/all', token); 
      action.payload = response?.data;
      return next(action);
    case 'GET_PAYMENT_STATS':
      response = await get('/invoice/payment/stats', token); 
      action.payload = response?.data;
      return next(action);
    case 'ADD_INVOICE':
      action.payload.status = 'pending';
      response = await post('/invoice', action.payload, token);
      if (response.success) message.success('Successful!');
      action.type = 'GET_INVOICES'
      store.dispatch(action)
      return
    case 'EDIT_INVOICE':
      response = await put('/invoice/'+action.payload.id, action.payload, token);
      if (response.success) message.success('Successful!');
      return next(action);
    case 'DELETE_INVOICE':
      response = await deleteAPI('/invoice/'+action.payload, token);
      if (response.success) message.success('Successful!');
      action.type = 'GET_INVOICES'
      store.dispatch(action)
      return;
    default:
      return next(action);
  }
};

export default api;
