const initialState = {
  invoices: [],
  invoice: {}
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
    default:
      return state;
  }
}
