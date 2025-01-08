import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Tabs, Tab, Grid, Typography, Box, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import GeneralForm from 'ui-component/ProjectWizard/GeneralForm';
import ConfigurationsForm from 'ui-component/ProjectWizard/ConfigurationsForm';
import SubjectsForm from 'ui-component/ProjectWizard/SubjectsForm';
import TasksForm from 'ui-component/ProjectWizard/Tasks';
import EconomicsForm from 'ui-component/ProjectWizard/EconomicsForm';
import { saveProject } from 'api/projects';
import { ThemeMode } from 'config';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const ProjectSummary = ({ projectData, isLoading }) => {
    const theme = useTheme();
    const [activeTab, setActiveTab] = useState(0);
    const [localProjectData, setLocalProjectData] = useState({ ...projectData }); // Copia locale dei dati
    const [isSaving, setIsSaving] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleSaveProject = async () => {
        setIsSaving(true);
        try {
            await saveProject(localProjectData.id, localProjectData); // Salva i dati aggiornati
            alert('Progetto salvato con successo!');
        } catch (error) {
            alert('Errore durante il salvataggio del progetto.');
        } finally {
            setIsSaving(false);
            setIsConfirmOpen(false);
        }
    };

    const updateProjectData = (updatedData) => {
        setLocalProjectData((prevData) => ({
            ...prevData,
            ...updatedData
        }));
    };

    return (
        <>
            <MainCard content={false}>
                <Box sx={{ p: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h4">Dettagli Progetto</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Tabs
                                value={activeTab}
                                onChange={handleTabChange}
                                sx={{
                                    '& a': {
                                        color: theme.palette.mode === ThemeMode.DARK ? 'grey.600' : 'grey.900',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    },
                                    '& a.Mui-selected': {
                                        color: 'primary.main',
                                    }
                                }}
                            >
                                <Tab label="Dati Generali" {...a11yProps(0)} />
                                <Tab label="Configurazioni" {...a11yProps(1)} />
                                <Tab label="Soggetti" {...a11yProps(2)} />
                                <Tab label="Lavorazioni" {...a11yProps(3)} />
                                <Tab label="Quadro Economico" {...a11yProps(4)} />
                            </Tabs>
                        </Grid>
                        <Grid item xs={12}>
                            {activeTab === 0 && (
                                <GeneralForm
                                    projectData={localProjectData}
                                    setProjectData={updateProjectData}
                                    onValidationChange={(isValid) => console.log('Validazione Dati Generali:', isValid)}
                                />
                            )}
                            {activeTab === 1 && (
                                <ConfigurationsForm
                                    projectData={localProjectData}
                                    setProjectData={updateProjectData}
                                    onValidationChange={(isValid) => console.log('Validazione Configurazioni:', isValid)}
                                />
                            )}
                            {activeTab === 2 && (
                                <SubjectsForm
                                    projectData={localProjectData}
                                    setProjectData={updateProjectData}
                                    onValidationChange={(isValid) => console.log('Validazione Soggetti:', isValid)}
                                />
                            )}
                            {activeTab === 3 && (
                                <TasksForm
                                    projectData={localProjectData}
                                    setProjectData={updateProjectData}
                                    onValidationChange={(isValid) => console.log('Validazione Lavorazioni:', isValid)}
                                />
                            )}
                            {activeTab === 4 && (
                                <EconomicsForm
                                    projectData={localProjectData}
                                    setProjectData={updateProjectData}
                                    onValidationChange={(isValid) => console.log('Validazione Quadro Economico:', isValid)}
                                />
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </MainCard>
            <Button variant="contained" onClick={() => setIsConfirmOpen(true)} sx={{ my: 3, ml: 1 }}>
                Salva Dati Progetto
            </Button>
            <Dialog open={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
                <DialogTitle>Conferma Salvataggio</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Procedo con il salvataggio del progetto?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsConfirmOpen(false)} color="secondary">
                        Annulla
                    </Button>
                    <Button onClick={handleSaveProject} color="primary">
                        Conferma
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

ProjectSummary.propTypes = {
    isLoading: PropTypes.bool,
    projectData: PropTypes.object.isRequired,
};

export default ProjectSummary;
