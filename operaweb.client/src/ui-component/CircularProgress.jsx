import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const CircularProgressWithLabel = ({ value }) => (
    <Box position="relative" display="inline-flex">
        <CircularProgress
            variant="determinate"
            value={value}
            size={80}
            thickness={5}
            sx={{
                color: value < 100 ? 'green' : 'blue',
            }}
        />
        <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Typography variant="h6" component="div" color="textSecondary">
                {`${Math.round(value)}%`}
            </Typography>
        </Box>
    </Box>
);

export default CircularProgressWithLabel;
