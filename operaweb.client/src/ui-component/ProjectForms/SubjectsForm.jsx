import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Typography,
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
import Stack from '@mui/material/Stack';
import { getProjectSubjectRoles } from 'api/subjects';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useSelector } from 'react-redux';
import { store } from 'store';
import SubjectsTable from './SubjectsTable'
import RoleSelectionDialog from './RoleSelectionDialog'
import SubjectManagementDialog from './SubjectManagementDialog'

export default function SubjectsForm({ projectData, setProjectData, onValidationChange }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [openRoleDialog, setOpenRoleDialog] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [figureType, setFigureType] = useState('committente'); 
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
    const [subjects, setSubjects] = useState(projectData.subjects || []);
    const [inviteSubject, setInviteSubject] = useState({ name: '', email: '' });
    const user = useSelector((state) => state.account.user);
    const [roles, setRoles] = useState(user?.roles || {});
    // Recupera i ruoli dall'API basati sul tipo selezionato
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
        const userExists = subjects.some((subject) => subject.email === user.username);
        if (!userExists) {
            setOpenRoleDialog(true);
        }
    }, [subjects, user]);

    useEffect(() => {
        if (openRoleDialog) {
            fetchRoles(user?.company?.figure );
        }
    }, [user, openRoleDialog]);

    useEffect(() => {
        if (openDialog) {
            fetchRoles(figureType);
        }
    }, [openDialog, figureType]);

    const prevSubjectsRef = React.useRef(subjects);

    useEffect(() => {
        if (prevSubjectsRef.current !== subjects) {
            const isValid = subjects.length > 0;
            onValidationChange(isValid);
            prevSubjectsRef.current = subjects; 
        }
    }, [subjects, onValidationChange]);

    const handleOpenDialog = () => {
        setSelectedSubject(null);
        setSearchResults([]);
        setOpenDialog(true);
    };

    const handleAddSubject = (subject) => {

        const newSubject = {
            id: subject.userId || Date.now(),
            userId: subject.userId,
            cf: subject.cf,
            name: subject.name || `${user.firstName} ${user.lastName}`,
            email: subject.email,
            cfPiva: subject.cfPiva,
            role: subject.role,
            userId: user.id,
            figure: subject.figure,
            company: subject.company,
            status: subject.status,
            firstName: subject.firstName || subject.name.split(' ')[0],
            lastName: subject.lastName || subject.name.split(' ')[1],
            invite: subject.invite
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

        setProjectData((prevData) => ({
            ...prevData,
            subjects: updatedSubjects,
        }));
    };

    const handleConfirmRole = (role) => {
        const newSubject = {
            id: user.id || Date.now(), // Usa l'ID utente se disponibile
            userId: user.id,
            cf: user.cf,
            name: `${user.firstName} ${user.lastName}`,
            email: user.username,
            cfPiva: user.company.vatOrTaxCode, // Puoi aggiungere altre informazioni utente qui se necessarie
            role: role,
            figure: user.company.figure,
            firstName: user.firstName,
            company: user.company.name,
            invite: false,
            lastName: user.lastName,
            status: "Attivo"
        };

        const updatedSubjects = [...subjects, newSubject];
        setSubjects(updatedSubjects);
        setProjectData((prevData) => ({
            ...prevData,
            subjects: updatedSubjects,
        }));

        setSnackbar({
            open: true,
            message: 'Ruolo selezionato e soggetto aggiunto con successo.',
            severity: 'success',
        });
        setOpenRoleDialog(false); // Chiudi la dialog
    };
    

return (
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

        <SubjectsTable subjects={subjects} onDelete={handleDeleteSubject} />

        <RoleSelectionDialog
            open={openRoleDialog}
            onClose={() => setOpenRoleDialog(false)}
            onAddRole={(role) => handleConfirmRole(role)}
            roles={roles }
        />

        <SubjectManagementDialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            onAddSubject={handleAddSubject}
        />

    </Box>
);
}
