import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Grid, Typography } from '@mui/material';
import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';
import TabPanel from 'ui-component/TabsComponents/TabPanel';
import AdvancedConfigurationForm from './AdvancedConfigurationForm';
import AnalysisConfigurationForm from './AnalysisConfigurationForm';
import ResourceTeamTypeForm from './ResourceTeamTypeForm'
import EngineeringTwoToneIcon from '@mui/icons-material/EngineeringTwoTone';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import LeaderboardTwoToneIcon from '@mui/icons-material/LeaderboardTwoTone';

export default function ConfigurationsForm({ projectData, setProjectData, onValidationChange }) {
    const { mode, borderRadius } = useConfig();
    const [value, setValue] = useState(0);

    const tabsOption = [
        { label: 'Configurazioni Avanzate', caption: 'Parametri numerici e valuta', icon: <SettingsSuggestIcon /> },
        { label: 'Squadra Tipo', caption: 'Calcolo analisi e prezzi', icon: <EngineeringTwoToneIcon /> },
        { label: 'Configurazioni Analisi', caption: 'Calcolo analisi e prezzi', icon: <LeaderboardTwoToneIcon /> }
    ];

    const handleChange = (event, newValue) => setValue(newValue);


    return (
        <Box sx={{ padding: 2, display: 'flex', flexDirection: 'row', height: '100%' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                orientation="vertical"
                variant="scrollable"
                sx={{
                    width: '250px', // Larghezza fissa per il menu laterale
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
                    <AdvancedConfigurationForm
                        projectData={projectData}
                        setProjectData={setProjectData}
                        onValidationChange={onValidationChange}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ResourceTeamTypeForm
                        projectData={projectData}
                        setProjectData={setProjectData}
                        onValidationChange={onValidationChange}
                    />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <AnalysisConfigurationForm
                        projectData={projectData}
                        setProjectData={setProjectData}
                        onValidationChange={onValidationChange}
                    />
                </TabPanel>
            </Grid>
        </Box>
    );
}
