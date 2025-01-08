import PropTypes from 'prop-types';
import { Box, Typography, Grid, TextField, Autocomplete, Checkbox, FormControlLabel } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { getSoaClassifications, getSoas } from 'api/projects';

const validationSchema = yup.object({});

const GeneralForm = ({ projectData, setProjectData, onValidationChange }) => {
    const {
        suggestions: { status, data },
        setValue,
    } = usePlacesAutocomplete({ debounce: 300 });

    const [soaOptions, setSoaOptions] = useState([]);
    const [soaClassificationsOptions, setSoaClassificationsOptions] = useState([]);

    const handleSelect = async (completeAddress) => {
        setValue(completeAddress, false);
        try {
            const results = await getGeocode({ address: completeAddress });
            const { lat, lng } = await getLatLng(results[0]);

            // Aggiorna Formik
            formik.setFieldValue('completeAddress', completeAddress, false);
            formik.setFieldValue('latitude', lat, false);
            formik.setFieldValue('longitude', lng, false);

            // Aggiorna il progetto
            if (
                projectData.completeAddress !== completeAddress ||
                projectData.latitude !== lat ||
                projectData.longitude !== lng
            ) {
                setProjectData((prev) => ({
                    ...prev,
                    completeAddress,
                    latitude: lat,
                    longitude: lng,
                }));
            }
        } catch (error) {
            console.error('Errore nel recupero delle coordinate:', error);
        }
    };

    const formik = useFormik({
        initialValues: {
            city: projectData.city || '',
            province: projectData.province || '',
            works: projectData.works || '',
            object: projectData.object || '',
            completeAddress: projectData.completeAddress || '',
            latitude: projectData.latitude || '',
            longitude: projectData.longitude || '',
            selectedSoa: projectData.selectedSoa || null,
            GIG: projectData.GIG || null,
            CUG: projectData.CUG || null,
            selectedSoaClassification: projectData.selectedSoaClassification || null,
            isPublic: projectData.isPublic || false,
        },
        enableReinitialize: true, // Permetti il reset solo quando projectData cambia
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
        const isDifferent = Object.keys(formik.values).some(
            (key) => formik.values[key] !== projectData[key]
        );

        if (isDifferent) {
            setProjectData((prev) => ({
                ...prev,
                ...formik.values,
            }));
        }
    }, [formik.values, setProjectData, projectData]);

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

    useEffect(() => {
        const isValid = formik.isValid && Object.keys(formik.errors).length === 0;
        onValidationChange(isValid);
    }, [formik.isValid, formik.errors, onValidationChange]);

    return (
        <Box sx={{ padding: 2, marginTop: 3 }}>
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
                            value={formik.values.completeAddress || ''} // Usa sempre una stringa predefinita
                            onChange={(event, newValue) => {
                                formik.setFieldValue('completeAddress', newValue || ''); // Evita valori non definiti
                                handleSelect(newValue); // Recupera le coordinate automaticamente
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={<FormattedMessage id="locationLabel" />}
                                    onChange={(e) => {
                                        formik.setFieldValue('completeAddress', e.target.value); // Aggiorna Formik
                                        setValue(e.target.value); // Aggiorna i suggerimenti
                                    }}
                                    error={formik.touched.completeAddress && Boolean(formik.errors.completeAddress)}
                                    helperText={formik.touched.completeAddress && formik.errors.completeAddress}
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
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="GIG"
                            name="GIG"
                            label={<FormattedMessage id="GIG" />}
                            value={formik.values.GIG}
                            onChange={formik.handleChange}
                            error={formik.touched.GIG && Boolean(formik.errors.GIG)}
                            helperText={formik.touched.GIG && formik.errors.GIG}
                            onBlur={formik.handleBlur}
                            fullWidth
                        /></Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="CUG"
                            name="CUG"
                            label={<FormattedMessage id="CUG" />}
                            value={formik.values.CUG}
                            onChange={formik.handleChange}
                            error={formik.touched.CUG && Boolean(formik.errors.CUG)}
                            helperText={formik.touched.CUG && formik.errors.CUG}
                            onBlur={formik.handleBlur}
                            fullWidth
                        /></Grid>
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
