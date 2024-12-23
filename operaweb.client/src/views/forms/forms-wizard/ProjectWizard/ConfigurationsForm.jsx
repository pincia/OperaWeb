import React, { useState } from 'react';
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

export default function ConfigurationsForm({ handleBack, handleNext, configurations, setConfigurations }) {
    const [localConfigurations, setLocalConfigurations] = useState(configurations || {});
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

    const handleDecimalChange = (key, value) => {
        if (value >= 0 && value <= 6) { // Limita il numero di decimali tra 0 e 6
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
            currency: event.target.value
        }));
    };

    const handleSubmit = () => {
        setConfigurations(localConfigurations);
        handleNext();
    };

    const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

    const decimalFields = [
        { key: 'npu', label: 'N.P.U.' },
        { key: 'lunghezza', label: 'Lunghezza' },
        { key: 'larghezza', label: 'Larghezza' },
        { key: 'altezzaPeso', label: 'Altezza/Peso' },
        { key: 'prodottoQta', label: 'Prodotto/Qtà' },
        { key: 'prezzoValuta1', label: 'Prezzo/Valuta(1)' },
        { key: 'prezzoValuta2', label: 'Prezzo/Valuta(2)' },
        { key: 'importoValuta1', label: 'Importo/Valuta(1)' },
        { key: 'importoValuta2', label: 'Importo/Valuta(2)' },
        { key: 'aliquote', label: 'Aliquote' }
    ];

    return (
        <>
            <Box sx={{ padding: 4 }}>
                <Typography variant="h3" gutterBottom>
                    Configurazioni Avanzate
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Parametri numerici e di valuta: scegli il numero di decimali per ciascuna voce.
                </Typography>
                <Grid container spacing={3} sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                    {decimalFields.map((field) => (
                        <Grid item xs={12} md={6} key={field.key} sx={{ display: 'flex', alignItems: 'center' }}>
                            <FormLabel sx={{ minWidth: '150px', marginRight: '16px' }}>{field.label}</FormLabel>
                            <TextField
                                type="number"
                                inputProps={{ min: 0, max: 6 }}
                                value={localConfigurations && localConfigurations[field.key] !== undefined ? localConfigurations[field.key] : 0}
                                onChange={(e) => handleDecimalChange(field.key, parseInt(e.target.value, 10))}
                                sx={{ width: '100px' }}
                            />
                        </Grid>
                    ))}
                    <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
                        <FormLabel sx={{ minWidth: '150px', marginRight: '16px' }}>Valuta</FormLabel>
                        <Select
                            value={localConfigurations.currency || 'EUR'}
                            onChange={handleCurrencyChange}
                            sx={{ width: '150px' }}
                        >
                            <MenuItem value="EUR">EUR</MenuItem>
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
            {/* Contenitore dei pulsanti */}
            <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between">
                    <Button
                        onClick={handleBack}
                        sx={{ my: 3, ml: 1 }}
                    >
                        Back
                    </Button>
                    <AnimateButton>
                        <Button
                            variant="contained"
                            sx={{ my: 3, ml: 1 }}
                            onClick={handleNext}
                        >
                            Next
                        </Button>
                    </AnimateButton>
                </Stack>
            </Grid>
        </>
    );
}
