import React from 'react';
import ProjectTemplates from './ProjectTemplates';
import ProjectTables from './ProjectTable';

const Dashboard = () => {
    return (
        <>
            {/* Tabella Progetti e Template */}
            <ProjectTemplates />
            <ProjectTables />
        </>
    );
};

export default Dashboard;
