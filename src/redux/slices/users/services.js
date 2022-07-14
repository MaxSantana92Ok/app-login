import {createAsyncThunk} from '@reduxjs/toolkit';
import API from '../../../helpers/axiosInstance';

export const GetUsers_Service = createAsyncThunk('users/getUsers_service', async token => {
  /* return API({
    method: 'get',
    url: `/users`,
    headers: {Authorization: 'Bearer ' + token},
  })
    .then(resp => {
      return resp;
    })
    .catch(error => {
      console.log(error);
    }); */
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
