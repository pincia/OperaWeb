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

export async function importXPWE(project) {
    try {
        console.log('save project called')
        console.log(project)
        const formData = new FormData();
        formData.append("file", project.file);

        const response = axios.post('/api/projects/create-project-from-file', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })

        return response;
    } catch (error) {
        return error;
    }
}
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

