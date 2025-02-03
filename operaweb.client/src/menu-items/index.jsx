import general from './general';
import project from './project';

// ==============================|| MENU ITEMS ||============================== //

const getMenuItems = (currentProjectId) => {

    return {
        items: currentProjectId ? [project] : [general],
    };
};

export default getMenuItems;
