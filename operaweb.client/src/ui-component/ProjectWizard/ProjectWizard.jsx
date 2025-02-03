import React, { useEffect, useState } from 'react';
import { Button, Stack, Step, StepLabel, Stepper, Typography, Box, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, CircularProgress } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openSnackbar } from 'store/slices/snackbar';
import { setCurrentProjectId } from 'store/slices/project';
import GeneralForm from 'ui-component/ProjectForms/GeneralForm';
import ConfigurationsForm from 'ui-component/ProjectForms/ConfigurationsForm';
import SubjectsForm from 'ui-component/ProjectForms/SubjectsForm';
import CustomTasks from 'ui-component/ProjectForms/CustomTasks';
import EconomicsForm from 'ui-component/ProjectForms/EconomicsForm';
import { saveProject, createProject } from 'api/projects';
import { getConfigurations } from 'api/config';

const steps = ['Generali', 'Configurazioni', 'Soggetti', 'Lavorazioni', 'Quadro economico'];

const ProjectWizard = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [projectData, setProjectData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [validationState, setValidationState] = useState({});
    const isCurrentStepValid = validationState[activeStep] || false;

    const fetchAndPrepopulateConfigurations = async () => {
        try {
            const generalConfigurations = await getConfigurations();
            setProjectData((prevData) => ({
                ...prevData,
                configurations: {
                    numeri: prevData?.configurations?.numeri || generalConfigurations.configNumeri,
                    analisi: prevData?.configurations?.analisi || generalConfigurations.configAnalisi,
                    resourceTeamType: prevData?.configurations?.resourceTeamType || generalConfigurations.resourceTeamType,
                },
            }));
        } catch (error) {
            console.error('Errore durante il caricamento delle configurazioni generali:', error);
        }
    };

    useEffect(() => {
        const initializeProject = async () => {
            await fetchAndPrepopulateConfigurations();
            setLoading(false);
        };

        initializeProject();
    }, [projectData]);

    const handleNext = async () => {
        if (activeStep === steps.length - 1) {
            setIsConfirmOpen(true);
        } else {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleSaveProject = async () => {
        setIsSaving(true);
        try {
            await createProject(projectData);
            dispatch(setCurrentProjectId(projectId));
            navigate('/project/overview');
            dispatch(openSnackbar({
                open: true,
                message: 'Progetto creato con successo!',
                variant: 'alert',
                alert: { color: 'success' },
            }));
        } catch (error) {
            dispatch(  openSnackbar({
                open: true,
                message: 'Errore durante la creazione del progetto.\r\n' + response,
                variant: 'alert',
                alert: { color: 'error' },
            }));
        } finally {
            setIsSaving(false);
            setIsConfirmOpen(false);
        }
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <GeneralForm
                        projectData={projectData}
                        setProjectData={setProjectData}
                        onValidationChange={(isValid) =>
                            setValidationState((prev) => ({ ...prev, [step]: isValid }))
                        }
                    />
                );
            case 1:
                return (
                    <ConfigurationsForm
                        projectData={projectData}
                        setProjectData={setProjectData}
                        onValidationChange={(isValid) =>
                            setValidationState((prev) => ({ ...prev, [step]: isValid }))
                        }
                    />
                );
            case 2:
                return (
                    <SubjectsForm
                        projectData={projectData}
                        setProjectData={setProjectData}
                        onValidationChange={(isValid) =>
                            setValidationState((prev) => ({ ...prev, [step]: isValid }))
                        }
                    />
                );
            case 3:
                return (
                    <CustomTasks
                        projectData={projectData}
                        setProjectData={setProjectData}
                        onValidationChange={(isValid) =>
                            setValidationState((prev) => ({ ...prev, [step]: isValid }))
                        }
                    />
                );
            case 4:
                return (
                    <EconomicsForm
                        projectData={projectData}
                        setProjectData={setProjectData}
                        onValidationChange={(isValid) =>
                            setValidationState((prev) => ({ ...prev, [step]: isValid }))
                        }
                    />
                );
            default:
                throw new Error('Unknown step');
        }
    };


    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <MainCard title={"Wizard Creazione Progetto"}>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {getStepContent(activeStep)}

            <Stack direction="row" justifyContent="space-between" sx={{ mt: 3 }}>
                <Button disabled={activeStep === 0} onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                    Indietro
                </Button>

                <Button
                    variant="contained"
                    disabled={!isCurrentStepValid || isSaving}
                    onClick={handleNext}
                    sx={{ my: 3, ml: 1 }}
                >
                    {activeStep === steps.length - 1 ? 'Salva Progetto' : 'Avanti'}
                </Button>
            </Stack>

            <Dialog open={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
                <DialogTitle>Conferma Salvataggio</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Procedo con il salvataggio del progetto?
                    </DialogContentText>
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
        </MainCard>
    );
};

export default ProjectWizard;
