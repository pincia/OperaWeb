import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, useLoaderData } from 'react-router-dom';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AddIcon from '@mui/icons-material/Add';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import FileOpen from '@mui/icons-material/FileOpen';
// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
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
import CreateProject from 'views/pages/projects/CreateProject';
import { deleteProject, loader } from 'api/projects';


export default function ProjectsOld() {
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

    const hideDialogConfirmation = () => {
        setOpenConfirmation(false);
    };
    const renderOpenButton = (params) => {
        return (
            <strong>
                <IconButton
                    aria-label="fingerprint"
                    color="primary"
                    onClick={() => {
                        navigate('project/'+id, { replace: true });
                    }}  >
                    <FileOpen />
                </IconButton>
            </strong>
        )
    }
    // table columns
    const columns = [
        { field: 'id', headerName: 'ID', width: 120 },
        {
            field: 'object',
            headerName: <FormattedMessage id="objectLabel" />,
            description: <FormattedMessage id="objectDescription" />,
            sortable: true,
            flex: 2,
            minWidth: 10,
        },
        {
            field: 'city',
            headerName: <FormattedMessage id="cityLabel" />,
            description: <FormattedMessage id="cityDescription" />,
            sortable: true,
            flex: 2,
            minWidth: 160,
        },
        {
            field: 'province',
            headerName: <FormattedMessage id="provinceLabel" />,
            description: <FormattedMessage id="provincetDescription" />,
            sortable: true,
            flex: 2,
            minWidth: 160,
        },
        {
            field: 'totalAmount',
            headerName: <FormattedMessage id="total" />,
            flex: 1,
            minWidth: 164
        },
        //{
        //    field: 'localization',
        //    headerName: <FormattedMessage id="localization" />,
        //    type: 'actions',
        //    flex: 0.75,
        //    minWidth: 100,
        //    cellClassName: 'actions',
        //    getActions: ({ id }) => {
        //        return [
        //            <GridActionsCellItem
        //                key={id}
        //                component={IconButton}
        //                size="large"
        //                icon={<FmdGoodIcon color="secondary" sx={{ fontSize: '1.3rem' }} />}
        //                label="Edit"
        //                className="textPrimary"
        //                onClick={handleLocalizationClick(id)}
        //                color="inherit"
        //            />
        //        ];
        //    },
        //    flex: 0.75,
        //    minWidth: 164
        //},
        {
            field: 'creationDate',
            headerName: <FormattedMessage id="creationDate" />,
            flex: 1,
            minWidth: 130
        },
        {
            field: 'lastUpdateDate',
            headerName: <FormattedMessage id="lastUpdateDate" />,
            flex: 1,
            minWidth: 130
        },
        {
            field: 'delete',
            headerName: '',
            width: 150,
            renderCell: renderOpenButton,
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
                    title="Elenco Cantieri"
                    secondary={
                        <Stack direction="row" spacing={2} alignItems="center">
                            
                            <CreateProject open={open} handleCloseDialog={handleCloseDialog} />
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
