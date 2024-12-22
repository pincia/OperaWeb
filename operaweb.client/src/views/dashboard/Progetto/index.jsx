import React, { useEffect, useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import GanttChart from 'ui-component/GanttChart';
import { gridSpacing } from 'store/constant';
import { getProject } from 'api/projects';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentProject } from 'store/slices/project';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const ProjectDashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const ganttRef = useRef(null);
   
    const currentProjectId = useSelector((state) => state.project.currentProjectId);
    const currentProject = useSelector((state) => state.project.currentProject);
    const dispatch = useDispatch();
    const [projectData, setProjectData] = useState(currentProject)
    const [tasks, setTasks] = useState({
        data: [],
        links: []
    });

    useEffect(() => {
        const fetchProjectData = async () => {
            if (!currentProject || currentProject.id !== currentProjectId) {
                try {
                    setLoading(true);
                    const response = await getProject(currentProjectId);
                    console.log(response)
                    // Aggiorna lo stato di Redux con il progetto corrente
                    dispatch(setCurrentProject(response.data));
                    setProjectData(response.data)
                    // Popola i tasks se il progetto include informazioni relative al Gantt
                    if (response.data.tasks) {
                        setTasks({
                            data: response.data.tasks,
                            links: response.data.links || []
                        });
                    }
                } catch (error) {
                    console.error('Errore durante il recupero del progetto:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setTasks({
                    data: currentProject.tasks,
                    links: currentProject.links || []
                });
                setLoading(false);
            }
        };

        fetchProjectData();
    }, [currentProjectId, currentProject, dispatch]);

    const handleTaskUpdate = (updatedTask) => {
        setTasks((prevState) => {
            const updatedData = prevState.data.map((task) =>
                task.id === updatedTask.id ? { ...task, ...updatedTask } : task
            );
            return { ...prevState, data: updatedData };
        });
    };

    const handleTaskDelete = (taskId) => {
        setTasks((prevState) => {
            const updatedData = prevState.data.filter((task) => task.id !== taskId);
            return { ...prevState, data: updatedData };
        });
    };

    const handleTaskAdd = (newTask) => {
        setTasks((prevState) => ({
            ...prevState,
            data: [...prevState.data, newTask],
        }));
    };

    const handleSave = () => {
        localStorage.setItem('ganttData', JSON.stringify(tasks));
        alert('Modifiche salvate con successo!');
    };

    const handlePrint = () => {
        if (ganttRef.current) {
            ganttRef.current.exportToPDF();
        }
    };

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <h2>Cronoprogramma</h2>
                <div style={{ marginBottom: '1rem' }}>
                    <button onClick={handlePrint} style={{ marginRight: '10px' }}>
                        Stampa Cronoprogramma
                    </button>
                    <button onClick={handleSave}>
                        Salva Modifiche
                    </button>
                </div>
                <GanttChart
                    ref={ganttRef}
                    tasks={tasks}
                    onTaskUpdate={handleTaskUpdate}
                    onTaskDelete={handleTaskDelete}
                    onTaskAdd={handleTaskAdd}
                />
            </Grid>
        </Grid>
    );
};

export default ProjectDashboard;
