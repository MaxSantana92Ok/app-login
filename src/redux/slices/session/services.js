import {createAsyncThunk} from '@reduxjs/toolkit';
import API from '../../../helpers/axiosInstance';

// SERVICIO PARA OBTENER TOKEN DEL SERVICIO
export const LogIn_Service = createAsyncThunk(
  // URL del thunk
  'session/LogIn_Service',
  // Callback function
  async (post, thunkAPI) => {
    let response = '';
    if (post.email === 'tom.manchini@yopmail.com') {
      if (post.password === '1234') {
        try {
          response = await API({
            method: 'post',
            url: `/login`,
            data: {username: post.email, password: post.password},
          });
          let auxToken = {
            info: response.data.access_token,
            /* expires: Date.now() + 3600 * 1000, */
            expires: Date.now(),
          };
          thunkAPI.dispatch(PostTokenIntoStorage(auxToken));

          return {info: response};
        } catch {
          if (!response) {
            return {info: {status: 0}};
          }
        }
      } else {
        return {info: {status: 401}};
      }
    } else {
      return {info: {status: 404}};
    }
  }
);

export const Refresh_Service = createAsyncThunk(
  // URL del thunk
  'session/Refresh_Service',
  // Callback function
  async type => {
    let response = '';
    try {
      response = await API({
        method: 'post',
        url: `/login`,
        data: {username: 'tom.manchini@yopmail.com', password: '1234'},
      });

      if (type === 'token') {
        auxToken = {info: response.acces, expires: new Date(Date.now() + 3600 * 1000)};
        localStorage.setItem('token', JSON.stringify(auxToken));
      }

      return {info: response};
    } catch {
      if (!response) {
        return {info: {status: 0}};
      }
    }
  }
);

// SERVICIO PARA OBTENER TOKEN DEL STORAGE
/* export const GetTokenFromStorage = createAsyncThunk(
  'token/getTokenFromStorage',
   async () => {
    const resp = JSON.parse(localStorage.getItem('token'));
    return resp.value;
  }
); */

// SERVICIO PARA GUARDAR TOKEN EN EL STORAGE
export const PostTokenIntoStorage = createAsyncThunk('token/saveTokenIntoStorage', async post => {
  localStorage.setItem('token', JSON.stringify(post));
});
//SERVICIO PARA ELIMINAR TOKEN DE STORAGE
export const DeleteTokenAndLogOut = createAsyncThunk('token/deleteTokenAndLogOut', async post => {
  let res = await avt.storage.user.delete({
    id: USER_ID,
    keys: ['tokenAgrow'],
  });
  if (res.result === 'success') {
    return {ok: true, status: res.info.code};
  } else {
    return {ok: false, status: res.info.code};
  }
});
