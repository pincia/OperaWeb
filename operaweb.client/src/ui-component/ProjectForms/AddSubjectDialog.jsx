import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    Grid,
    Card,
    CardContent,
    Divider,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchSubjects } from 'api/subjects';
import Stack from '@mui/material/Stack';
import { getProjectSubjectRoles } from 'api/subjects';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { store } from 'store';
const validationSchema = yup.object({});

export default function AddSubjectDialog({ open, onClose, onAdd }) {
    const [subject, setSubject] = useState({ name: '', email: '', role: '' });
    const [figureType, setFigureType] = useState('committente'); 
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');
    const user = useSelector((state) => state.account.user);
    const [roles, setRoles] = useState(user?.roles || {});
    const [searchQuery, setSearchQuery] = useState('');
    const handleAdd = () => {
        onAdd({ ...subject, id: Date.now() });
        onClose();
    };

    const fetchRoles = async (typeToFetch) => {
        try {
            if (typeToFetch) {
                const rolesData = await getProjectSubjectRoles(typeToFetch);
                setRoles(rolesData);
            }
        } catch (error) {
            console.error('Errore nel recupero dei ruoli:', error);
            setSnackbar({
                open: true,
                message: 'Errore nel recupero dei ruoli.',
                severity: 'error',
            });
        }
    };

    useEffect(() => {
        if (open) {
            fetchRoles(figureType);
        }
    }, [open, figureType]);


    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Aggiungi Soggetto</DialogTitle>
            <DialogContent>
                <Grid container spacing={4}>
                    {/* Colonna Sinistra: Ruolo e Tipo */}
                    <Grid item xs={12} md={6}>

                        <FormControl component="fieldset" sx={{ mb: 2 }}>
                            <FormLabel component="legend">Figura</FormLabel>
                            <RadioGroup
                                row
                                value={figureType}
                                onChange={(e) => setFigureType(e.target.value)}
                                disabled={!selectedSubject}
                            >
                                <FormControlLabel value="committente" control={<Radio />} label="Committente" />
                                <FormControlLabel value="professionista" control={<Radio />} label="Professionista" />
                                <FormControlLabel
                                    value="impresa"
                                    control={<Radio />}
                                    label="Impresa"
                                />
                            </RadioGroup>
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel id="role-select-label">Ruolo</InputLabel>
                            <Select
                                labelId="role-select-label"
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                            >
                                {roles.map((role) => (
                                    <MenuItem key={role.id} value={role.name}>
                                        {role.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    </Grid>

                    {/* Colonna Destra: Ricerca e Invito */}
                    <Grid item xs={12} md={6}>

                        {selectedSubject ? (<>
                            <Typography variant="h6">Dettagli del Soggetto Selezionato</Typography>
                            <Card sx={{ mb: 2 }}>
                                <CardContent>
                                    <Typography variant="body1">Nome: {selectedSubject.name}</Typography>
                                    <Typography variant="body2">CF/PIVA: {selectedSubject.cfPiva}</Typography>
                                </CardContent>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleRemoveSelectedSubject}
                                    sx={{ m: 2 }}
                                >
                                    Rimuovi Soggetto
                                </Button>
                            </Card></>
                        ) : (
                            <Typography color="textSecondary"></Typography>
                        )}
                        {!selectedSubject && (
                            <>
                                <Typography variant="h6" gutterBottom>
                                    Cerca Soggetto
                                </Typography>
                                <TextField
                                    label="Nome Soggetto"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Button
                                    variant="contained"
                                    startIcon={<SearchIcon />}
                                    onClick={handleSearch}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                >
                                    Cerca
                                </Button>
                                <Divider sx={{ my: 2 }} />
                                <Typography variant="h6" gutterBottom>
                                    Invita Soggetto
                                </Typography>
                                <TextField
                                    label="Ragione Sociale"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    value={inviteSubject.name}
                                    onChange={(e) => setInviteSubject({ ...inviteSubject, name: e.target.value })}
                                />
                                <TextField
                                    label="Email"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    value={inviteSubject.email}
                                    onChange={(e) => setInviteSubject({ ...inviteSubject, email: e.target.value })}
                                />
                                <Button
                                    variant="contained"
                                    onClick={handleInviteSubject}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                >
                                    Invita
                                </Button>
                            </>
                        )}
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} color="secondary">
                    Annulla
                </Button>
                <Button onClick={handleAddSubject} color="primary" variant="contained" disabled={!selectedSubject}>
                    Aggiungi
                </Button>
            </DialogActions>
        </Dialog>

    );
}
