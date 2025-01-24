import { useSelector } from 'react-redux';

// Funzione per contare le lavorazioni che hanno delle voci computo associate (entries)
export function useCountTasksWithEntries() {
    // Ottieni il currentProject direttamente dallo stato Redux
    const currentProject = useSelector((state) => state.project.currentProject);

    if (!currentProject || !Array.isArray(currentProject.jobs)) {
        console.error("Invalid currentProject provided");
        return 0;
    }

    let taskCount = 0;

    // Funzione ricorsiva per esaminare tutte le lavorazioni e sotto-lavorazioni
    const countEntries = (jobs) => {
        jobs.forEach((job) => {
            // Verifica se la lavorazione ha delle entries associate
            if (Array.isArray(job.entries) && job.entries.length > 0) {
                taskCount++;
            }
            // Controlla le eventuali sotto-lavorazioni
            if (Array.isArray(job.children) && job.children.length > 0) {
                countEntries(job.children);
            }
        });
    };

    // Avvia la conta a partire dalle lavorazioni principali
    countEntries(currentProject.jobs);

    return taskCount;
}
