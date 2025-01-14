import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Snackbar,
    Alert,
    Box,
    Typography,
    Select,
    MenuItem,
    Checkbox,
    FormControlLabel,
    FormLabel,
    Grid
} from '@mui/material';
import { fetchSubjects, getProjectSubjectRoles } from 'api/subjects.js';
import { getFigures } from 'api/figure.js';

const ManualSubjectDialog = ({ open, onClose, onAddSubject }) => {
    const [manualSubject, setManualSubject] = useState({
        firstName: '',
        lastName: '',
        cf: '',
        email: '',
        company: '',
        cfPiva: '',
        figure: '',
        role: '',
        invite: false,
    });
    const [figures, setFigures] = useState([]);
    const [projectRoles, setProjectRoles] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

    useEffect(() => {
        const fetchFigures = async () => {
            try {
                const response = await getFigures();
                setFigures(response);
            } catch (error) {
                setSnackbar({ open: true, message: 'Errore durante il caricamento delle figure.', severity: 'error' });
            }
        };
        fetchFigures();
    }, []);

    const fetchRoles = async (figureName) => {
        try {
            const roles = await getProjectSubjectRoles(figureName);
            setProjectRoles(roles);
        } catch (error) {
            setSnackbar({ open: true, message: 'Errore durante il caricamento dei ruoli.', severity: 'error' });
        }
    };

    useEffect(() => {
        if (manualSubject.figure) {
            fetchRoles(manualSubject.figure);
        }
    }, [manualSubject.figure]);

    const handleManualAdd = () => {
        if (!manualSubject.firstName || !manualSubject.lastName || !manualSubject.cf || !manualSubject.email || !manualSubject.company || !manualSubject.cfPiva || !manualSubject.figure || !manualSubject.role) {
            setSnackbar({ open: true, message: 'Compila tutti i campi obbligatori.', severity: 'error' });
            return;
        }

        const newSubject = {
            ...manualSubject,
            id: Date.now(),
            newSubject: true,
        };

        onAddSubject(newSubject);
        setSnackbar({ open: true, message: 'Soggetto aggiunto manualmente con successo.', severity: 'success' });

        setManualSubject({
            firstName: '',
            lastName: '',
            cf: '',
            email: '',
            company: '',
            cfPiva: '',
            figure: '',
            role: '',
            invite: false,
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Aggiungi un soggetto e invita a partecipare</DialogTitle>
            <DialogContent>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    Inserisci i campi del soggetto e dell'azienda.
                    Mettendo la spunta su "Invita al progetto" il soggetto riceverà un'email di invito a registrarsi ad OperaWeb per seguire ed operare sul progetto.
                </Typography>
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                    <Grid item xs={12} sm={6}>
                        <FormLabel>Nome</FormLabel>
                        <TextField
                            fullWidth
                            value={manualSubject.firstName}
                            onChange={(e) => setManualSubject({ ...manualSubject, firstName: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel>Cognome</FormLabel>
                        <TextField
                            fullWidth
                            value={manualSubject.lastName}
                            onChange={(e) => setManualSubject({ ...manualSubject, lastName: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel>Codice Fiscale</FormLabel>
                        <TextField
                            fullWidth
                            value={manualSubject.cf}
                            onChange={(e) => setManualSubject({ ...manualSubject, cf: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel>Email</FormLabel>
                        <TextField
                            fullWidth
                            value={manualSubject.email}
                            onChange={(e) => setManualSubject({ ...manualSubject, email: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel>Azienda</FormLabel>
                        <TextField
                            fullWidth
                            value={manualSubject.company}
                            onChange={(e) => setManualSubject({ ...manualSubject, company: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel>PIVA Azienda</FormLabel>
                        <TextField
                            fullWidth
                            value={manualSubject.cfPiva}
                            onChange={(e) => setManualSubject({ ...manualSubject, cfPiva: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel>Figura</FormLabel>
                        <Select
                            fullWidth
                            value={manualSubject.figure}
                            onChange={(e) => setManualSubject({ ...manualSubject, figure: e.target.value })}
                        >
                            {figures.map((figure) => (
                                <MenuItem key={figure.id} value={figure.name}>
                                    {figure.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormLabel>Ruolo</FormLabel>
                        <Select
                            fullWidth
                            value={manualSubject.role}
                            onChange={(e) => setManualSubject({ ...manualSubject, role: e.target.value })}
                        >
                            {projectRoles.map((role) => (
                                <MenuItem key={role.id} value={role.name}>
                                    {role.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={manualSubject.invite}
                                    onChange={(e) => setManualSubject({ ...manualSubject, invite: e.target.checked })}
                                />
                            }
                            label="Invita al progetto"
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Annulla
                </Button>
                <Button onClick={handleManualAdd} color="primary" variant="contained">
                    Aggiungi
                </Button>
            </DialogActions>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
            </Snackbar>
        </Dialog>
    );
};

export default ManualSubjectDialog;
