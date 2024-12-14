import axios from 'utils/axios';

// ⬇️ this is the loader for the detail route
export async function getRoles() {
    try {
        const response = await axios.get('/api/roles');
        return response.data;
    } catch (error) {
        return error;
    }
}
