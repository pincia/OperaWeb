import React, { useEffect, useState } from 'react';
import { isProfileComplete, updateProfile, getSubRoles } from 'api/users';
import { getProvinces, getCities } from 'api/config';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, MenuItem } from '@mui/material';
import { openSnackbar } from 'store/slices/snackbar';

import ProjectTemplates from './ProjectTemplates';
import ProjectTable from './ProjectTable';

const Dashboard = () => {
    const [isProfileIncomplete, setIsProfileIncomplete] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
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

    useEffect(() => {
        const checkProfile = async () => {
            const isComplete = await isProfileComplete();
            if (!isComplete) {
                setIsProfileIncomplete(true);
                setOpenDialog(true);
            }
        };
        checkProfile();
    }, []);

    useEffect(() => {
        const fetchProvinces = async () => setProvinces(await getProvinces());
        fetchProvinces();
    }, []);

    useEffect(() => {
        if (formData.provinciaId) getCities(formData.provinciaId).then(setUserCities);
    }, [formData.provinciaId]);

    useEffect(() => {
        if (formData.companyProvinciaId) getCities(formData.companyProvinciaId).then(setCompanyCities);
    }, [formData.companyProvinciaId]);

    useEffect(() => {
        const fetchSubRoles = async () => setSubRoles(await getSubRoles());
        fetchSubRoles();
    }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        try {
            await updateProfile(formData);
            openSnackbar({ open: true, message: 'Profile updated successfully!', variant: 'alert', alert: { color: 'success' } });
            setOpenDialog(false);
            setIsProfileIncomplete(false);
        } catch {
            openSnackbar({ open: true, message: 'Failed to update profile!', variant: 'alert', alert: { color: 'error' } });
        }
    };

    return (
        <>
            {/* Tabella Progetti e Template */}
            <ProjectTemplates />
            <ProjectTable />

            {/* Dialog Completamento Profilo */}
            <Dialog open={openDialog} aria-labelledby="complete-profile-title">
                <DialogTitle id="complete-profile-title">Completa il tuo profilo</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}><h4>Dati Utente</h4></Grid>
                        {['firstName', 'lastName', 'phoneNumber'].map((field) => (
                            <Grid key={field} item xs={6}>
                                <TextField fullWidth label={field} name={field} value={formData[field]} onChange={handleChange} />
                            </Grid>
                        ))}
                        <Grid item xs={6}>
                            <TextField select fullWidth label="Provincia" name="provinciaId" value={formData.provinciaId} onChange={handleChange}>
                                {provinces.map((p) => <MenuItem key={p.id} value={p.id}>{p.nome}</MenuItem>)}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField select fullWidth label="Comune" name="comuneId" value={formData.comuneId} onChange={handleChange}>
                                {userCities.map((c) => <MenuItem key={c.id} value={c.id}>{c.nome}</MenuItem>)}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField select fullWidth label="Sottoruolo" name="subRoleId" value={formData.subRoleId} onChange={handleChange}>
                                {subRoles.map((r) => <MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>)}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}><h4>Dati Azienda</h4></Grid>
                        {['ragioneSociale', 'pIVA', 'companyTaxCode', 'sdiCode', 'pec'].map((field) => (
                            <Grid key={field} item xs={6}>
                                <TextField fullWidth label={field} name={field} value={formData[field]} onChange={handleChange} />
                            </Grid>
                        ))}
                        <Grid item xs={6}>
                            <TextField select fullWidth label="Provincia Azienda" name="companyProvinciaId" value={formData.companyProvinciaId} onChange={handleChange}>
                                {provinces.map((p) => <MenuItem key={p.id} value={p.id}>{p.nome}</MenuItem>)}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField select fullWidth label="Comune Azienda" name="companyComuneId" value={formData.companyComuneId} onChange={handleChange}>
                                {companyCities.map((c) => <MenuItem key={c.id} value={c.id}>{c.nome}</MenuItem>)}
                            </TextField>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} color="primary">Salva</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Dashboard;
