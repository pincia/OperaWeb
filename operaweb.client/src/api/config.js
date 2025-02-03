import axios from 'utils/axios';

// API per ottenere tutte le province
export const getProvinces = async () => {
    const response = await axios.get('/api/config/provinces');
    return response.data;
};

// API per ottenere i comuni associati a una provincia
export const getCities = async (provinceId) => {
    const response = await axios.get(`/api/config/cities/${provinceId}`);
    return response.data;
};

// API per ottenere le configurazioni generali
export const getConfigurations = async () => {
    const response = await axios.get('/api/config');
    return response.data;
};

// API per salvare le configurazioni generali
export const saveConfigurations = async (configurations) => {
    const response = await axios.post('/api/config', configurations);
    return response.data;
};
