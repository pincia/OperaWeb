// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconArchive , IconDashboard } from '@tabler/icons-react';

const icons = {
    IconArchive: IconArchive ,
    IconDashboard: IconDashboard
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const projects = {
    id: 'general',
    title: <FormattedMessage id="general" />,
    icon: icons.IconArchive,
    type: 'group',
    children: [
        {
            id: 'projects',
            title: <FormattedMessage id="projects" />,
            type: 'item',
            url: 'general/projects',
            icon: icons.IconArchive,
            breadcrumbs: false
        }
    ]
};

export default projects;
