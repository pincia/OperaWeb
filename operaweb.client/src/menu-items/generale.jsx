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
            title: <FormattedMessage id="Home" />,
            type: 'item',
            url: 'general/default',
            icon: icons.IconHome,
            breadcrumbs: false
        },
        {
            id: 'nuovo',
            title: <FormattedMessage id="Nuovo" />,
            type: 'item',
            url: 'general/new',
            icon: icons.IconFileAnalytics,
            breadcrumbs: false
        },
        {
            id: 'apri',
            title: <FormattedMessage id="Apri" />,
            type: 'item',
            url: 'general/projects',
            icon: icons.IconFolder,
            breadcrumbs: false
        }
    ]
};

export default generale;
