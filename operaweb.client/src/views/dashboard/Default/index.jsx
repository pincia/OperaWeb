import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useLoaderData } from 'react-router-dom';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import generico from 'assets/images/templates/generico.png'
import xpwe from 'assets/images/templates/xpwe.png'
import bonusristrutturazione from 'assets/images/templates/generico.png'
import { useNavigate } from "react-router-dom";
// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import SubCard from 'ui-component/cards/SubCard';
import { openSnackbar } from 'store/slices/snackbar';
import {
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";

import TemplateCard from 'ui-component/cards/TemplateCard';
import IconButton from '@mui/material/IconButton';
import { GridRowModes, DataGrid, GridActionsCellItem, GridRowEditStopReasons } from '@mui/x-data-grid';
import React from 'react';
import {
    Dialog,
} from "@mui/material"
// project import
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import CreateProject from 'views/pages/projects/CreateProject';
import { deleteProject, loader, getTemplates } from 'api/projects';


// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalIncomeDarkCard from '../../../ui-component/cards/TotalIncomeDarkCard';
import TotalIncomeLightCard from '../../../ui-component/cards/TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';


// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import ImportXpwe from '../../pages/projects/ImportXpwe';

const Dashboard = () => {
    let headers = [];
    const [isLoading, setLoading] = useState(true);
    const [rows, setRows] = useState([]);
    const [openImport, setOpenImport] = React.useState(false);
    const [openGeneric, setOpenGeneric] = React.useState(false);
    const [selectedRowId, setSelectedRowId] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        loader().then((response) => {
            setRows(response.data)

        },
            (error) => {
                openSnackbar({
                    open: true,
                    message: 'Failed load projects!',
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: false
                })
            });

        getTemplates().then((response) => {
            setTemplates(response.data)
            setLoading(false)

        },
            (error) => {
                openSnackbar({
                    open: true,
                    message: 'Failed load templates!',
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: false
                })
                setLoading(false)
            });
    }, [])


    const deleteRowFromGrid = (id) => {
        setRows(rows.filter((el) => el.id != id));
    }

    const handleClickOpenImport = () => {
        setOpenImport(true);
    };
    const handleClickOpenGeneric = () => {
        setOpenGeneric(true);
    };
    const handleCloseDialog = (success, id) => {
        setOpenImport(false);
        if (success) {
            navigate(`/general/create-project/`+id) 
        }
    };

    const showDialogConfirmation = (row) => {
        setSelectedRowId(row.id)
        setOpenConfirmation(true);
    };

    const hideDialogConfirmation = () => {
        setOpenConfirmation(false);
    };
    const renderDeleteConfirmButton = (params) => {
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
                            S�
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
            renderCell: renderDeleteConfirmButton,
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

    const simpleCard = {
        id: '#6Card_Joanne',
        avatar: 'avatar-6.png',
        name: 'Joanne',
        status: 'Active'
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
                <MainCard title="Crea un nuovo progetto">
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} lg={3}
                            onClick={() => { navigate(`/general/create-project/`) }}>
                            <TemplateCard
                                imagePath={generico}
                                name="Template Generico"
                                description="Crea Progetto generico"
                            />
                        </Grid>
                        <Grid item xs={12} lg={3} onClick={handleClickOpenImport}>
                            <TemplateCard
                                imagePath={xpwe}
                                name="Import da .XPWE"
                                description="Importa progetto da file .xpwe"
                            />
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <TemplateCard
                                imagePath={bonusristrutturazione}
                                name="Termplate Ristrutturazione"
                                description="Crea progetto per bonus ristrutturazione"
                            />
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
            <Grid item xs={12}>
                <MainCard
                    content={false}
                    title="Elenco cantieri"
                    secondary={
                        <Stack direction="row" spacing={2} alignItems="center">
                            <ImportXpwe open={openImport} handleCloseDialog={handleCloseDialog} />
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

export default Dashboard;