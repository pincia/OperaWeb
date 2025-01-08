import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react';
import gantt from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Box, Typography, Button } from '@mui/material';
import _ from 'lodash';
import { saveProject } from 'api/projects';
import MainCard from 'ui-component/cards/MainCard';

const GanttChart = forwardRef(({ projectData }, ref) => {
    const ganttContainer = useRef(null); // Ref per il container del Gantt
    const [tasks, setTasks] = useState({ data: [], links: [] }); // Stato ini
    // Gestione delle funzioni di modifica dei task
    const handleTaskUpdate = (updatedTask) => {
        setTasks((prevState) => {
            const updatedData = prevState.data.map((task) =>
                task.id === updatedTask.id ? { ...task, ...updatedTask } : task
            );
            return { ...prevState, data: updatedData };
        });
    };
    useEffect(() => {
        if (projectData?.tasks && projectData?.links) {
            setTasks({
                data: projectData.tasks,
                links: projectData.links,
            });
        }
    }, [projectData]);
    const handleTaskDelete = (taskId) => {
        setTasks((prevState) => ({
            ...prevState,
            data: prevState.data.filter((task) => task.id !== taskId),
        }));
    };

    const handleTaskAdd = (newTask) => {
        setTasks((prevState) => ({
            ...prevState,
            data: [...prevState.data, newTask],
        }));
    };

    // Funzione per salvare le modifiche
    const handleSaveChanges = async () => {
        try {
            await saveProject(projectData.id, { ...projectData, tasks: tasks.data });
            alert('Modifiche salvate con successo!');
        } catch (error) {
            console.error('Errore durante il salvataggio:', error);
            alert('Errore durante il salvataggio.');
        }
    };

    // Funzione per esportare in PDF
    useImperativeHandle(ref, () => ({
        exportToPDF: async () => {
            const element = ganttContainer.current;
            const canvas = await html2canvas(element);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('landscape', 'mm', 'a4');
            const width = pdf.internal.pageSize.getWidth();
            const height = (canvas.height * width) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, width, height);
            pdf.save('gantt-chart.pdf');
        },
    }));

    // Configurazione del Gantt
    useEffect(() => {
        gantt.config.scale_unit = 'day';
        gantt.config.date_scale = '%d %M';
        gantt.config.scale_height = 50;
        gantt.config.row_height = 30;

        gantt.attachEvent('onAfterTaskAdd', (id, task) => {
            handleTaskAdd(task);
        });

        gantt.attachEvent('onAfterTaskUpdate', (id, task) => {
            handleTaskUpdate(task);
        });

        gantt.attachEvent('onAfterTaskDelete', (id) => {
            handleTaskDelete(id);
        });

        gantt.init(ganttContainer.current);

        return () => {
            gantt.clearAll();
        };
    }, []); // Effetto per l'inizializzazione del Gantt

    // Aggiornamento dei dati del Gantt
    useEffect(() => {
        if (Array.isArray(tasks.data) && tasks.data.length > 0) {
            const formattedTasks = tasks.data.map((task) => ({
                id: task.id,
                text: task.text,
                start_date: new Date(task.startDate).toISOString().split('T')[0],
                duration: task.duration || 1,
                progress: task.progress || 0,
                parent: task.parentId || 0,
                open: task.open || false,
            }));

            gantt.clearAll();
            gantt.parse({ data: formattedTasks, links: tasks.links });
        }
    }, [tasks]);

    return (
        <MainCard sx={{ mb: 2, marginBottom: 3 }}>
            <Box mb={2}>     
                <Box mb={2}>   
                    <div ref={ganttContainer} style={{ width: '100%', height: '500px' }}></div>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Button variant="contained" onClick={handleSaveChanges}>
                        Salva Modifiche
                    </Button>
                    <Button variant="outlined" onClick={() => ref.current?.exportToPDF()}>
                        Stampa Cronoprogramma
                    </Button>
                </Box>
            </Box>
        </MainCard>
    );
});

export default GanttChart;
