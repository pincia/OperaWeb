import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, IconButton, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { deleteProject, loader } from 'api/projects';
import { openSnackbar } from 'store/slices/snackbar';

const ProjectTable = ({ rows, setRows, title }) => {
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [openConfirmation, setOpenConfirmation] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteProject(selectedRowId);
            setRows((prev) => prev.filter((row) => row.id !== selectedRowId));
            openSnackbar({ open: true, message: 'Project deleted successfully!', variant: 'alert', alert: { color: 'success' } });
            setOpenConfirmation(false);
        } catch {
            openSnackbar({ open: true, message: 'Failed to delete project!', variant: 'alert', alert: { color: 'error' } });
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 120 },
        { field: 'object', headerName: <FormattedMessage id="objectLabel" />, flex: 2 },
        { field: 'city', headerName: <FormattedMessage id="cityLabel" />, flex: 2 },
        { field: 'province', headerName: <FormattedMessage id="provinceLabel" />, flex: 2 },
        { field: 'totalAmount', headerName: <FormattedMessage id="total" />, flex: 1 },
        { field: 'creationDate', headerName: <FormattedMessage id="creationDate" />, flex: 1 },
        { field: 'lastUpdateDate', headerName: <FormattedMessage id="lastUpdateDate" />, flex: 1 },
        {
            field: 'actions',
            headerName: '',
            width: 100,
            renderCell: (params) => (
                <IconButton onClick={() => { setSelectedRowId(params.row.id); setOpenConfirmation(true); }}>
                    <DeleteIcon color="secondary" />
                </IconButton>
            ),
            disableClickEventBubbling: true
        }
    ];

    return (
        <MainCard title={title} sx={{ marginTop: 2 }}>
            <DataGrid
                rows={rows}
                columns={columns}
                autoHeight
                pageSizeOptions={[5]}
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } }
                }}
            />
            <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
                <DialogTitle>Conferma</DialogTitle>
                <DialogContent>
                    <DialogContentText>Sei sicuro di voler eliminare il progetto?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDelete} color="primary">Sì</Button>
                    <Button onClick={() => setOpenConfirmation(false)} color="primary">No</Button>
                </DialogActions>
            </Dialog>
        </MainCard>
    );
};

const ProjectTables = () => {
    const [projectsData, setProjectsData] = useState({ myProjects: [], involvedProjects: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loader().then(
            (response) => {
                setProjectsData(response.data);
                setIsLoading(false);
            },
            () => {
                setError('Failed to load projects!');
                setIsLoading(false);
            }
        );
    }, []);

    if (isLoading) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    if (error) {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }

    return (
        <>
            <ProjectTable rows={projectsData.myProjects} setRows={(updatedRows) => setProjectsData((prev) => ({ ...prev, myProjects: updatedRows }))} title="I miei progetti" />
            <ProjectTable rows={projectsData.involvedProjects} setRows={(updatedRows) => setProjectsData((prev) => ({ ...prev, involvedProjects: updatedRows }))} title="Progetti in cui sei coinvolto" />
        </>
    );
};

export default ProjectTables;
