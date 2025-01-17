import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Tabs,
    Tab,
    Grid,
    Typography,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
    CircularProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import GeneralForm from 'ui-component/ProjectForms/GeneralForm';
import ConfigurationsForm from 'ui-component/ProjectForms/ConfigurationsForm';
import SubjectsForm from 'ui-component/ProjectForms/SubjectsForm';
import TasksForm from 'ui-component/ProjectForms/Tasks';
import EconomicsForm from 'ui-component/ProjectForms/EconomicsForm';
import { saveProject } from 'api/projects';
import { ThemeMode } from 'config';
import { useDispatch } from 'react-redux';
import { openSnackbar } from 'store/slices/snackbar';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ProjectSummary = ({ projectData, setProjectData, isLoading }) => {
    const theme = useTheme();
    const [activeTab, setActiveTab] = useState(0);
    const [isSaving, setIsSaving] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [validationState, setValidationState] = useState({
        generalForm: true,
        configurationsForm: true,
        subjectsForm: true,
        tasksForm: true,
        economicsForm: true,
    });

    const dispatch = useDispatch();

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleSaveProject = async () => {
        setIsSaving(true);
        try {
            await saveProject(projectData.id, projectData);
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Progetto salvato con successo!',
                    variant: 'alert',
                    alert: { color: 'success' },
                })
            );
        } catch (error) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Errore durante il salvataggio del progetto.',
                    variant: 'alert',
                    alert: { color: 'error' },
                })
            );
        } finally {
            setIsSaving(false);
            setIsConfirmOpen(false);
        }
    };

    const isFormValid = Object.values(validationState).every((isValid) => isValid);

    return (
        <>
            <MainCard content={false}>
                <Box sx={{ p: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h4">Dettagli Progetto</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Tabs
                                value={activeTab}
                                onChange={handleTabChange}
                                sx={{
                                    '& a': {
                                        color: theme.palette.mode === ThemeMode.DARK ? 'grey.600' : 'grey.900',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    },
                                    '& a.Mui-selected': {
                                        color: 'primary.main',
                                    },
                                }}
                            >
                                <Tab label="Dati Generali" {...a11yProps(0)} />
                                <Tab label="Configurazioni" {...a11yProps(1)} />
                                <Tab label="Soggetti" {...a11yProps(2)} />
                                <Tab label="Lavorazioni" {...a11yProps(3)} />
                                <Tab label="Quadro Economico" {...a11yProps(4)} />
                            </Tabs>
                        </Grid>
                        <Grid item xs={12}>
                            {activeTab === 0 && (
                                <GeneralForm
                                    projectData={projectData}
                                    setProjectData={setProjectData}
                                    onValidationChange={(isValid) =>
                                        setValidationState((prev) => ({ ...prev, generalForm: isValid }))
                                    }
                                />
                            )}
                            {activeTab === 1 && (
                                <ConfigurationsForm
                                    projectData={projectData}
                                    setProjectData={setProjectData}
                                    onValidationChange={(isValid) =>
                                        setValidationState((prev) => ({ ...prev, configurationsForm: isValid }))
                                    }
                                />
                            )}
                            {activeTab === 2 && (
                                <SubjectsForm
                                    projectData={projectData}
                                    setProjectData={setProjectData}
                                    onValidationChange={(isValid) =>
                                        setValidationState((prev) => ({ ...prev, subjectsForm: isValid }))
                                    }
                                />
                            )}
                            {activeTab === 3 && (
                                <TasksForm
                                    projectData={projectData}
                                    setProjectData={setProjectData}
                                    onValidationChange={(isValid) =>
                                        setValidationState((prev) => ({ ...prev, tasksForm: isValid }))
                                    }
                                />
                            )}
                            {activeTab === 4 && (
                                <EconomicsForm
                                    projectData={projectData}
                                    setProjectData={setProjectData}
                                    onValidationChange={(isValid) =>
                                        setValidationState((prev) => ({ ...prev, economicsForm: isValid }))
                                    }
                                />
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </MainCard>
            <Button
                variant="contained"
                onClick={() => setIsConfirmOpen(true)}
                disabled={!isFormValid}
                sx={{ my: 3, ml: 1 }}
            >
                Salva Dati Progetto
            </Button>
            <Dialog open={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
                <DialogTitle>Conferma Salvataggio</DialogTitle>
                <DialogContent>
                    <DialogContentText>Procedo con il salvataggio del progetto?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsConfirmOpen(false)} color="secondary">
                        Annulla
                    </Button>
                    <Button
                        onClick={handleSaveProject}
                        color="primary"
                        disabled={isSaving}
                        startIcon={isSaving && <CircularProgress size={20} color="inherit" />}
                    >
                        {isSaving ? 'Salvataggio...' : 'Conferma'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

ProjectSummary.propTypes = {
    isLoading: PropTypes.bool,
    projectData: PropTypes.object.isRequired,
    setProjectData: PropTypes.func.isRequired,
};

export default ProjectSummary;
