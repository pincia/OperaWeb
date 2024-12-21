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
    Snackbar,
    Alert,
    List,
    ListItem,
    ListItemText,
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
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchSubjects } from 'api/subjects';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({});

export default function SubjectsForm({ subjectsData, setSubjectsData, handleNext, handleBack }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [searchDialogOpen, setSearchDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedType, setSelectedType] = useState('committente');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
    const [subjects, setSubjects] = useState(subjectsData || []);

    const roles = ['Rulo1', 'Rulo2', 'Rulo3', 'Rulo4'];

   

    const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

    useEffect(() => {
        if (subjectsData && subjectsData.length) {
            setSubjects(subjectsData);
        }
    }, [subjectsData]);

    const handleAddSubject = () => {
        if (!selectedSubject || !selectedRole || !selectedType) {
            setSnackbar({
                open: true,
                message: 'Seleziona un soggetto, un ruolo e un tipo prima di procedere.',
                severity: 'error',
            });
            return;
        }

        const newSubject = {
            id: Date.now(),
            subject: selectedSubject.subject,
            cfPiva: selectedSubject.cfPiva,
            roles: selectedRole,
            type: selectedType,
        };

        const updatedSubjects = [...subjects, newSubject];
        setSubjects(updatedSubjects);
        setSubjectsData(updatedSubjects); // Sincronizza i dati con il wizard

        setSnackbar({ open: true, message: 'Soggetto aggiunto con successo.', severity: 'success' });
        setOpenDialog(false);
        setSelectedSubject(null);
        setSelectedRole('');
        setSelectedType('committente');
    };

    const handleDeleteSubject = (id) => {
        const updatedSubjects = subjects.filter((subject) => subject.id !== id);
        setSubjects(updatedSubjects);
        setSubjectsData(updatedSubjects); // Sincronizza i dati con il wizard

        setSnackbar({ open: true, message: 'Soggetto eliminato con successo.', severity: 'success' });
    };

    const formik = useFormik({
        initialValues: {
            searchQuery: '',
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: () => {
            setSubjectsData(subjects); // Salva lo stato dei soggetti prima di andare avanti
            handleNext();
        },
    });

    const handleSearch = async () => {
        if (!formik.values.searchQuery) {
            setSnackbar({
                open: true,
                message: 'Inserisci un criterio di ricerca.',
                severity: 'error',
            });
            return;
        }
        try {
            const results = await fetchSubjects(formik.values.searchQuery); // Simula o collega la tua funzione di ricerca
            setSearchResults(results);
            setSearchDialogOpen(true);
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'Errore durante la ricerca dei soggetti.',
                severity: 'error',
            });
        }
    };

    const handleSelectSubject = (subject) => {
        setSelectedSubject(subject);
        setSearchDialogOpen(false);
    };

    const columns = [
        { field: 'subject', headerName: 'Soggetto', flex: 1 },
        { field: 'cfPiva', headerName: 'CF / PIVA', flex: 1 },
        { field: 'roles', headerName: 'Ruolo', flex: 1 },
        { field: 'type', headerName: 'Tipo', flex: 1 },
        {
            field: 'actions',
            headerName: 'Azioni',
            flex: 0.5,
            sortable: false,
            renderCell: (params) => (
                <Button
                    startIcon={<DeleteIcon />}
                    color="secondary"
                    onClick={() => handleDeleteSubject(params.row.id)}
                >
                    Elimina
                </Button>
            ),
        },
    ];

    return (
        <>
            <Box>
                <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                    Aggiungi Soggetti
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddCircleIcon />}
                    onClick={() => setOpenDialog(true)}
                    sx={{ mb: 2 }}
                >
                    Aggiungi Soggetto
                </Button>

                <DataGrid
                    rows={subjects}
                    columns={columns}
                    autoHeight
                    disableSelectionOnClick
                    sx={{ backgroundColor: 'background.paper', borderRadius: 2, boxShadow: 1 }}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />

                <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
                    <DialogTitle>Aggiungi Soggetto</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel id="role-select-label">Ruolo</InputLabel>
                                    <Select
                                        labelId="role-select-label"
                                        value={selectedRole}
                                        onChange={(e) => setSelectedRole(e.target.value)}
                                    >
                                        {roles.map((role) => (
                                            <MenuItem key={role} value={role}>
                                                {role}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl component="fieldset" sx={{ mb: 2 }}>
                                    <FormLabel component="legend">Tipo</FormLabel>
                                    <RadioGroup
                                        row
                                        value={selectedType}
                                        onChange={(e) => setSelectedType(e.target.value)}
                                    >
                                        <FormControlLabel value="committente" control={<Radio />} label="Committente" />
                                        <FormControlLabel value="professionista" control={<Radio />} label="Professionista" />
                                        <FormControlLabel value="impresa" control={<Radio />} label="Impresa/Operatore Economico" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" gutterBottom>
                                    Cerca Soggetto
                                </Typography>
                                <TextField
                                    label="Nome Soggetto"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    value={formik.values.searchQuery}
                                    onChange={formik.handleChange('searchQuery')}
                                />
                                <Button
                                    variant="contained"
                                    startIcon={<SearchIcon />}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    onClick={handleSearch}
                                >
                                    Cerca
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)} color="secondary">
                            Annulla
                        </Button>
                        <Button onClick={handleAddSubject} color="primary" variant="contained">
                            Aggiungi
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={searchDialogOpen} onClose={() => setSearchDialogOpen(false)} maxWidth="sm" fullWidth>
                    <DialogTitle>Risultati della Ricerca</DialogTitle>
                    <DialogContent>
                        <List>
                            {searchResults.map((subject) => (
                                <React.Fragment key={subject.id}>
                                    <ListItem button onClick={() => handleSelectSubject(subject)}>
                                        <ListItemText
                                            primary={subject.subject}
                                            secondary={`CF / PIVA: ${subject.cfPiva}`}
                                        />
                                    </ListItem>
                                    <Divider />
                                </React.Fragment>
                            ))}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setSearchDialogOpen(false)} color="secondary">
                            Chiudi
                        </Button>
                    </DialogActions>
                </Dialog>

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Box>
            <form onSubmit={formik.handleSubmit}>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between">
                        <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                            Back
                        </Button>
                        <AnimateButton>
                            <Button variant="contained" type="submit" sx={{ my: 3, ml: 1 }}>
                                Next
                            </Button>
                        </AnimateButton>
                    </Stack>
                </Grid>
            </form>
        </>
    );
}
