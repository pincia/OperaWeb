import React from 'react';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';

export default function EconomicsForm({ handleBack, projectData }) {
    return (
        <>
            {/* Contenitore principale del contenuto */}
            <Box
                sx={{
                    minHeight: '400px',
                    maxHeight: '500px', // Limita l'altezza
                    overflowY: 'auto', // Scroll interno
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    padding: 2,
                    mb: 2, // Spazio sotto il Box
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Economics
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Aggiungi i dati economici del progetto qui.
                </Typography>
            </Box>

        </>
    );
}
