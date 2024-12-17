import React, { useState, useEffect } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';
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
import EventNoteIcon from '@mui/icons-material/EventNote';
import {
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
} from 'api/notifications';

const Notifications = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [viewAll, setViewAll] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false); // Stato per indicare se il caricamento è completato
    const [error, setError] = useState(null); // Stato per gestire eventuali errori

    useEffect(() => {
        if (!hasLoaded) {
            loadNotifications();
        }
    }, [hasLoaded]); // Carica le notifiche solo se non sono state ancora caricate

    const loadNotifications = async () => {
        try {
            const data = await getNotifications();
            setNotifications(data);
            setError(null); // Resetta eventuali errori precedenti
        } catch (err) {
            console.error('Error fetching notifications:', err);
            setError('Impossibile caricare le notifiche.');
        } finally {
            setHasLoaded(true); // Assicurati che il caricamento venga marcato come completato
        }
    };

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMarkAsRead = async (id) => {
        try {
            await markNotificationAsRead(id);
            setNotifications((prev) =>
                prev.map((notif) =>
                    notif.id === id ? { ...notif, isRead: true } : notif
                )
            );
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await markAllNotificationsAsRead();
            setNotifications((prev) =>
                prev.map((notif) => ({ ...notif, isRead: true }))
            );
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
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
                                onClick={() => handleMarkAsRead(notif.id)}
                                selected={!notif.isRead}
                            >
                                <ListItemIcon>
                                    <EventNoteIcon color={notif.isRead ? 'disabled' : 'primary'} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={notif.message}
                                    secondary={notif.isRead ? 'Letta' : 'Non letta'}
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
                        <Button
                            fullWidth
                            onClick={() => setViewAll(!viewAll)}
                        >
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
                            onClick={handleMarkAllAsRead}
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
