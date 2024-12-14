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
    const { loading, error, image } = useImage(imagePath);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const StyledCard = styled(Card)(({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[1],
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(2),
        transition: "transform 0.2s",
        "&:hover": {
            transform: "scale(1.03)",
        },
        height: "260px", // Altezza fissa
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    }));

    const Description = styled(Typography)(({ theme }) => ({
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: 2, // Limita a 2 righe
        WebkitBoxOrient: "vertical",
    }));

    return (
        <StyledCard
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
                <Grid item xs={12}>
                    <CardMedia
                        component="img"
                        image={new URL(imagePath, import.meta.url).href}
                        sx={{ width: 72, height: 72 }}
                        title="Slider5 image"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h4">{name}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Description>{description}</Description>
                </Grid>
            </Grid>
        </StyledCard>
    );
};

export default TemplateCard
