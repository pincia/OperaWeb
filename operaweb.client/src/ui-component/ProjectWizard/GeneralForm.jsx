import PropTypes from 'prop-types';
import { Box, Typography, Grid, TextField, Autocomplete, Checkbox, FormControlLabel } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import usePlacesAutocomplete from 'use-places-autocomplete';
import { getSoaClassifications, getSoas } from 'api/projects';

const validationSchema = yup.object({
    //city: yup.string().required('La città è obbligatoria'),
    //province: yup.string().required('La provincia è obbligatoria'),
    //works: yup.string().required('I lavori sono obbligatori'),
    //object: yup.string().required("L'oggetto è obbligatorio"),
    //location: yup.string().required('La località è obbligatoria'),
});

const GeneralForm = ({ projectData, setProjectData, onValidationChange }) => {
    const {
        suggestions: { status, data },
        setValue,
    } = usePlacesAutocomplete({ debounce: 300 });

    const [soaOptions, setSoaOptions] = useState([]);
    const [soaClassificationsOptions, setSoaClassificationsOptions] = useState([]);

    const formik = useFormik({
        initialValues: {
            city: projectData.city || '',
            province: projectData.province || '',
            works: projectData.works || '',
            object: projectData.object || '',
            location: projectData.location || '',
            selectedSoa: projectData.selectedSoa || null,
            selectedSoaClassification: projectData.selectedSoaClassification || null,
            isPublic: projectData.public || false,
        },
        enableReinitialize: true,
        validationSchema,
        validateOnMount: true,
        onSubmit: (values) => {
            setProjectData((prev) => ({
                ...prev,
                ...values,
            }));
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const soasResponse = await getSoas();
                setSoaOptions(soasResponse || []);
                const soaClassificationsResponse = await getSoaClassifications();
                setSoaClassificationsOptions(soaClassificationsResponse || []);
            } catch (error) {
                console.error('Errore nel caricamento dei dati SOA:', error);
            }
        };

        fetchData();
    }, []);

    // Sincronizza i dati con il genitore ogni volta che cambiano
    useEffect(() => {
        setProjectData((prev) => ({
            ...prev,
            ...formik.values,
        }));
    }, [formik.values, setProjectData]);

    // Aggiorna lo stato di validazione nel componente padre
    useEffect(() => {
        const isValid = formik.isValid && Object.keys(formik.errors).length === 0;
        onValidationChange(isValid);
    }, [formik.isValid, formik.errors, onValidationChange]);

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
                <FormattedMessage id="projectGeneralData" />
            </Typography>
            <form onSubmit={formik.handleSubmit}>
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
                            onBlur={formik.handleBlur}
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
                            onBlur={formik.handleBlur}
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
                            onBlur={formik.handleBlur}
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
                            onBlur={formik.handleBlur}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            id="location"
                            freeSolo
                            options={status === 'OK' ? data.map((suggestion) => suggestion.description) : []}
                            value={formik.values.location}
                            onChange={(event, newValue) => {
                                formik.setFieldValue('location', newValue);
                            }}
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
                            value={formik.values.selectedSoa}
                            onChange={(event, newValue) => formik.setFieldValue('selectedSoa', newValue)}
                            renderInput={(params) => (
                                <TextField {...params} label="Seleziona SOA" variant="outlined" />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Autocomplete
                            options={soaClassificationsOptions}
                            getOptionLabel={(option) => option.description || ''}
                            value={formik.values.selectedSoaClassification}
                            onChange={(event, newValue) =>
                                formik.setFieldValue('selectedSoaClassification', newValue)
                            }
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
                                    checked={formik.values.isPublic}
                                    onChange={(e) => formik.setFieldValue('isPublic', e.target.checked)}
                                />
                            }
                            label={<FormattedMessage id="publicLabel" />}
                        />
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

GeneralForm.propTypes = {
    projectData: PropTypes.object.isRequired,
    setProjectData: PropTypes.func.isRequired,
    onValidationChange: PropTypes.func.isRequired,
};

export default GeneralForm;
