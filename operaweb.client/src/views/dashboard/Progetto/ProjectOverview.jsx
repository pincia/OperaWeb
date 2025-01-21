import React, { useState } from 'react';
import { Box, Grid, Typography, Dialog, DialogContent } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeDarkCard from 'ui-component/cards/TotalIncomeDarkCard';
import TotalIncomeLightCard from 'ui-component/cards/TotalIncomeLightCard';
import RoomIcon from '@mui/icons-material/Room';
import PersonAddAlt1TwoToneIcon from '@mui/icons-material/PersonAddAlt1TwoTone';
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
    width: '100%',
    height: '500px',
};

// Colori associati a ogni stato
const statusColors = {
    Creato: 'blue',
    InProgress: 'green',
    Sospeso: 'orange',
    Completato: 'purple',
    Cancellato: 'red',
    PendingApproval: 'yellow',
    Archiviato: 'gray',
    Bozza: 'lightgray',
};

const ProjectOverview = ({ projectData, isLoading }) => {
    const [mapOpen, setMapOpen] = useState(false);

    const countTotalEntries = (jobs) => {
        let total = 0;

        const countEntries = (job) => {
            if (job.entries) {
                total += job.entries.length;
            }
            if (job.children) {
                job.children.forEach(countEntries);
            }
        };

        jobs.forEach(countEntries);

        return total;
    };

    const widgetData = [
        { number: countTotalEntries(projectData.jobs), label: 'Lavorazioni totali', icon: <VideoCameraFrontIcon fontSize="inherit" /> },
        { number: 0, label: 'Lavorazioni terminate', icon: <StorefrontTwoToneIcon fontSize="inherit" /> },
        { number: 0, label: 'Lavorazioni in corso', icon: <PersonAddAlt1TwoToneIcon fontSize="inherit" /> },
    ];

    const handleMapClick = () => {
        setMapOpen(true);
    };

    const handleCloseMap = () => {
        setMapOpen(false);
    };

    const getStatusLabel = (status) => {
        const keys = Object.keys(statusColors);
        return keys[status] || 'Unknown';
    };

    return (
        <>
            <MainCard sx={{ mb: 2, marginBottom: 3 }}>
                <Box mb={2}>
                    <Typography variant="h2" gutterBottom>
                        Opere:
                    </Typography>
                    <Typography variant="body1" mb={2}>
                        {projectData?.works}
                    </Typography>

                    <Typography variant="h4" gutterBottom>
                        Oggetto:
                    </Typography>
                    <Typography variant="body1" mb={2}>
                        {projectData?.object}
                    </Typography>

                    {projectData?.completeAddress && (
                        <>
                            <Typography  gutterBottom>
                                <b>Localizzazione:  </b> {projectData?.completeAddress}
                            </Typography>
                            <Box display="flex" alignItems="center" mb={2}>
                                {/* Anteprima mappa statica */}
                                <Box
                                    sx={{
                                        width: 250,
                                        height: 170,
                                        marginRight: 2,
                                        backgroundImage: `url(https://maps.googleapis.com/maps/api/staticmap?center=${projectData.latitude},${projectData.longitude}&zoom=15&size=150x100&maptype=roadmap&markers=color:red%7C${projectData.latitude},${projectData.longitude}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        cursor: 'pointer',
                                    }}
                                    onClick={handleMapClick}
                                />
                            </Box>
                        </>
                    )}

                    <Typography sx={{ marginTop: '8px' }} variant="body2" color="textSecondary">
                        <b>Stato:</b>{' '}
                        <span
                            style={{
                                fontWeight: 'bold',
                                color: statusColors[getStatusLabel(projectData.status)],
                            }}
                        >
                            {getStatusLabel(projectData.status)}
                        </span>
                    </Typography>
                </Box>
            </MainCard>

            <MainCard>
                <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                    <Grid item xs={12} sm={6} md={3}>
                        <TotalIncomeDarkCard
                            isLoading={isLoading}
                            total={projectData?.totalAmount}
                            label="TOTALE PROGETTO"
                        />
                    </Grid>
                    {widgetData.map((data, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <TotalIncomeLightCard key={index} icon={data.icon} label={data.label} total={data.number} isLoading={isLoading} />
                        </Grid>
                    ))}
                </Grid>
            </MainCard>

            {/* Dialog per la mappa */}
            <Dialog open={mapOpen} onClose={handleCloseMap} maxWidth="lg" fullWidth>
                <DialogContent>
                    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            center={{
                                lat: projectData?.latitude || 0,
                                lng: projectData?.longitude || 0,
                            }}
                            zoom={13}
                        >
                            <Marker
                                position={{
                                    lat: projectData?.latitude || 0,
                                    lng: projectData?.longitude || 0,
                                }}
                            />
                        </GoogleMap>
                    </LoadScript>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ProjectOverview;
