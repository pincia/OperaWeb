import React, { useEffect, useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import GanttChart from 'ui-component/GanttChart';
import { gridSpacing } from 'store/constant';

const ProjectDashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const ganttRef = useRef(null); // Referenza per il componente GanttChart

    useEffect(() => {
        setLoading(false);
    }, []);

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

    // Funzione per salvare i dati localmente
    const handleSave = () => {
        localStorage.setItem('ganttData', JSON.stringify(tasks));
        alert('Modifiche salvate con successo!');
    };

    // Funzione per stampare il Gantt
    const handlePrint = () => {
        if (ganttRef.current) {
            ganttRef.current.exportToPDF();
        }
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <h2>Cronoprogramma</h2>
                <div style={{ marginBottom: '1rem' }}>
                    <button onClick={handlePrint} style={{ marginRight: '10px' }}>
                        Stampa Cronoprogramma
                    </button>
                    <button onClick={handleSave}>
                        Salva Modifiche
                    </button>
                </div>
                <GanttChart
                    ref={ganttRef}
                    tasks={tasks}
                    onTaskUpdate={handleTaskUpdate}
                    onTaskDelete={handleTaskDelete}
                    onTaskAdd={handleTaskAdd}
                />
            </Grid>
        </Grid>
    );
};

export default ProjectDashboard;
