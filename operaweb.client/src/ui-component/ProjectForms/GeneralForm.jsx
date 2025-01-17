import PropTypes from 'prop-types';
import { Box, Grid, TextField, Autocomplete, Checkbox, FormControlLabel } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useState, useEffect, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { getSoaClassifications, getSoas } from 'api/projects';

const validationSchema = yup.object({});

const GeneralForm = ({ projectData, setProjectData, onValidationChange }) => {
    const {
        suggestions: { status, data },
        setValue,
    } = usePlacesAutocomplete({ debounce: 300 });

    const [soaCategoryOptions, setSoaOptions] = useState([]);
    const [soaClassificationsOptions, setSoaClassificationsOptions] = useState([]);
    const previousProjectDataRef = useRef(projectData);

    const handleSelect = async (completeAddress) => {
        setValue(completeAddress, false);
        try {
            const results = await getGeocode({ address: completeAddress });
            const { lat, lng } = await getLatLng(results[0]);

            formik.setFieldValue('completeAddress', completeAddress, false);
            formik.setFieldValue('latitude', lat, false);
            formik.setFieldValue('longitude', lng, false);

            setProjectData((prev) => ({
                ...prev,
                completeAddress,
                latitude: lat,
                longitude: lng,
            }));
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
            latitude: projectData.latitude || null,
            longitude: projectData.longitude || null,
            gig: projectData.gig || '',
            cup: projectData.cup || '',
            soaClassificationId: projectData.soaClassificationId || null,
            soaCategoryId: projectData.soaCategoryId || null,
            public: projectData.public || false,
        },
        enableReinitialize: true,
        validationSchema,
        validateOnMount: true,
        onSubmit: () => {
            // Gestione submit se necessario
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

    useEffect(() => {
        // Controlla se i valori effettivamente differiscono
        const isDifferent = Object.keys(formik.values).some((key) => {
            return formik.values[key] !== previousProjectDataRef.current[key];
        });

        if (isDifferent) {
            setProjectData((prev) => ({ ...prev, ...formik.values })); // Merged con projectData esistente
            previousProjectDataRef.current = formik.values; // Aggiorna il riferimento
        }
    }, [formik.values, setProjectData]);

    useEffect(() => {
        const isValid = formik.isValid && Object.keys(formik.errors).length === 0;
        onValidationChange(isValid);
    }, [formik.values]);

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
                            options={soaCategoryOptions}
                            getOptionLabel={(option) => option.description || ''}
                            value={soaCategoryOptions.find(
                                (option) => option.id === formik.values.soaCategoryId
                            ) || null}
                            onChange={(event, newValue) => {
                                const id = newValue ? newValue.id : null;
                                formik.setFieldValue('soaCategoryId', id);
                                setProjectData((prev) => ({ ...prev, soaCategoryId: id, ...formik.values }));
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="Seleziona SOA" variant="outlined" />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Autocomplete
                            options={soaClassificationsOptions}
                            getOptionLabel={(option) => option.description || ''}
                            value={soaClassificationsOptions.find(
                                (option) => option.id === formik.values.soaClassificationId
                            ) || null}
                            onChange={(event, newValue) => {
                                const id = newValue ? newValue.id : null;
                                formik.setFieldValue('soaClassificationId', id);
                                setProjectData((prev) => ({ ...prev, soaClassificationId: id, ...formik.values }));
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="Seleziona Classificazione SOA" variant="outlined" />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="gig"
                            name="gig"
                            label={<FormattedMessage id="gig" />}
                            value={formik.values.gig}
                            onChange={formik.handleChange}
                            error={formik.touched.gig && Boolean(formik.errors.gig)}
                            helperText={formik.touched.gig && formik.errors.gig}
                            onBlur={formik.handleBlur}
                            fullWidth
                        /></Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="cup"
                            name="cup"
                            label={<FormattedMessage id="cup" />}
                            value={formik.values.cup}
                            onChange={formik.handleChange}
                            error={formik.touched.cup && Boolean(formik.errors.cup)}
                            helperText={formik.touched.cup && formik.errors.cup}
                            onBlur={formik.handleBlur}
                            fullWidth
                        /></Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="secondary"
                                    checked={formik.values.public}
                                    onChange={(e) => formik.setFieldValue('public', e.target.checked)}
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
