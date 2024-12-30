// material-ui
import Grid from '@mui/material/Grid';

// project imports
import ProjectWizard from 'ui-component/ProjectWizard'
import { gridSpacing } from 'store/constant';

// ==============================|| FORMS WIZARD ||============================== //

const CreateProject = () => (
    <Grid container spacing={gridSpacing} justifyContent="center">
        <Grid item xs={12} md={9} lg={7}>
            <ProjectWizard />
        </Grid>
    </Grid>
);

export default CreateProject;
