import PropTypes from 'prop-types';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from './MainCard';

// ==============================|| REPORT CARD ||============================== //

const ReportCard = ({ primary, secondary, iconPrimary, color, height }) => {
    const IconPrimary = iconPrimary;
    const primaryIcon = iconPrimary ? <IconPrimary fontSize="large" /> : null;

    return (
        <MainCard
            sx={{
                height: height || 'auto', // Altezza responsiva
            }}
        >
            <Grid container justifyContent="space-between" alignItems="center" sx={{ height: '100%' }}>
                <Grid item>
                    <Stack spacing={1}>
                        <Typography variant="h3">{primary}</Typography>
                        <Typography variant="body1">{secondary}</Typography>
                    </Stack>
                </Grid>
                <Grid item>
                    <Typography variant="h2" sx={{ color }}>
                        {primaryIcon}
                    </Typography>
                </Grid>
            </Grid>
        </MainCard>
    );
};

ReportCard.propTypes = {
    primary: PropTypes.string,
    secondary: PropTypes.string,
    iconPrimary: PropTypes.object,
    color: PropTypes.string,
    height: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ])
};

export default ReportCard;
