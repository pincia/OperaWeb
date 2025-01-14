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
    IconButton,
    Tooltip,
    FormLabel,
    Select,
    MenuItem
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { fetchSubjects, getProjectSubjectRoles } from 'api/subjects.js';
import { getFigures } from 'api/figure.js';
import ManualSubjectDialog from './ManualSubjectDialog';

const SubjectManagementDialog = ({
    open,
    onClose,
    onAddSubject,
    inviteSubjectAPI,
}) => {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [projectRoles, setProjectRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [manualDialogOpen, setManualDialogOpen] = useState(false);
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [filter, setFilter] = useState({
        query: '',
        page: 1,
        pageSize: 10,
    });
    const [totalSubjects, setTotalSubjects] = useState(0);
    const [figures, setFigures] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
    const [loading, setLoading] = useState(false);

    // Recupera i dati dal server utilizzando il filtro corrente
    const fetchSubjectData = React.useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetchSubjects(filter);

            const subjectsWithId = response.data.map((subject) => ({
                ...subject,
                id: subject.userId, // Usa userId come id univoco
            }));

            setSubjects(subjectsWithId);
            setTotalSubjects(response.totalCount);
        } catch (error) {
            setSnackbar({ open: true, message: 'Errore durante il caricamento dei soggetti.', severity: 'error' });
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        if (open) {
            fetchSubjectData();
            fetchFigures();
        }
    }, [fetchSubjectData, open]);

    // Recupera le figure disponibili
    const fetchFigures = async () => {
        try {
            const response = await getFigures();
            setFigures(response);
        } catch (error) {
            setSnackbar({ open: true, message: 'Errore durante il caricamento delle figure.', severity: 'error' });
        }
    };

    // Recupera i ruoli del progetto in base alla figura
    const fetchRoles = async (figureName) => {
        try {
            const roles = await getProjectSubjectRoles(figureName);
            setProjectRoles(roles);
        } catch (error) {
            setSnackbar({ open: true, message: 'Errore durante il caricamento dei ruoli.', severity: 'error' });
        }
    };

    // Gestisce il cambio dei parametri di filtro
    const handleFilterChange = (key, value) => {
        setFilter((prev) => ({
            ...prev,
            [key]: value,
            ...(key === 'pageSize' ? { page: 1 } : {}), // Reset della pagina se cambia il pageSize
        }));
    };

    const handleAddClick = (subject) => {
        setSelectedSubject(subject);
        setSelectedRole(''); // Resetta il ruolo selezionato
        fetchRoles(subject.figure); // Carica i ruoli disponibili
        setConfirmationDialogOpen(true);
    };

    const handleConfirmAdd = () => {
        if (!selectedRole) {
            setSnackbar({ open: true, message: 'Seleziona un ruolo per il soggetto.', severity: 'error' });
            return;
        }

        onAddSubject({ ...selectedSubject, role: selectedRole, newSubject: false });
        setSnackbar({ open: true, message: 'Soggetto aggiunto con successo.', severity: 'success' });
        setConfirmationDialogOpen(false);
    };

    const columns = [
        { field: 'name', headerName: 'Nome', flex: 1, headerClassName: 'table-header' },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'cf', headerName: 'CF', flex: 1 },
        { field: 'cfPiva', headerName: 'CF / PIVA (Azienda)', flex: 1 },
        { field: 'company', headerName: 'Azienda', flex: 1 },
        { field: 'organizationRole', headerName: 'Ruolo Organizzazione', flex: 1 },
        { field: 'figure', headerName: 'Figura (Azienda)', flex: 1 },
        {
            field: 'actions',
            headerName: 'Azioni',
            flex: 0.5,
            renderCell: (params) => (
                <Tooltip title="Aggiungi al progetto">
                    <IconButton color="primary" onClick={() => handleAddClick(params.row)}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Tooltip>
            ),
        },
    ];

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle>Gestione Soggetti</DialogTitle>
            <DialogContent sx={{ maxHeight: '500px', overflowY: 'auto' }}>
                <Box sx={{ marginBottom: 4}}>
                  
                </Box>
                <Box sx={{ marginBottom: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ flex: '0 1 35%' }}>
                        <FormLabel sx={{ marginBottom: 1 }}>Filtro di ricerca</FormLabel>
                        <TextField
                            value={filter.query}
                            onChange={(e) => handleFilterChange('query', e.target.value)}
                            placeholder="Nome, email, cf, Azienda, Figura, Ruolo"
                            fullWidth
                            sx={{ width: '100%' }}
                        />
                    </Box>
                    <Box sx={{ marginLeft: 'auto' }}>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => setManualDialogOpen(true)}
                        >
                            Aggiungi soggetto non in elenco
                        </Button>
                    </Box>
                </Box>

                <DataGrid
                    rows={subjects}
                    columns={columns}
                    page={filter.page - 1}
                    pageSize={filter.pageSize}
                    rowCount={totalSubjects}
                    paginationMode="server"
                    onPageChange={(newPage) => handleFilterChange('page', newPage + 1)}
                    onPageSizeChange={(newPageSize) => handleFilterChange('pageSize', newPageSize)}
                    loading={loading}
                    autoHeight
                    disableSelectionOnClick
                />

                <ManualSubjectDialog
                    open={manualDialogOpen}
                    onClose={() => setManualDialogOpen(false)}
                    onAddSubject={onAddSubject}
                />
                {/* Dialogo di conferma aggiunta */}
                <Dialog open={confirmationDialogOpen} onClose={() => setConfirmationDialogOpen(false)}>
                    <DialogTitle>Conferma Aggiunta</DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>Seleziona il ruolo per il soggetto:</Typography>
                        <Select
                            fullWidth
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                        >
                            {projectRoles.map((role) => (
                                <MenuItem key={role.id} value={role.name}>
                                    {role.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setConfirmationDialogOpen(false)} color="secondary">
                            Annulla
                        </Button>
                        <Button onClick={handleConfirmAdd} color="primary" variant="contained">
                            Conferma
                        </Button>
                    </DialogActions>
                </Dialog>

            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Chiudi
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

export default SubjectManagementDialog;
