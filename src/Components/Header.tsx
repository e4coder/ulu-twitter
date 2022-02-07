import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { Routes, Route, useLocation, useNavigate, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';

import { ColorModeContext } from '../App';
import { useStoreState } from '../Store/StoreHooks';
import { authentication } from '../firebase';

const pages = [
    {
        path: '/home',
        title: 'Home',
    },
    {
        path: '/about',
        title: 'About',
    },
];
const settings = ['Profile', 'Logout'];

const Header: React.FC = () => {
    const userInstance = useStoreState(state => state.user.userInstance);
    const location = useLocation();
    const nav = useNavigate();

    React.useEffect(() => {
        if (!userInstance) {
            if (location.pathname !== '/') {
                nav('/');
            }
        } else {
            if (location.pathname === '/' ) {
                nav('/profile');
            }
        }
    }, [userInstance, location, nav]);

    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    const [anchorElNav, setAnchorElNav] = React.useState(null as null | HTMLElement);
    const [anchorElUser, setAnchorElUser] = React.useState(null as null | HTMLElement);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogOut = () => {
        setAnchorElUser(null);
        signOut(authentication);
    }

    const handleChangeRoute = (path: string) => {
        setAnchorElNav(null);
        nav(path);
    }

    return (
        <AppBar position="fixed" >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        ULU-Twitter
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={(e) => handleOpenNavMenu(e)}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                                    <Link to={page.path}>{page.title}</Link>
                                    {/* <Typography textAlign="center">{page.title}</Typography> */}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.title}
                                onClick={() => handleChangeRoute(page.path)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.title}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0, display: 'flex', gap: 2 }}>
                        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                        {
                            !userInstance ? (
                                <Button variant={'text'} color={'inherit'}>
                                    Login
                                </Button>
                            ) : (
                                <React.Fragment>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt={"User"} src={`https://avatars.dicebear.com/api/micah/${userInstance.phoneNumber?userInstance.phoneNumber: 'nomi'}.svg?background=%23000000`} />
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
                                        <MenuItem onClick={() => { handleCloseUserMenu(); handleChangeRoute('/profile')}}>
                                            <Typography textAlign="center">Profile</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleLogOut}>
                                            <Typography textAlign="center">Log Out</Typography>
                                        </MenuItem>
                                    </Menu>
                                </React.Fragment>
                            )
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;