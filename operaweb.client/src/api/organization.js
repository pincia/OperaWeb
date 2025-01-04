import axios from 'utils/axios';

// ⬇️ Recupera la struttura dell'organizzazione corrente
// Carica la struttura dell'organizzazione
export async function getOrganizationStructure() {
    try {
        const response = await axios.get('/api/Organization/get-structure');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch organization structure:', error);
        throw error;
    }
}

// ⬇️ Aggiunge un nuovo membro all'organizzazione
export async function addMember(payload) {
    return await axios.post('/api/organization/add-member', payload);
}

// ⬇️ Rimuove un membro dall'organizzazione
export async function removeMember(memberId) {
    try {
        const response = await axios.delete(`/api/organization/remove-member/${memberId}`);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

// ⬇️ Recupera i ruoli disponibili per aggiungere un nuovo membro
export async function getOrganizationAvailableRoles() {
    try {
        const response = await axios.get('/api/organization/available-roles');
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

// ⬇️ Recupera i membri dell'organizzazione corrente
export async function getUserOrganizationDetails() {
    try {
        const response = await axios.get('/api/organization/user-organization-details');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch organization members:', error);
        throw error;
    }
}
