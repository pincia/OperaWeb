import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Grid,
    TextField,
    Button,
    Snackbar,
    Alert,
    FormControl,
    FormLabel,
    Select,
    MenuItem,
    Stack
} from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';

export default function ConfigurationsForm({ handleBack, handleNext, projectData, setProjectData }) {
    const [localConfigurations, setLocalConfigurations] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

    // Inizializza configurazioni dal projectData
    useEffect(() => {
        if (projectData.configurations) {
            setLocalConfigurations({ ...projectData.configurations });
        }
    }, [projectData.configurations]);

    const handleDecimalChange = (key, value) => {
        if (value >= 0 && value <= 6) {
            setLocalConfigurations((prev) => ({
                ...prev,
                [key]: value
            }));
        } else {
            setSnackbar({ open: true, message: 'I decimali devono essere tra 0 e 6.', severity: 'warning' });
        }
    };

    const handleCurrencyChange = (event) => {
        setLocalConfigurations((prev) => ({
            ...prev,
            Valuta: event.target.value
        }));
    };

    const handleSubmit = () => {
        setProjectData((prev) => ({
            ...prev,
            configurations: localConfigurations
        }));
        handleNext();
    };

    const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

    const decimalFields = [
        { key: 'partiUguali', label: 'Parti Uguali' },
        { key: 'lunghezza', label: 'Lunghezza' },
        { key: 'larghezza', label: 'Larghezza' },
        { key: 'hPeso', label: 'HPeso' },
        { key: 'quantita', label: 'Quantità' },
        { key: 'prezzi', label: 'Prezzi' },
        { key: 'prezziTotale', label: 'Prezzi Totale' },
        { key: 'convPrezzi', label: 'Conv. Prezzi' },
        { key: 'convPrezziTotale', label: 'Conv. Prezzi Totale' },
        { key: 'incidenzaPercentuale', label: 'Incidenza Percentuale' },
        { key: 'aliquote', label: 'Aliquote' }
    ];

    if (!localConfigurations) {
        return (
            <Box sx={{ padding: 4 }}>
                <Typography variant="h5" color="textSecondary">
                    Caricamento configurazioni...
                </Typography>
            </Box>
        );
    }

    return (
        <>
            <Box sx={{ padding: 4 }}>
                <Typography variant="h3" gutterBottom>
                    Configurazioni Avanzate
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Configura i parametri numerici e seleziona la valuta.
                </Typography>
                <Grid container spacing={3} sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                    {decimalFields.map((field) => (
                        <Grid item xs={12} md={6} key={field.key} sx={{ display: 'flex', alignItems: 'center' }}>
                            <FormLabel sx={{ minWidth: '150px', marginRight: '16px' }}>{field.label}</FormLabel>
                            <TextField
                                type="number"
                                inputProps={{ min: 0, max: 6 }}
                                value={localConfigurations[field.key] || 0}
                                onChange={(e) => handleDecimalChange(field.key, parseInt(e.target.value, 10))}
                                sx={{ width: '100px' }}
                            />
                        </Grid>
                    ))}
                    <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
                        <FormLabel sx={{ minWidth: '150px', marginRight: '16px' }}>Valuta</FormLabel>
                        <Select
                            value={localConfigurations.Valuta || 'EUR'}
                            onChange={handleCurrencyChange}
                            sx={{ width: '150px' }}
                        >
                            <MenuItem value="EUR">EUR</MenuItem>
                            <MenuItem value="USD">USD</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                >
                    <Alert severity={snackbar.severity} onClose={handleSnackbarClose}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Box>
            <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between">
                    <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                        Back
                    </Button>
                    <AnimateButton>
                        <Button
                            variant="contained"
                            sx={{ my: 3, ml: 1 }}
                            onClick={handleSubmit}
                        >
                            Next
                        </Button>
                    </AnimateButton>
                </Stack>
            </Grid>
        </>
    );
}
