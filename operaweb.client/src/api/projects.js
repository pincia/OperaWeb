import axios from 'utils/axios';

// ⬇️ this is the loader for the detail route
export async function loader() {
    try {
        const response = await axios.get('/api/projects');
        return response.data;
    } catch (error) {
        return error;
    }
}
/**
 * Recupera i dettagli di un progetto specifico dall'API
 * @param {number|string} id - L'ID del progetto da recuperare
 * @returns {Promise<object>} - I dati del progetto
 * @throws {Error} - Se la richiesta all'API fallisce
 */
export async function getProject(id) {
    try {
        if (!id) {
            throw new Error('È necessario fornire un ID del progetto.');
        }

        const response = await axios.get(`/api/projects/${id}`);
        return response.data;
    } catch (error) {
        console.error('Errore durante il recupero del progetto:', error);
        throw error;
    }
}

export async function getProjects() {
    try {
        const response = await axios.get('/api/projects');
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function getRecentProjects() {
    try {
        const response = await axios.get('/api/projects/recent-projects');
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function getTemplates() {
    try {
        const response = await axios.get('/api/template');
        return response.data;
    } catch (error) {
        return error;
    }
}
export async function getSoas() {
    try {
        const response = await axios.get('/api/soas/');
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function getSoaClassifications() {
    try {
        const response = await axios.get('/api/soaclassifications/');
        return response.data;
    } catch (error) {
        return error;
    }
}

export const importXPWE = async (file, connectionId) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-Connection-Id': connectionId
            }
        };

        const response = await axios.post('/api/projects/create-project-from-file', formData, config);

        return response.data; // La risposta contiene il risultato dell'import
    } catch (error) {
        console.error('Error importing XPWE:', error);
        throw error; // Propaga l'errore per gestirlo nel componente chiamante
    }
};


export async function deleteProject(projectId) {
    try {
        console.log('delete project called')

        const response = axios.delete('/api/projects/', {
            data: {
                Id: projectId
            }         
        })

        return response;
    } catch (error) {
        return error;
    }
}

export async function saveProject(projectId, projectData) {
    try {
        const response = await axios.put(`/api/projects/${projectId}`, projectData);
        return response;
    } catch (error) {
        console.error('Errore durante il salvataggio del progetto:', error);
        throw error;
    }
}
export async function createProject(projectData) {
    try {
        const response = await axios.post(`/api/projects`, projectData);
        return response.data;
    } catch (error) {
        console.error('Errore durante il salvataggio del progetto:', error);
        throw error;
    }
}

/**
 * Esegue controlli mirati sul file XPWE prima dell'importazione
 * @param {File} file - Il file XPWE da verificare
 * @returns {Promise<Array>} - La lista di controlli eseguiti e i loro risultati
 * @throws {Error} - Se la richiesta all'API fallisce
 */
export const checkXPWEFile = async (file) => {
    try {
        if (!file) {
            throw new Error('È necessario fornire un file per eseguire i controlli.');
        }

        const formData = new FormData();
        formData.append('file', file);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };

        const response = await axios.post('/api/projects/check-file-xpwe', formData, config);

        return response.data.data; // La risposta contiene i risultati dei controlli
    } catch (error) {
        console.error('Errore durante i controlli sul file XPWE:', error);
        throw error; // Propaga l'errore per gestirlo nel componente chiamante
    }
};

/**
 * Esegue l'hard delete di un progetto specifico
 * @param {number|string} projectId - L'ID del progetto da eliminare definitivamente
 * @returns {Promise<object>} - La risposta dell'API
 * @throws {Error} - Se la richiesta all'API fallisce
 */
export async function hardDeleteProject(projectId) {
    try {
        if (!projectId) {
            throw new Error('È necessario fornire un ID del progetto.');
        }

        const response = await axios.delete(`/api/projects/hard-delete`, {
            params: { id: projectId },
        });

        return response.data;
    } catch (error) {
        console.error('Errore durante la cancellazione definitiva del progetto:', error);
        throw error;
    }
}

/**
 * Ripristina un progetto cancellato impostando Deleted a false
 * @param {number|string} projectId - L'ID del progetto da ripristinare
 * @returns {Promise<object>} - La risposta dell'API
 * @throws {Error} - Se la richiesta all'API fallisce
 */
export async function restoreProject(projectId) {
    try {
        if (!projectId) {
            throw new Error('È necessario fornire un ID del progetto.');
        }

        const response = await axios.post('/api/projects/restore', {
            id: projectId,
        });

        return response.data;
    } catch (error) {
        console.error('Errore durante il ripristino del progetto:', error);
        throw error;
    }
}

/**
 * Recupera tutti i progetti eliminati
 * @returns {Promise<object>} - I progetti eliminati
 * @throws {Error} - Se la richiesta fallisce
 */
export async function getDeletedProjects() {
    try {
        const response = await axios.get('/api/projects/deleted');
        return response.data || []; 
    } catch (error) {
        console.error("Error fetching deleted projects:", error);
        throw error;
    }
}
