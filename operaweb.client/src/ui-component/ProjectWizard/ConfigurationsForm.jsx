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

    useEffect(() => {
        if (projectData.configurations) {
            setLocalConfigurations({
                numeri: {
                    ...projectData.configurations.numeri,
                    partiUguali: projectData.configurations.numeri?.partiUguali || 0,
                    lunghezza: projectData.configurations.numeri?.lunghezza || 0,
                    larghezza: projectData.configurations.numeri?.larghezza || 0,
                    hPeso: projectData.configurations.numeri?.hPeso || 0,
                    quantita: projectData.configurations.numeri?.quantita || 0,
                    prezzi: projectData.configurations.numeri?.prezzi || 0,
                    prezziTotale: projectData.configurations.numeri?.prezziTotale || 0,
                    convPrezzi: projectData.configurations.numeri?.convPrezzi || 0,
                    convPrezziTotale: projectData.configurations.numeri?.convPrezziTotale || 0,
                    incidenzaPercentuale: projectData.configurations.numeri?.incidenzaPercentuale || 0,
                    aliquote: projectData.configurations.numeri?.aliquote || 0,
                    valuta: projectData.configurations.numeri?.valuta || "Euro"
                },
                analisi: {
                    ...projectData.configurations.analisi,
                    speseGenerali: projectData.configurations.analisi?.speseGenerali || 0,
                    utileImpresa: projectData.configurations.analisi?.utileImpresa || 0,
                    metodo: projectData.configurations.analisi?.metodo || 0,
                    applicataA: projectData.configurations.analisi?.applicataA || 0
                }
            });
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
                    utileImpresa: 0,
                    metodo: 0,
                    applicataA: 0
                }
            });
        }
    }, [projectData.configurations]);


    const handleFieldNumeriChange = (key, value) => {
        setLocalConfigurations((prev) => ({
            ...prev,
            numeri: {
                ...prev.numeri,
                [key]: value === '' ? '' : parseFloat(value) // Permette di sovrascrivere 0 con un altro valore
            }
        }));
    };

    const handleFieldAnalisiChange = (key, value) => {
        setLocalConfigurations((prev) => ({
            ...prev,
            analisi: {
                ...prev.analisi,
                [key]: value === '' ? '' : parseFloat(value) // Permette di sovrascrivere 0 con un altro valore
            }
        }));
    };

    const handleCurrencyChange = (event) => {
        setLocalConfigurations((prev) => ({
            ...prev,
            Valuta: event.target.value
        }));
    };

    const handleChangeMetodo = (event) => {
        const value = event.target.value;
        setSelectedMetodoIndex(value);

        setLocalConfigurations((prev) => ({
            ...prev,
            analisi: {
                ...prev.analisi,
                metodo: value
            }
        }));
    };

    const handleChangeApplicataA = (event) => {
        const value = event.target.value;
        setSelectedApplicataAIndex(value);

        setLocalConfigurations((prev) => ({
            ...prev,
            analisi: {
                ...prev.analisi,
                applicataA: value
            }
        }));
    };

    const handleSubmit = () => {
        setProjectData((prev) => ({
            ...prev,
            configurations: {
                numeri: {
                    ...(prev.configurations?.numeri || {}), // Usa un oggetto vuoto come fallback
                    ...localConfigurations.numeri, // Salva i valori di `numeri`
                },
                analisi: {
                    ...(prev.configurations?.analisi || {}), // Usa un oggetto vuoto come fallback
                    metodo: selectedMetodoIndex, // Salva `metodo` dal valore selezionato
                    applicataA: selectedApplicataAIndex, // Salva `applicataA` dal valore selezionato
                    ...localConfigurations.analisi // Salva gli altri valori di `analisi`
                }
            }
        }));
        handleNext();
    };



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
                                    value={localConfigurations.numeri.partiUguali || ''} 
                                    onChange={(e) => handleFieldNumeriChange('partiUguali', parseInt(e.target.value, 10) || 0)}
                                    variant="outlined"
                                    sx={{ marginBottom: 2, width: '150px' }}
                                />
                                <FormLabel sx={{ minWidth: '150px' }}>Lunghezza</FormLabel>
                                <TextField
                                    type="number"
                                    value={localConfigurations.numeri.lunghezza || ''} 
                                    onChange={(e) => handleFieldNumeriChange('lunghezza', parseInt(e.target.value, 10) || 0)}
                                    variant="outlined"
                                    sx={{ marginBottom: 2, width: '150px' }}
                                />
                                <FormLabel sx={{ minWidth: '150px' }}>Larghezza</FormLabel>
                                <TextField
                                    type="number"
                                    value={localConfigurations.numeri.larghezza || ''} 
                                    onChange={(e) => handleFieldNumeriChange('larghezza', parseInt(e.target.value, 10) || 0)}
                                    variant="outlined"
                                    sx={{ marginBottom: 2, width: '150px' }}
                                />
                                <FormLabel sx={{ minWidth: '150px' }}>Altezza/Peso</FormLabel>
                                <TextField
                                    type="number"
                                    value={localConfigurations.numeri.hPeso || ''} 
                                    onChange={(e) => handleFieldNumeriChange('hPeso', parseInt(e.target.value, 10) || 0)}
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
                                    value={localConfigurations.numeri.quantita || ''} 
                                    onChange={(e) => handleFieldNumeriChange('quantita', parseInt(e.target.value, 10) || 0)}
                                    variant="outlined"
                                    sx={{ marginBottom: 2, width: '150px' }}
                                />
                                <FormLabel sx={{ minWidth: '150px' }}>Prezzo</FormLabel>
                                <TextField
                                    type="number"
                                    value={localConfigurations.numeri.prezzi || ''} 
                                    onChange={(e) => handleFieldNumeriChange('prezzi', parseInt(e.target.value, 10) || 0)}
                                    variant="outlined"
                                    sx={{ marginBottom: 2, width: '150px' }}
                                />
                                <FormLabel sx={{ minWidth: '150px' }}>Imoorto</FormLabel>
                                <TextField
                                    type="number"
                                    value={localConfigurations.numeri.importo || ''} 
                                    onChange={(e) => handleFieldNumeriChange('importo', parseInt(e.target.value, 10) || 0)}
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
                                    value={localConfigurations.numeri.aliquote || ''} 
                                    onChange={(e) => handleFieldNumeriChange('aliquote', parseInt(e.target.value, 10) || 0)}
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
                                    labelId="dropdown-label-metodo"
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
                                    value={localConfigurations.analisi.speseGenerali || ''} 
                                    onChange={(e) => handleFieldAnalisiChange('speseGenerali', parseInt(e.target.value, 10) || 0)}
                                    variant="outlined"
                                    sx={{ marginBottom: 2, width: '150px' }}
                                />
                                <FormLabel sx={{ minWidth: '150px' }}>Utile Impresa</FormLabel>
                                <TextField
                                    type="number"
                                    value={localConfigurations.analisi.utileImpresa || ''} 
                                    onChange={(e) => handleFieldAnalisiChange('utileImpresa', parseInt(e.target.value, 10) || 0)}
                                    variant="outlined"
                                    sx={{ marginBottom: 2, width: '150px' }}
                                />
                                <FormLabel sx={{ minWidth: '150px' }}>Applicata A</FormLabel>
                                <Select
                                    labelId="dropdown-label-applicataA"
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
