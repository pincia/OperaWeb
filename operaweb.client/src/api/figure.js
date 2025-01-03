import axios from 'utils/axios';

/**
 * Recupera tutte le figure aziendali
 * @returns {Promise<object[]>} - La lista delle figure
 * @throws {Error} - Se la richiesta all'API fallisce
 */
export async function getFigures() {
    try {
        const response = await axios.get('/api/figure');
        return response.data;
    } catch (error) {
        console.error('Errore durante il recupero delle figure:', error);
        throw error;
    }
}

/**
 * Recupera i dettagli di una figura aziendale specifica
 * @param {number} id - L'ID della figura da recuperare
 * @returns {Promise<object>} - I dettagli della figura
 * @throws {Error} - Se la richiesta all'API fallisce
 */
export async function getFigure(id) {
    try {
        if (!id) {
            throw new Error('È necessario fornire un ID della figura.');
        }

        const response = await axios.get(`/api/figures/${id}`);
        return response.data;
    } catch (error) {
        console.error('Errore durante il recupero della figura:', error);
        throw error;
    }
}

/**
 * Recupera tutte le sotto-figure poissibili per un utentespecifica
 * @returns {Promise<object[]>} - La lista delle sotto-figure
 * @throws {Error} - Se la richiesta all'API fallisce
 */
export async function getUserAvaliableSubFigures() {
    try {
        const response = await axios.get(`/api/SubFigure/user-sub-figures`);
        return response.data;
    } catch (error) {
        console.error('Errore durante il recupero delle sotto-figure:', error);
        throw error;
    }
}
