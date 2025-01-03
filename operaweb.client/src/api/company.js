import axios from 'utils/axios';

/**
 * Verifica se il profilo dell'azienda è completo.
 * @param {number} companyId - ID dell'azienda.
 * @returns {boolean} True se il profilo è completo, altrimenti false.
 */
export const isCompanyProfileComplete = async (companyId) => {
    try {
        const response = await axios.get(`/api/company/isProfileComplete/${companyId}`);
        return response.data.isComplete;
    } catch (error) {
        console.error('Error checking company profile completeness:', error);
        return false;
    }
};

/**
 * Ottiene i dettagli del profilo dell'azienda.
 * @param {number} companyId - ID dell'azienda.
 * @returns {object} Dettagli del profilo aziendale.
 */
export const getCompanyProfile = async (companyId) => {
    try {
        const response = await axios.get(`/api/company/user-company-profile`);
        return response.data;
    } catch (error) {
        console.error('Error fetching company profile:', error);
        throw error;
    }
};

/**
 * Aggiorna il profilo dell'azienda con i dati forniti.
 * @param {number} companyId - ID dell'azienda.
 * @param {object} profileData - I dati del profilo aziendale aggiornati.
 * @returns {object} Risposta del server.
 */
export const updateCompanyProfile = async (profileData) => {
    try {
        const response = await axios.put(`/api/company/profile/`, profileData);
        return response.data;
    } catch (error) {
        console.error('Error updating company profile:', error);
        throw error;
    }
};
