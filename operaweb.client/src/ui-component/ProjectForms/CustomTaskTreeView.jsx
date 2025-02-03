import React, { useState } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Menu,
    MenuItem
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TreeView, TreeItem } from '@mui/x-tree-view';

export default function CustomTaskTreeView({
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
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [menuTask, setMenuTask] = useState(null);

    const defaultTaskIds = ["1", "2", "3"]; // ID delle lavorazioni principali

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
        console.log('taskid selected: '+taskId)
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

    const handleMenuOpen = (event, task) => {
        setMenuAnchor(event.currentTarget);
        setMenuTask(task);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
        setMenuTask(null);
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
                        <IconButton onClick={(e) => handleMenuOpen(e, task)}>
                            <MoreVertIcon />
                        </IconButton>
                    </Box>
                }
            >
                {task.children && renderTreeItems(task.children, level + 1)}
            </TreeItem>
        ));
    };

    const renderMenu = () => (
        <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
        >
            {menuTask && menuTask.level > 1 && (
                <MenuItem
                    onClick={() => {
                        handleOpen(menuTask);
                        handleMenuClose();
                    }}
                >
                    Modifica
                </MenuItem>
            )}
            {menuTask && menuTask.children && menuTask.level < 4 && (
                <MenuItem
                    onClick={() => {
                        handleOpen(null, menuTask.id);
                        handleMenuClose();
                    }}
                >
                    Aggiungi Sottolavorazione
                </MenuItem>
            )}
            {menuTask && menuTask.level > 1 && menuTask.children.length === 0 && (
                <MenuItem
                    onClick={() => {
                        handleEntryOpen(menuTask.id);
                        handleMenuClose();
                    }}
                >
                    Aggiungi Voce
                </MenuItem>
            )}
            {menuTask && menuTask.level > 1 && !defaultTaskIds.includes(menuTask.id) && (
                <MenuItem
                    onClick={() => {
                        confirmDeleteTask(menuTask.id);
                        handleMenuClose();
                    }}
                >
                    Elimina
                </MenuItem>
            )}
        </Menu>
    );

    return (
        <>
            <Box
                sx={{
                    minHeight: '400px',
                    maxHeight: '500px',
                    overflowY: 'auto',
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
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column', 
                        width: '100%',
                    }}
                >
                    {renderTreeItems(tasks)}
                </TreeView>
                {renderMenu()}
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
