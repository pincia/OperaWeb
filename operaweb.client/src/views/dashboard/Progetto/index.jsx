import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box, CircularProgress, Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { ThemeMode } from 'config';
import { setCurrentProject } from 'store/slices/project';
import { getProject } from 'api/projects';
import ProjectOverview from './ProjectOverview';
import ProjectSummary from './ProjectSummary';
import GanttChart from 'ui-component/GanttChart';
import ProjectActions from './ProjectActions'; // Importa il componente ProjectActions
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

function a11yProps(index) {
    return {
        id: `dashboard-tab-${index}`,
        'aria-controls': `dashboard-tabpanel-${index}`,
    };
}

const ProjectDashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const [projectData, setProjectData] = useState(null);
    const [activeTab, setActiveTab] = useState(0);

    const theme = useTheme();
    const currentProjectId = useSelector((state) => state.project.currentProjectId);
    const dispatch = useDispatch();

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                setLoading(true);
                const response = await getProject(currentProjectId);

                if (response?.data) {
                    dispatch(setCurrentProject(response.data));
                    setProjectData(response.data);
                }
            } catch (error) {
                console.error('Errore durante il recupero del progetto:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjectData();
    }, [currentProjectId, dispatch]);

    const handleDeleteProject = (projectId) => {
        console.log(`Progetto con ID ${projectId} eliminato.`);
        // Qui puoi aggiungere la logica per eliminare il progetto (chiamata API o aggiornamento dello stato)
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
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    {/* Tabs */}
                    <Tabs
                        sx={{
                            '& .MuiTab-root': {
                                minHeight: 'auto',
                                py: 1.5,
                                px: 1.5,
                                mr: 2,
                                color: theme.palette.mode === ThemeMode.DARK ? 'grey.600' : 'grey.900',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            },
                            '& .Mui-selected': {
                                color: theme.palette.primary.main,
                            },
                            '& .MuiTab-wrapper > svg': {
                                mr: 1,
                            },
                        }}
                        value={activeTab}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab
                            label="Panoramica"
                            icon={<PersonOutlinedIcon sx={{ fontSize: '1.3rem' }} />}
                            {...a11yProps(0)}
                        />
                        <Tab
                            label="Dettagli"
                            icon={<PersonOutlinedIcon sx={{ fontSize: '1.3rem' }} />}
                            {...a11yProps(1)}
                        />
                        <Tab
                            label="Cronoprogramma"
                            icon={<PersonOutlinedIcon sx={{ fontSize: '1.3rem' }} />}
                            {...a11yProps(2)}
                        />
                    </Tabs>

                    {/* Project Actions */}
                    <ProjectActions onDelete={() => handleDeleteProject(currentProjectId)} />
                </Box>

                {/* Tab Content */}
                <Box sx={{ mt: 3 }}>
                    {activeTab === 0 && <ProjectOverview projectData={projectData} isLoading={isLoading} />}
                    {activeTab === 1 && <ProjectSummary projectData={projectData} setProjectData={setProjectData} isLoading={isLoading} />}
                    {activeTab === 2 && <GanttChart projectData={projectData} />}
                </Box>
            </Grid>
        </Grid>
    );
};

export default ProjectDashboard;
