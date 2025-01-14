import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
    TextField,
    Grid,
    Typography,
    Box,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Stack,
    FormLabel,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    MeasuredWorks: yup.number().min(0, 'Il valore minimo è 0').required('Campo obbligatorio'),
    LumpSumWorks: yup.number().min(0, 'Il valore minimo è 0').required('Campo obbligatorio'),
    SafetyCosts: yup.number().min(0, 'Il valore minimo è 0').required('Campo obbligatorio'),
    LaborCosts: yup.number().min(0, 'Il valore minimo è 0').required('Campo obbligatorio'),
    AuctionVariationPercentage: yup
        .string()
        .matches(/^-?\d*\.?\d+$/, 'Inserisci un numero valido')
        .required('Campo obbligatorio'),
    AvailableSums: yup.number().min(0, 'Il valore minimo è 0').required('Campo obbligatorio'),
});

const EconomicsForm = ({ projectData, setProjectData, onValidationChange }) => {
    const [calculatedFields, setCalculatedFields] = useState({
        BaseBidAmount: projectData.economics?.BaseBidAmount || 0,
        AuctionVariationAmount: projectData.economics?.AuctionVariationAmount || 0,
        TotalAssignedWorks: projectData.economics?.TotalAssignedWorks || 0,
        TotalProjectAmount: projectData.economics?.TotalProjectAmount || 0,
    });

    const activeFieldRef = useRef(null);

    const formik = useFormik({
        initialValues: {
            MeasuredWorks: projectData.economics?.MeasuredWorks || 0,
            LumpSumWorks: projectData.economics?.LumpSumWorks || 0,
            SafetyCosts: projectData.economics?.SafetyCosts || 0,
            LaborCosts: projectData.economics?.LaborCosts || 0,
            AuctionVariationPercentage: projectData.economics?.AuctionVariationPercentage || 0,
            AvailableSums: projectData.economics?.AvailableSums || 0,
            TotalProjectCalculationType: projectData.economics?.TotalProjectCalculationType || 1,
        },
        validationSchema,
        validateOnBlur: true,
        onSubmit: (values) => {
            setProjectData((prev) => ({
                ...prev,
                economics: {
                    ...values,
                    ...calculatedFields, // Include i campi calcolati
                },
            }));
        },
    });

    useEffect(() => {
        const {
            MeasuredWorks,
            LumpSumWorks,
            SafetyCosts,
            LaborCosts,
            AuctionVariationPercentage,
            AvailableSums,
            TotalProjectCalculationType,
        } = formik.values;

        const calculateFields = () => {
            const BaseBidAmount =
                parseFloat(MeasuredWorks) +
                parseFloat(LumpSumWorks) +
                parseFloat(SafetyCosts) +
                parseFloat(LaborCosts);
            const AuctionVariationAmount =
                BaseBidAmount * (parseFloat(AuctionVariationPercentage) / 100);
            const TotalAssignedWorks = BaseBidAmount + AuctionVariationAmount;

            let TotalProjectAmount = 0;
            switch (parseInt(TotalProjectCalculationType, 10)) {
                case 1:
                    TotalProjectAmount = BaseBidAmount;
                    break;
                case 2:
                    TotalProjectAmount = TotalAssignedWorks;
                    break;
                case 3:
                    TotalProjectAmount = TotalAssignedWorks + parseFloat(AvailableSums);
                    break;
                case 4:
                    TotalProjectAmount = BaseBidAmount + parseFloat(AvailableSums);
                    break;
                default:
                    TotalProjectAmount = 0;
            }

            setCalculatedFields({
                BaseBidAmount: BaseBidAmount.toFixed(2),
                AuctionVariationAmount: AuctionVariationAmount.toFixed(2),
                TotalAssignedWorks: TotalAssignedWorks.toFixed(2),
                TotalProjectAmount: TotalProjectAmount.toFixed(2),
            });
        };

        calculateFields();
    }, [
        formik.values.MeasuredWorks,
        formik.values.LumpSumWorks,
        formik.values.SafetyCosts,
        formik.values.LaborCosts,
        formik.values.AuctionVariationPercentage,
        formik.values.AvailableSums,
        formik.values.TotalProjectCalculationType,
    ]);

    useEffect(() => {
        setProjectData((prev) => ({
            ...prev,
            economics: {
                ...formik.values,
                ...calculatedFields,
            },
        }));
    }, [formik.values, calculatedFields, setProjectData]);

    useEffect(() => {
        onValidationChange(formik.isValid);
    }, [formik.values]);

    const handleBlur = (e) => {
        const { name } = e.target;
        formik.handleBlur(e);
        activeFieldRef.current = null; // Rimuovi il riferimento al campo attivo dopo il blur
    };

    const EconomicsField = ({ label, name, readOnly = false, type = 'text' }) => (
        <Box
            sx={{
                marginBottom: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
            }}
        >
            <FormLabel
                sx={{
                    fontWeight: 'bold',
                    color: readOnly ? 'black' : 'inherit',
                    marginRight: name === 'AuctionVariationPercentage' ? '20px' : '0',
                    marginLeft: name === 'AuctionVariationPercentage' ? 'auto' : '0', 
                }}
            >
                {label}
            </FormLabel>
            <TextField
                name={name}
                value={readOnly ? calculatedFields[name] || '' : formik.values[name] || ''}
                onChange={!readOnly ? formik.handleChange : undefined}
                onBlur={!readOnly ? handleBlur : undefined}
                type={type}
                error={formik.touched[name] && Boolean(formik.errors[name])}
                helperText={formik.touched[name] && formik.errors[name]}
                inputRef={(input) => {
                    if (activeFieldRef.current === name) {
                        input?.focus();
                    }
                }}
                onFocus={() => (activeFieldRef.current = name)}
                sx={{
                    width: name === 'AuctionVariationPercentage' ? '80px' : '200px',
                    marginRight: name === 'AuctionVariationPercentage' ? '20px' : '0',
                    marginLeft: name === 'AuctionVariationPercentage' ? 'auto' : '0', // Sposta il campo verso destra solo per questo specifico campo
                    backgroundColor: readOnly ? 'rgba(240, 240, 240, 0.8)' : 'inherit',
                    fontWeight: readOnly ? 'bold' : 'normal',
                    pointerEvents: readOnly ? 'none' : 'auto',
                    border: readOnly ? '2px solid grey' : '1px solid rgba(0, 0, 0, 0.23)',
                    borderRadius: '4px',
                }}
                InputProps={{
                    readOnly,
                    style: readOnly ? { fontWeight: 'bold', borderWidth: '2px' } : {},
                }}
            />
        </Box>
    );


    return (
        <Stack>
            <Box p={3}>
                <Typography variant="h5" gutterBottom>
                    Quadro Economico
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Gestione somme del progetto
                </Typography>
                <Typography variant="h3" gutterBottom mt={1}>
                    A) LAVORI
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <EconomicsField label="Lavori a Misura" name="MeasuredWorks" type="number" />
                        <EconomicsField label="Lavori a Corpo" name="LumpSumWorks" type="number" />
                      
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <EconomicsField label="Costi della Sicurezza" name="SafetyCosts" type="number" />
                        <EconomicsField label="Costi della Manodopera" name="LaborCosts" type="number" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <EconomicsField label="Variazione d'Asta del (%)" name="AuctionVariationPercentage" type="text" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <EconomicsField label="Importo Variazione d'Asta" name="AuctionVariationAmount" readOnly />      
                     
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>   <EconomicsField label="Lavori a Base d'Asta" name="BaseBidAmount" readOnly /> </Grid>
                    <Grid item xs={12} md={3}>  </Grid>
                    <Grid item xs={12} md={3}> </Grid>
                    <Grid item xs={12} md={3}>          <EconomicsField label="Totale Lavori Affidati" name="TotalAssignedWorks" readOnly /></Grid>
          
                </Grid>
                <Grid container spacing={2}>
                    <Grid
                        item
                        xs={12}
                        md={3}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h3" gutterBottom mt={1}>
                            B) Somme a Disposizione
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>  </Grid>
                    <Grid item xs={12} md={3}>  </Grid>
                    <Grid item xs={12} md={3}>
                        <EconomicsField label="Somme a Disposizione" name="AvailableSums" type="number" />
                    </Grid>
                </Grid>

                <Typography variant="h3" gutterBottom mt={1}>
                    C) Totale Progetto (A + B)
                </Typography>
                <Grid container spacing={2}>
                
                    <Grid item xs={12} md={6}>
                        <FormLabel
                            sx={{
                                minWidth: '200px',
                                fontWeight: 'bold',
                                color: 'black'
                            }}
                        >
                            Tipologia totale
                        </FormLabel>
                        <FormControl fullWidth>
                            <Select
                                name="TotalProjectCalculationType"
                                value={formik.values.TotalProjectCalculationType || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <MenuItem value={1}>LAVORI A BASE D'ASTA</MenuItem>
                                <MenuItem value={2}>LAVORI AFFIDATI</MenuItem>
                                <MenuItem value={3}>LAVORI AFFIDATI + SOMME A DISPOSIZIONE</MenuItem>
                                <MenuItem value={4}>LAVORI A BASE D'ASTA + SOMME A DISPOSIZIONE</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}></Grid>
                    <Grid item xs={12} md={3}>
                        <EconomicsField label="Totale Progetto" name="TotalProjectAmount" readOnly />
                    </Grid>
                </Grid>
            </Box>
        </Stack>
    );
};

EconomicsForm.propTypes = {
    projectData: PropTypes.shape({
        economics: PropTypes.object.isRequired,
    }).isRequired,
    setProjectData: PropTypes.func.isRequired,
    onValidationChange: PropTypes.func.isRequired,
};

export default EconomicsForm;
