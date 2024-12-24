import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

// project imports
import { ThemeMode } from 'config';

// ==============================|| TEMPLATE CARD ||============================== //

const TemplateCard = ({ imagePath, name, description, width, height, cardStyles, imageWidth, imageHeight }) => {
    const theme = useTheme();

    const StyledCard = styled(Card)(({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[1],
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(2),
        transition: "transform 0.2s",
        "&:hover": {
            transform: "scale(1.03)",
        },
        height: height || "260px", // Altezza fissa o personalizzabile
        width: width || "auto", // Larghezza personalizzabile
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center", // Per allineare il testo
        ...cardStyles, // Stili extra passati come props
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
                    borderColor: 'primary.main',
                },
            }}
        >
            <CardMedia
                component="img"
                image={new URL(imagePath, import.meta.url).href}
                sx={{
                    width: imageWidth || 150, // Larghezza dell'immagine
                    height: imageHeight || 150, // Altezza dell'immagine
                    objectFit: "contain", // Adatta l'immagine mantenendo le proporzioni
                }}
                title={name}
            />
            <Typography variant="h4" sx={{ mt: 2 }}>
                {name}
            </Typography>
            <Description sx={{ mt: 1 }}>{description}</Description>
        </StyledCard>
    );
};

// PropTypes per validare le props
TemplateCard.propTypes = {
    imagePath: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    width: PropTypes.string, // Larghezza dinamica della card
    height: PropTypes.string, // Altezza dinamica della card
    cardStyles: PropTypes.object, // Stili custom
    imageWidth: PropTypes.number, // Larghezza dell'immagine
    imageHeight: PropTypes.number, // Altezza dell'immagine
};

export default TemplateCard;
