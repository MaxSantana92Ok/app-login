import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data_alert: {open: false, duration: 6000, message: '', severity: 'info'},
};

export const interfaceSlice = createSlice({
  name: 'interface',
  initialState,
  reducers: {
    setAlertOpen: (state, {payload}) => {
      state.data_alert = {
        ...state.data_alert,
        open: true,
        severity: payload.severity,
        message: payload.message,
      };
    },
    setAlertClose: state => {
      state.data_alert = {
        ...state.data_alert,
        open: false,
        severity: state.data_alert.severity,
        message: state.data_alert.message,
      };
    },
  },
});
export const {setDefaultUsers, setAlertOpen, setAlertClose} = interfaceSlice.actions;

export const setAlertOpen_Action = data => dispatch => {
  console.log(data);
  dispatch(setAlertOpen(data));
};

export const setAlertClose_Action = () => dispatch => {
  dispatch(setAlertClose());
};

export default interfaceSlice.reducer;
