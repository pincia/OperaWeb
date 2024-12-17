import React from 'react';
import { Box, Typography, Button, Container, Card, CardContent } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
const RegistrationConfirmation = () => {
    const handleLoginRedirect = () => {
        // Funzione per il reindirizzamento alla pagina di login
        window.location.href = '/login'; // Cambia il path se necessario
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: 'background.default',
                padding: 3,
            }}
        >
            <Card
                sx={{
                    width: '100%',
                    textAlign: 'center',
                    boxShadow: 3,
                    borderRadius: 2,
                    padding: 3,
                }}
            >
                <CardContent>
                    <CheckCircleIcon
                        sx={{
                            fontSize: 60,
                            color: 'success.main',
                            marginBottom: 2,
                        }}
                    />
                    <Typography variant="h4" component="h1" color="success.main" gutterBottom>
                        Registration Confirmed!
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        Your account has been successfully verified. You can now log in and explore our services.
                    </Typography>
                    <Box sx={{ mt: 4 }}>
                        <Typography
                            component={Link}
                            to={'/login'}
                            variant="subtitle1"
                            sx={{ textDecoration: 'none' }}
                        >
                            Go to Login Page
                        </Typography>
                    </Box>
                    
                </CardContent>
            </Card>
        </Container>
    );
};

export default RegistrationConfirmation;
