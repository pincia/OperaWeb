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
const ProjectWizard = Loadable(lazy(() => import('views/forms/forms-wizard/ProjectWizard')));
const ProjectDashboard = Loadable(lazy(() => import('views/dashboard/Progetto')));

//origanization
const OrganizationPage = Loadable(lazy(() => import('views/pages/organigramma')));

//user
const ProfilePage = Loadable(lazy(() => import('views/pages/profile')));
const SettingsPage = Loadable(lazy(() => import('views/pages/settings')));
const AddTaskPage = Loadable(lazy(() => import('views/pages/addtask')));
const Templates = Loadable(lazy(() => import('views/pages/templates')));


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
            path: '/general/default',
            element: <DashboardDefault />
        },
        {
            path: '/project/create/',
            element: <ProjectWizard />
        },
        {
            path: '/project/create/:id',
            element: <ProjectWizard />
        },
        {
            path: '/project',
            element: <ProjectDashboard />
        },
        {
            path: '/organization',
            element: <OrganizationPage />
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
        }
        
    ]
};

export default MainRoutes;
