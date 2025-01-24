import React, { useState } from 'react';
import {
    Box,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    CircularProgress,
    Tooltip,
    Button,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { saveProject } from 'api/projects';
import { openSnackbar } from 'store/slices/snackbar';
import { useDispatch } from 'react-redux';
import { setCurrentProject } from 'store/slices/project';

const ProjectActions = ({ onDelete, projectData, setProjectData }) => {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openSaveDialog, setOpenSaveDialog] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const dispatch = useDispatch();

    const handleOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleOpenSaveDialog = () => {
        setOpenSaveDialog(true);
    };

    const handleCloseSaveDialog = () => {
        setOpenSaveDialog(false);
    };

    const handleConfirmDelete = () => {
        onDelete();
        setOpenDeleteDialog(false);
    };

    const handleSaveProject = async () => {
        setIsSaving(true);
        try {
            var updateProjectResponse = await saveProject(projectData.id, projectData);

            // Aggiorna lo stato di Redux con i nuovi dati del progetto
            dispatch(setCurrentProject(updateProjectResponse.data));

            // Aggiorna il local state se necessario
            setProjectData(updateProjectResponse.data);

            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Progetto salvato con successo!',
                    variant: 'alert',
                    alert: { color: 'success' },
                })
            );
        } catch (error) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Errore durante il salvataggio del progetto.\r\n' + error,
                    variant: 'alert',
                    alert: { color: 'error' },
                    autoHideDuration: 3500,
                })
            );
        } finally {
            setIsSaving(false);
            setOpenSaveDialog(false);
        }
    };

    return (
        <Box display="flex" justifyContent="flex-end" alignItems="center" >
            {/* Icona Salva */}
            <Tooltip title="Salva Progetto">
                <IconButton
                    color="primary"
                    onClick={handleOpenSaveDialog}
                    disabled={!projectData}
                    sx={{ fontSize: '2.2rem' }}
                >
                    <SaveOutlinedIcon fontSize="inherit" />
                </IconButton>
            </Tooltip>

            {/* Dialog per confermare il salvataggio */}
            <Dialog open={openSaveDialog} onClose={handleCloseSaveDialog}>
                <DialogTitle>Conferma Salvataggio</DialogTitle>
                <DialogContent>
                    <DialogContentText>Procedo con il salvataggio del progetto?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSaveDialog} color="secondary">
                        Annulla
                    </Button>
                    <Button
                        onClick={handleSaveProject}
                        color="primary"
                        disabled={isSaving}
                        startIcon={isSaving && <CircularProgress size={20} color="inherit" />}
                    >
                        {isSaving ? 'Salvataggio...' : 'Conferma'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Icona Elimina */}
            <Tooltip title="Elimina Progetto">
                <IconButton
                    color="error"
                    onClick={handleOpenDeleteDialog}
                    sx={{ fontSize: '2.2rem' }}
                >
                    <DeleteOutlineIcon fontSize="inherit" />
                </IconButton>
            </Tooltip>

            {/* Dialog per confermare l'eliminazione */}
            <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Conferma Eliminazione</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Sei sicuro di voler eliminare questo progetto?
                        Rimarrà nel cestino per 30 giorni e potrà essere ripristinato durante questo periodo.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmDelete} color="primary">
                        Conferma
                    </Button>
                    <Button onClick={handleCloseDeleteDialog} color="error">
                        Annulla
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProjectActions;
