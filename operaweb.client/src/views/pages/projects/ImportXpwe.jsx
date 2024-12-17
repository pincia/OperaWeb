import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { HubConnectionBuilder } from '@microsoft/signalr';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    LinearProgress,
    Typography
} from '@mui/material';
import SingleFileUpload from 'ui-component/third-party/dropzone/SingleFile';
import { importXPWE } from 'api/projects';
import { useDispatch } from 'store'; // Importa dispatch dallo store
import { openSnackbar } from 'store/slices/snackbar'; // Importa l'action per lo Snackbar

const ImportXpwe = ({ open, handleCloseDialog }) => {
    const [progress, setProgress] = useState(0);
    const [connection, setConnection] = useState(null);
    const [file, setFile] = useState(null); // Stato per il file selezionato
    const [isUploading, setIsUploading] = useState(false); // Stato per mostrare/nascondere la barra di avanzamento
    const dispatch = useDispatch(); // Hook per usare dispatch

    useEffect(() => {
        const connectToHub = async () => {
            const hubUrl = import.meta.env.VITE_SIGNALR_URL || "/hubs/import";
            const conn = new HubConnectionBuilder()
                .withUrl(hubUrl)
                .withAutomaticReconnect()
                .build();

            conn.on('UpdateProgress', (progress) => {
                setProgress(progress); // Aggiorna il progresso ricevuto dal backend
            });

            try {
                await conn.start();
                console.log('SignalR connected.');
                setConnection(conn);
            } catch (error) {
                console.error('SignalR connection error:', error);
            }
        };

        connectToHub();

        return () => {
            if (connection) {
                connection.stop();
            }
        };
    }, []);

    // Funzione di submit
    const handleSubmit = async () => {
        if (!file || !connection) return;

        setProgress(0);
        setIsUploading(true); // Mostra la barra di avanzamento

        try {
            var response = await importXPWE(file, connection.connectionId);
            console.log('File successfully uploaded.');

            // Mostra Snackbar di successo
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'File importato con successo!',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: false
                })
            );

            // Chiudi il dialog
            handleCloseDialog(true, response.id);
        } catch (error) {
            console.error('Error submitting file:', error);
            handleCloseDialog(false)
            // Mostra Snackbar di errore
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Errore durante l\'importazione del file.',
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: false
                })
            );
        } finally {
            setIsUploading(false); // Nasconde la barra di avanzamento
        }
    };

    // Funzione per aggiornare il file selezionato
    const setFieldValue = (field, value) => {
        if (field === 'file') {
            setFile(value);
        }
    };

    return (
        <Dialog open={open} maxWidth="sm" fullWidth>
            <DialogTitle>Import Project</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {/* Componente SingleFileUpload */}
                    <Grid item xs={12}>
                        <SingleFileUpload
                            file={file}
                            setFieldValue={setFieldValue}
                            error={!file ? 'File is required' : ''}
                        />
                    </Grid>

                    {/* Stato di avanzamento: mostrato solo quando isUploading è true */}
                    {isUploading && (
                        <Grid item xs={12}>
                            <Typography variant="body2">Progress: {progress}%</Typography>
                            <LinearProgress variant="determinate" value={progress} />
                        </Grid>
                    )}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleCloseDialog(false)} color="error" disabled={isUploading}>
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    disabled={!file || isUploading} // Disabilita durante il caricamento o se manca il file
                    variant="contained"
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ImportXpwe.propTypes = {
    open: PropTypes.bool.isRequired,
    handleCloseDialog: PropTypes.func.isRequired
};

export default ImportXpwe;
