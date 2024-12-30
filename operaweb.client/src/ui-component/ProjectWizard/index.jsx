import React from 'react';
import { useEffect, useState } from 'react';
// material-ui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';

// project imports
import { getProject, getSoaClassifications, getSoas } from 'api/projects';
import { useParams } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import GeneralForm from './GeneralForm';
import EconomicsForm from './EconomicsForm';
import ConfigurationsForm from './ConfigurationsForm';
import SubjectsForm from './SubjectsForm';
import Tasks from './Tasks';
import { openSnackbar } from 'store/slices/snackbar';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { saveProject, createProject } from 'api/projects';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentProjectId } from 'store/slices/project';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// step options
const steps = ['Generali', 'Configurazioni', 'Soggetti', 'Lavorazioni', 'Quadro economico'];

const getStepContent = (step, handleNext, handleBack, setErrorIndex, projectData, setProjectData, soaOptions, soaClassificationOptions, setSubjectsData, tasksData, setTasksData) => {
    switch (step) {
        case 0:
            return (
                <GeneralForm
                    handleNext={handleNext}
                    setErrorIndex={setErrorIndex}
                    projectData={projectData}
                    setProjectData={setProjectData}
                    soaOptions={soaOptions}
                    soaClassificationsOptions={soaClassificationOptions}
                />
            );
        case 2:
            return (
                <SubjectsForm
                    subjectsData={projectData.subjects}
                    setSubjectsData={(data) =>
                        setProjectData((prev) => ({ ...prev, subjects: data }))
                    }
                    handleNext={handleNext}
                    handleBack={handleBack}
                    setErrorIndex ={setErrorIndex}
                    projectData={projectData}
                    setProjectData={setProjectData}
                />
            );
        case 3:
            return <Tasks
                handleNext={handleNext}
                handleBack={handleBack}
                setErrorIndex={setErrorIndex}
                projectData={projectData}
                setProjectData={setProjectData}
            />;
        case 4:
            return <EconomicsForm
                handleNext={handleNext}
                handleBack={handleBack}
                projectData={projectData}
                setProjectData={setProjectData}
            />;
        case 1:
            return <ConfigurationsForm
                handleNext={handleNext}
                handleBack={handleBack}
                projectData={projectData}
                setProjectData={setProjectData}
            />;
        default:
            throw new Error('Unknown step');
    }
};

// ==============================|| FORMS WIZARD - BASIC ||============================== //

const ProjectWizard = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [projectData, setProjectData] = React.useState({});
    const [subjectsData, setSubjectsData] = React.useState({});
    const [tasksData, setTasksData] = React.useState({});
    const [errorIndex, setErrorIndex] = React.useState(null);
    const [soaOptions, setSoaOptions] = useState(null);
    const [soaClassificationOptions, setSoaClassificationOptions] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const currentImportedProject = useSelector((state) => state.project.currentImportedProject);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchProject = async () => {
            setLoading(true);
            try {
                if (currentImportedProject) {
                    // Copia i Dati nello stato locale
                    setProjectData((prev) => ({
                        ...prev,
                        ...currentImportedProject
                    }));

                    console.log(projectData);
                }

                const soasResponse = await getSoas();
                setSoaOptions(soasResponse);

                const soaClassificationsResponse = await getSoaClassifications();
                setSoaClassificationOptions(soaClassificationsResponse);

            } catch (error) {
                console.error('Errore nel caricamento dei dati SOA Classifications:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();

        return () => {
            controller.abort(); // Annulla la richiesta se il componente viene smontato o l'ID cambia
        };
    }, [currentImportedProject]); // Aggiungi currentImportedProject come dipendenza

    const handleSaveProject = async () => {
        setIsSaving(true); // Mostra il loader
        try {
            if (!projectData.id) {
                // Caso: Nuovo progetto
                const result = await createProject(projectData);
                const newProjectId = result.data.projectId;

                // Aggiorna lo stato locale
                setProjectData((prev) => ({ ...prev, id: newProjectId }));

                // Dispatch su Redux
                dispatch(setCurrentProjectId(newProjectId));

                // Reindirizza alla pagina del progetto
                navigate('/project/');

                openSnackbar({
                    open: true,
                    message: 'Progetto creato con successo!',
                    variant: 'alert',
                    alert: { color: 'success' },
                });
            } else {
                // Caso: Aggiorna progetto esistente
                await saveProject(projectData.id, projectData);

                // Dispatch su Redux
                dispatch(setCurrentProjectId(projectData.id));

                // Reindirizza alla pagina del progetto
                navigate('/project/');

                openSnackbar({
                    open: true,
                    message: 'Progetto aggiornato con successo!',
                    variant: 'alert',
                    alert: { color: 'success' },
                });
            }
        } catch (error) {
            console.error('Errore durante il salvataggio del progetto:', error);

            openSnackbar({
                open: true,
                message: 'Errore durante il salvataggio del progetto.',
                variant: 'alert',
                alert: { color: 'error' },
            });
        } finally {
            setIsSaving(false); // Nascondi il loader
        }
    };

    const confirmSaveProject = async () => {
        setIsConfirmOpen(false); // Chiudi il dialogo
        await handleSaveProject(); // Procedi con il salvataggio
    };

    const handleNext = async () => {
        if (activeStep === steps.length - 1) {
            try {
                setIsConfirmOpen(true); // Apri il dialogo di conferma
              
            } catch (error) {
                openSnackbar({
                    open: true,
                    message: 'Errore durante il salvataggio del progetto.',
                    variant: 'alert',
                    alert: { color: 'error' },
                });
            }
        } else {
            setActiveStep(activeStep + 1);
            setErrorIndex(null);
        }
    };


    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh', // Per centrare lo spinner verticalmente
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <MainCard title={"Wizard Creazione Progetto"}>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                {steps.map((label, index) => {
                    const labelProps = {};

                    if (index === errorIndex) {
                        labelProps.optional = (
                            <Typography variant="caption" color="error">
                                Error
                            </Typography>
                        );

                        labelProps.error = true;
                    }

                    return (
                        <Step key={label}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <>
                <>
                    {getStepContent(
                        activeStep,
                        handleNext,
                        handleBack,
                        setErrorIndex,
                        projectData,
                        setProjectData,
                        soaOptions,
                        soaClassificationOptions,
                        setSubjectsData,
                        tasksData,
                        setTasksData
                    )}
                    {activeStep === steps.length - 1 && (
                        <Stack direction="row" justifyContent={activeStep !== 0 ? 'space-between' : 'flex-end'}>
                            {activeStep !== 0 && (
                                <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                                    Back
                                </Button>
                            )}
                            <AnimateButton>
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ my: 3, ml: 1 }}
                                    disabled={isSaving} // Disabilita il pulsante durante il salvataggio
                                >
                                    {isSaving ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        activeStep === steps.length - 1 ? 'Salva progetto' : 'Next'
                                    )}
                                </Button>
                            </AnimateButton>
                        </Stack>
                    )}
                </>
            </>
            {/* Dialog di conferma */}
            <Dialog
                open={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)} // Chiudi il dialogo se l'utente annulla
            >
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
                    <Button onClick={confirmSaveProject} color="primary" autoFocus>
                        Conferma
                    </Button>
                </DialogActions>
            </Dialog>
        </MainCard>

    );
};

export default ProjectWizard;
