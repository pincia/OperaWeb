import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

// project imports
import { ThemeMode } from 'config';
import { gridSpacing } from 'store/constant';

// ==============================|| USER SIMPLE CARD ||============================== //

const TemplateCard = ({ imagePath, name, description }) => {
    const theme = useTheme();
    const StyledCard = styled(Card)(({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[1],
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1),
        transition: "transform 0.2s",
        "&:hover": {
            transform: "scale(1.03)",
        },
        height: "260px", // Altezza fissa
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center", // Per allineare il testo
    }));

    const Description = styled(Typography)(({ theme }) => ({
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: 2, // Limita a 2 righe
        WebkitBoxOrient: "vertical",
        textAlign: "center",
    }));

    return (
        <StyledCard
            sx={{
                bgcolor: theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'grey.50',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                    borderColor: 'primary.main'
                }
            }}
        >
            <CardMedia
                component="img"
                image={new URL(imagePath, import.meta.url).href}
                sx={{ width: 150, height: 150 }} // Immagine centrata e arrotondata
                title="Slider5 image"
            />
            <Typography variant="h4" sx={{ mt: 2 }}>
                {name}
            </Typography>
            <Description sx={{ mt: 1 }}>{description}</Description>
        </StyledCard>
    );
};

export default TemplateCard;
