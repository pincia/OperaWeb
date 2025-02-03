// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconArchive, IconDashboard, IconBrandCrunchbase, IconChartBar, IconCalendarMonth } from '@tabler/icons-react';

const icons = {
    IconArchive: IconArchive,
    IconBrandCrunchbase: IconBrandCrunchbase,
    IconDashboard: IconDashboard,
    IconChartBar: IconChartBar,
    IconCalendarMonth: IconCalendarMonth
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const project = {
    id: 'project',
    title: <FormattedMessage id="project" />,
    icon: icons.IconArchive,
    type: 'group',
    children: [
        {
            id: 'overview',
            title: <FormattedMessage id="overview" />,
            type: 'item',
            url: 'project/overview',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'generalData',
            title: <FormattedMessage id="dati generali" />,
            type: 'item',
            url: 'project/summary',
            icon: icons.IconBrandCrunchbase,
            breadcrumbs: false
        },
          {
            id: 'giustifica',
            title: <FormattedMessage id="giustifica/analisi prezzi" />,
            type: 'item',
            url: 'project/analisi',
            icon: icons.IconChartBar,
            breadcrumbs: false
        },
          {
            id: 'cronoprogramma',
            title: <FormattedMessage id="cronoprogramma" />,
            type: 'item',
            url: 'project/gantt',
              icon: icons.IconCalendarMonth,
            breadcrumbs: false
        }
    ]
};

export default project;
