import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    Divider,
    Button,
    Typography,
} from '@mui/material';

export default function SearchDialog({ open, onClose, onSelectSubject, searchResults }) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Risultati della Ricerca</DialogTitle>
            <DialogContent>
                {searchResults.length > 0 ? (
                    <List>
                        {searchResults.map((subject) => (
                            <React.Fragment key={subject.id}>
                                <ListItem button onClick={() => onSelectSubject(subject)}>
                                    <ListItemText
                                        primary={subject.name}
                                        secondary={`CF/PIVA: ${subject.cfPiva || 'Non disponibile'}`}
                                    />
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body2" color="textSecondary">
                        Nessun risultato trovato. Modifica i criteri di ricerca e riprova.
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Chiudi
                </Button>
            </DialogActions>
        </Dialog>
    );
}
