import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export default function RoleSelectionDialog({ open, onClose, onAddRole, roles }) {
    const [role, setRole] = React.useState('');

    const handleConfirm = () => {
        onAddRole(role);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Seleziona il tuo Ruolo all'interno del progetto</DialogTitle>
            <DialogContent>
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="role-select-label">Ruolo</InputLabel>
                    <Select
                        labelId="role-select-label"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        {roles.map((role) => (
                            <MenuItem key={role.id} value={role.name}>
                                {role.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleConfirm} color="primary" variant="contained">
                    Conferma
                </Button>
            </DialogActions>
        </Dialog>
    );
}
