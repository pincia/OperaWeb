import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
} from '@mui/material';

export default function AddSubjectDialog({ open, onClose, onAdd }) {
    const [subject, setSubject] = useState({ name: '', email: '', role: '' });

    const handleAdd = () => {
        onAdd({ ...subject, id: Date.now() });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Aggiungi Soggetto</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Nome"
                            fullWidth
                            value={subject.name}
                            onChange={(e) => setSubject({ ...subject, name: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            fullWidth
                            value={subject.email}
                            onChange={(e) => setSubject({ ...subject, email: e.target.value })}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Annulla
                </Button>
                <Button onClick={handleAdd} color="primary" variant="contained">
                    Aggiungi
                </Button>
            </DialogActions>
        </Dialog>
    );
}
