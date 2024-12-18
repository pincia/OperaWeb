import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Popper from '@mui/material/Popper';
import Chip from '@mui/material/Chip';
import ClickAwayListener from '@mui/material/ClickAwayListener';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import useAuth from 'hooks/useAuth';
import User1 from 'assets/images/users/user-round.svg';

// assets
import { IconLogout, IconSettings, IconUser } from '@tabler/icons-react';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [open, setOpen] = useState(false);

    const anchorRef = useRef(null);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error(err);
        }
    };

    const handleToggle = () => setOpen((prevOpen) => !prevOpen);
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) return;
        setOpen(false);
    };

    const handleSettingsClick = () => {
        navigate('/user/settings/');
        setOpen(false);
    };

    const handleProfileClick = () => {
        navigate('/user/profile/');
        setOpen(false);
    };

    return (
        <>
            <Chip
                sx={{ ml: 2, height: '48px', borderRadius: '27px', cursor: 'pointer' }}
                icon={<Avatar src={User1} sx={{ width: 32, height: 32 }} ref={anchorRef} />}
                label={<IconSettings stroke={1.5} size="24px" />}
                variant="outlined"
                onClick={handleToggle}
            />

            <Popper
                placement="bottom"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={handleClose}>
                        <Transitions in={open} {...TransitionProps}>
                            <MainCard border={false} elevation={16} content={false}>
                                <Box sx={{ p: 2 }}>
                                    <Divider />
                                </Box>
                                <List component="nav">
                                    <ListItemButton onClick={handleProfileClick}>
                                        <ListItemIcon>
                                            <IconUser stroke={1.5} size="20px" />
                                        </ListItemIcon>
                                        <ListItemText primary="Profilo" />
                                    </ListItemButton>
                                    <ListItemButton onClick={handleSettingsClick}>
                                        <ListItemIcon>
                                            <IconSettings stroke={1.5} size="20px" />
                                        </ListItemIcon>
                                        <ListItemText primary="Impostazioni" />
                                    </ListItemButton>
                                    <ListItemButton onClick={handleLogout}>
                                        <ListItemIcon>
                                            <IconLogout stroke={1.5} size="20px" />
                                        </ListItemIcon>
                                        <ListItemText primary="Logout" />
                                    </ListItemButton>
                                </List>
                            </MainCard>
                        </Transitions>
                    </ClickAwayListener>
                )}
            </Popper>
        </>
    );
};

export default ProfileSection;
