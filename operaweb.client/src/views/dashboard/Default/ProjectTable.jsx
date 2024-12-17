import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { deleteProject, loader } from 'api/projects';
import { openSnackbar } from 'store/slices/snackbar';

const ProjectTable = () => {
    const [rows, setRows] = useState([]);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [openConfirmation, setOpenConfirmation] = useState(false);

    useEffect(() => {
        loader().then(
            (response) => setRows(response.data),
            () => openSnackbar({ open: true, message: 'Failed to load projects!', variant: 'alert', alert: { color: 'error' } })
        );
    }, []);

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
        <Box sx={{ width: '100%', marginTop: 2 }}>
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
        </Box>
    );
};

export default ProjectTable;
