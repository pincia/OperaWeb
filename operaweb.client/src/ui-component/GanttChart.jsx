import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react';
import gantt from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Box, Button, ToggleButton, ToggleButtonGroup, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { saveProject } from 'api/projects';
import MainCard from 'ui-component/cards/MainCard';
import { useSelector, useDispatch } from 'react-redux';
import { openSnackbar } from 'store/slices/snackbar';

const GanttChart = forwardRef(({ projectData }, ref) => {
    const ganttContainer = useRef(null); // Ref per il container del Gantt
    const [tasks, setTasks] = useState({ data: [], links: [] });
    const [scale, setScale] = useState('day'); // Stato per la scala temporale
    const [dialogOpen, setDialogOpen] = useState(false); // Stato per il dialog
    const [currentTask, setCurrentTask] = useState({}); // Stato per il task corrente (modifica/aggiunta)
    const dispatch = useDispatch();

    const handleTaskUpdate = (updatedTask) => {
        setTasks((prevState) => {
            const updatedData = prevState.data.map((task) =>
                task.id === updatedTask.id ? { ...task, ...updatedTask } : task
            );
            return { ...prevState, data: updatedData };
        });
    };

    const handleScaleChange = (event, newScale) => {
        if (newScale) {
            setScale(newScale);
        }
    };

    useEffect(() => {
        if (projectData?.tasks) {
            setTasks({
                data: projectData.tasks,
            });
        }
    }, [projectData]);

    const handleTaskDelete = (taskId) => {
        setTasks((prevState) => ({
            ...prevState,
            data: prevState.data.filter((task) => task.id !== taskId),
        }));
    };

    const handleTaskAdd = (newTask) => {
        setTasks((prevState) => ({
            ...prevState,
            data: [...prevState.data, newTask],
        }));
    };

    const handleSaveChanges = async () => {
        try {
            var response = await saveProject(projectData.id, { ...projectData, tasks: tasks.data });
            dispatch(openSnackbar({
                open: true,
                message: 'Progetto salvato con successo!',
                variant: 'alert',
                alert: { color: 'success' },
            }));
        } catch (error) {
            dispatch(openSnackbar({
                open: true,
                message: 'Errore durante il salvataggio del progetto.\r\n' + response,
                variant: 'alert',
                alert: { color: 'error' },
            }));
        }
    };

    useImperativeHandle(ref, () => ({
        exportToPDF: async () => {
            const element = ganttContainer.current;
            const canvas = await html2canvas(element);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('landscape', 'mm', 'a4');
            const width = pdf.internal.pageSize.getWidth();
            const height = (canvas.height * width) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, width, height);
            pdf.save('gantt-chart.pdf');
        },
    }));

    const updateGanttScale = (scale) => {
        if (scale === 'month') {
            gantt.config.scale_unit = 'month';
            gantt.config.date_scale = '%F %Y';
            gantt.config.subscales = [{ unit: 'week', step: 1, date: 'Week %W' }];
        } else if (scale === 'week') {
            gantt.config.scale_unit = 'week';
            gantt.config.date_scale = 'Week %W';
            gantt.config.subscales = [{ unit: 'day', step: 1, date: '%d %M' }];
        } else {
            gantt.config.scale_unit = 'day';
            gantt.config.date_scale = '%d %M';
            gantt.config.subscales = [];
        }
        gantt.render();
    };

    useEffect(() => {
        gantt.config.scale_unit = scale;
        gantt.config.date_scale = scale === 'month' ? '%F %Y' : scale === 'week' ? 'Week %W' : '%d %M';
        gantt.config.subscales = scale === 'month' ? [{ unit: 'week', step: 1, date: 'Week %W' }] : scale === 'week' ? [{ unit: 'day', step: 1, date: '%d %M' }] : [];
        gantt.config.scale_height = 50;
        gantt.config.row_height = 30;

        gantt.config.columns = [
            { name: 'text', label: 'Lavorazione', tree: true, width: 200 },
            { name: 'start_date', label: 'Data Inizio', align: 'center', width: 120 },
            { name: 'duration', label: 'Durata', align: 'center', width: 80 },
        ];

        gantt.attachEvent('onTaskDblClick', (id) => {
            const task = gantt.getTask(id);
            setCurrentTask(task);
            setDialogOpen(true);
            return false;
        });

        gantt.attachEvent('onAfterTaskAdd', (id, task) => {
            handleTaskAdd(task);
        });

        gantt.attachEvent('onAfterTaskUpdate', (id, task) => {
            handleTaskUpdate(task);
        });

        gantt.attachEvent('onAfterTaskDelete', (id) => {
            handleTaskDelete(id);
        });

        gantt.init(ganttContainer.current);

        return () => {
            gantt.clearAll();
        };
    }, []);
    useEffect(() => {
        updateGanttScale(scale);

        if (Array.isArray(tasks.data) && tasks.data.length > 0) {
            let lastEndDate = null; // Variabile per tenere traccia della fine dell'ultimo task

            const formattedTasks = tasks.data.map((task) => {
                const startDate = task.start_date
                    ? new Date(task.start_date)
                    : lastEndDate || new Date(); // Usa la fine del task precedente o oggi come default

                const duration = task.duration || 0;

                // Calcola la fine del task in base alla durata
                const endDate = new Date(startDate);
                endDate.setDate(startDate.getDate() + duration);

                // Aggiorna la variabile lastEndDate per il prossimo task
                lastEndDate = endDate;

                return {
                    id: task.id,
                    text: task.text,
                    start_date: startDate.toLocaleDateString('it-IT'), // Formatta la data di inizio
                    duration: duration,
                    progress: task.progress || 0,
                    parent: task.parentId || 0,
                    open: task.open || false,
                };
            });

            gantt.clearAll();
            gantt.parse({ data: formattedTasks, links: tasks.links });
        }
    }, [tasks, scale]);


    const handleDialogSave = () => {
        // Assicuriamoci che il currentTask abbia una data valida
        const taskToSave = {
            ...currentTask,
            start_date: currentTask.start_date
                ? new Date(currentTask.start_date).toLocaleDateString('it-IT')
                : new Date().toLocaleDateString('it-IT'),
        };

        if (taskToSave.id) {
            gantt.updateTask(taskToSave.id, taskToSave);
        } else {
            const newId = Date.now();
            gantt.addTask({ ...taskToSave, id: newId });
        }
        setDialogOpen(false);
        setCurrentTask({});
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setCurrentTask({});
    };


    return (
        <MainCard sx={{ mb: 2, marginBottom: 3 }}>
            <Box mb={2}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <ToggleButtonGroup
                        value={scale}
                        exclusive
                        onChange={handleScaleChange}
                        aria-label="Scala Temporale"
                    >
                        <ToggleButton value="day" aria-label="Giorni">
                            Giorni
                        </ToggleButton>
                        <ToggleButton value="week" aria-label="Settimane">
                            Settimane
                        </ToggleButton>
                        <ToggleButton value="month" aria-label="Mesi">
                            Mesi
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <Button variant="contained" onClick={() => { setCurrentTask({}); setDialogOpen(true); }}>
                        Aggiungi Task
                    </Button>
                </Box>
                <Box mb={2}>
                    <div ref={ganttContainer} style={{ width: '100%', height: '500px' }}></div>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    {/*<Button variant="contained" onClick={handleSaveChanges}>*/}
                    {/*    Salva Modifiche*/}
                    {/*</Button>*/}
                    <Button variant="outlined" onClick={() => ref.current?.exportToPDF()}>
                        Stampa Cronoprogramma
                    </Button>
                </Box>
            </Box>

            <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
                <DialogTitle>{currentTask.id ? 'Modifica Task' : 'Aggiungi Task'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Lavorazione"
                        fullWidth
                        value={currentTask.text || ''}
                        onChange={(e) => setCurrentTask({ ...currentTask, text: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Data Inizio"
                        type="date"
                        fullWidth
                        value={currentTask.start_date || ''}
                        onChange={(e) => setCurrentTask({ ...currentTask, start_date: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Durata"
                        type="number"
                        fullWidth
                        value={currentTask.duration || ''}
                        onChange={(e) => setCurrentTask({ ...currentTask, duration: parseInt(e.target.value, 10) || 0 })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="secondary">
                        Annulla
                    </Button>
                    <Button onClick={handleDialogSave} color="primary">
                        Salva
                    </Button>
                </DialogActions>
            </Dialog>
        </MainCard>
    );
});

export default GanttChart;
