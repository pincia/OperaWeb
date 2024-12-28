import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from '@mui/material';

export default function TaskDetailsDialog({
    open,
    setOpen,
    task,
    setTask,
    tasks,
    setTasks,
    setSnackbar,
    generateId,
    setSelectedTaskEntries
}) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({ ...prevTask, [name]: value }));
    };

    const handleSubmit = () => {
        if (!task.description) {
            setSnackbar({ open: true, message: 'La descrizione è obbligatoria.', severity: 'error' });
            return;
        }

        if (task.id === null) {
            // Operazione di aggiunta
            const newTask = {
                ...task,
                id: generateId(),
                level: task.parentId ? findTaskLevel(tasks, task.parentId) + 1 : 1, // Calcola il livello
                children: [],
                entries: []
            };

            if (task.parentId) {
                setTasks((prevTasks) => {
                    const addChildToParent = (tasks, parentId, child) => {
                        return tasks.map((t) => {
                            if (t.id === parentId) {
                                return { ...t, children: [...(t.children || []), child] };
                            } else if (t.children) {
                                return { ...t, children: addChildToParent(t.children, parentId, child) };
                            }
                            return t;
                        });
                    };
                    return addChildToParent(prevTasks, task.parentId, newTask);
                });
            } else {
                setTasks((prevTasks) => [...prevTasks, newTask]);
            }

            setSnackbar({ open: true, message: 'Lavorazione aggiunta con successo.', severity: 'success' });
        } else {
            // Operazione di modifica
            setTasks((prevTasks) =>
                prevTasks.map((t) =>
                    t.id === task.id ? { ...t, description: task.description } : { ...t, children: updateTask(t.children, task) }
                )
            );
            setSnackbar({ open: true, message: 'Lavorazione modificata con successo.', severity: 'success' });
        }

        setTask({ id: null, description: '', parentId: null });
        setOpen(false);
    };

    // Funzione per trovare il livello del task genitore
    const findTaskLevel = (tasks, parentId) => {
        for (const task of tasks) {
            if (task.id === parentId) return task.level;
            if (task.children) {
                const level = findTaskLevel(task.children, parentId);
                if (level) return level;
            }
        }
        return 0;
    };

    const updateTask = (tasks, updatedTask) => {
        return tasks.map((t) =>
            t.id === updatedTask.id
                ? { ...updatedTask, children: t.children, entries: t.entries } // Mantiene figli ed entry
                : { ...t, children: updateTask(t.children, updatedTask) }
        );
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle>{task.id ? 'Modifica Lavorazione' : 'Aggiungi Lavorazione'}</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'grid', gap: 2, marginTop: 2 }}>
                    <TextField
                        label="Descrizione"
                        name="description"
                        value={task.description}
                        onChange={handleInputChange}
                        placeholder="Inserisci descrizione"
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
                    {task.id ? 'Modifica' : 'Aggiungi'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
