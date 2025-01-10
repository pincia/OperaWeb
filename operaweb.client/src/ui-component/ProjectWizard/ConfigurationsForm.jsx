import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Grid,
    TextField,
    FormControl,
    FormLabel,
    Select,
    MenuItem,
} from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as yup from 'yup';
import { useFormik } from 'formik';

const validationSchema = yup.object({
    partiUguali: yup.number().min(0, 'Valore minimo 0').required('Campo obbligatorio'),
    lunghezza: yup.number().min(0, 'Valore minimo 0').required('Campo obbligatorio'),
    larghezza: yup.number().min(0, 'Valore minimo 0').required('Campo obbligatorio'),
    hPeso: yup.number().min(0, 'Valore minimo 0').required('Campo obbligatorio'),
    quantita: yup.number().min(0, 'Valore minimo 0').required('Campo obbligatorio'),
    prezzi: yup.number().min(0, 'Valore minimo 0').required('Campo obbligatorio'),
    speseGenerali: yup.number().min(0, 'Valore minimo 0').required('Campo obbligatorio'),
    utileImpresa: yup.number().min(0, 'Valore minimo 0').required('Campo obbligatorio'),
    metodo: yup.number().required('Seleziona un metodo'),
    applicataA: yup.number().required('Seleziona un valore applicabile'),
});
export default function ConfigurationsForm({ projectData, setProjectData, onValidationChange }) {
    const formik = useFormik({
        initialValues: {
            partiUguali: projectData.configurations?.numeri?.partiUguali || 0,
            importo: projectData.configurations?.numeri?.importo || 0,
            lunghezza: projectData.configurations?.numeri?.lunghezza || 0,
            larghezza: projectData.configurations?.numeri?.larghezza || 0,
            hPeso: projectData.configurations?.numeri?.hPeso || 0,
            quantita: projectData.configurations?.numeri?.quantita || 0,
            prezzi: projectData.configurations?.numeri?.prezzi || 0,
            speseGenerali: projectData.configurations?.analisi?.speseGenerali || 0,
            utileImpresa: projectData.configurations?.analisi?.utileImpresa || 0,
            metodo: projectData.configurations?.analisi?.metodo || 0,
            applicataA: projectData.configurations?.analisi?.applicataA || 0,
            aliquote: projectData.configurations?.numeri?.aliquote || 0,
            valuta: projectData.configurations?.numeri?.valuta || "Euro"
        },
        validationSchema,
        onSubmit: (values) => {
            setProjectData((prev) => ({
                ...prev,
                configurations: {
                    numeri: {
                        ...prev.configurations?.numeri,
                        ...values,
                    },
                    analisi: {
                        ...prev.configurations?.analisi,
                        speseGenerali: values.speseGenerali,
                        utileImpresa: values.utileImpresa,
                        metodo: values.metodo,
                        applicataA: values.applicataA,
                    },
                },
            }));
        },
    });

    useEffect(() => {
        // Imposta la validazione nel componente padre
        onValidationChange(formik.isValid);
    }, [formik.isValid, formik.errors, onValidationChange]);

    //salva i dati
    useEffect(() => {
        setProjectData((prev) => ({
            ...prev,
            configurations: {
                numeri: {
                    ...prev.configurations?.numeri,
                    partiUguali: formik.values.partiUguali,
                    lunghezza: formik.values.lunghezza,
                    larghezza: formik.values.larghezza,
                    hPeso: formik.values.hPeso,
                    quantita: formik.values.quantita,
                    prezzi: formik.values.prezzi,
                    aliquote: formik.values.aliquote,
                    valuta: formik.values.valuta,
                },
                analisi: {
                    ...prev.configurations?.analisi,
                    speseGenerali: formik.values.speseGenerali,
                    utileImpresa: formik.values.utileImpresa,
                    metodo: formik.values.metodo,
                    applicataA: formik.values.applicataA,
                },
            },
        }));
    }, [
        formik.values.partiUguali,
        formik.values.lunghezza,
        formik.values.larghezza,
        formik.values.hPeso,
        formik.values.quantita,
        formik.values.prezzi,
        formik.values.aliquote,
        formik.values.valuta,
        formik.values.speseGenerali,
        formik.values.utileImpresa,
        formik.values.metodo,
        formik.values.applicataA,
        setProjectData,
    ]);

    const metodoOptions = ['NETTO + (Netto*SG) + (Netto*UI)', 'NETTO + (Netto*SG) + ((Netto+SG)*UI)'];
    const applicataAOptions = ['Netto', 'Spese+Utile', 'Solo spese', 'Solo Utile', 'Totale'];

    return (
        <Box sx={{ padding: 4 }}>
            <Grid container spacing={3}>
                {/* Configurazioni Avanzate - Numeri */}
                <Grid item xs={12} md={8} sx={{  borderRadius: '4px', padding: 2 }}>
                    <Typography variant="h3" gutterBottom>
                        Configurazioni Avanzate
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Configura i parametri numerici e seleziona la valuta.
                    </Typography>
                    <Grid container spacing={2} marginTop={2}>
                        {/* Fattori */}
                        <Grid item xs={12} md={4}>
                            {['partiUguali', 'lunghezza', 'larghezza', 'hPeso'].map((field) => (
                                <FormControl fullWidth sx={{ marginBottom: 2 }} key={field}>
                                    <FormLabel>{field}</FormLabel>
                                    <TextField
                                        type="number"
                                        name={field}
                                        value={formik.values[field]}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched[field] && Boolean(formik.errors[field])}
                                        helperText={formik.touched[field] && formik.errors[field]}
                                        variant="outlined"
                                    />
                                </FormControl>
                            ))}
                        </Grid>

                        {/* Valorizzatori */}
                        <Grid item xs={12} md={4}>
                            {['quantita', 'prezzi', 'importo'].map((field) => (
                                <FormControl fullWidth sx={{ marginBottom: 2 }} key={field}>
                                    <FormLabel>{field}</FormLabel>
                                    <TextField
                                        type="number"
                                        name={field}
                                        value={formik.values[field]}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched[field] && Boolean(formik.errors[field])}
                                        helperText={formik.touched[field] && formik.errors[field]}
                                        variant="outlined"
                                    />
                                </FormControl>
                            ))}
                        </Grid>

                        {/* Altro */}
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                                <FormLabel>Aliquota</FormLabel>
                                <TextField
                                    type="number"
                                    name="aliquote"
                                    value={formik.values.aliquote}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.aliquote && Boolean(formik.errors.aliquote)}
                                    helperText={formik.touched.aliquote && formik.errors.aliquote}
                                    variant="outlined"
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                                <FormLabel>Valuta</FormLabel>
                                <Select
                                    name="valuta"
                                    value={formik.values.valuta}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.valuta && Boolean(formik.errors.valuta)}
                                    variant="outlined"
                                >
                                    <MenuItem value="Euro">Euro</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Configurazioni Analisi */}
                <Grid item xs={12} md={4} sx={{ borderRadius: '4px', padding: 2 }}>
                    <Typography variant="h3" gutterBottom>
                        Configurazioni Analisi
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
                                    onChange={formik.handleChange}
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
                                    name="utileImpresa"
                                    value={formik.values.utileImpresa}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.utileImpresa && Boolean(formik.errors.utileImpresa)}
                                    helperText={formik.touched.utileImpresa && formik.errors.utileImpresa}
                                    variant="outlined"
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                                <FormLabel>Applicata A</FormLabel>
                                <Select
                                    name="applicataA"
                                    value={formik.values.applicataA}
                                    onChange={formik.handleChange}
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
            </Grid>
        </Box>
    );

}
