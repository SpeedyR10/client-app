import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Logo from '../assets/LinhasDaMaria2BGremoved.png'
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from 'react-router-dom'
import Badge  from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import { useDispatch, useSelector } from 'react-redux';
import { logout, userSelector } from '../features/User/userSlice';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.45),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.55),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const settings = [
  {id: 1, label: 'A minha conta', path: '/user'}, 
  {id: 2, label: 'As minhas encomendas', path: '/orders'},
  {id: 3, label: 'Terminar sessão', path: '/'} ];

export default function SearchAppBar() {
  const {authed, username, shoppingCart, imageURL} = useSelector(userSelector);
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const history = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (label) => {
    console.log(label)
    setAnchorElUser(null);
    switch(label){
      case 'Terminar sessão':
        dispatch(logout());
        history('/');
        break;
      case 'As minhas encomendas':
        history('/orders');
        break;
      case 'A minha conta':
        history('/account');
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{background: 'transparent', boxShadow: 'none'}}>
        <Toolbar>
          <Link to={'/'}>
            <img src={Logo} alt='' height='90'/>
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
          </Typography>
          <PhoneIcon/><Typography>+351 910000000</Typography>
          <EmailIcon/><Typography>test@test.com</Typography>
          {authed 
            ?
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Definições de utilizador">
                <IconButton disableRipple={true} color={'default'} onClick={handleOpenUserMenu}>
                  <Avatar alt={username} src={imageURL} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
              {settings.map((setting) => (
                  <MenuItem key={setting.id} onClick={() => handleCloseUserMenu(setting.label)}>
                    <Typography textAlign="center">{setting.label}</Typography>
                  </MenuItem>
              ))}
              </Menu>
            </Box>
            :
            <Link to={'/login'}>
              <Tooltip title='Iniciar Sessão'>
                <IconButton disableRipple={true} color={'default'}>
                    <PersonIcon/>
                </IconButton>
              </Tooltip>
            </Link>
          }
          <Link to={'/cart'}>
            <Tooltip title='Carrinho'>
              <IconButton aria-label="cart" disableRipple={true} color={'default'}>
                <StyledBadge badgeContent={shoppingCart.length} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            </Tooltip>
          </Link>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Pesquisar…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}