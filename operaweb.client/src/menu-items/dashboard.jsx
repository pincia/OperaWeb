// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics, IconSettings, IconSitemap, IconUser } from '@tabler/icons-react';

const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics: IconDeviceAnalytics,
    IconSettings: IconSettings,
    IconSitemap: IconSitemap,
    IconUser: IconUser
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'genral',
    title: <FormattedMessage id="general" />,
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
        }
    ]
};

export default dashboard;
