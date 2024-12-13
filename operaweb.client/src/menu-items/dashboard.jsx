// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics, IconSettings } from '@tabler/icons-react';

const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics: IconDeviceAnalytics,
    IconSettings: IconSettings
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'account',
    title: <FormattedMessage id="account" />,
    icon: icons.IconDashboard,
    type: 'group',
    children: [
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
