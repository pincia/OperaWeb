import React, { useEffect, useRef } from 'react';
import { Grid, TextField, Typography, Select, FormControl, MenuItem, FormLabel } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    partiUguali: yup.number().min(0, 'Valore minimo 0').required('Campo obbligatorio'),
    lunghezza: yup.number().min(0, 'Valore minimo 0').required('Campo obbligatorio'),
    larghezza: yup.number().min(0, 'Valore minimo 0').required('Campo obbligatorio'),
    hPeso: yup.number().min(0, 'Valore minimo 0').required('Campo obbligatorio'),
    quantita: yup.number().min(0, 'Valore minimo 0').required('Campo obbligatorio'),
    prezzi: yup.number().min(0, 'Valore minimo 0').required('Campo obbligatorio'),
    aliquote: yup.number().min(0, 'Valore minimo 0').required('Campo obbligatorio'),
});

export default function AdvancedConfigurationForm({ projectData, setProjectData, onValidationChange }) {

    const formik = useFormik({
        initialValues: {
            partiUguali: projectData?.configurations?.numeri.partiUguali || 0,
            lunghezza: projectData?.configurations?.numeri.lunghezza || 0,
            larghezza: projectData?.configurations?.numeri.larghezza || 0,
            hPeso: projectData?.configurations?.numeri.hPeso || 0,
            quantita: projectData?.configurations?.numeri.quantita || 0,
            prezzi: projectData?.configurations?.numeri.prezzi || 0,
            aliquote: projectData?.configurations?.numeri.aliquote || 0,
            prezziTotale: projectData?.configurations?.numeri.prezziTotale || 0,
            valuta: projectData?.configurations?.numeri.valuta || "Euro"
        },
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        enableReinitialize: true, // Ri-inizializza con valori aggiornati
        onSubmit: () => { }, // Non serve inviare i dati direttamente
    });

    useEffect(() => {
        // Comunica lo stato di validazione al genitore
        onValidationChange(formik.isValid);
    }, [formik.values]);

    const prevProjectDataRef = useRef(projectData);

    useEffect(() => {
        const updatedNumeri = {
            partiUguali: formik.values.partiUguali,
            lunghezza: formik.values.lunghezza,
            larghezza: formik.values.larghezza,
            hPeso: formik.values.hPeso,
            quantita: formik.values.quantita,
            prezzi: formik.values.prezzi,
            aliquote: formik.values.aliquote,
            valuta: formik.values.valuta,
            prezziTotale: formik.values.prezziTotale,
        };

        const isDifferent = Object.keys(updatedNumeri).some(
            (key) => updatedNumeri[key] !== prevProjectDataRef.current?.configurations?.numeri?.[key]
        );

        if (isDifferent) {
            setProjectData((prev) => ({
                ...prev,
                configurations: {
                    ...prev.configurations,
                    numeri: updatedNumeri,
                },
            }));
            prevProjectDataRef.current = {
                ...projectData,
                configurations: {
                    ...projectData.configurations,
                    numeri: updatedNumeri,
                },
            }; // Aggiorna il riferimento
        }
    }, [formik.values, setProjectData, projectData]);

    return (
        < Grid item xs={12} md={8} sx={{ borderRadius: '4px' }}>
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
                    {['quantita', 'prezzi', 'prezziTotale'].map((field) => (
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
        </Grid >
    );
}
