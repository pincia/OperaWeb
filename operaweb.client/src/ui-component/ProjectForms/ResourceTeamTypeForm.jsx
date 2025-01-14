import React, { useEffect } from 'react';
import { Grid, TextField, Typography, FormControl, FormLabel } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

// Schema di validazione
const validationSchema = yup.object({
    specializedQuantity: yup.number().min(0, 'Valore minimo 0').required('Campo obbligatorio'),
    specializedHourlyRate: yup.number().min(0, 'Valore minimo 0').required('Campo obbligatorio'),
    qualifiedQuantity: yup.number().min(0, 'Valore minimo 0').required('Campo obbligatorio'),
    qualifiedHourlyRate: yup.number().min(0, 'Valore minimo 0').required('Campo obbligatorio'),
    commonQuantity: yup.number().min(0, 'Valore minimo 0').required('Campo obbligatorio'),
    commonHourlyRate: yup.number().min(0, 'Valore minimo 0').required('Campo obbligatorio'),
});

export default function ResourceTeamTypeForm({ projectData, setProjectData, onValidationChange }) {
    const formik = useFormik({
        initialValues: {
            specializedQuantity: projectData?.configurations?.resourceTeamType?.specializedQuantity || 0,
            specializedHourlyRate: projectData?.configurations?.resourceTeamType?.specializedHourlyRate || 0,
            qualifiedQuantity: projectData?.configurations?.resourceTeamType?.qualifiedQuantity || 0,
            qualifiedHourlyRate: projectData?.configurations?.resourceTeamType?.qualifiedHourlyRate || 0,
            commonQuantity: projectData?.configurations?.resourceTeamType?.commonQuantity || 0,
            commonHourlyRate: projectData?.configurations?.resourceTeamType?.commonHourlyRate || 0,
        },
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: () => { }, // Non serve inviare dati direttamente
    });

    // Comunica lo stato di validazione al genitore
    useEffect(() => {
        onValidationChange(formik.isValid);
    }, [formik.values]);

    // Salva i dati
    useEffect(() => {
        setProjectData((prev) => ({
            ...prev,
            configurations: {
                ...prev.configurations,
                resourceTeamType: {
                    specializedQuantity: formik.values.specializedQuantity,
                    specializedHourlyRate: formik.values.specializedHourlyRate,
                    qualifiedQuantity: formik.values.qualifiedQuantity,
                    qualifiedHourlyRate: formik.values.qualifiedHourlyRate,
                    commonQuantity: formik.values.commonQuantity,
                    commonHourlyRate: formik.values.commonHourlyRate,
                },
            },
        }));
    }, [
        formik.values.specializedQuantity,
        formik.values.specializedHourlyRate,
        formik.values.qualifiedQuantity,
        formik.values.qualifiedHourlyRate,
        formik.values.commonQuantity,
        formik.values.commonHourlyRate,
        setProjectData,
    ]);

    return (
        <Grid item sx={{ borderRadius: '4px', padding: 2 }}>
            <Typography variant="h3" gutterBottom>
                Configurazione Risorse Squadra Tipo
            </Typography>
            <Typography variant="body2" gutterBottom>
                Imposta i parametri per le risorse della squadra tipo.
            </Typography>
            <Grid container spacing={2} marginTop={2}>
                <Grid item xs={6}>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <FormLabel>Quantit&agrave; Manodopera Specializzata</FormLabel>
                        <TextField
                            type="number"
                            name="specializedQuantity"
                            value={formik.values.specializedQuantity}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.specializedQuantity && Boolean(formik.errors.specializedQuantity)}
                            helperText={formik.touched.specializedQuantity && formik.errors.specializedQuantity}
                            variant="outlined"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <FormLabel>Tariffa Oraria Manodopera Specializzata €</FormLabel>
                        <TextField
                            type="number"
                            name="specializedHourlyRate"
                            value={formik.values.specializedHourlyRate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.specializedHourlyRate && Boolean(formik.errors.specializedHourlyRate)}
                            helperText={formik.touched.specializedHourlyRate && formik.errors.specializedHourlyRate}
                            variant="outlined"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <FormLabel>Quantit&agrave; Manodopera Qualificata</FormLabel>
                        <TextField
                            type="number"
                            name="qualifiedQuantity"
                            value={formik.values.qualifiedQuantity}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.qualifiedQuantity && Boolean(formik.errors.qualifiedQuantity)}
                            helperText={formik.touched.qualifiedQuantity && formik.errors.qualifiedQuantity}
                            variant="outlined"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <FormLabel>Tariffa Oraria Manodopera Qualificata €</FormLabel>
                        <TextField
                            type="number"
                            name="qualifiedHourlyRate"
                            value={formik.values.qualifiedHourlyRate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.qualifiedHourlyRate && Boolean(formik.errors.qualifiedHourlyRate)}
                            helperText={formik.touched.qualifiedHourlyRate && formik.errors.qualifiedHourlyRate}
                            variant="outlined"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <FormLabel>Quantit&agrave; Manodopera Comune</FormLabel>
                        <TextField
                            type="number"
                            name="commonQuantity"
                            value={formik.values.commonQuantity}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.commonQuantity && Boolean(formik.errors.commonQuantity)}
                            helperText={formik.touched.commonQuantity && formik.errors.commonQuantity}
                            variant="outlined"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <FormLabel>Tariffa Oraria Manodopera Comune €</FormLabel>
                        <TextField
                            type="number"
                            name="commonHourlyRate"
                            value={formik.values.commonHourlyRate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.commonHourlyRate && Boolean(formik.errors.commonHourlyRate)}
                            helperText={formik.touched.commonHourlyRate && formik.errors.commonHourlyRate}
                            variant="outlined"
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </Grid>
    );
}
