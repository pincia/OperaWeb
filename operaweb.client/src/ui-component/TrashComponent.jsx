import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Typography,
    CircularProgress
} from "@mui/material";
import MainCard from 'ui-component/cards/MainCard';
import { DataGrid } from "@mui/x-data-grid";
import { restoreProject, hardDeleteProject } from "api/projects";
import { useDispatch } from "react-redux";
import { openSnackbar } from "store/slices/snackbar";
import {  getDeletedProjects } from "api/projects";

const TrashComponent = () => {
    const dispatch = useDispatch();
    const [deletedProjects, setDeletedProjects] = useState([]);
    // Stato per gestire il caricamento separato per ripristino ed eliminazione
    const [loadingStates, setLoadingStates] = useState({});
    useEffect(() => {

        const fetchDeletedProjects = async () => {
            try {
                const response = await getDeletedProjects();
                setDeletedProjects(response.data || []);
            } catch (err) {
                console.error("Error fetching deleted projects:", err);
            }
        };

        fetchDeletedProjects();
    }, []);
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
            field: "object",
            headerName: "Oggetto",
            flex: 1,
        },
        {
            field: "works",
            headerName: "Opere",
            flex: 1,
        },
        {
            field: "deleteDate",
            headerName: "Data Eliminazione",
            flex: 1,
            renderCell: (params) => {
                const formattedDate = params.value
                    ? new Intl.DateTimeFormat("it-IT", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit"
                    }).format(new Date(params.value))
                    : "N/A";
                return <span>{formattedDate}</span>;
            },
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

    if (deletedProjects.length==0) {
        return (
             <MainCard
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh', // Altezza totale della pagina
                overflow: 'hidden' // Previene overflow se necessario
            }}
        >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                >
                    No Projects
                </Box>
        </MainCard>
     
        );
    }

    return (
        <MainCard
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh', // Altezza totale della pagina
                overflow: 'hidden' // Previene overflow se necessario
            }}
        >
            <Box>
                <Typography variant="h4" gutterBottom>
                    Progetti Eliminati
                </Typography>
            </Box>
            <Box
                sx={{
                    flexGrow: 1, // Rende questa sezione responsiva
                    marginTop: 2,
                    overflow: 'auto' // Aggiunge lo scroll per i contenuti che superano l'altezza
                }}
            >
                <DataGrid
                    rows={deletedProjects}
                    columns={columns}
                    disableSelectionOnClick
                    getRowId={(row) => row.id}
                />
            </Box>
        </MainCard>

    );
};

export default TrashComponent;
