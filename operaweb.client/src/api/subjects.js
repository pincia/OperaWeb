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
            { id: 1, subject: 'Mario Rossi', cfPiva: 'RSSMRA80A01H501Z' },
            { id: 2, subject: 'Giuseppe Verdi', cfPiva: 'VRDGPP80A01H501Z' },
            { id: 3, subject: 'Anna Bianchi', cfPiva: 'BNCANN80A01H501Z' },
            { id: 4, subject: 'Luca Neri', cfPiva: 'NRILCU80A01H501Z' },
            { id: 5, subject: 'Francesca Gialli', cfPiva: 'GLLFNC80A01H501Z' },
            { id: 6, subject: 'Alessandro Blu', cfPiva: 'BLUALS80A01H501Z' },
            { id: 7, subject: 'Carla Verde', cfPiva: 'VRDCRL80A01H501Z' },
            { id: 8, subject: 'Matteo Viola', cfPiva: 'VILMTO80A01H501Z' },
            { id: 9, subject: 'Elena Arancio', cfPiva: 'ARNELN80A01H501Z' },
            { id: 10, subject: 'Giulia Rosa', cfPiva: 'RSAGLA80A01H501Z' }
        ];

        // Simula un filtro in base alla query string
        const filteredSubjects = subjectsMock.filter((subject) =>
            subject.subject.toLowerCase().includes(query.toLowerCase())
        );

        // Simula un ritardo di rete
        await new Promise((resolve) => setTimeout(resolve, 500));

        return subjectsMock;
    } catch (error) {
        console.error('Errore nella ricerca dei soggetti:', error);
        throw error;
    }
};
