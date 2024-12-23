import React, { useState } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Tooltip,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Collapse,
    TableContainer,
    Paper,
    Snackbar,
    Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopy from '@mui/icons-material/ContentCopy';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditableCell from './EditableCell'
export default function EntryList({
    selectedTaskEntries,
    setTasks,
    tasks,
    setSnackbar,
    taskId,
    setSelectedTaskEntries,
    snackbar
}) {
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [measurementDialogOpen, setMeasurementDialogOpen] = useState(false);
    const [entryToDelete, setEntryToDelete] = useState(null);
    const [expandedEntries, setExpandedEntries] = useState({});
    const [newMeasurement, setNewMeasurement] = useState({
        description: '',
        lunghezza: '',
        larghezza: '',
        hPeso: '',
        quantita: '',
    });
    const [currentEntryId, setCurrentEntryId] = useState(null);

    const toggleExpandEntry = (entryId) => {
        setExpandedEntries((prevState) => ({
            ...prevState,
            [entryId]: !prevState[entryId],
        }));
    };

    const handleDeleteEntry = (entryId) => {
        const removeEntryFromHierarchy = (tasks, taskId, entryId) => {
            return tasks.map((task) => {
                if (task.id === taskId) {
                    return {
                        ...task,
                        entries: task.entries.filter((entry) => entry.id !== entryId), // Rimuove la voce
                    };
                }
                if (task.children) {
                    return {
                        ...task,
                        children: removeEntryFromHierarchy(task.children, taskId, entryId),
                    };
                }
                return task;
            });
        };

        setTasks((prevTasks) => {
            const updatedTasks = removeEntryFromHierarchy(prevTasks, taskId, entryId);
            const updatedTask = findTask(updatedTasks, taskId);
            if (updatedTask) setSelectedTaskEntries(updatedTask.entries || []);
            return updatedTasks;
        });

        setSnackbar({ open: true, message: 'Voce eliminata con successo.', severity: 'success' });
    };


    const handleDuplicateMeasurement = (entryId, measurement) => {
        const duplicate = {
            ...measurement,
            id: Date.now(), // Genera un nuovo ID unico
        };

        const updateMeasurementsInHierarchy = (tasks, taskId, entryId, measurement) => {
            return tasks.map((task) => {
                if (task.id === taskId) {
                    return {
                        ...task,
                        entries: task.entries.map((entry) => {
                            if (entry.id === entryId) {
                                return {
                                    ...entry,
                                    measurements: [...(entry.measurements || []), measurement],
                                };
                            }
                            return entry;
                        }),
                    };
                }
                if (task.children) {
                    return {
                        ...task,
                        children: updateMeasurementsInHierarchy(
                            task.children,
                            taskId,
                            entryId,
                            measurement
                        ),
                    };
                }
                return task;
            });
        };

        setTasks((prevTasks) => {
            const updatedTasks = updateMeasurementsInHierarchy(
                prevTasks,
                taskId,
                entryId,
                duplicate
            );
            const updatedTask = findTask(updatedTasks, taskId);
            if (updatedTask) setSelectedTaskEntries(updatedTask.entries || []);
            return updatedTasks;
        });

        setSnackbar({
            open: true,
            message: 'Misurazione duplicata con successo.',
            severity: 'success',
        });
    };


    const handleMeasurementEdit = (entryId, measurementId, field, value) => {
        setTasks((prevTasks) => {
            const updatedTasks = prevTasks.map((task) => {
                if (task.id === taskId) {
                    return {
                        ...task,
                        entries: task.entries.map((entry) => {
                            if (entry.id === entryId) {
                                return {
                                    ...entry,
                                    measurements: entry.measurements.map((m) => {
                                        if (m.id === measurementId) {
                                            return { ...m, [field]: value };
                                        }
                                        return m;
                                    }),
                                };
                            }
                            return entry;
                        }),
                    };
                }
                return task;
            });
            const updatedTask = findTask(updatedTasks, taskId);
            if (updatedTask) setSelectedTaskEntries(updatedTask.entries || []);
            return updatedTasks;
        });
    };


    const handleAddMeasurement = () => {
        if (!newMeasurement.description || !newMeasurement.quantita) {
            setSnackbar({
                open: true,
                message: 'Descrizione e Quantità sono obbligatori.',
                severity: 'error',
            });
            return;
        }

        const updateMeasurementsInHierarchy = (tasks, taskId, entryId, measurement) => {
            return tasks.map((task) => {
                if (task.id === taskId) {
                    return {
                        ...task,
                        entries: task.entries.map((entry) => {
                            if (entry.id === entryId) {
                                return {
                                    ...entry,
                                    measurements: [
                                        ...(entry.measurements || []),
                                        { id: Date.now(), ...measurement },
                                    ],
                                };
                            }
                            return entry;
                        }),
                    };
                }

                if (task.children) {
                    return {
                        ...task,
                        children: updateMeasurementsInHierarchy(
                            task.children,
                            taskId,
                            entryId,
                            measurement
                        ),
                    };
                }

                return task;
            });
        };

        setTasks((prevTasks) => {
            const updatedTasks = updateMeasurementsInHierarchy(
                prevTasks,
                taskId,
                currentEntryId,
                newMeasurement
            );

            const updatedTask = findTask(updatedTasks, taskId);
            if (updatedTask) setSelectedTaskEntries(updatedTask.entries || []);

            return updatedTasks;
        });

        setNewMeasurement({ description: '', lunghezza: '', larghezza: '', hPeso: '', quantita: '' });
        setSnackbar({ open: true, message: 'Misurazione aggiunta con successo.', severity: 'success' });
        setMeasurementDialogOpen(false);
    };


    const handleDeleteMeasurement = (entryId, measurementId) => {
        const updateMeasurementsInHierarchy = (tasks, taskId, entryId, measurementId) => {
            return tasks.map((task) => {
                if (task.id === taskId) {
                    return {
                        ...task,
                        entries: task.entries.map((entry) => {
                            if (entry.id === entryId) {
                                return {
                                    ...entry,
                                    measurements: entry.measurements.filter((m) => m.id !== measurementId),
                                };
                            }
                            return entry;
                        }),
                    };
                }
                if (task.children) {
                    return {
                        ...task,
                        children: updateMeasurementsInHierarchy(
                            task.children,
                            taskId,
                            entryId,
                            measurementId
                        ),
                    };
                }
                return task;
            });
        };

        setTasks((prevTasks) => {
            const updatedTasks = updateMeasurementsInHierarchy(
                prevTasks,
                taskId,
                entryId,
                measurementId
            );
            const updatedTask = findTask(updatedTasks, taskId);
            if (updatedTask) setSelectedTaskEntries(updatedTask.entries || []);
            return updatedTasks;
        });

        setSnackbar({ open: true, message: 'Misurazione eliminata con successo.', severity: 'success' });
    };


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

    const getEntryPrice = (entry) => {
        const measurements = entry.measurements || []; // Imposta un array vuoto se undefined
        return measurements.reduce((sum, item) => sum + (item.quantita || 0), 0).toFixed(2);
    };



    return (
        <Box
            sx={{
                minHeight: '400px',
                maxHeight: '550px', // Limita l'altezza
                overflowY: 'auto', // Scroll interno
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: 2,
            }}
        >
            {selectedTaskEntries.length > 0 ? (
                <TableContainer component={Paper} sx={{ height: 400, overflow: 'auto' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Voce</TableCell>
                                <TableCell>Codice</TableCell>
                                <TableCell>U.Misura</TableCell>
                                <TableCell>Prezzo</TableCell>
                                <TableCell>Azione</TableCell>
                            </TableRow>
                        </TableHead><TableBody>
                            {selectedTaskEntries.map((entry) => (
                                <React.Fragment key={entry.id}>
                                    <TableRow>
                                        <TableCell>
                                            <IconButton
                                                size="small"
                                                onClick={() => toggleExpandEntry(entry.id)}
                                            >
                                                {expandedEntries[entry.id] ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                                            </IconButton>
                                            {entry.description}
                                        </TableCell>
                                        <TableCell>{entry.code}</TableCell>
                                        <TableCell>{entry.unit}</TableCell>
                                        <TableCell>{getEntryPrice(entry)}</TableCell>
                                        <TableCell>
                                            <Tooltip title="Aggiungi Misurazione">
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => {
                                                        setCurrentEntryId(entry.id);
                                                        setMeasurementDialogOpen(true);
                                                    }}
                                                >
                                                    <AddCircleIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Elimina Voce">
                                                <IconButton
                                                    color="secondary"
                                                    onClick={() => {
                                                        setEntryToDelete(entry); 
                                                        setConfirmDialogOpen(true);
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>

                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={4}>
                                            <Collapse in={expandedEntries[entry.id]} timeout="auto" unmountOnExit>
                                                <Box sx={{ margin: 1 }}>
                                                    <Typography variant="h6" gutterBottom>
                                                        Misurazioni
                                                    </Typography>
                                                    <Table size="small">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Descrizione</TableCell>
                                                                <TableCell>Lunghezza</TableCell>
                                                                <TableCell>Larghezza</TableCell>
                                                                <TableCell>HPeso</TableCell>
                                                                <TableCell>Quantità</TableCell>
                                                                <TableCell>Azione</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {(entry.measurements || []).map((m) => (
                                                                <TableRow key={m.id}>
                                                                    <TableCell>
                                                                        <EditableCell
                                                                            value={m.description}
                                                                            onSave={(value) =>
                                                                                handleMeasurementEdit(entry.id, m.id, 'description', value)
                                                                            }
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <EditableCell
                                                                            value={m.lunghezza}
                                                                            onSave={(value) =>
                                                                                handleMeasurementEdit(entry.id, m.id, 'lunghezza', value)
                                                                            }
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <EditableCell
                                                                            value={m.larghezza}
                                                                            onSave={(value) =>
                                                                                handleMeasurementEdit(entry.id, m.id, 'larghezza', value)
                                                                            }
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <EditableCell
                                                                            value={m.hPeso}
                                                                            onSave={(value) =>
                                                                                handleMeasurementEdit(entry.id, m.id, 'hPeso', value)
                                                                            }
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <EditableCell
                                                                            value={m.quantita}
                                                                            onSave={(value) =>
                                                                                handleMeasurementEdit(entry.id, m.id, 'quantita', value)
                                                                            }
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Tooltip title="Duplica Misurazione">
                                                                            <IconButton
                                                                                color="primary"
                                                                                onClick={() => handleDuplicateMeasurement(entry.id, m)}
                                                                            >
                                                                                <ContentCopy />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                        <Tooltip title="Elimina Misurazione">
                                                                            <IconButton
                                                                                color="secondary"
                                                                                onClick={() => handleDeleteMeasurement(entry.id, m.id)}
                                                                            >
                                                                                <DeleteIcon />
                                                                            </IconButton>
                                                                        </Tooltip>

                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>

                                                    </Table>
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>

            ) : (
                <Typography variant="body2" color="textSecondary">
                    Nessuna voce selezionata.
                </Typography>
            )}

            <Dialog open={measurementDialogOpen} onClose={() => setMeasurementDialogOpen(false)}>
                <DialogTitle>Aggiungi Misurazione</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Descrizione"
                        fullWidth
                        value={newMeasurement.description}
                        onChange={(e) => setNewMeasurement({ ...newMeasurement, description: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Lunghezza"
                        fullWidth
                        value={newMeasurement.lunghezza}
                        onChange={(e) => setNewMeasurement({ ...newMeasurement, lunghezza: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Larghezza"
                        fullWidth
                        value={newMeasurement.larghezza}
                        onChange={(e) => setNewMeasurement({ ...newMeasurement, larghezza: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="HPeso"
                        fullWidth
                        value={newMeasurement.hPeso}
                        onChange={(e) => setNewMeasurement({ ...newMeasurement, hPeso: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Quantità"
                        fullWidth
                        value={newMeasurement.quantita}
                        onChange={(e) => setNewMeasurement({ ...newMeasurement, quantita: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setMeasurementDialogOpen(false)} color="secondary">
                        Annulla
                    </Button>
                    <Button onClick={handleAddMeasurement} color="primary" variant="contained">
                        Aggiungi
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={confirmDialogOpen}
                onClose={() => setConfirmDialogOpen(false)}
            >
                <DialogTitle>Conferma Eliminazione</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Sei sicuro di voler eliminare questa voce?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDialogOpen(false)} color="secondary">
                        Annulla
                    </Button>
                    <Button
                        onClick={() => {
                            handleDeleteEntry(entryToDelete.id); // Esegui l'eliminazione
                            setConfirmDialogOpen(false); // Chiudi il dialog
                        }}
                        color="primary"
                        variant="contained"
                    >
                        Conferma
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar?.open || false}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert severity={snackbar?.severity || 'success'} sx={{ width: '100%' }}>
                    {snackbar?.message || ''}
                </Alert>
            </Snackbar>
        </Box>
    );
}
