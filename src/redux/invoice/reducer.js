const initialState = {
  invoices: []
};

export default function applicationReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case 'GET_INVOICES': 
      const new_state = { ...state, invoices: payload };
      console.log('payload',payload)
      return new_state;
    default:
      return state;
  }
}
