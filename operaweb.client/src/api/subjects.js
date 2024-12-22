import axios from 'utils/axios';

/**
 * Recupera l'elenco dei soggetti dal server.
 * @returns {Promise<Array>} Un array di oggetti soggetti.
 */
//export const fetchSubjects = async () => {
//    try {
//        const response = await axios.get('/api/subjects');
//        return response.data;
//    } catch (error) {
//        console.error('Errore durante il recupero dei soggetti:', error);
//        throw error;
//    }
//};

/**
 * Recupera l'elenco dei soggetti mockati dal server.
 * @returns {Promise<Array>} Un array di oggetti soggetti.
 */
export const fetchSubjects = async (query) => {
    try {
        // Mock dei dati dei soggetti
        const subjectsMock = [
            { id: 1, name: 'Mario Rossi', cfPiva: 'RSSMRA80A01H501Z' },
            { id: 2, name: 'Giuseppe Verdi', cfPiva: 'VRDGPP80A01H501Z' },
            { id: 3, name: 'Anna Bianchi', cfPiva: 'BNCANN80A01H501Z' },
            { id: 4, name: 'Luca Neri', cfPiva: 'NRILCU80A01H501Z' },
            { id: 5, name: 'Francesca Gialli', cfPiva: 'GLLFNC80A01H501Z' },
            { id: 6, name: 'Alessandro Blu', cfPiva: 'BLUALS80A01H501Z' },
            { id: 7, name: 'Carla Verde', cfPiva: 'VRDCRL80A01H501Z' },
            { id: 8, name: 'Matteo Viola', cfPiva: 'VILMTO80A01H501Z' },
            { id: 9, name: 'Elena Arancio', cfPiva: 'ARNELN80A01H501Z' },
            { id: 10, name: 'Giulia Rosa', cfPiva: 'RSAGLA80A01H501Z' }
        ];

        // Simula un filtro in base alla query string
        const filteredSubjects = subjectsMock.filter((subject) =>
            subject.name.toLowerCase().includes(query.toLowerCase())
        );

        // Simula un ritardo di rete
        await new Promise((resolve) => setTimeout(resolve, 500));

        return subjectsMock;
    } catch (error) {
        console.error('Errore nella ricerca dei soggetti:', error);
        throw error;
    }
};


export async function getProjectSubjectRoles() {
    try {
        const response = await axios.get('/api/projectSubjectRole');
        return response.data;
    } catch (error) {
        console.error('Errore nel recupero dei ruoli:', error);
        throw error;
    }
}