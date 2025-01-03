import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import UserProfile from './UserProfile';
import CompanyProfile from './CompanyProfile';
import MainCard from 'ui-component/cards/MainCard';
const ProfilePage = () => {
    const [tabValue, setTabValue] = useState(0); // Gestisce il tab selezionato

    return (
        <MainCard>
            <Box>
                <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} centered>
                    <Tab label="Profilo Utente" />
                    <Tab label="Profilo Azienda" />
                </Tabs>
                <Box mt={2}>
                    {tabValue === 0 && <UserProfile />}
                    {tabValue === 1 && <CompanyProfile />}
                </Box>
            </Box>
        </MainCard>
    );
};

export default ProfilePage;
