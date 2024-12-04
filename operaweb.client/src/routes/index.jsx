import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

// project import
import Loadable from 'ui-component/Loadable';

// ==============================|| ROUTING RENDER ||============================== //
const router = createBrowserRouter([ AuthenticationRoutes, LoginRoutes, MainRoutes], {
    basename: import.meta.env.VITE_APP_BASE_NAME
});


export default router;
