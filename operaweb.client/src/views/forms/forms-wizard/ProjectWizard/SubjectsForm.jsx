import PropTypes from 'prop-types';

// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
});

// ==============================|| FORM WIZARD - VALIDATION ||============================== //

export default function SubjectsForm({ subjectsData, setSubjectsData, handleNext, handleBack, setErrorIndex }) {
    const formik = useFormik({
        initialValues: {
        },
        validationSchema,
        onSubmit: (values) => {
            setSubjectsData({
            });
            handleNext();
        }
    });

    return (
        <>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Aggiungi Soggetti
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between">
                        <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                            Back
                        </Button>
                        <AnimateButton>
                            <Button variant="contained" type="submit" sx={{ my: 3, ml: 1 }} onClick={() => setErrorIndex(1)}>
                                Next
                            </Button>
                        </AnimateButton>
                    </Stack>
                </Grid>
            </form>
        </>
    );
}

SubjectsForm.propTypes = {
    subjectsData: PropTypes.object,
    setSubjectsData: PropTypes.func,
    handleNext: PropTypes.func,
    handleBack: PropTypes.func,
    setErrorIndex: PropTypes.func
};
