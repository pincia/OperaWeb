import React, { useState, useEffect } from 'react';
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
    Menu,
    MenuItem
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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
    setProjectData,
    setSnackbar,
    taskId,
    setSelectedTaskEntries,
    snackbar,
    generateId
}) {
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [menuAnchor2, setMenuAnchor2] = useState(null);
    const [highlightedMeasurementId, setHighlightedMeasurementId] = useState(null);
    const [menuTask, setMenuTask] = useState(null);
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
            id: generateId(), // Genera un nuovo ID unico+
            originalId: -1
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
        const updateMeasurementsInHierarchy = (tasks, taskId, entryId, measurementId, field, value) => {
            return tasks.map((task) => {
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

                // Ricorsione sui figli
                if (task.children) {
                    return {
                        ...task,
                        children: updateMeasurementsInHierarchy(
                            task.children,
                            taskId,
                            entryId,
                            measurementId,
                            field,
                            value
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
                measurementId,
                field,
                value
            );

            setProjectData((prevData) => ({
                ...prevData,
                jobs: updatedTasks, // Aggiorna il projectData con i task aggiornati
            }));

            const updatedTask = findTask(updatedTasks, taskId);
            if (updatedTask) setSelectedTaskEntries(updatedTask.entries || []);
            return updatedTasks;
        });
    };


    const handleMenuOpen = (event, entry) => {
        console.log("Opening menu for entry:", entry);
        setMenuAnchor(event.currentTarget); // Imposta l'ancora per il menu
        setMenuTask(entry); // Salva la voce (entry) selezionata
    };

    const handleMeasurementMenuOpen = (event, measurement) => {
        setMenuAnchor2(event.currentTarget); // Imposta l'ancora per il menu delle misurazioni
        setMenuTask(measurement); // Salva la misurazione associata al menu
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
        setMenuAnchor2(null);
        setMenuTask(null);
    };

    useEffect(() => {
        if (highlightedMeasurementId) {
            const timeout = setTimeout(() => setHighlightedMeasurementId(null), 2000);
            return () => clearTimeout(timeout);
        }
    }, [highlightedMeasurementId]);


    const handleAddMeasurement = (entryId) => {
        const newMeasurement = {
            id: generateId(),
            description: '',
            lunghezza: 0,
            larghezza: 0,
            hPeso: 0,
            quantita: 0,
        };

      
        setTasks((prevTasks) => {
            const updatedTasks = updateMeasurementsInHierarchy(
                prevTasks,
                taskId,
                entryId,
                newMeasurement
            );

            const updatedTask = findTask(updatedTasks, taskId);
            if (updatedTask) setSelectedTaskEntries(updatedTask.entries || []);

            return updatedTasks;
        });

        // Espandi automaticamente l'albero per l'entry specifica
        setExpandedEntries((prevState) => ({
            ...prevState,
            [entryId]: true,
        }));

        // Evidenzia la nuova misurazione
        setHighlightedMeasurementId(newMeasurement.id);

        setSnackbar({
            open: true,
            message: 'Nuova misurazione aggiunta.',
            severity: 'success',
        });
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
                                measurements: [...(entry.measurements || []), measurement], // Aggiunge la nuova misurazione
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
        return Array.isArray(measurements) && measurements.length > 0
            ? measurements
                .reduce((sum, item) => sum + (parseFloat(item.quantita) || 0), 0)
                .toFixed(2)
            : "0.00";
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
                                        <TableCell>{entry.price}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={(e) => handleMenuOpen(e, entry)}>
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu
                                                anchorEl={menuAnchor}
                                                open={Boolean(menuAnchor)}
                                                onClose={handleMenuClose} // Chiude il menu delle voci
                                            >
                                                <MenuItem
                                                    onClick={() => {
                                                        console.log("Adding measurement to entry:", menuTask.id); 
                                                        handleAddMeasurement(menuTask.id);
                                                        handleMenuClose();
                                                    }}
                                                >
                                                    Aggiungi Misurazione
                                                </MenuItem>


                                                <MenuItem
                                                    onClick={() => {
                                                        setEntryToDelete(menuTask);
                                                        handleMenuClose();
                                                        setConfirmDialogOpen(true);
                                                    }}
                                                >
                                                    Elimina Voce
                                                </MenuItem>
                                            </Menu>


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
                                                                <TableRow
                                                                    key={m.id}
                                                                    sx={{
                                                                        backgroundColor: m.id === highlightedMeasurementId ? 'rgba(0, 128, 255, 0.2)' : 'inherit',
                                                                        transition: 'background-color 0.3s ease',
                                                                    }}
                                                                >
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
                                                                        <IconButton onClick={(e) => handleMeasurementMenuOpen(e, m)}>
                                                                            <MoreVertIcon />
                                                                        </IconButton>
                                                                        <Menu
                                                                            anchorEl={menuAnchor2}
                                                                            open={Boolean(menuAnchor2)}
                                                                            onClose={() => setMenuAnchor2(null)}
                                                                        >
                                                                            <MenuItem
                                                                                onClick={() => {
                                                                                    handleDuplicateMeasurement(entry.id, m);
                                                                                    setMenuAnchor2(null);
                                                                                }}
                                                                            >
                                                                                Duplica Misurazione
                                                                            </MenuItem>
                                                                            <MenuItem
                                                                                onClick={() => {
                                                                                    handleDeleteMeasurement(entry.id, m.id);
                                                                                    setMenuAnchor2(null);
                                                                                }}
                                                                            >
                                                                                Elimina Misurazione
                                                                            </MenuItem>
                                                                        </Menu>
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