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
        return response.data;
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