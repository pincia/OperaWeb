import React, { useEffect } from 'react';
import { Grid, TextField, Typography, Select, FormControl, MenuItem, FormLabel } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    speseGenerali: yup.number().min(0, 'Valore minimo 0').required('Campo obbligatorio'),
    utiliImpresa: yup.number().min(0, 'Valore minimo 0').required('Campo obbligatorio'),
    metodo: yup.number().required('Campo obbligatorio'), // Cambiato a number
    applicataA: yup.number().required('Campo obbligatorio'), // Cambiato a number
});

export default function GeneralAnalysisConfigurationForm({ configurations, setConfigurations, onValidationChange }) {
    const formik = useFormik({
        initialValues: {
            speseGenerali: configurations?.configAnalisi?.speseGenerali || 0,
            utiliImpresa: configurations?.configAnalisi?.utiliImpresa || 0,
            metodo: configurations?.configAnalisi?.metodo || 0, // Indice
            applicataA: configurations?.configAnalisi?.applicataA || 0, // Indice
        },
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        enableReinitialize: true, // Ri-inizializza con valori aggiornati
        onSubmit: () => { }, // Non serve inviare dati direttamente
    });

    useEffect(() => {
        const updatedAnalysis = {
            speseGenerali: formik.values.speseGenerali,
            utiliImpresa: formik.values.utiliImpresa,
            metodo: formik.values.metodo,
            applicataA: formik.values.applicataA,
        };
        setConfigurations((prev) => ({
            ...prev,
            configAnalisi: updatedAnalysis,
        }));
    }, [formik.values, setConfigurations]);

    // Comunica lo stato di validazione al genitore
    useEffect(() => {
        onValidationChange(formik.isValid);
    }, [formik.isValid, onValidationChange]);

    const metodoOptions = ['NETTO + (Netto*SG) + (Netto*UI)', 'NETTO + (Netto*SG) + ((Netto+SG)*UI)'];
    const applicataAOptions = ['Netto', 'Spese+Utile', 'Solo spese', 'Solo Utile', 'Totale'];

    return (
        <Grid item sx={{ borderRadius: '4px' }}>
            <Typography variant="h3" gutterBottom>
                Configurazioni Analisi Generali
            </Typography>
            <Typography variant="body2" gutterBottom>
                Parametri per il calcolo delle analisi e dei prezzi.
            </Typography>
            <Grid container spacing={2} marginTop={2}>
                <Grid item xs={12}>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <FormLabel>Metodo</FormLabel>
                        <Select
                            name="metodo"
                            value={formik.values.metodo}
                            onChange={(e) => formik.setFieldValue('metodo', parseInt(e.target.value, 10))}
                            onBlur={formik.handleBlur}
                            error={formik.touched.metodo && Boolean(formik.errors.metodo)}
                            variant="outlined"
                        >
                            {metodoOptions.map((option, index) => (
                                <MenuItem key={index} value={index}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <FormLabel>Spese Generali</FormLabel>
                        <TextField
                            type="number"
                            name="speseGenerali"
                            value={formik.values.speseGenerali}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.speseGenerali && Boolean(formik.errors.speseGenerali)}
                            helperText={formik.touched.speseGenerali && formik.errors.speseGenerali}
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <FormLabel>Utile Impresa</FormLabel>
                        <TextField
                            type="number"
                            name="utiliImpresa"
                            value={formik.values.utiliImpresa}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.utiliImpresa && Boolean(formik.errors.utiliImpresa)}
                            helperText={formik.touched.utiliImpresa && formik.errors.utiliImpresa}
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <FormLabel>Applicata A</FormLabel>
                        <Select
                            name="applicataA"
                            value={formik.values.applicataA}
                            onChange={(e) => formik.setFieldValue('applicataA', parseInt(e.target.value, 10))}
                            onBlur={formik.handleBlur}
                            error={formik.touched.applicataA && Boolean(formik.errors.applicataA)}
                            variant="outlined"
                        >
                            {applicataAOptions.map((option, index) => (
                                <MenuItem key={index} value={index}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Grid>
    );
}
