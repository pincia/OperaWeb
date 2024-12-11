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
import {
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";

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
import { deleteProject, loader } from 'api/projects';


export default function Projects() {
    let headers = [];

    const initialProjects = useLoaderData();
    const [rows, setRows] = React.useState(initialProjects.data);
    const [open, setOpen] = React.useState(false);
    const [selectedRowId, setSelectedRowId] = useState([]);
    const [openConfirmation, setOpenConfirmation] = useState(false);

    const deleteRowFromGrid = (id) => {
        setRows(rows.filter((el) => el.id != id));
    }

    const handleClickOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = (success, row) => {
        setOpen(false);
        if (success) {
            loader().then(
                (response) => {
                    setRows(response.data);
                },
                (error) => {
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
        }
    };

    const showDialogConfirmation = (row) => {
        setSelectedRowId(row.id)
        setOpenConfirmation(true);
    };

    const hideDialogConfirmation = () => {
        setOpenConfirmation(false);
    };
    const renderSummaryDownloadButton = (params) => {
        return (
            <strong>
                <IconButton
                    aria-label="fingerprint"
                    color="secondary"
                    onClick={() => {
                        showDialogConfirmation(params.row)
                    }}  >
                    <DeleteIcon />
                </IconButton>
                <Dialog
                    open={openConfirmation}
                    onClose={hideDialogConfirmation}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Conferma</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Sei sicuro di voler eliminare il progetto?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleConfirmation} color="primary">
                            Sì
                        </Button>
                        <Button onClick={hideDialogConfirmation} color="primary">
                            No
                        </Button>
                    </DialogActions>
                </Dialog>
            </strong>
        )
    }
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
            field: 'delete',
            headerName: '',
            width: 150,
            renderCell: renderSummaryDownloadButton,
            disableClickEventBubbling: true,
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

  

    const handleConfirmation = () => {
        deleteProject(selectedRowId).then(
            (response) => {
                deleteRowFromGrid(selectedRowId)
                hideDialogConfirmation()
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
                hideDialogConfirmation()
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
                            onRowClick={(rows) => { setSelectedRowId(rows.id) }}

                        />
                    </Box>
                </MainCard>
            </Grid>
        </Grid>
       
    );
}
