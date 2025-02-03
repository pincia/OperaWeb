import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Grid, Typography, Button, CircularProgress } from '@mui/material';
import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';
import TabPanel from 'ui-component/TabsComponents/TabPanel';
import GeneralAdvancedConfigurationForm from './GeneralAdvancedConfigurationForm';
import GeneralAnalysisConfigurationForm from './GeneralAnalysisConfigurationForm';
import GeneralResourceTeamTypeForm from './GeneralResourceTeamTypeForm';
import EngineeringTwoToneIcon from '@mui/icons-material/EngineeringTwoTone';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import LeaderboardTwoToneIcon from '@mui/icons-material/LeaderboardTwoTone';
import { getConfigurations, saveConfigurations } from 'api/config'; // Importa la funzione saveConfigurations
import { openSnackbar } from 'store/slices/snackbar';
import { useDispatch } from 'store';
export default function GeneralConfigurations() {
    const { mode, borderRadius } = useConfig();
    const [value, setValue] = useState(0);
    const [validationState, setValidationState] = useState({
        advanced: false,
        resourceTeam: false,
        analysis: false
    });
    const [configurations, setConfigurations] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [isSaving, setSaving] = useState(false); // Stato per il salvataggio
    const dispatch = useDispatch();
    const tabsOption = [
        { label: 'Configurazioni Avanzate', caption: 'Parametri numerici e valuta', icon: <SettingsSuggestIcon /> },
        { label: 'Squadra Tipo', caption: 'Calcolo analisi e prezzi', icon: <EngineeringTwoToneIcon /> },
        { label: 'Configurazioni Analisi', caption: 'Calcolo analisi e prezzi', icon: <LeaderboardTwoToneIcon /> }
    ];

    const handleChange = (event, newValue) => setValue(newValue);

    // Controlla se tutte le sezioni sono valide
    const isFormValid = Object.values(validationState).every((isValid) => isValid);

    useEffect(() => {
        const fetchConfigurations = async () => {
            try {
                setLoading(true);
                const response = await getConfigurations();

                if (response) {
                    setConfigurations(response);
                }
            } catch (error) {
                console.error('Errore durante il recupero delle configurazioni:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchConfigurations();
    }, []);

    const handleSaveConfigurations = async () => {
        try {
            setSaving(true); // Avvia il salvataggio
            await saveConfigurations(configurations);
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Configurazione salvata.',
                    variant: 'alert',
                    alert: { color: 'success' },
                }));
        } catch (error) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Errore nelsalvataggio della configurazione!',
                    variant: 'alert',
                    alert: { color: 'error' },
                }));
        } finally {
            setSaving(false); // Termina il salvataggio
        }
    };

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 2, display: 'flex', flexDirection: 'row', height: '100%' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                orientation="vertical"
                variant="scrollable"
                sx={{
                    width: '250px',
                    '& .MuiTabs-flexContainer': { borderBottom: 'none' },
                    '& button': {
                        color: mode === ThemeMode.DARK ? 'grey.600' : 'grey.900',
                        minHeight: 'auto',
                        py: 1.5,
                        px: 2,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        textAlign: 'left',
                        justifyContent: 'flex-start',
                        borderRadius: `${borderRadius}px`
                    },
                    '& button.Mui-selected': {
                        color: 'primary.main',
                        bgcolor: mode === ThemeMode.DARK ? 'dark.main' : 'grey.50'
                    }
                }}
            >
                {tabsOption.map((tab, index) => (
                    <Tab
                        key={index}
                        icon={tab.icon}
                        label={
                            <Grid container direction="column">
                                <Typography variant="subtitle1" color="inherit">
                                    {tab.label}
                                </Typography>
                                <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
                                    {tab.caption}
                                </Typography>
                            </Grid>
                        }
                    />
                ))}
            </Tabs>
            <Grid container sx={{ padding: 2, flex: 1, overflow: 'auto' }}>
                <TabPanel value={value} index={0}>
                    <GeneralAdvancedConfigurationForm
                        configurations={configurations}
                        setConfigurations={setConfigurations}
                        onValidationChange={(isValid) =>
                            setValidationState((prev) => ({ ...prev, advanced: isValid }))
                        }
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <GeneralResourceTeamTypeForm
                        configurations={configurations}
                        setConfigurations={setConfigurations}
                        onValidationChange={(isValid) =>
                            setValidationState((prev) => ({ ...prev, resourceTeam: isValid }))
                        }
                    />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <GeneralAnalysisConfigurationForm
                        configurations={configurations}
                        setConfigurations={setConfigurations}
                        onValidationChange={(isValid) =>
                            setValidationState((prev) => ({ ...prev, analysis: isValid }))
                        }
                    />
                </TabPanel>
                <Grid container justifyContent="flex-end" sx={{ marginTop: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!isFormValid || isSaving} // Disabilita durante il salvataggio
                        onClick={handleSaveConfigurations}
                    >
                        {isSaving ? 'Salvando...' : 'Salva Configurazioni'}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
