import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import ErrorBoundary from './ErrorBoundary';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

import { loader as productsLoader, productLoader } from 'api/products';
import { loader as projectsLoader } from 'api/projects';


// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

//projects
const Projects = Loadable(lazy(() => import('views/pages/projects')));
const ImportProjectWizard = Loadable(lazy(() => import('ui-component/ProjectWizard/ImportProjectWizard')));
const ProjectWizard = Loadable(lazy(() => import('ui-component/ProjectWizard/ProjectWizard')));
const ProjectDashboard = Loadable(lazy(() => import('views/dashboard/project')));

//user
const ProfilePage = Loadable(lazy(() => import('views/pages/profile')));
const SettingsPage = Loadable(lazy(() => import('views/pages/settings')));
const AddTaskPage = Loadable(lazy(() => import('views/pages/addtask')));
const Templates = Loadable(lazy(() => import('views/pages/templates')));
const TrashComponent = Loadable(lazy(() => import('ui-component/TrashComponent')));
const ProjectOverview = Loadable(lazy(() => import('views/pages/project/ProjectOverview')));
const ProjectSummary = Loadable(lazy(() => import('views/pages/project/ProjectSummary')));
const ProjectGanttChart = Loadable(lazy(() => import('views/pages/project/ProjectGanttChart')));
const ConfigurationPage = Loadable(lazy(() => import('views/pages/configurations')));

const MainRoutes = {
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: 'projects',
            loader: projectsLoader,
            element: <Projects />
        },
        {
            path: 'general/default',
            element: <DashboardDefault />
        },
        {
            path: '/project/import-wizard/',
            element: <ImportProjectWizard />
        },
        {
            path: '/project/create/',
            element: <ProjectWizard />
        },
        {
            path: '/project',
            element: <ProjectDashboard />
        
        },
        {
            path: '/project/overview',
            element: <ProjectOverview />
        },
        {
            path: '/project/summary',
            element: <ProjectSummary />
        },
        {
            path: '/project/gantt',
            element: <ProjectGanttChart />
        },
        {
            path: '/user/profile',
            element: <ProfilePage />
        },
        {
            path: '/user/settings',
            element: <SettingsPage />
        },
        {
            path: '/add-task',
            element: <AddTaskPage />
        },
        {
            path: '/templates',
            element: <Templates />
        },
        {
            path: '/trash',
            element: <TrashComponent />
        },
        {
            path: '/configurations',
            element: <ConfigurationPage />
        },
        
    ]
};

export default MainRoutes;
