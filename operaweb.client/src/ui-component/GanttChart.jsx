import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import gantt from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import _ from 'lodash';

const GanttChart = forwardRef(({ tasks, onTaskUpdate, onTaskDelete, onTaskAdd }, ref) => {
    const ganttContainer = useRef();

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

    useEffect(() => {
        gantt.config.scale_unit = 'day';
        gantt.config.date_scale = '%d %M';
        gantt.config.scale_height = 50;
        gantt.config.row_height = 30;

        gantt.attachEvent('onAfterTaskAdd', (id, task) => {
            onTaskAdd(task);
        });

        gantt.attachEvent('onAfterTaskUpdate', (id, task) => {
            onTaskUpdate(task);
        });

        gantt.attachEvent('onAfterTaskDelete', (id, task) => {
            onTaskDelete(id);
        });

        gantt.init(ganttContainer.current);

        return () => {
            gantt.clearAll();
        };
    }, [onTaskUpdate, onTaskDelete, onTaskAdd]);

    useEffect(() => {
        // Salva lo stato dei task espansi/collassati
        const expandedState = gantt.serialize().data.map((task) => ({
            id: task.id,
            open: task.open || false,
        }));

        if (Array.isArray(tasks.data) && tasks.data.length > 0) {
            const clonedTasks = _.cloneDeep(tasks.data);

            const formattedTasks = clonedTasks.map((task) => ({
                id: task.id,
                text: task.text,
                start_date: new Date(task.startDate).toISOString().split('T')[0],
                duration: task.duration || 1, // Default duration to 1
                progress: task.progress || 0,
                parent: task.parentId || 0,
                open: expandedState.find((t) => t.id === task.id)?.open || false,
            }));

            gantt.clearAll();
            gantt.parse({ data: formattedTasks });
        } else {
            console.warn("Nessun task disponibile o tasks non è un array");
        }
    }, [tasks]);

    return <div ref={ganttContainer} style={{ width: '100%', height: '500px' }}></div>;
});

export default GanttChart;
