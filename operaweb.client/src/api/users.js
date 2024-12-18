import axios from 'utils/axios';

/**
 * Verifica se il profilo dell'utente è completo.
 */
export const isProfileComplete = async () => {
    try {
        const response = await axios.get('/api/user/isProfileComplete');
        return response.data.isComplete;
    } catch (error) {
        console.error('Error checking user profile completeness:', error);
        return false;
    }
};

export const getProfile = async () => {
    const response = await axios.get('/api/User/GetProfile');
    return response.data;
};


/**
 * Aggiorna il profilo dell'utente con i dati forniti.
 * @param {object} profileData - I dati di contatto e aziendali dell'utente.
 */
export const updateProfile = async (profileData) => {
    try {
        const response = await axios.post('/api/user/updateProfile', profileData);
        return response.data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};


export const getSubRoles = async () => {
    try {
        const response = await axios.get('/api/user/getSubRoles');
        return response.data; // Array di subroles filtrati
    } catch (error) {
        console.error('Error fetching subroles:', error);
        return [];
    }
};


export const changePassowrd = async (data) => {
    try {
        const response = await axios.post('/api/user/ChangePassword/change-password', data);
        return response.data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};
