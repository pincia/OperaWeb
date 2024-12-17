import React, { useEffect, useState } from 'react';
import { getProfile, updateProfile, getSubRoles } from 'api/users';
import { getProvinces, getCities } from 'api/config';
import {
    TextField,
    Grid,
    MenuItem,
    Button,
    Typography,
    Card,
    CardContent,
    Tabs,
    Tab,
    Box,
    Snackbar,
    Alert
} from '@mui/material';

const ProfilePage = () => {
    const [tabValue, setTabValue] = useState(0); // Stato per i Tab
    const [provinces, setProvinces] = useState([]);
    const [userCities, setUserCities] = useState([]);
    const [companyCities, setCompanyCities] = useState([]);
    const [subRoles, setSubRoles] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        comuneId: '',
        provinciaId: '',
        ragioneSociale: '',
        pIVA: '',
        companyTaxCode: '',
        companyComuneId: '',
        companyProvinciaId: '',
        sdiCode: '',
        pec: '',
        subRoleId: ''
    });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const profile = await getProfile();
                setFormData(profile);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        const fetchProvinces = async () => setProvinces(await getProvinces());
        const fetchSubRoles = async () => setSubRoles(await getSubRoles());

        loadProfile();
        fetchProvinces();
        fetchSubRoles();
    }, []);

    useEffect(() => {
        if (formData.provinciaId) getCities(formData.provinciaId).then(setUserCities);
    }, [formData.provinciaId]);

    useEffect(() => {
        if (formData.companyProvinciaId) getCities(formData.companyProvinciaId).then(setCompanyCities);
    }, [formData.companyProvinciaId]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        try {
            await updateProfile(formData);
            setSnackbar({ open: true, message: 'Profile updated successfully!', severity: 'success' });
        } catch (error) {
            setSnackbar({ open: true, message: 'Failed to update profile!', severity: 'error' });
        }
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h4" gutterBottom>Profilo</Typography>

                {/* Tabs per separare Dati Utente e Azienda */}
                <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} centered>
                    <Tab label="Dati Utente" />
                    <Tab label="Dati Azienda" />
                </Tabs>

                {/* Contenuto dei Tab */}
                <Box mt={2}>
                    {tabValue === 0 && (
                        <Grid container spacing={2}>
                            {/* Campi Dati Utente */}
                            {['firstName', 'lastName', 'phoneNumber'].map((field) => (
                                <Grid key={field} item xs={6}>
                                    <TextField
                                        fullWidth
                                        required
                                        label={field}
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            ))}
                            <Grid item xs={6}>
                                <TextField
                                    select
                                    fullWidth
                                    required
                                    label="Sottoruolo"
                                    name="subRoleId"
                                    value={formData.subRoleId}
                                    onChange={handleChange}
                                >
                                    {subRoles.map((role) => (
                                        <MenuItem key={role.id} value={role.id}>
                                            {role.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    select
                                    fullWidth
                                    required
                                    label="Provincia"
                                    name="provinciaId"
                                    value={formData.provinciaId}
                                    onChange={handleChange}
                                >
                                    {provinces.map((p) => (
                                        <MenuItem key={p.id} value={p.id}>{p.nome}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    select
                                    fullWidth
                                    required
                                    label="Comune"
                                    name="comuneId"
                                    value={formData.comuneId}
                                    onChange={handleChange}
                                >
                                    {userCities.map((c) => (
                                        <MenuItem key={c.id} value={c.id}>{c.nome}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    )}

                    {tabValue === 1 && (
                        <Grid container spacing={2}>
                            {/* Campi Dati Azienda */}
                            {['ragioneSociale', 'pIVA', 'companyTaxCode', 'sdiCode', 'pec'].map((field) => (
                                <Grid key={field} item xs={6}>
                                    <TextField
                                        fullWidth
                                        label={field}
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            ))}
                            <Grid item xs={6}>
                                <TextField
                                    select
                                    fullWidth
                                    required
                                    label="Provincia Azienda"
                                    name="companyProvinciaId"
                                    value={formData.companyProvinciaId}
                                    onChange={handleChange}
                                >
                                    {provinces.map((p) => (
                                        <MenuItem key={p.id} value={p.id}>{p.nome}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    select
                                    fullWidth
                                    required
                                    label="Comune Azienda"
                                    name="companyComuneId"
                                    value={formData.companyComuneId}
                                    onChange={handleChange}
                                >
                                    {companyCities.map((c) => (
                                        <MenuItem key={c.id} value={c.id}>{c.nome}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    )}
                </Box>

                {/* Bottone Salva */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button onClick={handleSubmit} color="primary" variant="contained">
                        Salva
                    </Button>
                </Box>
            </CardContent>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
            </Snackbar>
        </Card>
    );
};

export default ProfilePage;
