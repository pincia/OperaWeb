import React, { useState } from 'react';
import { Box, Grid, Typography, Dialog, DialogContent } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeDarkCard from 'ui-component/cards/TotalIncomeDarkCard';
import TotalIncomeLightCard from 'ui-component/cards/TotalIncomeLightCard';
import RoomIcon from '@mui/icons-material/Room';
import PersonAddAlt1TwoToneIcon from '@mui/icons-material/PersonAddAlt1TwoTone';
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Icona personalizzata per Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ProjectOverview = ({ projectData, isLoading }) => {
    const [mapOpen, setMapOpen] = useState(false);

    const widgetData = [
        { number: 120, label: 'Lavorazioni totali', icon: <VideoCameraFrontIcon fontSize="inherit" /> },
        { number: 234, label: 'Lavorazioni terminate', icon: <StorefrontTwoToneIcon fontSize="inherit" /> },
        { number: 234, label: 'Lavorazioni in corso', icon: <PersonAddAlt1TwoToneIcon fontSize="inherit" /> }
    ];

    const handleMapClick = () => {
        setMapOpen(true);
    };

    const handleCloseMap = () => {
        setMapOpen(false);
    };

    return (
        <>
            <MainCard sx={{ mb: 2, marginBottom: 3 }}>
                <Box mb={2}>
                    <Box>
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

                        <Typography variant="h4" gutterBottom>
                            Localizzazione:
                        </Typography>
                        <Box display="flex" alignItems="center" mb={2}>
                            <Typography variant="body1" sx={{ mr: 1 }}>
                                {projectData?.completeAddress}
                            </Typography>
                            <RoomIcon
                                color="primary"
                                sx={{ cursor: 'pointer' }}
                                onClick={handleMapClick}
                            />
                        </Box>

                        <Typography variant="h4" gutterBottom>
                            Stato:
                        </Typography>
                        <Typography variant="body1">
                            {projectData?.status}
                        </Typography>
                    </Box>
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
                            <TotalIncomeLightCard
                                key={index}
                                icon={data.icon}
                                label={data.label}
                                total={data.number}
                                isLoading={isLoading}
                            />
                        </Grid>
                    ))}
                </Grid>
            </MainCard>

            {/* Dialog per mappa a schermo intero */}
            <Dialog open={mapOpen} onClose={handleCloseMap} maxWidth="lg" fullWidth>
                <DialogContent>
                    <MapContainer
                        center={[projectData?.latitude || 0, projectData?.longitude || 0]}
                        zoom={13}
                        style={{ height: '500px', width: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="© OpenStreetMap contributors"
                        />
                        <Marker position={[projectData?.latitude || 0, projectData?.longitude || 0]}>
                            <Popup>
                                {projectData?.completeAddress || 'Indirizzo non disponibile'}
                            </Popup>
                        </Marker>
                    </MapContainer>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ProjectOverview;
