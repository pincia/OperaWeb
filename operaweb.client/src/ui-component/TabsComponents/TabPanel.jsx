import React from 'react';
import PropTypes from 'prop-types';

function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
            {value === index && <div>{children}</div>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    value: PropTypes.any.isRequired,
    index: PropTypes.any.isRequired
};

export default TabPanel;
