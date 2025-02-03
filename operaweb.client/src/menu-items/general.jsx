// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconFileAnalytics, IconHome, IconFolder, IconTrash, IconSettings } from '@tabler/icons-react';

const icons = {
    IconFileAnalytics: IconFileAnalytics ,
    IconFolder: IconFolder,
    IconHome: IconHome,
    IconTrash: IconTrash,
    IconSettings: IconSettings,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const general = {
    id: 'general',
    title: '',
    icon: icons.IconFileAnalytics,
    type: 'group',
    children: [
        {
            id: 'home',
            title: <FormattedMessage id="home" />,
            type: 'item',
            url: '',
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
        },
        {
            id: 'trash',
            title: <FormattedMessage id="trash" />,
            type: 'item',
            url: 'trash',
            icon: icons.IconTrash,
            breadcrumbs: false
        },
        {
            id: 'configurations',
            title: <FormattedMessage id="configurations" />,
            type: 'item',
            url: 'configurations',
            icon: icons.IconSettings,
            breadcrumbs: false
        }
    ]
};

export default general;
