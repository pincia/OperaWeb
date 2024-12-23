import React, { useState } from 'react';
import { Box, Button, Grid, Stack } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TaskTreeView from './TaskTreeView';
import EntryList from './EntryList';
import TaskDetailsDialog from './TaskDetailsDialog';
import AnimateButton from 'ui-component/extended/AnimateButton';

const validationSchema = yup.object({});

export default function TasksForm({ handleNext, handleBack, setErrorIndex, projectData, setProjectData }) {
    const [task, setTask] = useState({
        id: null,
        description: '',
        parentId: null,
        hasEntry: false,
    });

    const formik = useFormik({
        initialValues: {
            searchQuery: '',
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: () => {
            setProjectData(projectData); // Salva lo stato del progetto prima di procedere
            handleNext();
        },
    });

    const [tasks, setTasks] = useState(
        projectData.jobs || [
            { id: 1, description: 'LAVORI A MISURA', children: [], hasEntry: false },
            { id: 2, description: 'LAVORI A CORPO', children: [], hasEntry: false },
            { id: 3, description: 'LAVORI IN ECONOMIA', children: [], hasEntry: false },
        ]
    );

    const [open, setOpen] = useState(false);
    const [entryDialogOpen, setEntryDialogOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
    const [expanded, setExpanded] = useState([]);
    const [selectedTaskEntries, setSelectedTaskEntries] = useState([]);

    const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

    const defaultTaskIds = [1, 2, 3]; // ID delle lavorazioni di default

    const handleOpen = (taskToEdit = null, parentId = null) => {
        console.log('handleOpen called', { taskToEdit, parentId });
        if (taskToEdit) {
            // Modifica di un task esistente
            setTask(taskToEdit);
        } else {
            // Creazione di un nuovo task
            setTask({ id: null, description: '', parentId, hasEntry: false });
            if (parentId) {
                setExpanded((prevExpanded) => [...new Set([...prevExpanded, parentId.toString()])]);
            }
        }
        setOpen(true); // Apre il dialog
    };


    const handleSaveTask = (updatedTask) => {
        if (updatedTask.id) {
            // Modifica task esistente
            setTasks((prevTasks) =>
                prevTasks.map((t) =>
                    t.id === updatedTask.id ? { ...t, description: updatedTask.description } : t
                )
            );
        } else {
            // Aggiungi nuovo task
            const newTask = { ...updatedTask, id: generateId(), children: [] };
            setTasks((prevTasks) =>
                prevTasks.map((t) =>
                    t.id === updatedTask.parentId
                        ? { ...t, children: [...t.children, newTask] }
                        : t
                )
            );
        }
        setSnackbar({ open: true, message: 'Lavorazione salvata con successo.', severity: 'success' });
    };

    const generateId = () => {
        return Math.floor(Date.now() + Math.random() * 10000); // Genera un ID univoco
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

    return (
        <>
            <Box sx={{ padding: 1, display: 'flex', flexDirection: 'row', gap: 1 }}>
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
                <Box sx={{ flex: 6 }}>
                    <EntryList
                        selectedTaskEntries={selectedTaskEntries}
                        setTasks={setTasks}
                        tasks={tasks}
                        setSnackbar={setSnackbar}
                        taskId={task.id}
                        setSelectedTaskEntries={setSelectedTaskEntries}
                        snackbar={snackbar}
                    />
                </Box>
            </Box>

            <form onSubmit={formik.handleSubmit}>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between">
                        <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                            Back
                        </Button>
                        <AnimateButton>
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{ my: 3, ml: 1 }}
                                onClick={() => setErrorIndex(1)}
                            >
                                Next
                            </Button>
                        </AnimateButton>
                    </Stack>
                </Grid>
            </form>

            {/* Dialog per aggiungere/modificare lavorazioni */}
            <TaskDetailsDialog
                open={open}
                onClose={() => setOpen(false)}
                onSave={handleSaveTask}
                task={task}
            />
        </>
    );
}
