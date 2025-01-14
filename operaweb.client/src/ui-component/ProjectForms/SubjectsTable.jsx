import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Tooltip, IconButton } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
export default function SubjectsTable({ subjects, onDelete }) {
    const columns = [
        { field: 'name', headerName: 'Soggetto', flex: 1 },
        { field: 'cf', headerName: 'CF', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'company', headerName: 'Azienda', flex: 1 },
        { field: 'cfPiva', headerName: 'CF / PIVA', flex: 1 },
        { field: 'figure', headerName: 'Figura', flex: 1 },
        { field: 'role', headerName: 'Ruolo', flex: 1 },
        {
            field: 'actions',
            headerName: 'Azioni',
            flex: 0.5,
            renderCell: (params) => (
                <Tooltip title="eliomina">
                    <IconButton color="primary" onClick={() => onDelete(params.row.id)}>
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                </Tooltip>
            ),
        }
    ];

    return (
        <DataGrid
            rows={subjects}
            columns={columns}
            autoHeight
            disableSelectionOnClick
            pageSize={5}
            rowsPerPageOptions={[5]}
        />
    );
}
