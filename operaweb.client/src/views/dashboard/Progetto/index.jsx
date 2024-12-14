import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Gantt from "../../widget/Gantt";

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from '../../../ui-component/cards/TotalIncomeDarkCard';
import TotalIncomeLightCard from '../../../ui-component/cards/TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import GanttChart from 'ui-component/GanttChart';
import { gridSpacing } from 'store/constant';

// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const ProjectDashboard = () => {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    const data = {
        data: [
            { id: 1, text: 'Task #1', start_date: '2019-04-15', duration: 3, progress: 0.6 },
            { id: 2, text: 'Task #2', start_date: '2019-04-18', duration: 3, progress: 0.4 }
        ],
        links: [
            { id: 1, source: 1, target: 2, type: '0' }
        ]
    };

    const [tasks, setTasks] = useState({
        data: [
            { id: 1, text: 'Task #1', start_date: '2024-12-01', duration: 5, progress: 0.8 },
            { id: 2, text: 'Task #2', start_date: '2024-12-06', duration: 3, progress: 0.5 },
        ],
        links: []
    });

    const handleTaskUpdate = (updatedTask) => {
        setTasks((prevState) => {
            const updatedData = prevState.data.map((task) =>
                task.id === updatedTask.id ? { ...task, ...updatedTask } : task
            );
            return { ...prevState, data: updatedData };
        });
    };

    const handleTaskDelete = (taskId) => {
        setTasks((prevState) => {
            const updatedData = prevState.data.filter((task) => task.id !== taskId);
            return { ...prevState, data: updatedData };
        });
    };

    const handleTaskAdd = (newTask) => {
        setTasks((prevState) => ({
            ...prevState,
            data: [...prevState.data, newTask],
        }));
    };
       
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <h2>Cronoprogramma</h2>
                <GanttChart
                    tasks={tasks}
                    onTaskUpdate={handleTaskUpdate}
                    onTaskDelete={handleTaskDelete}
                    onTaskAdd={handleTaskAdd}
                />
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeDarkCard isLoading={isLoading} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeLightCard
                                    {...{
                                        isLoading: isLoading,
                                        total: 203,
                                        label: 'Total Income',
                                        icon: <StorefrontTwoToneIcon fontSize="inherit" />
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <TotalGrowthBarChart isLoading={isLoading} />

                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProjectDashboard;
