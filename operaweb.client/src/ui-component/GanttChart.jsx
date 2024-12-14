import React, { useEffect, useRef } from 'react';
import gantt from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

const GanttChart = ({ tasks, onTaskUpdate, onTaskDelete, onTaskAdd }) => {
    const ganttContainer = useRef();

    useEffect(() => {
        // Configura il Gantt
        gantt.config.scale_unit = 'day';
        gantt.config.date_scale = '%d %M';
        gantt.config.scale_height = 50;
        gantt.config.row_height = 30;

        // Configura gli eventi
        gantt.attachEvent('onAfterTaskAdd', (id, task) => {
            onTaskAdd(task);
        });

        gantt.attachEvent('onAfterTaskUpdate', (id, task) => {
            onTaskUpdate(task);
        });

        gantt.attachEvent('onAfterTaskDelete', (id, task) => {
            onTaskDelete(id);
        });

        // Inizializza il Gantt
        gantt.init(ganttContainer.current);
        gantt.parse(tasks);

        // Cleanup
        return () => {
            gantt.clearAll();
        };
    }, [tasks, onTaskUpdate, onTaskDelete, onTaskAdd]);

    return <div ref={ganttContainer} style={{ width: '100%', height: '500px' }}></div>;
};

export default GanttChart;
