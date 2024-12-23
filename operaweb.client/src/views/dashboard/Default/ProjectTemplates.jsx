import React from 'react';
import { Grid } from '@mui/material';
import TemplateCard from 'ui-component/cards/TemplateCard';
import MainCard from 'ui-component/cards/MainCard';
import generico from 'assets/images/templates/nuovo_progetto.png';
import xpwe from 'assets/images/templates/nuovo_da_xpwe.png';
import bonusristrutturazione from 'assets/images/templates/template_ristrutturazione.png';
import templatetest from 'assets/images/templates/template_test.png';
import { useNavigate } from 'react-router-dom';
import ImportXpwe from 'views/pages/projects/ImportXpwe';

const ProjectTemplates = () => {
    const navigate = useNavigate();
    const [openImport, setOpenImport] = React.useState(false);

    const handleOpenImport = () => setOpenImport(true);
    const handleCloseImport = () => setOpenImport(false);

    return (
        <MainCard title="Crea un nuovo progetto">
            <Grid container spacing={2}>
                <Grid item xs={12} lg={3} onClick={() => navigate('/project/create/')}>
                    <TemplateCard imagePath={generico} name="Template Generico" description="Crea Progetto generico" />
                </Grid>
                <Grid item xs={12} lg={3} onClick={handleOpenImport}>
                    <TemplateCard imagePath={xpwe} name="Import da .XPWE" description="Importa progetto da file .xpwe" />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <TemplateCard
                        imagePath={bonusristrutturazione}
                        name="Template Ristrutturazione"
                        description="Crea progetto per bonus ristrutturazione"
                    />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <TemplateCard
                        imagePath={templatetest}
                        name="Template di Esmpio"
                        description="Crea progetto da template di esempio"
                    />
                </Grid>
            </Grid>
            <ImportXpwe open={openImport} handleCloseDialog={handleCloseImport} />
        </MainCard>
    );
};

export default ProjectTemplates;
