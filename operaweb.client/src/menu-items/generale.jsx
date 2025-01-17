// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconFileAnalytics , IconHome, IconFolder } from '@tabler/icons-react';

const icons = {
    IconFileAnalytics: IconFileAnalytics ,
    IconFolder: IconFolder,
    IconHome: IconHome
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const generale = {
    id: 'general',
    title: '',
    icon: icons.IconFileAnalytics,
    type: 'group',
    children: [
        {
            id: 'home',
            title: <FormattedMessage id="home" />,
            type: 'item',
            url: 'general/default',
            icon: icons.IconHome,
            breadcrumbs: false
        },
        {
            id: 'nuovo',
            title: <FormattedMessage id="nuovo" />,
            type: 'item',
            url: 'templates',
            icon: icons.IconFileAnalytics,
            breadcrumbs: false
        },
        {
            id: 'apri',
            title: <FormattedMessage id="apri" />,
            type: 'item',
            url: 'projects',
            icon: icons.IconFolder,
            breadcrumbs: false
        }
    ]
};

export default generale;
