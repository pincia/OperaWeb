import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Stack } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { getRecentProjects } from 'api/projects';
import { useDispatch } from 'react-redux';
import { setCurrentProjectId } from 'store/slices/project'; // Importa il metodo Redux
import { useNavigate } from 'react-router-dom';

const ProjectTable = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rows, setRows] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getRecentProjects();
                setRows(response.data || []);
                setIsLoading(false);
            } catch (error) {
                setError('Failed to load projects!');
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleOpenProject = (projectId) => {
        dispatch(setCurrentProjectId(projectId)); // Setta il progetto corrente
        navigate('/project/'); // Naviga alla pagina del progetto
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
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenProject(params.row.id)}
                >
                    Apri progetto
                </Button>
            ),
            disableClickEventBubbling: true
        }
    ];

    if (isLoading) {
        return <Box>Loading...</Box>;
    }

    if (error) {
        return <Box>{error}</Box>;
    }

    return (
        <MainCard
            title="PROGETTI RECENTI"
            sx={{ marginTop: 2 }}
            secondary={
                <Button
                    variant="text"
                    color="primary"
                    onClick={() => navigate('/projects')}
                >
                    Altri progetti...
                </Button>
            }
        >
            <DataGrid
                rows={rows}
                columns={columns}
                autoHeight
                pageSizeOptions={[5]}
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } }
                }}
            />
        </MainCard>
    );
};

export default ProjectTable;
