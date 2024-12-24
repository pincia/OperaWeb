import React from 'react';
import RecentTemplates from 'views/dashboard/Default/RecentTemplates';
import ProjectTable from './ProjectTable';

const Dashboard = () => {
    return (
        <>
            {/* Tabella Progetti e Template */}
            <RecentTemplates />
            <ProjectTable />
        </>
    );
};

export default Dashboard;
