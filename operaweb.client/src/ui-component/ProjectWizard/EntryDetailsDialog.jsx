import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, MenuItem } from '@mui/material';

export default function EntryDetailsDialog({
    open,
    setOpen,
    entry,
    setEntry,
    setTasks,
    taskId,
    setSnackbar,
    setSelectedTaskEntries
}) {
    const unitOptions = ['kg', 'm', 'piece'];

    const findTask = (tasks, id) => {
        for (const task of tasks) {
            if (task.id === id) return task;
            if (task.children) {
                const found = findTask(task.children, id);
                if (found) return found;
            }
        }
        return null;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEntry((prevEntry) => ({ ...prevEntry, [name]: value }));
    };

    const addEntryToTask = (tasks, taskId, newEntry) => {
        return tasks.map((task) => {
            if (task.id === taskId) {
                // Verifica che il campo entries esista e inizializzalo se necessario
                const updatedEntries = task.entries ? [...task.entries, newEntry] : [newEntry];
                return {
                    ...task,
                    entries: updatedEntries, // Aggiorna le entries del task
                };
            } else if (task.children && task.children.length > 0) {
                // Esegui la ricorsione sui figli
                return {
                    ...task,
                    children: addEntryToTask(task.children, taskId, newEntry),
                };
            }
            return task; // Task invariato
        });
    };


    const handleSubmit = () => {
        if (!entry.description || !entry.code || !entry.unit || !entry.price) {
            setSnackbar({ open: true, message: 'Tutti i campi sono obbligatori.', severity: 'error' });
            return;
        }

        const newEntry = { ...entry, id: new Date().getTime() };

        setTasks((prevTasks) => {
            const updatedTasks = addEntryToTask(prevTasks, taskId, newEntry);

            // Aggiorna le entries visibili nel riquadro
            const selectedTask = findTask(updatedTasks, taskId);
            if (selectedTask && selectedTask.entries) {
                setSelectedTaskEntries(selectedTask.entries);
            }

            return updatedTasks;
        });

        setSnackbar({ open: true, message: 'Voce aggiunta con successo.', severity: 'success' });
        setOpen(false);
        setEntry({ id: null, description: '', code: '', unit: '', price: '' });
    };


    return (
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Aggiungi Voce</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'grid', gap: 2, marginTop: 2 }}>
                    <TextField
                        label="Descrizione"
                        name="description"
                        value={entry.description}
                        onChange={handleInputChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Codice"
                        name="code"
                        value={entry.code}
                        onChange={handleInputChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Unità di Misura"
                        name="unit"
                        value={entry.unit}
                        onChange={handleInputChange}
                        select
                        fullWidth
                        required
                    >
                        {unitOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Prezzo (€)"
                        name="price"
                        value={entry.price}
                        onChange={handleInputChange}
                        type="number"
                        fullWidth
                        required
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} color="secondary">
                    Annulla
                </Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                    Aggiungi
                </Button>
            </DialogActions>
        </Dialog>
    );
}
