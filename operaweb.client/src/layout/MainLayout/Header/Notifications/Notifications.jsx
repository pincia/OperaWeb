import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import {
    Badge,
    IconButton,
    Menu,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Button,
    MenuItem,
    Divider
} from '@mui/material';

import {
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification
} from 'api/notifications';

const Notifications = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [viewAll, setViewAll] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate(); // Hook di navigazione React Router

    useEffect(() => {
        if (!hasLoaded) {
            loadNotifications();
        }
    }, [hasLoaded]);

    const loadNotifications = async () => {
        try {
            const data = await getNotifications();
            setNotifications(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching notifications:', err);
            setError('Impossibile caricare le notifiche.');
        } finally {
            setHasLoaded(true);
        }
    };

    const handleOpen = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
  
    const handleNotificationClick = async (notification) => {
        try {
            // Marca come letta la notifica
            if (!notification.isRead) {
                await markNotificationAsRead(notification.id);
                setNotifications((prev) =>
                    prev.map((notif) =>
                        notif.id === notification.id ? { ...notif, isRead: true } : notif
                    )
                );
            }

            // Reindirizza usando navigate se esiste un link
            if (notification.link) {
                navigate(notification.link);
            }
        } catch (error) {
            console.error('Error handling notification click:', error);
        }
    };

    const handleDeleteNotification = async (id) => {
        try {
            await deleteNotification(id);
            setNotifications((prev) => prev.filter((notif) => notif.id !== id));
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    const iconMap = {
        1: <InfoIcon color="info" />,
        2: <WarningIcon color="warning" />,
        3: <ErrorIcon color="error" />,
        4: <CheckCircleIcon color="success" />
    };

    const displayedNotifications = viewAll
        ? notifications
        : notifications.slice(0, 5);

    return (
        <>
            <IconButton color="inherit" onClick={handleOpen}>
                <Badge
                    badgeContent={notifications.filter((notif) => !notif.isRead).length}
                    color="error"
                >
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{ style: { width: '300px' } }}
            >
                <Typography variant="h6" align="center" gutterBottom>
                    Notifiche
                </Typography>
                <Divider />
                {error ? (
                    <Typography color="error" align="center" gutterBottom>
                        {error}
                    </Typography>
                ) : (
                    <List>
                        {displayedNotifications.map((notif) => (
                            <ListItem
                                key={notif.id}
                                button
                                onClick={() => handleNotificationClick(notif)}
                                selected={!notif.isRead}
                            >
                                <ListItemIcon>
                                    {iconMap[notif.type] || <InfoIcon color="disabled" />}
                                </ListItemIcon>
                                <ListItemText
                                    primary={notif.title}
                                    secondary={notif.message}
                                />
                                <IconButton
                                    edge="end"
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteNotification(notif.id);
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                )}
                {notifications.length > 5 && !error && (
                    <MenuItem>
                        <Button fullWidth onClick={() => setViewAll(!viewAll)}>
                            {viewAll ? 'Mostra meno' : 'Visualizza tutto'}
                        </Button>
                    </MenuItem>
                )}
                <Divider />
                {!error && (
                    <MenuItem>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={markAllNotificationsAsRead}
                            disabled={notifications.every((notif) => notif.isRead)}
                        >
                            Segna tutte come lette
                        </Button>
                    </MenuItem>
                )}
            </Menu>
        </>
    );
};

export default Notifications;
