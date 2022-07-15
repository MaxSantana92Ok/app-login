import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {IconButton, Tooltip, Typography} from '@mui/material';
import {Box} from '@mui/system';
import {useDispatch, useSelector} from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import {DeleteTokenAndLogOut_Action} from '../../redux/slices/session/sessionSlice';
const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {serviceToken} = useSelector(state => state.session);

  const handleLogOut = () => {
    localStorage.clear('token');
    dispatch(DeleteTokenAndLogOut_Action());
  };

  useEffect(() => {
    if (!serviceToken) {
      navigate('/login', {replace: true});
    }
  }, [serviceToken]);

  return (
    <Box
      width="100%"
      height="50px"
      p={1}
      display="flex"
      bgcolor="white"
      boxShadow="0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)"
    >
      <Box
        width="100%"
        height="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box width="68px" height="45px">
          <img alt="logo" src="https://streambe.com/iconos/icono_logo_on.svg" className="img"></img>
        </Box>
        {serviceToken && (
          <Box display="flex" flexDirection="column">
            <Tooltip title="Log Out">
              <IconButton
                color="primary"
                aria-label="log out"
                onClick={handleLogOut}
                className="log-out-icon"
              >
                <LogoutIcon></LogoutIcon>
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Header;
