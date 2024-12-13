import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

// project imports
import Avatar from '../extended/Avatar';
import { getImageUrl, ImagePath } from 'utils/getImageUrl';
import useImage from 'utils/useImage';
import { ThemeMode } from 'config';
import CardMedia from '@mui/material/CardMedia';
import { gridSpacing } from 'store/constant';

// assets
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// styles

// ==============================|| USER SIMPLE CARD ||============================== //

const TemplateCard = ({ imagePath, name, description }) => {
    const theme = useTheme();
    const { loading, error, image } = useImage(imagePath)
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card
            sx={{
                p: 2,
                bgcolor: theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'grey.50',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                    borderColor: 'primary.main'
                }
            }}
        >
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} >
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs zeroMinWidth>
                            <CardMedia component="img" image={new URL(imagePath, import.meta.url).href } sx={{ width: 72, height: 72 }} title="Slider5 image" />
                        </Grid>
                        
                    </Grid>
                </Grid>
                <Grid item xs={12} alignItems="center">
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs zeroMinWidth>
                            <Typography variant="h4">{name}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} alignItems="center">
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs zeroMinWidth>
                            <Typography >{description}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};

TemplateCard.propTypes = {
    imagePath: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string
};

export default TemplateCard;
