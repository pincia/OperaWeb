import React from 'react';
import { forwardRef, useEffect, useRef, useState } from 'react';
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
import SubjectsForm from './SubjectsForm';
import Review from './Review';
import { openSnackbar } from 'store/slices/snackbar';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// step options
const steps = ['Generali', 'Soggetti', 'Lavorazioni', 'Quadro economico', 'Configurazioni'];

const getStepContent = (step, handleNext, handleBack, setErrorIndex, projectData, setProjectData, soaOptions, soaClassificationOptions, setSubjectsData) => {
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
                    handleNext={handleNext}
                    handleBack={handleBack}
                    setErrorIndex={setErrorIndex}
                    paymentData={projectData}
                    setSubjectsData={setSubjectsData}
                />
            );
        case 2:
            return <Review />;
        default:
            throw new Error('Unknown step');
    }
};

// ==============================|| FORMS WIZARD - BASIC ||============================== //

const ProjectWizard = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [projectData, setProjectData] = React.useState({});
    const [subjectsData, setSubjectsData] = React.useState({});
    const [errorIndex, setErrorIndex] = React.useState(null);
    const [soaOptions, setSoaOptions] = useState(null);
    const [soaClassificationOptions, setSoaClassificationOptions] = useState(null);

    const [loading, setLoading] = useState(true);
    const { id } = useParams();


    useEffect(() => {


        const controller = new AbortController();
        const signal = controller.signal;

        const fetchProject = async () => {
            setLoading(true);
            try {
                if (id) {
                    const projectResponse = await getProject(id, { signal });
                    setProjectData(projectResponse.data);

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

    const handleNext = () => {
        setActiveStep(activeStep + 1);
        setErrorIndex(null);
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
                {activeStep === steps.length ? (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Thank you for your order.
                        </Typography>
                        <Typography variant="subtitle1">
                            Your order number is #2001539. We have emailed your order confirmation, and will send you an update when your
                            order has shipped.
                        </Typography>
                        <Stack direction="row" justifyContent="flex-end">
                            <AnimateButton>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => {
                                        setGeneralData({});
                                        setPaymentData({});
                                        setActiveStep(0);
                                    }}
                                    sx={{ my: 3, ml: 1 }}
                                >
                                    Reset
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </>
                ) : (
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
                            setSubjectsData
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
                                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                    </Button>
                                </AnimateButton>
                            </Stack>
                        )}
                    </>
                )}
            </>
        </MainCard>
    );
};

export default ProjectWizard;
