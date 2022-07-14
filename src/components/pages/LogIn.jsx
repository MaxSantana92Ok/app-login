import {useFormik} from 'formik';
import * as yup from 'yup';
import {Box, Collapse, IconButton, InputLabel, TextField, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {LayaoutItem} from '../atoms/Layaout/Layaout';
import {LogIn_Service} from '../../redux/slices/session/services';
import LoadingButton from '@mui/lab/LoadingButton';
/* import {setDefaultErrorGetToken_Action} from '../../redux/slices/token/tokenSlice'; */
import {Visibility, VisibilityOff} from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';

// Validation shcema para formik
const validationSchema = yup.object({
  email: yup.string('Ingresá tu email.').required('*Ingrese la información solicitada.'),
  password: yup.string('Ingresá tu contraseña').required('*Ingrese la información solicitada.'),
});

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const inputPassword = useRef();

  const {serviceToken, loading, error} = useSelector(state => state.session);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      handleSubmit(values);
    },
  });

  const handleSubmit = values => {
    let post = {
      password: values.password,
      email: values.email,
    };
    dispatch(LogIn_Service(post));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    inputPassword.current.focus();
  };

  useLayoutEffect(() => {
    return () => {};
  }, [error.isEmail, error.isPassword]);

  useEffect(() => {
    if (serviceToken) {
      navigate('/', {replace: true});
    }
    return () => {
      /* dispatch(setDefaultErrorGetToken_Action()); */
    };
  }, [serviceToken]);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        formik.handleSubmit(e);
      }}
    >
      <LayaoutItem>
        <Box mb={3} mt={2} width="100%">
          <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
          <TextField
            fullWidth
            id="email"
            variant="outlined"
            name="email"
            type="email"
            placeholder="Ingrese su email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={
              (formik.touched.email && Boolean(formik.errors.email)) ||
              error.isPassword ||
              error.isEmail
            }
            helperText={formik.touched.email && formik.errors.email}
          />

          <Box mt={3}>
            <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
              <InputLabel htmlFor="input-with-icon-adornment">Contraseña</InputLabel>
              <IconButton onClick={handleShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Box>
            <TextField
              ref={inputPassword}
              fullWidth
              id="password"
              placeholder="Ingrese su contraseña"
              variant="outlined"
              name="password"
              autoComplete="off"
              type={showPassword ? 'text' : 'password'}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={
                (formik.touched.password && Boolean(formik.errors.password)) ||
                error.isPassword ||
                error.isEmail
              }
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>
          <Collapse in={error.isEmail || error.isPassword || error.isError}>
            <Box width="100%" mt={1}>
              <Typography color="error" variant="subtitle1">
                {error.mensaje}
              </Typography>
            </Box>
          </Collapse>
        </Box>

        <Box width="100%" display="flex" justifyContent="center">
          <LoadingButton
            loading={loading}
            loadingPosition="end"
            variant="contained"
            type="submit"
            endIcon={<SendIcon />}
          >
            Log In
          </LoadingButton>
        </Box>
      </LayaoutItem>
    </form>
  );
};

export default LogIn;
