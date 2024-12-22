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

const validationSchema = yup.object({});
export default function SubjectsForm({ subjectsData, setSubjectsData, handleNext, handleBack, setErrorIndex, projectData, setProjectData}) {
    const [openDialog, setOpenDialog] = useState(false);
    const [searchDialogOpen, setSearchDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedType, setSelectedType] = useState('committente'); // Default: committente
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
    const [subjects, setSubjects] = useState(projectData.subjects || []);
    const [inviteSubject, setInviteSubject] = useState({ name: '', email: '' });
    const [selectedSubjectId, setSelectedSubjectId] = useState(null);
    
    const [roles, setRoles] = useState([]); // Stato per i ruoli

    // Recupera i ruoli dall'API
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const rolesData = await getProjectSubjectRoles();
                setRoles(rolesData); // Aggiorna i ruoli con i dati ricevuti dall'API
            } catch (error) {
                console.error('Errore nel recupero dei ruoli:', error);
            }
        };

        fetchRoles();
    }, []);

    const formik = useFormik({
        initialValues: {
            searchQuery: '',
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: () => {
            handleNext();
        },
    });
    const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

    
    const handleOpenDialog = () => {
        setSelectedSubject(null);
        setSearchResults([]);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedSubject(null);
        setInviteSubject({ name: '', email: '' });
    };

    const handleSearch = async () => {
        try {
            const results = await fetchSubjects(searchQuery);
            setSearchResults(results);
            setSearchDialogOpen(true);
        } catch (error) {
            setSnackbar({ open: true, message: 'Errore nella ricerca dei soggetti.', severity: 'error' });
        }
    };

    const handleSelectSubject = (subject) => {
        setSelectedSubject(subject);
        setSearchDialogOpen(false);
    };

    const handleInviteSubject = () => {
        if (!inviteSubject.name || !inviteSubject.email) {
            setSnackbar({
                open: true,
                message: 'Inserisci una ragione sociale e un email per invitare un soggetto.',
                severity: 'error',
            });
            return;
        }

        const invitedSubject = {
            name: inviteSubject.name,
            email: inviteSubject.email,
            status: 'pending'
        };
        setSelectedSubject(invitedSubject);
        setSnackbar({ open: true, message: 'Soggetto invitato con successo.', severity: 'success' });
    };

    const handleRemoveSelectedSubject = () => {
        setSelectedSubject(null);
        setInviteSubject({ name: '', email: '' });
    };

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
            subjectId: 0,
            name: selectedSubject.name,
            email: selectedSubject.email,
            cfPiva: selectedSubject.cfPiva,
            subjectRole: selectedRole,
            type: selectedType,
            status: selectedSubject.status
        };

        const updatedSubjects = [...subjects, newSubject];
        setSubjects(updatedSubjects);

        setProjectData((prevData) => ({
            ...prevData,
            subjects: updatedSubjects,
        }));

        setSnackbar({ open: true, message: 'Soggetto aggiunto con successo.', severity: 'success' });
        setOpenDialog(false);
        setSelectedSubject(null);
        setInviteSubject({ name: '', email: '' });
    };

    const handleDeleteSubject = (id) => {
        const updatedSubjects = subjects.filter((subject) => subject.id !== id);
        setSubjects(updatedSubjects);

        // Aggiorna projectData
        setProjectData((prevData) => ({
            ...prevData,
            subjects: updatedSubjects,
        }));
        setSnackbar({ open: true, message: 'Soggetto eliminato con successo.', severity: 'success' });
    };

    const columns = [
        { field: 'name', headerName: 'Soggetto', flex: 1 },
        { field: 'cfPiva', headerName: 'CF / PIVA', flex: 1 },
        { field: 'subjectRole', headerName: 'Ruolo', flex: 1 },
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

    return (<>
        <Box
            sx={{
                minHeight: '400px',
                maxHeight: '500px', // Limita l'altezza
                overflowY: 'auto', // Scroll interno
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: 2,
            }}
        >
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Aggiungi Soggetti
            </Typography>

            <Button
                variant="contained"
                startIcon={<AddCircleIcon />}
                onClick={handleOpenDialog}
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

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>Aggiungi Soggetto</DialogTitle>
                <DialogContent>
                    <Grid container spacing={4}>
                        {/* Colonna Sinistra: Ruolo e Tipo */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">Dettagli del Soggetto Selezionato</Typography>
                            {selectedSubject ? (
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
                                </Card>
                            ) : (
                                <Typography color="textSecondary">Nessun soggetto selezionato.</Typography>
                            )}

                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel id="role-select-label">Ruolo</InputLabel>
                                <Select
                                    labelId="role-select-label"
                                    value={selectedRole}
                                    onChange={(e) => setSelectedRole(e.target.value)}
                                    disabled={!selectedSubject}
                                >
                                    {roles.map((role) => (
                                        <MenuItem key={role.id} value={role.name}>
                                            {role.name}
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
                                    disabled={!selectedSubject}
                                >
                                    <FormControlLabel value="committente" control={<Radio />} label="Committente" />
                                    <FormControlLabel value="professionista" control={<Radio />} label="Professionista" />
                                    <FormControlLabel
                                        value="impresa"
                                        control={<Radio />}
                                        label="Impresa/Operatore Economico"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        {/* Colonna Destra: Ricerca e Invito */}
                        <Grid item xs={12} md={6}>
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

            {/* Dialog per i risultati della ricerca */}
            <Dialog open={searchDialogOpen} onClose={() => setSearchDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Risultati della Ricerca</DialogTitle>
                <DialogContent>
                    <List>
                        {searchResults.map((subject) => (
                            <React.Fragment key={subject.id}>
                                <ListItem button onClick={() => handleSelectSubject(subject)}>
                                    <ListItemText
                                        primary={subject.name}
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
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{ my: 3, ml: 1 }}
                            onClick={() => {
                                formik.handleSubmit();
                                setErrorIndex(1);
                            }}
                        >
                                Next
                            </Button>
                        </AnimateButton>
                    </Stack>
                </Grid>
            </form></>
    );
}
