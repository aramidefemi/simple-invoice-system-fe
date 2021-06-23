const initialState = {
  invoices: [],
  invoice: {},
  stats: []
};

export default function applicationReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case 'GET_INVOICES': 
      const new_state = { ...state, invoices: payload };
      return new_state;
    case 'GET_INVOICE': 
      const GET_INVOICE = { ...state, invoice: payload };
      return GET_INVOICE;
    case 'GET_PAYMENT_STATS':  
      const GET_PAYMENT_STATS = { ...state, stats: payload }; 
      return GET_PAYMENT_STATS;
    default:
      return state;
  }
}
