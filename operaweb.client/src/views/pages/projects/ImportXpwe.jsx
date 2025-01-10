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
    CircularProgress,
    Divider
} from '@mui/material';
import SingleFileUpload from 'ui-component/third-party/dropzone/SingleFile';
import { importXPWE, checkXPWEFile } from 'api/projects';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { setImportedProject } from 'store/slices/project';
import { useNavigate } from 'react-router-dom';

const ImportXpwe = ({ open, handleCloseDialog }) => {
    const [progress, setProgress] = useState(0);
    const [connection, setConnection] = useState(null);
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    const [checkResults, setCheckResults] = useState(null);
    const [canBeImported, setCanBeImported] = useState(false);
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

    const handleCompleteProject = () => {
        handleCloseDialog(true);
        navigate('/project/create');
    };

    const resetState = () => {
        setFile(null);
        setCheckResults(null);
        setCanBeImported(false);
        setProgress(0);
        setIsChecking(false);
        setIsUploading(false);
        setImportResult(null);
    };

    const handleClose = (confirm) => {
        resetState();
        handleCloseDialog(confirm);
    };

    const handleImport = async () => {
        if (!file) return;

        setIsChecking(true);
        setCheckResults(null);
        setCanBeImported(false);

        try {
            const { checks, canBeImported } = await checkXPWEFile(file);
            setCheckResults(checks);
            setCanBeImported(canBeImported);
        } catch (error) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Errore durante il controllo del file.',
                    variant: 'alert',
                    alert: { color: 'error' },
                    close: false
                })
            );
        } finally {
            setIsChecking(false);
        }
    };

    const handleSubmit = async () => {
        if (!file || !connection) return;

        setProgress(0);
        setIsUploading(true);

        try {
            const response = await importXPWE(file, connection.connectionId);
            setImportResult(response);

            dispatch(setImportedProject(response.importedProject));
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'File importato con successo!',
                    variant: 'alert',
                    alert: { color: 'success' },
                    close: false
                })
            );
        } catch (error) {
            handleClose();
            dispatch(
                openSnackbar({
                    open: true,
                    message: "Errore durante l'importazione del file.",
                    variant: 'alert',
                    alert: { color: 'error' },
                    close: false
                })
            );
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Dialog open={open} maxWidth="sm" fullWidth>
            <DialogTitle>Importa progetto da xpwe</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {!checkResults && (
                        <Grid item xs={12}>
                            <SingleFileUpload
                                file={file}
                                setFieldValue={(field, value) => field === 'file' && setFile(value)}
                                onFileRemove={resetState}
                                error={!file ? 'File is required' : ''}
                            />
                        </Grid>
                    )}

                    {isChecking && (
                        <Grid item xs={12}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '200px'
                                }}
                            >
                                <CircularProgress />
                                <Typography variant="body2" style={{ marginTop: '16px' }}>
                                    Check in corso...
                                </Typography>
                            </div>
                        </Grid>
                    )}

                    {checkResults && (
                        <Grid item xs={12}>
                            <Typography variant="h6">Risultati del Controllo</Typography>
                            <List>
                                {checkResults.map((check, index) => (
                                    <ListItem key={index}>
                                        <ListItemText
                                            primary={check.name}
                                            secondary={check.message}
                                            style={{ color: check.succeeded ? 'green' : 'red' }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
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
                            <Typography variant="h6">Risultati dell'Import</Typography>
                            <Typography variant="body2">{importResult.message}</Typography>
                            <List>
                                {Object.entries(importResult.entitiesImported || {}).map(([entity, count]) => (
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
                {!checkResults && (
                    <Button
                        onClick={handleImport}
                        variant="contained"
                        disabled={!file || isChecking}
                    >
                        Importa
                    </Button>
                )}

                {checkResults && canBeImported && !importResult && (
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={isUploading}
                    >
                        Prosegui Importazione
                    </Button>
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

                {!importResult && (
                    <Button
                        onClick={() => handleClose(false)}
                        color="error"
                        disabled={isChecking || isUploading}
                    >
                        Annulla
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
