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
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider
} from '@mui/material';
import SingleFileUpload from 'ui-component/third-party/dropzone/SingleFile';
import { importXPWE } from 'api/projects';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { setImportedProject } from 'store/slices/project';
import { useNavigate } from 'react-router-dom';


const ImportXpwe = ({ open, handleCloseDialog }) => {
    const [progress, setProgress] = useState(0);
    const [connection, setConnection] = useState(null);
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [importResult, setImportResult] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const connectToHub = async () => {
            const hubUrl = import.meta.env.VITE_SIGNALR_URL || '/hubs/import';
            const conn = new HubConnectionBuilder()
                .withUrl(hubUrl)
                .withAutomaticReconnect()
                .build();

            conn.on('UpdateProgress', (progress) => {
                setProgress(progress);
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

    const handleSubmit = async () => {
        if (!file || !connection) return;

        setProgress(0);
        setIsUploading(true);
        setImportResult(null);

        try {
            const response = await importXPWE(file, connection.connectionId);
            setImportResult(response);

            // Salva il progetto importato nello stato di Redux
            dispatch(setImportedProject(response.importedProject));

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
            
        } catch (error) {
            console.error('Error submitting file:', error);

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
            setIsUploading(false);
        }
    };

    const handleCompleteProject = () =>
    {
        handleCloseDialog(true)
        navigate('/project/create'); 
    }

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
                    {!importResult && (
                        <Grid item xs={12}>
                            <SingleFileUpload
                                file={file}
                                setFieldValue={setFieldValue}
                                error={!file ? 'File is required' : ''}
                            />
                        </Grid>
                    )}

                    {isUploading && (
                        <Grid item xs={12}>
                            <Typography variant="body2">Progress: {progress}%</Typography>
                            <LinearProgress variant="determinate" value={progress} />
                        </Grid>
                    )}

                    {importResult && (
                        <Grid item xs={12}>
                            <Typography variant="h6">Import Result</Typography>
                            <Typography variant="body2">{importResult.message}</Typography>
                            <List>
                                {Object.entries(importResult.entitiesImported).map(([entity, count]) => (
                                    <ListItem key={entity}>
                                        <ListItemText primary={`${entity}: ${count}`} />
                                    </ListItem>
                                ))}
                            </List>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="h6">Progetto Importato</Typography>
                            <Typography variant="body2">Comune: {importResult.importedProject?.city}</Typography>
                            <Typography variant="body2">Provincia: {importResult.importedProject?.province}</Typography>
                            <Typography variant="body2">Lavori: {importResult.importedProject?.works}</Typography>
                        </Grid>
                    )}
                </Grid>
            </DialogContent>
            <DialogActions>
                {!importResult && (
                    <>
                        <Button onClick={() => handleCloseDialog(false)} color="error" disabled={isUploading}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={!file || isUploading}
                            variant="contained"
                        >
                            Submit
                        </Button>
                    </>
                )}
                {importResult && (
                    <Button
                        onClick={handleCompleteProject}
                        variant="contained"
                        color="primary"
                    >
                        Completa Configurazione
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

ImportXpwe.propTypes = {
    open: PropTypes.bool.isRequired,
    handleCloseDialog: PropTypes.func.isRequired
};

export default ImportXpwe;
