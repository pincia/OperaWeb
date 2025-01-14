import axios from 'utils/axios';
/*
export const fetchSubjects = async (query) => {
    try {
        // Mock dei dati dei soggetti
        const subjectsMock = [
            { id: 1, name: 'Mario Rossi', cfPiva: 'RSSMRA80A01H501Z', company: 'Test srl' },
            { id: 2, name: 'Giuseppe Verdi', cfPiva: 'VRDGPP80A01H501Z', company: 'Test srl' },
            { id: 3, name: 'Anna Bianchi', cfPiva: 'BNCANN80A01H501Z', company: 'Test srl' },
            { id: 4, name: 'Luca Neri', cfPiva: 'NRILCU80A01H501Z', company: 'Test srl' },
            { id: 5, name: 'Francesca Gialli', cfPiva: 'GLLFNC80A01H501Z', company: 'Test srl' },
            { id: 6, name: 'Alessandro Blu', cfPiva: 'BLUALS80A01H501Z', company: 'Test srl' },
            { id: 7, name: 'Carla Verde', cfPiva: 'VRDCRL80A01H501Z', company: 'Test srl' },
            { id: 8, name: 'Matteo Viola', cfPiva: 'VILMTO80A01H501Z', company: 'Test srl' },
            { id: 9, name: 'Elena Arancio', cfPiva: 'ARNELN80A01H501Z', company: 'Test srl' },
            { id: 10, name: 'Giulia Rosa', cfPiva: 'RSAGLA80A01H501Z', company: 'Test srl' },
        ];


        // Simula un ritardo di rete
        await new Promise((resolve) => setTimeout(resolve, 500));

        return subjectsMock;
    } catch (error) {
        console.error('Errore nella ricerca dei soggetti:', error);
        throw error;
    }
};*/

export const fetchSubjects = async(filter) => {
    try {
        const response = await axios.post('/api/subjects/search', filter);
        return response.data;
    } catch (error) {
        console.error(`Errore durante il recupero dei dati da ${endpoint}:`, error);
        throw error;
    }
};
export async function getProjectSubjectRoles(figureName) {
    try {
        const response = await axios.get('api/ProjectSubjectRole/figure-clasifications/' + figureName);
        return response.data;
    } catch (error) {
        console.error('Errore nel recupero dei ruoli:', error);
        throw error;
    }
}