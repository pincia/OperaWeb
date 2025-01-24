import React, { useState } from 'react';
import { Box, Grid, Typography, Dialog, DialogContent, Divider } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeDarkCard from 'ui-component/cards/TotalIncomeDarkCard';
import TotalIncomeLightCard from 'ui-component/cards/TotalIncomeLightCard';
import RoomIcon from '@mui/icons-material/Room';
import SideIconCard from 'ui-component/cards/SideIconCard';
import ReportCard from 'ui-component/cards/ReportCard';
import CachedTwoToneIcon from '@mui/icons-material/CachedTwoTone';
import DehazeTwoToneIcon from '@mui/icons-material/DehazeTwoTone';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import AssignmentTurnedInTwoToneIcon from '@mui/icons-material/AssignmentTurnedInTwoTone';
import ProgressBar from 'react-customizable-progressbar';
import { useCountTasksWithEntries } from 'utils/projectDataUtils';
const mapContainerStyle = {
    width: '100%',
    height: '500px',
};

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
    const [completion, setCompletion] = useState(20);
    const taskCount = useCountTasksWithEntries();

    const widgetData = [
        { number: taskCount, label: 'Lavorazioni totali', icon: DehazeTwoToneIcon },
        { number: 0, label: 'Lavorazioni terminate', icon: AssignmentTurnedInTwoToneIcon },
        { number: 0, label: 'Lavorazioni in corso', icon: CachedTwoToneIcon },
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
        <><Grid container spacing={2} alignItems="stretch">
            {/* Card principale con i dettagli del progetto */}
            <Grid item xs={12} md={9} sx={{ display: 'flex', flexDirection: 'column' }}>
                <MainCard sx={{ height: '100%' }}>
                    <Grid container spacing={2} alignItems="stretch">
                        <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column' }}>
                         <Box>
                        {/* Dettagli del progetto */}
                        {projectData?.status !== undefined && (
                            <Typography variant="body1" mb={2}>
                                <strong>Stato:</strong>{' '}
                                <span style={{ color: statusColors[getStatusLabel(projectData.status)], fontWeight: 'bold' }}>
                                    {getStatusLabel(projectData.status)}
                                </span>
                            </Typography>
                        )}
                        <Typography variant="body1" mb={2}>
                            <strong>Ente, Comune:</strong> {projectData?.city}
                        </Typography>
                        <Typography variant="body1" mb={2}>
                            <strong>Provincia:</strong> {projectData?.province}
                        </Typography>
                        <Typography variant="body1" mb={2}>
                            <strong>Descrizione:</strong> {projectData?.works}
                        </Typography>
                        <Typography variant="body1" mb={2}>
                            <strong>Oggetto:</strong> {projectData?.object}
                        </Typography>
                      
                       
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box>
                                {projectData.latitude && projectData.longitude && (
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: 200,
                                            mt: 2,
                                            backgroundImage: `url(https://maps.googleapis.com/maps/api/staticmap?center=${projectData.latitude},${projectData.longitude}&zoom=15&size=400x200&maptype=roadmap&markers=color:red%7C${projectData.latitude},${projectData.longitude}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            cursor: 'pointer',
                                        }}
                                        onClick={handleMapClick}
                                    />
                                )}
                                {projectData?.completeAddress && (
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <RoomIcon sx={{ marginRight: 1 }} />
                                        <Typography variant="body1">
                                            <strong>{projectData.completeAddress}</strong>
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
            {/* Card con widget e statistiche */}
            <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Grid item>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            width: '100%',
                            padding: 0, // Rimuove eventuali padding
                            marginBottom: 0, // Rimuove i margini inferiori
                        }}
                    >
                        <Box position="relative" display="inline-flex">
                            <ProgressBar
                                radius={80}
                                progress={completion}
                                cut={120}
                                rotate={-210}
                                strokeWidth={10}
                                strokeColor="#5d9cec"
                                strokeLinecap="square"
                                trackStrokeWidth={6}
                                trackStrokeColor="#e6e6e6"
                                trackStrokeLinecap="square"
                                pointerRadius={0}
                                initialAnimation={true}
                                transition="1.5s ease 0.5s"
                                trackTransition="0s ease"
                            />
                            {/* Testo al centro */}
                            <Box
                                position="absolute"
                                top="50%"
                                left="50%"
                                sx={{
                                    transform: 'translate(-50%, -50%)',
                                    textAlign: 'center',
                                }}
                            >
                                <Typography variant="h5" component="div" fontWeight="bold" color="text.primary">
                                    {`${completion}%`}
                                </Typography>
                                <Typography variant="h6" component="div" fontWeight="bold" color="text.primary">
                                   Completamento progetto
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Box sx={{ width: '100%' }}>
                    <TotalIncomeDarkCard
                        isLoading={isLoading}
                        total={projectData?.totalAmount}
                        label="Totale Progetto"
                    />
                </Box>
                {widgetData.map((data, index) => (
                    <Box key={index} sx={{ width: '100%' }}>
                        <ReportCard
                            iconPrimary={data.icon}
                            primary={data.number}
                            secondary={data.label}
                            color="secondary.main"
                        />
                    </Box>
                ))}
            </Grid>
        </Grid>
            {/* Dialog per mappa interattiva */}
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
