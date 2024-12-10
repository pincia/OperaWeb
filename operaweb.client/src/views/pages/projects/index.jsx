import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, useLoaderData } from 'react-router-dom';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AddIcon from '@mui/icons-material/Add';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import { openSnackbar } from 'store/slices/snackbar';
import ConfirmationDialog from 'ui-component/custom/ConfirmationDialog';

import IconButton from '@mui/material/IconButton';
import { GridRowModes, DataGrid, GridActionsCellItem, GridRowEditStopReasons } from '@mui/x-data-grid';
import React from 'react';
import {
    Dialog,
} from "@mui/material"
// project import
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { CSVExport } from 'views/forms/tables/TableExports';

import ProjectAdd from './ProjectAdd';
import { deleteProject } from 'api/projects';


export default function Projects() {
    let headers = [];

    const initialProjects = useLoaderData();
    const [rows, setRows] = React.useState(initialProjects.data);

    const deleteRowFromGrid = (id) => {
        setRows(rows.filter((row, id) => id == row.id));
    }

    const [selectedValue, setSelectedValue] = useState([]);
    const handlerClick = (data) => {
        setSelectedValue(data);
    };

    // show a right sidebar when clicked on new product
    const [open, setOpen] = React.useState(false);
    const handleClickOpenDialog = () => {
        setOpen(true);
    };
    const handleCloseDialog = (success, row) => {
        setOpen(false);
        if (success) {
            const [rows, setRows] = React.useState(seLoaderData().Data);
        }
    };


    // table columns
     const columns = [
        { field: 'id', headerName: 'ID', width: 120 },
        {
            field: 'name',
            headerName: <FormattedMessage id="name" />,
            description: <FormattedMessage id="projectNameDescription" />,
            sortable: true,
            flex: 2,
            minWidth: 160,
        },
        {
            field: 'totalAmount',
            headerName: <FormattedMessage id="totalAmount" />,
            flex: 1,
            minWidth: 164
        },
        {
            field: 'localization',
            headerName: <FormattedMessage id="localization" />,
            type: 'actions',
            flex: 0.75,
            minWidth: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {

                return [
                    <GridActionsCellItem
                        key={id}
                        component={IconButton}
                        size="large"
                        icon={<FmdGoodIcon color="secondary" sx={{ fontSize: '1.3rem' }} />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleLocalizationClick(id)}
                        color="inherit"
                    />
                ];
            },
            flex: 0.75,
            minWidth: 164
        },
        {
            field: 'creationDate',
            headerName: <FormattedMessage id="creationDate" />,
            flex: 1,
            minWidth: 164
        },
        {
            field: 'lastUpdateDate',
            headerName: <FormattedMessage id="lastUpdateDate" />,
            flex: 1,
            minWidth: 164
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            flex: 0.75,
            minWidth: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {

                return [
                    <GridActionsCellItem
                        key={id}
                        component={IconButton}
                        size="large"
                        icon={<EditTwoToneIcon color="secondary" sx={{ fontSize: '1.3rem' }} />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,

                    , <ConfirmationDialog
                        title="Confirmation"
                        description="Sei sicuro di voler eliminare il progetto?"
                        response={handleConfirmation}
                        value={id}
                    > {(showDialog) => (
                        <GridActionsCellItem
                            key={id}
                            component={IconButton}
                            size="large"
                            icon={<DeleteIcon color="error" sx={{ fontSize: '1.3rem' }} />}
                            label="Delete"
                            onClick={showDialog}
                            color="inherit"
                        />
                    )}
                    </ConfirmationDialog >
                ];
            }
        }
    ];

    columns.map((item) => {
        return headers.push({ label: item.headerName, key: item.field });
    });

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
     
    };

    const handleLocalizationClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };


    const handleConfirmation = (id) => {
        console.log('Confirmed!' + id);

        deleteProject(id).then(
            (response) => {
                console.log('ELIMINAZIONE AVVENUTA CON SUCCESSO')
                deleteRowFromGrid(id)
                openSnackbar({
                    open: true,
                    message: 'Submit Success',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: false
                })
            },
            (error) => {
                console.log('ERRORE ELIMINAZIONE')
                openSnackbar({
                    open: true,
                    message: 'Submit failed!',
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: false
                })
            });
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard
                    content={false}
                    title="Project List"
                    secondary={
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Tooltip title="Import new Project">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={handleClickOpenDialog}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <AddIcon fontSize="small" />
                                </Fab>
                            </Tooltip>
                            <ProjectAdd open={open} handleCloseDialog={handleCloseDialog} />
                            {/*         <CSVExport data={NewValue} filename={'data-grid-table.csv'} header={headers} /> */}
                        </Stack>
                    }
                >
                    <Box sx={{ width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            autoHeight
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 5
                                    }
                                }
                            }}
                            pageSizeOptions={[5]}
                        />
                    </Box>
                </MainCard>
            </Grid>
        </Grid>
    );
}
