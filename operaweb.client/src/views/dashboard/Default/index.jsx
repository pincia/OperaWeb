import React from 'react';
import ProjectTemplates from './ProjectTemplates';
import ProjectTable from './ProjectTable';

const Dashboard = () => {
    return (
        <>
            {/* Tabella Progetti e Template */}
            <ProjectTemplates />
            <ProjectTable />
        </>
    );
};

export default Dashboard;
