import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ErrorPage = () => {
    const [searchParams] = useSearchParams();
    const message = searchParams.get('message') || 'An unexpected error occurred.';

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
            <Box textAlign="center">
                <ErrorOutlineIcon sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
                <Typography variant="h4" component="h1" color="error.main" gutterBottom>
                    Verification Failed
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                    {message}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    href="/"
                    size="large"
                    sx={{ mt: 3 }}
                >
                    Back to Home
                </Button>
            </Box>
        </Container>
    );
};

export default ErrorPage;
