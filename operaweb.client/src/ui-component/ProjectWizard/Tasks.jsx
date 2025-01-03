import React, { useState, useEffect } from 'react';
import "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import { Box, Typography, Snackbar, Alert } from '@mui/material';
import TaskTreeView from './TaskTreeView';
import TaskDetailsDialog from './TaskDetailsDialog';
import EntryDetailsDialog from './EntryDetailsDialog';
import EntryList from './EntryList';

export default function TasksForm({ projectData, setProjectData, onValidationChange }) {
    const [task, setTask] = useState({
        id: null,
        description: '',
        parentId: null,
        hasEntry: false
    });

    const [entry, setEntry] = useState({
        id: null,
        description: '',
        code: '',
        unit: '',
        price: ''
    });

    const [tasks, setTasks] = useState(projectData.jobs || [
        { id: 1, description: 'LAVORI A MISURA', children: [], hasEntry: false, level: 1 },
        { id: 2, description: 'LAVORI A CORPO', children: [], hasEntry: false, level: 1 },
        { id: 3, description: 'LAVORI IN ECONOMIA', children: [], hasEntry: false, level: 1 },
    ]);

    const [open, setOpen] = useState(false);
    const [entryDialogOpen, setEntryDialogOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
    const [expanded, setExpanded] = useState([]);
    const [selectedTaskEntries, setSelectedTaskEntries] = useState([]);

    const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

    const defaultTaskIds = [1, 2, 3]; // ID delle lavorazioni di default

    const handleOpen = (taskToEdit = null, parentId = null) => {
        if (taskToEdit) {
            if (defaultTaskIds.includes(taskToEdit.id)) {
                setSnackbar({ open: true, message: 'Non è possibile modificare le lavorazioni di default.', severity: 'warning' });
                return;
            }
            setTask(taskToEdit);
        } else {
            setTask({ id: null, description: '', parentId });
            if (parentId) {
                setExpanded((prevExpanded) => [...new Set([...prevExpanded, parentId.toString()])]);
            }
        }
        setOpen(true);
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

    const handleEntryOpen = (taskId) => {
        if (!taskId) {
            setSnackbar({ open: true, message: 'Seleziona una lavorazione prima di aggiungere una voce.', severity: 'warning' });
            return;
        }

        const selectedTask = findTask(tasks, taskId);
        if (selectedTask && selectedTask.entries) {
            setSelectedTaskEntries(selectedTask.entries);
        } else {
            setSelectedTaskEntries([]);
        }
        setTask({ ...selectedTask, id: taskId }); // Aggiorna il task selezionato
        setEntryDialogOpen(true);
    };

    const generateId = () => {
        return Math.floor(Date.now() + Math.random() * 10000); // Genera un ID univoco
    };

    useEffect(() => {
        setProjectData((prev) => {
            if (JSON.stringify(prev.jobs) !== JSON.stringify(tasks)) {
                return { ...prev, jobs: tasks };
            }
            return prev;
        });
    }, [tasks, setProjectData]);


    useEffect(() => {
        // Valida sempre come "true" (nessuna validazione attiva per ora)
        onValidationChange(true);
    }, [onValidationChange]);

    return (
        <Box sx={{ padding: 2, display: 'flex', flexDirection: 'row', gap: 2 }}>
            <Box sx={{ flex: 4 }}>
                <TaskTreeView
                    tasks={tasks}
                    setTasks={setTasks}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    handleOpen={handleOpen}
                    handleEntryOpen={handleEntryOpen}
                    setSnackbar={setSnackbar}
                    setTask={setTask}
                    setSelectedTaskEntries={setSelectedTaskEntries}
                    defaultTaskIds={defaultTaskIds}
                />
            </Box>
            <Box sx={{ flex: 4 }}>
                <EntryList
                    selectedTaskEntries={selectedTaskEntries}
                    setTasks={setTasks}
                    setProjectData={setProjectData}
                    setSnackbar={setSnackbar}
                    taskId={task.id}
                    setSelectedTaskEntries={setSelectedTaskEntries}
                    snackbar={snackbar}
                />
            </Box>

            <TaskDetailsDialog
                open={open}
                setOpen={setOpen}
                task={task}
                setTask={setTask}
                tasks={tasks}
                setTasks={setTasks}
                setSnackbar={setSnackbar}
                generateId={generateId}
                setSelectedTaskEntries={setSelectedTaskEntries}
            />

            <EntryDetailsDialog
                open={entryDialogOpen}
                setOpen={setEntryDialogOpen}
                entry={entry}
                setEntry={setEntry}
                setTasks={setTasks}
                taskId={task.id}
                setSnackbar={setSnackbar}
                setSelectedTaskEntries={setSelectedTaskEntries}
            />

            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
