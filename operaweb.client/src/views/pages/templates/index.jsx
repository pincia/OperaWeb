import React from 'react';
import { Grid, Button, Stack } from '@mui/material';
import TemplateCard from 'ui-component/cards/TemplateCard';
import MainCard from 'ui-component/cards/MainCard';
import generico from 'assets/images/templates/nuovo_progetto.png';
import xpwe from 'assets/images/templates/nuovo_da_xpwe.png';
import bonusristrutturazione from 'assets/images/templates/template_ristrutturazione.png';
import templatetest from 'assets/images/templates/template_test.png';
import { useNavigate } from 'react-router-dom';
import ImportXpwe from 'views/pages/projects/ImportXpwe';

const Templates = () => {
    const navigate = useNavigate();
    const [openImport, setOpenImport] = React.useState(false);

    const handleOpenImport = () => setOpenImport(true);
    const handleCloseImport = () => setOpenImport(false);

    return (
        <MainCard
            title="Crea un nuovo progetto"
            
        >
            <Grid container spacing={2}>
                <Grid item xs={12} lg={4} onClick={() => navigate('/project/create/')}>
                    <TemplateCard
                        imagePath={generico}
                        name="Template Generico"
                        description="Crea Progetto generico"
                        width="350px"
                        height="350px"
                        imageWidth={200}
                        imageHeight={200}
                    />
                </Grid>
                <Grid item xs={12} lg={4} onClick={handleOpenImport}>
                    <TemplateCard
                        imagePath={xpwe}
                        name="Import da XPWE"
                        description="Importa progetto da file xpwe"
                        width="350px"
                        height="350px"
                        imageWidth={200}
                        imageHeight={200}
                    />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <TemplateCard
                        imagePath={bonusristrutturazione}
                        name="Template Ristrutturazione"
                        description="Crea progetto per bonus ristrutturazione"
                        width="350px"
                        height="350px"
                        imageWidth={200}
                        imageHeight={200}
                    />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <TemplateCard
                        imagePath={templatetest}
                        name="Template di Esempio"
                        description="Crea progetto da template di esempio"
                        width="350px"
                        height="350px"
                        imageWidth={200}
                        imageHeight={200}
                    />
                </Grid>
            </Grid>
            <ImportXpwe open={openImport} handleCloseDialog={handleCloseImport} />
        </MainCard>
    );
};

export default Templates;
