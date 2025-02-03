import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box, CircularProgress, Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { ThemeMode } from 'config';
import { setCurrentProject } from 'store/slices/project';
import { getProject } from 'api/projects';
import GeneralConfigurations from './GeneralConfigurations';
import ProjectSummary from '../../pages/project/ProjectSummary';
import GanttChart from 'views/pages/project/ProjectGanttChart';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { deleteProject } from "api/projects";
import { openSnackbar } from "store/slices/snackbar";
import { useNavigate } from 'react-router-dom';

function a11yProps(index) {
    return {
        id: `dashboard-tab-${index}`,
        'aria-controls': `dashboard-tabpanel-${index}`,
    };
}

const ConfigurationPage = () => {
    const [loadingStates, setLoadingStates] = useState({});
    const [activeTab, setActiveTab] = useState(0);
    const navigate = useNavigate();
    const theme = useTheme();
    const currentProjectId = useSelector((state) => state.project.currentProjectId);
    const dispatch = useDispatch();

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <MainCard>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    {/* Tabs */}
                    <Tabs
                        sx={{
                            '& .MuiTab-root': {
                                minHeight: 'auto',
                                py: 1.5,
                                px: 1.5,
                                mr: 2,
                                color: theme.palette.mode === ThemeMode.DARK ? 'grey.600' : 'grey.900',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            },
                            '& .Mui-selected': {
                                color: theme.palette.primary.main,
                            },
                            '& .MuiTab-wrapper > svg': {
                                mr: 1,
                            },
                        }}
                        value={activeTab}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab
                            label="Generali"
                            icon={<AssessmentOutlinedIcon sx={{ fontSize: '1.3rem' }} />}
                            {...a11yProps(0)}
                        />
                    </Tabs>
                </Box>

                {/* Tab Content */}
                <Box sx={{ mt: 3 }}>
                    {activeTab === 0 && <GeneralConfigurations/>}
                </Box>
            </Grid>
            </Grid>
        </MainCard>
    );
};

export default ConfigurationPage;
