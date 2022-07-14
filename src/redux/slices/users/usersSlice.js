import {createSlice} from '@reduxjs/toolkit';
import {GetUsers_Service} from './services';

const initialState = {
  status_users: '',
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setDefaultUsers: state => {
      state.status_users = '';
      state.users = '';
    },
  },
  extraReducers: {
    [GetUsers_Service.pending]: state => {
      state.status_users = 'loading';
    },
    [GetUsers_Service.fulfilled]: (state, {payload}) => {
      state.status_users = 'success';
      state.users = payload.data.users;
    },
    [GetUsers_Service.rejected]: state => {
      state.status_users = 'failed';
    },
  },
});
export const {setDefaultUsers} = usersSlice.actions;

export const setDefaultUsers_Action = () => dispatch => {
  dispatch(setDefaultUsers());
};

export default usersSlice.reducer;
