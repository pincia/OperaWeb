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

export async function getProject(id) {
    try {
        const response = await axios.get('/api/projects/'+id);
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

