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
import { Box } from '@mui/material';
// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormattedMessage } from 'react-intl';
import { useState, useEffect } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

const validationSchema = yup.object({
    // Add any required validation here if needed
});

const GeneralForm = ({
    projectData,
    setProjectData,
    handleNext,
    setErrorIndex,
    soaOptions,
    soaClassificationsOptions,
}) => {
    const [selectedSoa, setSelectedSoa] = useState(projectData.selectedSoa || null);
    const [selectedSoaClassification, setSelectedSoaClassification] = useState(
        projectData.selectedSoaClassification || null
    );
    const [selectedLocation, setSelectedLocation] = useState(projectData.selectedLocation || '');
    const [isPublic, setIsPublic] = useState(projectData.public || false);

    const {
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({ debounce: 300 });

    const formik = useFormik({
        initialValues: {
            city: projectData.city || '',
            province: projectData.province || '',
            works: projectData.works || '',
            object: projectData.object || '',
            location: projectData.location || '',
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: (values) => {
            setProjectData((prev) => ({
                ...prev,
                city: values.city,
                province: values.province,
                works: values.works,
                object: values.object,
                location: values.location,
                public: isPublic,
                soaCategoryId: selectedSoa ? selectedSoa.id : null,
                soaClassificationId: selectedSoaClassification ? selectedSoaClassification.id : null,
                selectedSoa,
                selectedSoaClassification,
                selectedLocation,
            }));
            handleNext();
        },
    });

    useEffect(() => {
        setSelectedSoa(projectData.selectedSoa || null);
        setSelectedSoaClassification(projectData.selectedSoaClassification || null);
        setSelectedLocation(projectData.selectedLocation || '');
        setIsPublic(projectData.public || false);
    }, [projectData]);

    const handleSoaChange = (event, newValue) => {
        setSelectedSoa(newValue);
        setProjectData((prev) => ({
            ...prev,
            selectedSoa: newValue,
        }));
    };

    const handleSoaClassificationChange = (event, newValue) => {
        setSelectedSoaClassification(newValue);
        setProjectData((prev) => ({
            ...prev,
            selectedSoaClassification: newValue,
        }));
    };

    const handleLocationChange = (event, newValue) => {
        setSelectedLocation(newValue);
        setProjectData((prev) => ({
            ...prev,
            selectedLocation: newValue,
        }));
    };

    const handlePublicChange = (event) => {
        const value = event.target.checked;
        setIsPublic(value);
        setProjectData((prev) => ({
            ...prev,
            public: value,
        }));
    };

    return (
        <>
            <Box
                sx={{
                    minHeight: '400px',
                    maxHeight: '500px',
                    overflowY: 'auto',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    padding: 2,
                }}
            >
                <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                    <FormattedMessage id="projectGeneralData" />
                </Typography>
                <form onSubmit={formik.handleSubmit} id="validation-forms">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="city"
                                name="city"
                                label={<FormattedMessage id="cityLabel" />}
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
                                label={<FormattedMessage id="provinceLabel" />}
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
                                label={<FormattedMessage id="worksLabel" />}
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
                                label={<FormattedMessage id="objectLabel" />}
                                value={formik.values.object}
                                onChange={formik.handleChange}
                                error={formik.touched.object && Boolean(formik.errors.object)}
                                helperText={formik.touched.object && formik.errors.object}
                                fullWidth
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                id="location"
                                freeSolo
                                options={status === 'OK' ? data.map((suggestion) => suggestion.description) : []}
                                value={selectedLocation}
                                onChange={handleLocationChange}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={<FormattedMessage id="locationLabel" />}
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
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                options={soaOptions}
                                getOptionLabel={(option) => option.description || ''}
                                value={selectedSoa}
                                onChange={handleSoaChange}
                                renderInput={(params) => (
                                    <TextField {...params} label="Seleziona SOA" variant="outlined" />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                options={soaClassificationsOptions}
                                getOptionLabel={(option) => option.description || ''}
                                value={selectedSoaClassification}
                                onChange={handleSoaClassificationChange}
                                renderInput={(params) => (
                                    <TextField {...params} label="Seleziona Classificazione SOA" variant="outlined" />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="secondary"
                                        checked={isPublic}
                                        onChange={handlePublicChange}
                                    />
                                }
                                label={<FormattedMessage id="publicLabel" />}
                            />
                        </Grid>
                    </Grid>
                </form>
            </Box>

            <Stack direction="row" justifyContent="flex-end">
                <AnimateButton>
                    <Button
                        variant="contained"
                        sx={{ my: 3, ml: 1 }}
                        type="submit"
                        onClick={() => {
                            formik.handleSubmit();
                            setErrorIndex(0);
                        }}
                    >
                        Next
                    </Button>
                </AnimateButton>
            </Stack>
        </>
    );
};

GeneralForm.propTypes = {
    projectData: PropTypes.object,
    setProjectData: PropTypes.func,
    handleNext: PropTypes.func,
    setErrorIndex: PropTypes.func,
    soaOptions: PropTypes.array,
    soaClassificationsOptions: PropTypes.array,
};

export default GeneralForm;
