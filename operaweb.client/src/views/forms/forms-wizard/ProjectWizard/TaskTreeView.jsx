import React, { useState } from 'react';
import { TreeView, TreeItem } from '@mui/x-tree-view';
import { Box, Typography, Tooltip, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function TaskTreeView({
    tasks,
    setTasks,
    expanded,
    setExpanded,
    handleOpen,
    handleEntryOpen,
    setSnackbar,
    setTask,
    setSelectedTaskEntries
}) {
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const defaultTaskIds = [1, 2, 3]; // ID delle lavorazioni principali

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

    const handleSelectTask = (taskId) => {
        const selectedTask = findTask(tasks, taskId);
        setTask(selectedTask);
        if (selectedTask && selectedTask.entries) {
            setSelectedTaskEntries(selectedTask.entries);
        } else {
            setSelectedTaskEntries([]);
        }
    };

    const handleDelete = (taskId) => {
        if (defaultTaskIds.includes(taskId)) {
            setSnackbar({ open: true, message: 'Non è possibile eliminare le lavorazioni principali.', severity: 'warning' });
            return;
        }

        setTasks((prevTasks) => deleteTask(prevTasks, taskId));
        setSnackbar({ open: true, message: 'Lavorazione eliminata con successo.', severity: 'success' });
    };

    const deleteTask = (tasks, taskId) => {
        return tasks
            .filter((task) => task.id !== taskId) // Rimuove il task con taskId
            .map((task) => ({
                ...task,
                children: task.children ? deleteTask(task.children, taskId) : [] // Ricorsione sui figli
            }));
    };

    const confirmDeleteTask = (taskId) => {
        setTaskToDelete(taskId);
        setConfirmDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        handleDelete(taskToDelete);
        setTaskToDelete(null);
        setConfirmDialogOpen(false);
    };

    const handleCancelDelete = () => {
        setTaskToDelete(null);
        setConfirmDialogOpen(false);
    };

    const renderTreeItems = (tasks, level = 1) => {
        return tasks.map((task) => (
            <TreeItem
                key={task.id}
                nodeId={task.id ? task.id.toString() : ''}
                onClick={() => handleSelectTask(task.id)}
                label={
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="body2">{task.description}</Typography>
                        <Box>
                            {!task.hasEntry && task.children.length === 0 && level < 5 && level > 1 &&(
                                <Tooltip title="Aggiungi Voce">
                                    <IconButton
                                        color="primary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleEntryOpen(task.id);
                                        }}
                                    >
                                        <PlaylistAddIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                            {level > 1 && (
                                <Tooltip title="Modifica">
                                    <IconButton
                                        color="primary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOpen(task);
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                            {level < 4 && !(task.entries && task.entries.length >0) && (
                                <Tooltip title="Aggiungi Sottolavorazione">
                                    <IconButton
                                        color="default"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOpen(null, task.id);
                                        }}
                                    >
                                        <AddCircleIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                            {level > 1 && (
                                <Tooltip title="Elimina">
                                    <IconButton
                                        color="secondary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            confirmDeleteTask(task.id);
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Box>
                    </Box>
                }
            >
                {task.children && renderTreeItems(task.children, level + 1)}
            </TreeItem>
        ));
    };


    return (
        <>
            <Box
                sx={{
                    minHeight: '400px',
                    maxHeight: '500px', // Limita l'altezza
                    overflowY: 'auto', // Scroll interno
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    padding: 2,
                }}
            >
                <Typography variant="h4" gutterBottom>Lavorazioni Principali</Typography>

                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    expanded={expanded}
                    onNodeToggle={(event, nodeIds) => setExpanded(nodeIds)}
                    sx={{ maxWidth: 400, backgroundColor: 'background.paper', borderRadius: 2 }}
                >
                    {renderTreeItems(tasks)}
                </TreeView>
            </Box>

            <Dialog
                open={confirmDialogOpen}
                onClose={handleCancelDelete}
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
            >
                <DialogTitle id="confirm-dialog-title">Conferma Eliminazione</DialogTitle>
                <DialogContent>
                    <DialogContentText id="confirm-dialog-description">
                        Sei sicuro di voler eliminare questa lavorazione?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete} color="secondary">
                        Annulla
                    </Button>
                    <Button onClick={handleConfirmDelete} color="primary" variant="contained">
                        Conferma
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
