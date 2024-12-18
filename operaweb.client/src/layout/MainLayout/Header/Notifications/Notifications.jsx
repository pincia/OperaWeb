import React, { useState, useEffect } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
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
    Divider,
} from '@mui/material';
import {
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification, // Metodo aggiornato
} from 'api/notifications';

const Notifications = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [viewAll, setViewAll] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = async () => {
        try {
            const data = await getNotifications();
            setNotifications(data.filter((n) => !n.isDeleted)); // Escludi le notifiche eliminate
        } catch (err) {
            console.error('Error fetching notifications:', err);
        }
    };

    const handleOpen = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleNotificationClick = async (notification) => {
        try {
            if (!notification.isRead) {
                await markNotificationAsRead(notification.id);
                setNotifications((prev) =>
                    prev.map((notif) =>
                        notif.id === notification.id ? { ...notif, isRead: true } : notif
                    )
                );
            }
            if (notification.link) {
                navigate(notification.link);
            }
        } catch (error) {
            console.error('Error handling notification click:', error);
        }
    };

    const handleDeleteNotification = async (id) => {
        try {
            await deleteNotification(id); // Aggiorna il server
            setNotifications((prev) => prev.filter((notif) => notif.id !== id));
        } catch (err) {
            console.error('Error deleting notification:', err);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await markAllNotificationsAsRead();
            setNotifications((prev) =>
                prev.map((notif) => ({ ...notif, isRead: true }))
            );
        } catch (err) {
            console.error('Error marking all notifications as read:', err);
        }
    };

    const getIcon = (iconType, isRead) => {
        const color = isRead ? 'disabled' : 'primary';
        switch (iconType) {
            case 0:
                return <InfoIcon color={color} />;
            case 1:
                return <WarningIcon color={color} />;
            case 2:
                return <ErrorIcon color={color} />;
            case 3:
                return <CheckCircleIcon color={color} />;
            default:
                return <InfoIcon color={color} />;
        }
    };

    return (
        <>
            <IconButton color="inherit" onClick={handleOpen}>
                <Badge
                    badgeContent={notifications.filter((n) => !n.isRead).length}
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
                <List>
                    {notifications.map((notif) => (
                        <ListItem
                            key={notif.id}
                            button
                            onClick={() => handleNotificationClick(notif)}
                        >
                            <ListItemIcon>
                                {getIcon(notif.type, notif.isRead)}
                            </ListItemIcon>
                            <ListItemText
                                primary={notif.title}
                                secondary={notif.message}
                            />
                            <IconButton
                                edge="end"
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation(); // Blocca il click del ListItem
                                    handleDeleteNotification(notif.id);
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
                {notifications.length > 5 && (
                    <MenuItem>
                        <Button fullWidth onClick={() => setViewAll(!viewAll)}>
                            {viewAll ? 'Mostra meno' : 'Visualizza tutto'}
                        </Button>
                    </MenuItem>
                )}
                <Divider />
                <MenuItem>
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={handleMarkAllAsRead}
                        disabled={notifications.every((n) => n.isRead)}
                    >
                        Segna tutte come lette
                    </Button>
                </MenuItem>
            </Menu>
        </>
    );
};

export default Notifications;
