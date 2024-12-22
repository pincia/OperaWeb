import React from 'react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'store';
// material-ui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/material';
// project imports
import { getProject, getSoaClassifications, getSoas } from 'api/projects';
import { useParams, useNavigate } from 'react-router-dom';
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
import { saveProject } from 'api/projects';
//redux slices
import { setCurrentProject, clearImportedProject } from 'store/slices/project';

// step options
const steps = ['Generali', 'Soggetti', 'Lavorazioni', 'Quadro economico', 'Configurazioni'];

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
        case 1:
            return (
                <SubjectsForm
                    subjectsData={projectData.subjects}
                    setSubjectsData={(data) =>
                        setProjectData((prev) => ({ ...prev, subjects: data }))
                    }
                    handleNext={handleNext}
                    handleBack={handleBack}
                    setErrorIndex={setErrorIndex}
                    projectData={projectData}
                    setProjectData={setProjectData}
                />
            );
        case 2:
            return <Tasks
                handleNext={handleNext}
                handleBack={handleBack}
                setErrorIndex={setErrorIndex}
                projectData={projectData}
                setProjectData={setProjectData}
            />;
        case 3:
            return <EconomicsForm
                handleNext={handleNext}
                handleBack={handleBack}
                projectData={projectData}
                setProjectData={setProjectData}
            />;
        case 4:
            return <ConfigurationsForm
                handleNext={handleNext}
                handleBack={handleBack}
                projectData={projectData}
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
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentImportedProject = useSelector((state) => state.project.currentImportedProject);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchProject = async () => {
            setLoading(true);
            try {
                if (id) {
                    const projectResponse = await getProject(id, { signal });
                    projectResponse.data.subjects = [];
                    setProjectData(projectResponse.data);

                } else if (currentImportedProject) {
                    // Copia i Dati nello stato locale
                    setProjectData((prev) => ({
                        ...prev,
                        ...currentImportedProject
                    }));

                    console.log(projectData)
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
    }, [id]);

    const handleNext = async () => {
        if (activeStep === steps.length - 1) {
            try {
                const savedProject = await saveProject(projectData.id, projectData);

                // Imposta il progetto come currentProject nello stato Redux
                dispatch(setCurrentProject(savedProject));

                // Resetta currentImportedProject
                dispatch(clearImportedProject());

                // Mostra il dialog di conferma
                setDialogOpen(true);
            } catch (error) {
                console.error('Errore durante il salvataggio del progetto:', error);
            }
        } else {
            setActiveStep(activeStep + 1);
            setErrorIndex(null);
        }
    };


    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        navigate('/project'); // Naviga alla pagina del progetto
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
        <MainCard title={id ? "Modifica dati progetto" : "Wizard Creazione Progetto"}>
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
                                <Button variant="contained" onClick={handleNext} sx={{ my: 3, ml: 1 }}>
                                    {activeStep === steps.length - 1 ? 'Salva progetto' : 'Next'}
                                </Button>
                            </AnimateButton>
                        </Stack>
                    )}
                </>
            </>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Progetto Salvato</DialogTitle>
                <DialogContent>
                    <Typography>Il progetto è stato salvato con successo!</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} variant="contained" color="primary">
                        Vai al progetto
                    </Button>
                </DialogActions>
            </Dialog>
        </MainCard>
    );
};

export default ProjectWizard;
