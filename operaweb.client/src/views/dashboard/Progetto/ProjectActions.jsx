import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ProjectActions = ({ onDelete }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmDelete = () => {
        onDelete();
        setOpen(false);
    };

    return (
        <Box display="flex" justifyContent="flex-end" alignItems="center" mt={2}>
            <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleClickOpen}
            >
                Elimina
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Conferma Eliminazione</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Sei sicuro di voler eliminare questo progetto? Rimarrà nel cestino per 30 giorni e potrà essere ripristinato durante questo periodo.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Annulla
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error">
                        Elimina
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProjectActions;
