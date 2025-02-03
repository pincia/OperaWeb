import { memo, useLayoutEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// material-ui
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import NavItem from './NavItem';
import NavGroup from './NavGroup';
import getMenuItem from 'menu-items';
import useConfig from 'hooks/useConfig';
import { setCurrentProject, setCurrentProjectId } from 'store/slices/project'; // Import Redux actions
import { MenuOrientation } from 'config';
import { HORIZONTAL_MAX_ITEM } from 'config';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentProjectId = useSelector((state) => state.project.currentProjectId);
    const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const { menuOrientation } = useConfig();

    const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downMD;

    const [selectedID, setSelectedID] = useState('');
    const [menuItems, setMenuItems] = useState({ items: [] });

    useLayoutEffect(() => {
        const updatedMenuItems = getMenuItem(currentProjectId);
        setMenuItems({ items: [...updatedMenuItems.items] });
    }, [currentProjectId]);

    const handleCloseProject = () => {
        // Resetta lo stato di Redux
        dispatch(setCurrentProject(null));
        dispatch(setCurrentProjectId(null));
        // Naviga alla root
        navigate('/');
    };

    const lastItem = isHorizontal ? HORIZONTAL_MAX_ITEM : null;
    let lastItemIndex = menuItems.items.length - 1;
    let remItems;
    let lastItemId;

    if (lastItem && lastItem < menuItems.items.length) {
        lastItemId = menuItems.items[lastItem - 1].id;
        lastItemIndex = lastItem - 1;
        remItems = menuItems.items.slice(lastItem - 1, menuItems.items.length).map((item) => ({
            title: item.title,
            elements: item.children,
            icon: item.icon,
            ...(item.url && {
                url: item.url
            })
        }));
    }

    const navItems = menuItems.items.slice(0, lastItemIndex + 1).map((item, index) => {
        switch (item.type) {
            case 'group':
                return (
                    <NavGroup
                        key={item.id}
                        setSelectedID={setSelectedID}
                        selectedID={selectedID}
                        item={item}
                        lastItem={lastItem}
                        remItems={remItems}
                        lastItemId={lastItemId}
                    />
                );
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return (
        <Box {...(menuOrientation === MenuOrientation.VERTICAL && { sx: { mt: 1.5 } })}>
            {navItems}

            {/* Close Project Button */}
            {currentProjectId && (
                <Box textAlign="center" sx={{ mt: 2 }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleCloseProject}
                        sx={{
                            width: '80%',
                            fontWeight: 'bold',
                            textTransform: 'none'
                        }}
                    >
                        Chiudi Progetto
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default memo(MenuList);
