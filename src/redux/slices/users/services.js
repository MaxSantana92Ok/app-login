import {createAsyncThunk} from '@reduxjs/toolkit';
import API from '../../../helpers/axiosInstance';

export const GetUsers_Service = createAsyncThunk('users/getUsers_service', async token => {
  try {
    const response = await API({
      method: 'get',
      url: `/users`,
      headers: {Authorization: 'Bearer ' + token},
    });
    return response;
  } catch {
    return 'error';
  }
});
