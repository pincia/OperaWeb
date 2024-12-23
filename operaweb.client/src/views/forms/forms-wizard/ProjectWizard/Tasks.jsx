import React, { useState, useEffect } from 'react';
import "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import { Button, Box, Typography, Snackbar, Alert } from '@mui/material';
import TaskTreeView from './TaskTreeView';
import TaskDetailsDialog from './TaskDetailsDialog';
import EntryDetailsDialog from './EntryDetailsDialog';
import EntryList from './EntryList';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({});

export default function TasksForm({ handleNext, handleBack, setErrorIndex, projectData, setProjectData }) {
    const [task, setTask] = useState({
        id: null,
        description: '',
        parentId: null,
        hasEntry: false
    });

    const formik = useFormik({
        initialValues: {
            searchQuery: '',
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: () => {
            setProjectData(projectData); // Salva lo stato dei soggetti prima di andare avanti
            handleNext();
        },
    });
    const [entry, setEntry] = useState({
        id: null,
        description: '',
        code: '',
        unit: '',
        price: ''
    });

    const [tasks, setTasks] = useState(projectData.jobs || [
        { id: 1, description: 'LAVORI A MISURA', children: [], hasEntry: false },
        { id: 2, description: 'LAVORI A CORPO', children: [], hasEntry: false },
        { id: 3, description: 'LAVORI IN ECONOMIA', children: [], hasEntry: false }
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



    return (
        <><Box sx={{ padding: 4, display: 'flex', flexDirection: 'row', gap: 4 }}>
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

            <Box sx={{ flex: 1 }}>
                <Typography variant="h5" gutterBottom>Voci della Lavorazione Selezionata</Typography>
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

            <TaskDetailsDialog
                open={open}
                setOpen={setOpen}
                task={task}
                setTask={setTask}
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
            <form onSubmit={formik.handleSubmit}>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between">
                        <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                            Back
                        </Button>
                        <AnimateButton>
                            <Button variant="contained" type="submit" sx={{ my: 3, ml: 1 }} onClick={() => setErrorIndex(1)}>
                                Next
                            </Button>
                        </AnimateButton>
                    </Stack>
                </Grid>
            </form></>
    );
}
