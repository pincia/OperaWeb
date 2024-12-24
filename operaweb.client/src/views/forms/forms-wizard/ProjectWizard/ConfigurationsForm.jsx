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
    const [selectedMetodoIndex, setSelectedMetodoIndex] = useState({});
    const [selectedApplicataAIndex, setSelectedApplicataAIndex] = useState({});
    // Inizializza configurazioni dal projectData
    useEffect(() => {
        if (projectData.configurations) {
            setLocalConfigurations({ ...projectData.configurations });
            setSelectedMetodoIndex(projectData.configurations.analisi.metodo); 
            setSelectedApplicataAIndex(projectData.configurations.analisi.applicataA); 
        } else {
            setLocalConfigurations({
                numeri: {
                partiUguali: 0,
                lunghezza: 0,
                larghezza: 0,
                hPeso: 0,
                quantita: 0,
                prezzi: 0,
                prezziTotale: 0,
                convPrezzi: 0,
                convPrezziTotale: 0,
                incidenzaPercentuale: 0,
                aliquote: 0,
                valuta: "Euro"
                },
                analisi: {
                    speseGenerali: 0,
                    utileImpresa:0
                }
            });
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

    // Gestione del cambio di valore
    const handleChangeMetodo = (event) => {
        setSelectedMetodoIndex(event.target.value); // Aggiorna il valore selezionato
        console.log('Indice selezionato:', event.target.value);
    };

    const handleChangeApplicataA = (event) => {
        setSelectedApplicataAIndex(event.target.value); // Aggiorna il valore selezionato
        console.log('Indice selezionato:', event.target.value);
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

    const metodoOptions = ['NETTO + (Netto*SG) + (Netto*UI)', 'NETTO + (Netto*SG) + ((Netto+SG)*UI)'];
    const applicataAOptions = ['Netto', 'Spese+Utile', 'Solo spese', 'Solo Utile', 'Totale'];

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
                <Grid container spacing={3}>
                    {/* Grid 70% */}
                    <Grid item xs={12} md={8} sx={{ border: '1px solid #ddd', borderRadius: '4px', padding: 2 }}>
                        <Typography variant="h3" gutterBottom>
                            Configurazioni Avanzate
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Configura i parametri numerici e seleziona la valuta.
                        </Typography>
                        <Grid container spacing={2} marginTop={2}>
                            {/* Column 1 */}
                            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography variant="h4" gutterBottom align="center">
                                  Fattori
                                </Typography>
                                <FormLabel sx={{ minWidth: '150px' }}>N.P.U</FormLabel>
                                <TextField
                                    type="number"
                                    value={localConfigurations.numeri.partiUguali}
                                    onChange={(e) => handleFieldChange('partiUguali', parseInt(e.target.value, 10) || 0)}
                                    variant="outlined"
                                    sx={{ marginBottom: 2, width: '150px' }}
                                />
                                <FormLabel sx={{ minWidth: '150px' }}>Lunghezza</FormLabel>
                                <TextField
                                    type="number"
                                    value={localConfigurations.numeri.lunghezza}
                                    onChange={(e) => handleFieldChange('lunghezza', parseInt(e.target.value, 10) || 0)}
                                    variant="outlined"
                                    sx={{ marginBottom: 2, width: '150px' }}
                                />
                                <FormLabel sx={{ minWidth: '150px' }}>Larghezza</FormLabel>
                                <TextField
                                    type="number"
                                    value={localConfigurations.numeri.larghezza}
                                    onChange={(e) => handleFieldChange('larghezza', parseInt(e.target.value, 10) || 0)}
                                    variant="outlined"
                                    sx={{ marginBottom: 2, width: '150px' }}
                                />
                                <FormLabel sx={{ minWidth: '150px' }}>Altezza/Peso</FormLabel>
                                <TextField
                                    type="number"
                                    value={localConfigurations.numeri.hPeso}
                                    onChange={(e) => handleFieldChange('hPeso', parseInt(e.target.value, 10) || 0)}
                                    variant="outlined"
                                    sx={{ marginBottom: 2, width: '150px' }}
                                />
                            </Grid>

                            {/* Column 2 */}
                            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography variant="h4" gutterBottom align="center">
                                    Valorizzatori
                                </Typography>
                                <FormLabel sx={{ minWidth: '150px' }}>Prodotto/q.ta</FormLabel>
                                <TextField
                                    type="number"
                                    value={localConfigurations.numeri.quantita}
                                    onChange={(e) => handleFieldChange('quantita', parseInt(e.target.value, 10) || 0)}
                                    variant="outlined"
                                    sx={{ marginBottom: 2, width: '150px' }}
                                />
                                <FormLabel sx={{ minWidth: '150px' }}>Prezzo</FormLabel>
                                <TextField
                                    label="Prezzo"
                                    type="number"
                                    value={localConfigurations.numeri.prezzi}
                                    onChange={(e) => handleFieldChange('prezzi', parseInt(e.target.value, 10) || 0)}
                                    variant="outlined"
                                    sx={{ marginBottom: 2, width: '150px' }}
                                />
                                <FormLabel sx={{ minWidth: '150px' }}>Imoorto</FormLabel>
                                <TextField
                                    type="number"
                                    value={localConfigurations.numeri.larghezza}
                                    onChange={(e) => handleFieldChange('larghezza', parseInt(e.target.value, 10) || 0)}
                                    variant="outlined"
                                    sx={{ marginBottom: 2, width: '150px' }}
                                />
                            </Grid>

                            {/* Column 3 */}
                            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography variant="h4" gutterBottom align="center">
                                    Altro
                                </Typography>
                                <FormLabel sx={{ minWidth: '150px' }}>Aliquota</FormLabel>
                                <TextField
                                    type="number"
                                    value={localConfigurations.numeri.aliquote}
                                    onChange={(e) => handleFieldChange('larghezza', parseInt(e.target.value, 10) || 0)}
                                    variant="outlined"
                                    sx={{ marginBottom: 2, width: '150px' }}
                                />
                                    <FormLabel sx={{ minWidth: '150px' }}>Valuta</FormLabel>
                                    <Select
                                        value={localConfigurations.Valuta || 'EUR'}
                                    onChange={handleCurrencyChange}
                                    sx={{ marginBottom: 2, width: '150px', minWidth: '150px' }}
                                    >
                                        <MenuItem value="EUR">Euro</MenuItem>
                                    </Select>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Grid 30% */}
                    <Grid item xs={12} md={4} sx={{ border: '1px solid #ddd', borderRadius: '4px', padding: 2 }}>
                        <Typography variant="h3" gutterBottom>
                            Configurazioni Analisi
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Parametri per il calcolo delle analisi e dei prezzi.
                        </Typography>
                        <Grid container spacing={2} marginTop={2}>
                            {/* Column 1 */}
                            <Grid item xs={12} md={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography variant="h4" gutterBottom align="center">
                                    Calcolo
                                </Typography>
                                <FormLabel sx={{ minWidth: '150px' }}>Metodo</FormLabel>
                                <Select
                                    labelId="dropdown-label"
                                    value={selectedMetodoIndex}
                                    onChange={handleChangeMetodo}
                                    sx={{ marginBottom: 2, width: '150px', minWidth: '150px' }}
                                >
                                    {metodoOptions.map((option, index) => (
                                        <MenuItem key={index} value={index}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormLabel sx={{ minWidth: '150px' }}>Spese Generali</FormLabel>
                                <TextField
                                    type="number"
                                    value={localConfigurations.numeri.speseGenerali}
                                    onChange={(e) => handleFieldChange('partiUguali', parseInt(e.target.value, 10) || 0)}
                                    variant="outlined"
                                    sx={{ marginBottom: 2, width: '150px' }}
                                />
                                <FormLabel sx={{ minWidth: '150px' }}>Utile Impresa</FormLabel>
                                <TextField
                                    type="number"
                                    value={localConfigurations.numeri.utileImpresa}
                                    onChange={(e) => handleFieldChange('lunghezza', parseInt(e.target.value, 10) || 0)}
                                    variant="outlined"
                                    sx={{ marginBottom: 2, width: '150px' }}
                                />
                                <FormLabel sx={{ minWidth: '150px' }}>Applicata A</FormLabel>
                                <Select
                                    labelId="dropdown-label"
                                    value={selectedApplicataAIndex}
                                    onChange={handleChangeApplicataA}
                                    sx={{ marginBottom: 2, width: '150px', minWidth: '150px' }}
                                >
                                    {applicataAOptions.map((option, index) => (
                                        <MenuItem key={index} value={index}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
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
