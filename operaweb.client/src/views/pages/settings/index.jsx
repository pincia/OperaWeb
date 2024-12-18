import React from 'react';
import { Card, CardContent, Divider, Typography } from '@mui/material';

// project imports
import ThemeModeLayout from './ThemeMode';
import PresetColorPage from './PresetColor';

// ==============================|| SETTINGS PAGE ||============================== //

const SettingsPage = () => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h4" gutterBottom>
                    Impostazioni
                </Typography>
                <Divider sx={{ my: 2 }} />

                {/* Theme Mode */}
                <ThemeModeLayout />

                <Divider sx={{ my: 2 }} />

                {/* Preset Color */}
                <PresetColorPage />
            </CardContent>
        </Card>
    );
};

export default SettingsPage;
