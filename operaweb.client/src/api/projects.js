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


export async function saveProject( project ) {
    try {
        console.log('save project called')
        console.log(project)
        const formData = new FormData();
        formData.append("name", project.name);
        formData.append("description", project.description);
        formData.append("address", project.address);
        formData.append("city", project.city);
        formData.append("zipCode", project.zipCode);
        formData.append("country", project.country);
        formData.append("file", project.file);
        
        const response =  axios.post('/api/projects/create-project-from-file', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }})

        return response;
    } catch (error) {
        return error;
    }
}

export async function getRelatedProducts(id) {
    return await axios.post('/api/product/related', { id });
}

export async function getProductReviews() {
    return await axios.get('/api/review/list');
}
