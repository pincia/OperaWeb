import React, { useEffect, useState } from 'react';
import { Button, Stack, Step, StepLabel, Stepper, Typography, Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openSnackbar } from 'store/slices/snackbar';
import { setCurrentProjectId } from 'store/slices/project';
import GeneralForm from './GeneralForm';
import ConfigurationsForm from './ConfigurationsForm';
import SubjectsForm from './SubjectsForm';
import Tasks from './Tasks';
import EconomicsForm from './EconomicsForm';
import { saveProject, createProject } from 'api/projects';
import { useFormik } from 'formik';
const steps = ['Generali', 'Configurazioni', 'Soggetti', 'Lavorazioni', 'Quadro economico'];

const ProjectWizard = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [projectData, setProjectData] = useState({});
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const currentImportedProject = useSelector((state) => state.project.currentImportedProject);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [validationState, setValidationState] = useState({});
    const isCurrentStepValid = validationState[activeStep] || false;

    useEffect(() => {
        if (currentImportedProject) {
            setProjectData(currentImportedProject);
        }
        setLoading(false);
    }, [currentImportedProject]);

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
            let projectId;
            if (!projectData.id) {
                const result = await createProject(projectData);
                projectId = result.data.projectId;
                setProjectData((prev) => ({ ...prev, id: projectId }));
            } else {
                await saveProject(projectData.id, projectData);
                projectId = projectData.id;
            }
            dispatch(setCurrentProjectId(projectId));
            navigate('/project/');
            openSnackbar({
                open: true,
                message: 'Progetto salvato con successo!',
                variant: 'alert',
                alert: { color: 'success' },
            });
        } catch (error) {
            openSnackbar({
                open: true,
                message: 'Errore durante il salvataggio del progetto.',
                variant: 'alert',
                alert: { color: 'error' },
            });
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
                    <Tasks
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
                    <Button onClick={handleSaveProject} color="primary">
                        Conferma
                    </Button>
                </DialogActions>
            </Dialog>
        </MainCard>
    );
};

export default ProjectWizard;
