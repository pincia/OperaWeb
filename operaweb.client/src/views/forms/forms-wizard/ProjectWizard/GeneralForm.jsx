import PropTypes from 'prop-types';

// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormattedMessage } from 'react-intl';
import { useState } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

const validationSchema = yup.object({
    city: yup.string().required('Ente, Comune campo obbligatorio'),
    province: yup.string().required('Provincia campo obbligatorio'),
    works: yup.string().required('Opere campo obbligatorio'),
    object: yup.string().required('Progetto campo obbligatorio'),
    location: yup.string().required('Localizzazione cantiere campo obbligatorio'),
});

// ==============================|| PROJECT WIZARD - VALIDATION ||============================== //

const GeneralForm = ({ projectData, setProjectData, handleNext, setErrorIndex, soaOptions, soaClassificationsOptions }) => {
    const [selectedSoa, setSelectedSoa] = useState(null);
    const [selectedSoaClassification, setSelectedSoaClassification] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState('');

    const {
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({ debounce: 300 });

    const formik = useFormik({
        initialValues: {
            city: projectData.city,
            province: projectData.province,
            works: projectData.works,
            object: projectData.object,
            location: projectData.location || '',
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => {
            let coordinates = null;
            if (selectedLocation) {
                try {
                    const results = await getGeocode({ address: selectedLocation });
                    coordinates = await getLatLng(results[0]);
                } catch (error) {
                    console.error('Errore durante il recupero delle coordinate:', error);
                }
            }

            setProjectData({
                city: values.city,
                province: values.province,
                works: values.works,
                object: values.object,
                location: selectedLocation,
                coordinates, // Salva latitudine e longitudine
            });

            handleNext();
        },
    });

    const handleLocationChange = (event, newValue) => {
        setSelectedLocation(newValue);
        setValue(newValue);
    };

    return (
        <>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                <FormattedMessage id="projectGeneralData" />
            </Typography>
            <form onSubmit={formik.handleSubmit} id="validation-forms">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="city"
                            name="city"
                            label={projectData.city ? '' : <FormattedMessage id="cityLabel" />}
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="province"
                            name="province"
                            label={projectData.province ? '' : <FormattedMessage id="provinceLabel" />}
                            value={formik.values.province}
                            onChange={formik.handleChange}
                            error={formik.touched.province && Boolean(formik.errors.province)}
                            helperText={formik.touched.province && formik.errors.province}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="works"
                            name="works"
                            label={projectData.works ? '' : <FormattedMessage id="worksLabel" />}
                            value={formik.values.works}
                            onChange={formik.handleChange}
                            error={formik.touched.works && Boolean(formik.errors.works)}
                            helperText={formik.touched.works && formik.errors.works}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="object"
                            name="object"
                            label={projectData.object ? '' : <FormattedMessage id="objectLabel" />}
                            value={formik.values.object}
                            onChange={formik.handleChange}
                            error={formik.touched.object && Boolean(formik.errors.object)}
                            helperText={formik.touched.object && formik.errors.object}
                            fullWidth
                            autoComplete="family-name"
                        />
                    </Grid>

                    {/* Campo Localizzazione */}
                    <Grid item xs={12}>
                        <Autocomplete
                            id="location"
                            freeSolo
                            options={status === 'OK' ? data.map((suggestion) => suggestion.description) : []}
                            value={formik.values.location} // Sincronizzato con formik
                            onChange={(event, newValue) => {
                                formik.setFieldValue('location', newValue || ''); // Aggiorna formik con il valore selezionato
                                setValue(newValue || ''); // Aggiorna usePlacesAutocomplete
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Localizzazione Cantiere"
                                    value={formik.values.location} // Sincronizzato con formik
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        setValue(e.target.value); // Aggiorna il suggerimento
                                    }}
                                    error={formik.touched.location && Boolean(formik.errors.location)}
                                    helperText={formik.touched.location && formik.errors.location}
                                    fullWidth
                                />
                            )}
                        />

                    </Grid>

                    {/* Dropdown per SOA */}
                    <Grid item xs={12} sm={6}>
                        <Autocomplete
                            options={soaOptions}
                            getOptionLabel={(option) => option.description || ''}
                            value={selectedSoa}
                            onChange={(event, newValue) => setSelectedSoa(newValue)}
                            renderInput={(params) => (
                                <TextField {...params} label="Seleziona SOA" variant="outlined" />
                            )}
                        />
                    </Grid>

                    {/* Dropdown per SOA Classifications */}
                    <Grid item xs={12} sm={6}>
                        <Autocomplete
                            options={soaClassificationsOptions}
                            getOptionLabel={(option) => option.description || ''}
                            value={selectedSoaClassification}
                            onChange={(event, newValue) => setSelectedSoaClassification(newValue)}
                            renderInput={(params) => (
                                <TextField {...params} label="Seleziona Classificazione SOA" variant="outlined" />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                            label={<FormattedMessage id="publicLabel" />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                            <AnimateButton>
                                <Button variant="contained" sx={{ my: 3, ml: 1 }} type="submit" onClick={() => setErrorIndex(0)}>
                                    Next
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

GeneralForm.propTypes = {
    generalData: PropTypes.object,
    setProjectData: PropTypes.func,
    handleNext: PropTypes.func,
    setErrorIndex: PropTypes.func
};

export default GeneralForm;
