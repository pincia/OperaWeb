import axios from 'utils/axios';

export async function getNotifications() {
    try {
        const response = await axios.get('/api/notifications');
        return response.data; // Restituisci i dati delle notifiche
    } catch (error) {
        console.error('Error fetching notifications:', error); // Log dell'errore
        throw error; // Rilancia l'errore per farlo gestire dal componente
    }
}


// ⬇️ Mark a single notification as read
export async function markNotificationAsRead(notificationId) {
    try {
        const response = await axios.post(`/api/notifications/mark-as-read/${notificationId}`);
        return response.data; // Returns success message or empty response
    } catch (error) {
        return error;
    }
}

// ⬇️ Mark all notifications as read for the logged-in user
export async function markAllNotificationsAsRead() {
    try {
        const response = await axios.post('/api/notifications/mark-all-as-read');
        return response.data; // Returns success message or empty response
    } catch (error) {
        return error;
    }
}

// ⬇️ Create a new notification (useful for testing or administrative purposes)
export async function createNotification(notification) {
    try {
        const response = await axios.post('/api/notifications', notification);
        return response.data; // Returns the newly created notification
    } catch (error) {
        return error;
    }
}

// ⬇️ Mark all notifications as read for the logged-in user
export async function deleteNotification(id) {
    try {
        const response = await axios.delete('/api/Notifications/'+id);
        return response.data; // Returns success message or empty response
    } catch (error) {
        return error;
    }
};