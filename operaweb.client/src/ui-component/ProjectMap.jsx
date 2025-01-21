import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '500px', // Altezza personalizzabile
};

const ProjectMap = ({ latitude, longitude, address }) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const center = {
        lat: latitude || 0, // Latitude del progetto
        lng: longitude || 0, // Longitude del progetto
    };

    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={13}
            >
                {/* Marker per la posizione */}
                <Marker position={center} title={address || 'Localizzazione'} />
            </GoogleMap>
        </LoadScript>
    );
};

export default ProjectMap;
