import React, { useEffect, useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentProject } from 'store/slices/project';
import GanttChart from 'ui-component/GanttChart';
import GeneralForm from 'ui-component/ProjectWizard/GeneralForm';
import ConfigurationsForm from 'ui-component/ProjectWizard/ConfigurationsForm';
import SubjectsForm from 'ui-component/ProjectWizard/SubjectsForm';
import TasksForm from 'ui-component/ProjectWizard/Tasks';
import EconomicsForm from 'ui-component/ProjectWizard/EconomicsForm';
import { getProject, saveProject } from 'api/projects';
import { gridSpacing } from 'store/constant';

const ProjectDashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const [projectData, setProjectData] = useState(null);
    const [tasks, setTasks] = useState({
        data: [],
        links: [],
    });
    const [activeTab, setActiveTab] = useState(0);
    const ganttRef = useRef(null);

    const currentProjectId = 28;//useSelector((state) => state.project.currentProjectId);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                setLoading(true);
                const response = await getProject(currentProjectId);
                dispatch(setCurrentProject(response.data));
                setProjectData(response.data);

                if (response.data.tasks) {
                    setTasks({
                        data: response.data.tasks,
                        links: response.data.links || [],
                    });
                }
            } catch (error) {
                console.error('Errore durante il recupero del progetto:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjectData();
    }, [currentProjectId, dispatch]);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

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

    const handleSaveChanges = async () => {
        try {
            await saveProject(projectData.id, { ...projectData, tasks: tasks.data });
            alert('Modifiche salvate con successo!');
        } catch (error) {
            console.error('Errore durante il salvataggio:', error);
            alert('Errore durante il salvataggio.');
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
            {/* Informazioni Generali */}
            <Grid item xs={12}>
                <Box mb={2}>
                    <Typography variant="h4">{projectData?.name}</Typography>
                    <Typography variant="body1">{projectData?.description}</Typography>
                    <Typography variant="body2">Stato: {projectData?.status}</Typography>
                </Box>
            </Grid>

            {/* Statistiche */}
            <Grid item xs={12}>
                <Box mb={2}>
                    <Typography variant="h6">Statistiche</Typography>
                    <Typography variant="body2">
                        Task Completati: {tasks.data.filter((task) => task.completed).length}/{tasks.data.length}
                    </Typography>
                </Box>
            </Grid>

            {/* Gantt delle Lavorazioni */}
            <Grid item xs={12}>
                <Box mb={2}>
                    <Typography variant="h6">Cronoprogramma</Typography>
                    <div style={{ marginBottom: '1rem' }}>
                        <Button onClick={handleSaveChanges} variant="contained" style={{ marginRight: '10px' }}>
                            Salva Modifiche
                        </Button>
                        <Button onClick={() => ganttRef.current?.exportToPDF()} variant="outlined">
                            Stampa Cronoprogramma
                        </Button>
                    </div>
                    <GanttChart
                        ref={ganttRef}
                        tasks={tasks}
                        onTaskUpdate={handleTaskUpdate}
                        onTaskDelete={handleTaskDelete}
                        onTaskAdd={handleTaskAdd}
                    />
                </Box>
            </Grid>

            {/* Scheda Dettagli con Tabs */}
            <Grid item xs={12}>
                <Box>
                    <Tabs value={activeTab} onChange={handleTabChange} aria-label="tabs">
                        <Tab label="Generali" />
                        <Tab label="Configurazioni" />
                        <Tab label="Soggetti" />
                        <Tab label="Lavorazioni" />
                        <Tab label="Quadro Economico" />
                    </Tabs>
                    <Box mt={2}>
                        {activeTab === 0 && (
                            <GeneralForm projectData={projectData} setProjectData={setProjectData} />
                        )}
                        {activeTab === 1 && (
                            <ConfigurationsForm projectData={projectData} setProjectData={setProjectData} />
                        )}
                        {activeTab === 2 && (
                            <SubjectsForm
                                subjectsData={projectData.subjects}
                                setSubjectsData={(data) =>
                                    setProjectData((prev) => ({ ...prev, subjects: data }))
                                }
                            />
                        )}
                        {activeTab === 3 && (
                            <TasksForm
                                tasksData={projectData.tasks}
                                setTasksData={(data) => setProjectData((prev) => ({ ...prev, tasks: data }))}
                            />
                        )}
                        {activeTab === 4 && (
                            <EconomicsForm projectData={projectData} setProjectData={setProjectData} />
                        )}
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ProjectDashboard;
