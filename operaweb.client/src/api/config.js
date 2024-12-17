import axios from 'utils/axios';

export const getProvinces = async () => {
    const response = await axios.get('/api/config/provinces');
    return response.data;
};

export const getCities = async (provinceId) => {
    const response = await axios.get(`/api/config/cities/${provinceId}`);
    return response.data;
};
