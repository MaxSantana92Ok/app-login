import {createSlice} from '@reduxjs/toolkit';
import {LogIn_Service /* GetTokenFromStorage */ /* , DeleteTokenAndLogOut */} from './services';

const initialState = {
  serviceToken: '',
  expiracion: '',
  refreshToken: '',
  tokenType: '',
  user: {
    username: '',
    name: '',
    lastname: '',
    roles: [],
  },
  loading: false,
  error: {
    isError: false,
    isEmail: false,
    isPassword: false,
    mensaje: '',
  },
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setDefaultErrorGetToken: state => {},
    DeleteTokenAndLogOut: state => {
      state.serviceToken = '';
      state.expiracion = '';
      state.refreshToken = '';
      state.tokenType = '';
    },
  },
  extraReducers: {
    [LogIn_Service.pending]: state => {
      state.loading = true;
      state.error = {
        isError: false,
        isEmail: false,
        isPassword: false,
        mensaje: '',
      };
    },

    [LogIn_Service.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.info.status !== 200) {
        if (action.payload.info.status === 404) {
          state.error.isEmail = true;
          state.error.mensaje = 'Verifique su email o contraseña.';
        }
        if (action.payload.info.status === 401) {
          state.error.isPassword = true;
          state.error.isEmail = true;
          state.error.mensaje = 'Verifique su email o contraseña.';
        }
        if (action.payload.info.status === 0) {
          state.error.isError = true;
          state.error.mensaje = 'No hay conexión, verifique su red.';
        }
      } else {
        state.serviceToken = action.payload.info.data.access_token;
        state.expiracion = action.payload.info.data.expires_in;
        state.refreshToken = action.payload.info.data.refresh_token;
        state.tokenType = action.payload.info.data.token_type;
        state.user = {
          username: action.payload.info.data.username,
          name: action.payload.info.data.name,
          lastname: action.payload.info.data.lastname,
          roles: action.payload.info.data.roles,
        };
      }
    },

    [LogIn_Service.rejected]: (state, action) => {
      state.loading = false;
    },

    /* GET TOKEN FROM STORAGE*/
    /* [GetTokenFromStorage.pending]: state => {},
    [GetTokenFromStorage.fulfilled]: (state, {payload}) => {
      console.log(payload);
      state.serviceToken = payload.token;
      state.refreshToken = payload.refresh;
      state.expiracion = payload.expires;
      state.tokenType = payload.type;
      state.loading = false;
    },
    [GetTokenFromStorage.rejected]: (state, action) => {
      state.loading = false;
    }, */
    /* [DeleteTokenAndLogOut.fulfilled]: (state, action) => {
      if (action.payload.ok) {
        state.serviceToken = '';
        state.expiracion = '';
      } else {
        state.error = action.payload.message;
      }
    }, */
  },
});
export const {setDefaultErrorGetToken, DeleteTokenAndLogOut} = sessionSlice.actions;

export const setDefaultErrorGetToken_Action = () => dispatch => {
  dispatch(setDefaultErrorGetToken());
};
export const DeleteTokenAndLogOut_Action = () => dispatch => {
  dispatch(DeleteTokenAndLogOut());
};
export default sessionSlice.reducer;
