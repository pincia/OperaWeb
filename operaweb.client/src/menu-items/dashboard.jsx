// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics, IconSettings, IconSitemap } from '@tabler/icons-react';

const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics: IconDeviceAnalytics,
    IconSettings: IconSettings,
    IconSitemap: IconSitemap
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'account',
    title: <FormattedMessage id="account" />,
    icon: icons.IconDashboard,
    type: 'group',
    children: [
         {
            id: 'organization',
            title: <FormattedMessage id="organization" />,
            type: 'item',
            url: '/organization/',
            icon: icons.IconSitemap,
            breadcrumbs: false
        },
        {
            id: 'impostazioni',
            title: <FormattedMessage id="impostazioni" />,
            type: 'item',
            url: '/dashboard/default',
            icon: icons.IconSettings,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
