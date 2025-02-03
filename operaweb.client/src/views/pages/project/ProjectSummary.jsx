import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Tabs,
    Tab,
    Grid,
    Box,
    Tooltip,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    CircularProgress,
    Button,
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
import { useSelector, useDispatch } from 'react-redux';
import { openSnackbar } from 'store/slices/snackbar';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { setCurrentProject } from 'store/slices/project';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ProjectSummary = () => {
    const theme = useTheme();
    const [activeTab, setActiveTab] = useState(0);
    const [isSaving, setIsSaving] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [projectData, setProjectData] = useState(useSelector((state) => state.project.currentProject));
    const [openSaveDialog, setOpenSaveDialog] = useState(false);
    const [validationState, setValidationState] = useState({
        generalForm: true,
        configurationsForm: true,
        subjectsForm: true,
        tasksForm: true,
        economicsForm: true,
    });

    const dispatch = useDispatch();

    const handleValidationChange = React.useCallback((formName, isValid) => {
    //TODO: cosa fare nel caso il form sia valido
    }, []);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleOpenSaveDialog = () => {
        setOpenSaveDialog(true);
    };

    const handleCloseSaveDialog = () => {
        setOpenSaveDialog(false);
    };

    const handleSaveProject = async () => {
        setIsSaving(true);
        try {
            var updateProjectResponse = await saveProject(projectData.id, projectData);

            // Aggiorna lo stato di Redux con i nuovi dati del progetto
            dispatch(setCurrentProject(updateProjectResponse.data));

            // Aggiorna il local state se necessario
            setProjectData(updateProjectResponse.data);

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
                    message: 'Errore durante il salvataggio del progetto.\r\n' + error,
                    variant: 'alert',
                    alert: { color: 'error' },
                    autoHideDuration: 3500,
                })
            );
        } finally {
            setIsSaving(false);
            setOpenSaveDialog(false);
        }
    };

    const isFormValid = Object.values(validationState).every((isValid) => isValid);

    return (
        <>
            <MainCard content={false}>
                <Box sx={{ p: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
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
                                    {/*<Tab label="Lavorazioni" {...a11yProps(3)} />*/}
                                    <Tab label="Quadro Economico" {...a11yProps(4)} />
                                </Tabs>
                                <Box>
                                    <Tooltip title="Salva Dati Progetto">
                                        <IconButton
                                            color="primary"
                                            onClick={handleOpenSaveDialog}
                                            disabled={!projectData}
                                            sx={{ fontSize: '2.2rem' }}
                                        >
                                            <SaveOutlinedIcon fontSize="inherit" />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            {activeTab === 0 && (
                                <GeneralForm
                                    projectData={projectData}
                                    setProjectData={setProjectData}
                                    onValidationChange={(isValid) =>
                                        handleValidationChange('generalForm', isValid)
                                    }
                                />
                            )}
                            {activeTab === 1 && (
                                <ConfigurationsForm
                                    projectData={projectData}
                                    setProjectData={setProjectData}
                                    onValidationChange={(isValid) =>
                                        handleValidationChange('configurationForm', isValid)
                                    }
                                />
                            )}
                            {activeTab === 2 && (
                                <SubjectsForm
                                    projectData={projectData}
                                    setProjectData={setProjectData}
                                    onValidationChange={(isValid) =>
                                        handleValidationChange('subjectsForm', isValid)
                                    }
                                />
                            )}
                            {activeTab === 3 && (
                                <EconomicsForm
                                    projectData={projectData}
                                    setProjectData={setProjectData}
                                    onValidationChange={(isValid) =>
                                        handleValidationChange('economicsForm', isValid)
                                    }
                                />
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </MainCard>

            {/* Dialog per confermare il salvataggio */}
            <Dialog open={openSaveDialog} onClose={handleCloseSaveDialog}>
                <DialogTitle>Conferma Salvataggio</DialogTitle>
                <DialogContent>
                    <DialogContentText>Procedo con il salvataggio del progetto?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSaveDialog} color="secondary">
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
