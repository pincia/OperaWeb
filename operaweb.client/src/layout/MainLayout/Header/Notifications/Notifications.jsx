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
    deleteNotification,
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
            setNotifications(data);
        } catch (err) {
            console.error('Error fetching notifications:', err);
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
    // Mappatura tra iconType e icone Material-UI
    const getIcon = (iconType, isRead) => {
        const color = isRead ? 'disabled' : 'primary'; // Grigio se letta, colorata altrimenti
        switch (iconType) {
            case 0:
                return <InfoIcon color={isRead ? 'disabled' : 'primary'} />;
            case 1:
                return <WarningIcon color={isRead ? 'disabled' : 'orange'} />;
            case 2:
                return <ErrorIcon color={isRead ? 'disabled' : 'red'} />;
            case 3:
                return <CheckCircleIcon color={isRead ? 'disabled' : 'green'} />;
            default:
                return <InfoIcon color={isRead ? 'disabled' : 'primary'} />;
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
                                    e.stopPropagation();
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
            </Menu>
        </>
    );
};

export default Notifications;
