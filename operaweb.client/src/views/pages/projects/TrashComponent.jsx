import React, { useState } from "react";
import {
    Box,
    Button,
    Typography,
    CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { restoreProject, hardDeleteProject } from "api/projects";
import { useDispatch } from "react-redux";
import { openSnackbar } from "store/slices/snackbar";

const TrashComponent = ({ deletedProjects, setDeletedProjects }) => {
    const dispatch = useDispatch();

    // Stato per gestire il caricamento separato per ripristino ed eliminazione
    const [loadingStates, setLoadingStates] = useState({});

    const setLoadingState = (id, action, isLoading) => {
        setLoadingStates((prev) => ({
            ...prev,
            [id]: {
                ...(prev[id] || {}),
                [action]: isLoading,
            },
        }));
    };

    const handleRestore = async (id) => {
        setLoadingState(id, "restore", true);
        try {
            await restoreProject(id);
            setDeletedProjects((prev) => prev.filter((project) => project.id !== id));
            dispatch(openSnackbar({
                open: true,
                message: 'Progetto ripristinato con successo!',
                variant: 'alert',
                alert: { color: 'success' },
            }));
        } catch (error) {
            console.error("Errore nel ripristino del progetto:", error);
            dispatch(openSnackbar({
                open: true,
                message: 'Errore nel ripristino del progetto.',
                variant: 'alert',
                alert: { color: 'error' },
            }));
        } finally {
            setLoadingState(id, "restore", false);
        }
    };

    const handleHardDelete = async (id) => {
        setLoadingState(id, "delete", true);
        try {
            await hardDeleteProject(id);
            setDeletedProjects((prev) => prev.filter((project) => project.id !== id));
            dispatch(openSnackbar({
                open: true,
                message: 'Progetto eliminato definitivamente!',
                variant: 'alert',
                alert: { color: 'success' },
            }));
        } catch (error) {
            console.error("Errore nell'eliminazione definitiva del progetto:", error);
            dispatch(openSnackbar({
                open: true,
                message: 'Errore nell\'eliminazione definitiva del progetto.',
                variant: 'alert',
                alert: { color: 'error' },
            }));
        } finally {
            setLoadingState(id, "delete", false);
        }
    };

    const columns = [
        {
            field: "works",
            headerName: "Nome Progetto",
            flex: 1,
        },
        {
            field: "lastUpdated",
            headerName: "Data Eliminazione",
            flex: 1,
        },
        {
            field: "actions",
            headerName: "Azioni",
            sortable: false,
            flex: 1,
            renderCell: (params) => {
                const { id } = params.row;
                const isRestoreLoading = loadingStates[id]?.restore || false;
                const isDeleteLoading = loadingStates[id]?.delete || false;

                return (
                    <Box display="flex" gap={1}>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={() => handleRestore(id)}
                            disabled={isRestoreLoading || isDeleteLoading}
                        >
                            {isRestoreLoading ? <CircularProgress size={20} /> : "Ripristina"}
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => handleHardDelete(id)}
                            disabled={isRestoreLoading || isDeleteLoading}
                        >
                            {isDeleteLoading ? <CircularProgress size={20} /> : "Elimina Definitivamente"}
                        </Button>
                    </Box>
                );
            },
        },
    ];

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Progetti Eliminati
            </Typography>
            <Box sx={{ height: 400, marginTop: 2 }}>
                <DataGrid
                    rows={deletedProjects}
                    columns={columns}
                    disableSelectionOnClick
                    getRowId={(row) => row.id}
                />
            </Box>
        </Box>
    );
};

export default TrashComponent;
