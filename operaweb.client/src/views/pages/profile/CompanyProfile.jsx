import React, { useState, useEffect } from 'react';
import { updateCompanyProfile, getCompanyProfile } from 'api/company'; // API per recuperare e aggiornare il profilo azienda
import { getProvinces, getCities } from 'api/config'; // API per province e città
import { getUserAvaliableSubFigures } from 'api/figure'; // API per le classificazioni figura
import { TextField, Grid, MenuItem, Button, Snackbar, Alert, Typography, FormLabel, FormControl, CircularProgress, Box } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import { openSnackbar } from 'store/slices/snackbar';
import * as Yup from 'yup';
import { useDispatch } from 'store';
const CompanyProfile = ({ companyId }) => {
    const [formData, setFormData] = useState({
        name: '',
        vatOrTaxCode: '',
        address: '',
        comuneId: '',
        provinciaId: '',
        postalCode: '',
        country: '',
        phoneNumber: '',
        email: '',
        website: '',
        sdiCode: '',
        pec: '',
        figureClassification: '',
        figureClassificationId: '',
        figure: '',
        figureId: '',
        provinceId: '',
        cityId: ''
    });

    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [subFigures, setSubFigures] = useState([]); // State for figure classifications
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [loading, setLoading] = useState(true); // Loader state
    const dispatch = useDispatch();
    // Load initial company data
    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const companyProfile = await getCompanyProfile(companyId);
                setFormData({
                    name: companyProfile.name,
                    vatOrTaxCode: companyProfile.vatOrTaxCode,
                    address: companyProfile.address,
                    comuneId: companyProfile.comuneId,
                    provinciaId: companyProfile.provinciaId,
                    postalCode: companyProfile.postalCode,
                    country: companyProfile.country,
                    phoneNumber: companyProfile.phoneNumber,
                    email: companyProfile.email,
                    website: companyProfile.website,
                    sdiCode: companyProfile.sdiCode,
                    pec: companyProfile.pec,
                    figureClassification: companyProfile.figureClassification,
                    figureClassificationId: companyProfile.figureClassificationId,
                    figure: companyProfile.figure,
                    figureId: companyProfile.figureId,
                    cityId: companyProfile.cityId,
                    provinceId: companyProfile.provinceId,
                });
                // Dopo aver ricevuto i dati, possiamo fermare il caricamento
                setLoading(false);
            } catch (error) {
                console.error('Error fetching company profile:', error);
                setLoading(false); // Anche in caso di errore fermiamo il caricamento
            }
        };

        const fetchProvincesData = async () => {
            const provincesData = await getProvinces();
            setProvinces(provincesData);
        };

        const fetchSubFigures = async () => {
            const subFiguresData = await getUserAvaliableSubFigures();
            setSubFigures(subFiguresData);
        };

        fetchCompanyData();
        fetchProvincesData();
        fetchSubFigures();
    }, [companyId]);

    const loadCities = async (provinceId) => {
        if (provinceId) {
            try {
                const citiesData = await getCities(provinceId);
                setCities(citiesData);
            } catch (error) {
                console.error('Errore nel recupero delle città:', error);
            }
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // Show a loading spinner while data is being fetched
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div>
            <Formik
                initialValues={{
                    name: formData.name || '',
                    vatOrTaxCode: formData.vatOrTaxCode || '',
                    address: formData.address || '',
                    comuneId: formData.comuneId || '',
                    provinciaId: formData.provinciaId || '',
                    postalCode: formData.postalCode || '',
                    country: formData.country || '',
                    phoneNumber: formData.phoneNumber || '',
                    email: formData.email || '',
                    website: formData.website || '',
                    sdiCode: formData.sdiCode || '',
                    pec: formData.pec || '',
                    figureClassification: formData.figureClassification || '',
                    figureClassificationId: formData.figureClassificationId || '',
                    figure: formData.figure || '',
                    figureId: formData.figureId || '',
                    cityId: formData.cityId,
                    provinceId: formData.provinceId,
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().required('Ragione sociale è obbligatoria'),
                    vatOrTaxCode: Yup.string().required('P.IVA o Codice Fiscale è obbligatorio'),
                    phoneNumber: Yup.string().required('Telefono è obbligatorio'),
                    email: Yup.string().email('Email non valida').required('Email è obbligatoria'),
                    address: Yup.string().required('Indirizzo è obbligatorio'),
                    cityId: Yup.number().required('Comune è obbligatorio'),
                    provinceId: Yup.number().required('Provincia è obbligatoria'),
                    postalCode: Yup.string().required('CAP è obbligatorio'),
                    country: Yup.string().required('Paese è obbligatorio'),
                    figureClassificationId: Yup.string().required('La classificazione figura è obbligatoria'),                })}
                onSubmit={async (values) => {
                    try {
                        // Aggiungi `provinceId` e `cityId` ai valori se non sono già inclusi
                        const updatedValues = {
                            ...values,
                            provinceId: values.provinceId,  // Assicurati che venga passato
                            cityId: values.cityId,  // Assicurati che venga passato
                        };

                        await updateCompanyProfile(values); // Update company profile
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: 'Profilo azienda salvato con successo!',
                                variant: 'alert',
                                alert: { color: 'success' },
                            }));
                    } catch (error) {
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: 'Errore nell\'aggiornamento del profilo azienda',
                                variant: 'alert',
                                alert: { color: 'error' },
                            }));
                    }
                }}
            >
                {({ values, handleChange, handleSubmit, touched, errors }) => {
                    useEffect(() => {
                        if (values.provinceId) {
                            loadCities(values.provinceId);
                        }
                    }, [values.provinceId]);

                    return (
                        <Form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                {/* Ragione Sociale */}
                                <Grid item xs={6}>
                                    <FormLabel>Ragione Sociale</FormLabel>
                                    <Field
                                        name="name"
                                        as={TextField}
                                        fullWidth
                                        value={values.name}
                                        onChange={handleChange}
                                        error={touched.name && Boolean(errors.name)}
                                        helperText={touched.name && errors.name}
                                    />
                                </Grid>
                                {/* Figure */}
                                <Grid item xs={6}>
                                    <FormLabel>Figura</FormLabel>
                                    <Field
                                        name="figure"
                                        as={TextField}
                                        fullWidth
                                        value={values.figure}
                                        onChange={handleChange}
                                        error={touched.figure && Boolean(errors.figure)}
                                        helperText={touched.figure && errors.figure}
                                        disabled
                                    />
                                </Grid>
                                {/* VAT or Tax Code */}
                                <Grid item xs={6}>
                                    <FormLabel>P.IVA o Codice Fiscale</FormLabel>
                                    <Field
                                        name="vatOrTaxCode"
                                        as={TextField}
                                        fullWidth
                                        value={values.vatOrTaxCode}
                                        onChange={handleChange}
                                        error={touched.vatOrTaxCode && Boolean(errors.vatOrTaxCode)}
                                        helperText={touched.vatOrTaxCode && errors.vatOrTaxCode}
                                    />
                                </Grid>

                                {/* Figure Classification */}
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <FormLabel>Classificazione Figura</FormLabel>
                                        <TextField
                                            select
                                            fullWidth
                                            name="figureClassificationId"
                                            value={values.figureClassificationId}
                                            onChange={handleChange}
                                        >
                                            {subFigures.map((subFigure) => (
                                                <MenuItem key={subFigure.id} value={subFigure.id}>
                                                    {subFigure.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </FormControl>
                                </Grid>

                                {/* Phone Number */}
                                <Grid item xs={6}>
                                    <FormLabel>Telefono</FormLabel>
                                    <Field
                                        name="phoneNumber"
                                        as={TextField}
                                        fullWidth
                                        value={values.phoneNumber}
                                        onChange={handleChange}
                                        error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                                        helperText={touched.phoneNumber && errors.phoneNumber}
                                    />
                                </Grid>

                                {/* Email */}
                                <Grid item xs={6}>
                                    <FormLabel>Email</FormLabel>
                                    <Field
                                        name="email"
                                        as={TextField}
                                        fullWidth
                                        value={values.email}
                                        onChange={handleChange}
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                    />
                                </Grid>

                                {/* Address */}
                                <Grid item xs={6}>
                                    <FormLabel>Indirizzo</FormLabel>
                                    <Field
                                        name="address"
                                        as={TextField}
                                        fullWidth
                                        value={values.address}
                                        onChange={handleChange}
                                        error={touched.address && Boolean(errors.address)}
                                        helperText={touched.address && errors.address}
                                    />
                                </Grid>

                                {/* Province */}
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <FormLabel>Provincia</FormLabel>
                                        <TextField
                                            select
                                            fullWidth
                                            name="provinceId"
                                            value={values.provinceId}
                                            onChange={handleChange}
                                        >
                                            {provinces.map((province) => (
                                                <MenuItem key={province.id} value={province.id}>
                                                    {province.nome}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </FormControl>
                                </Grid>

                                {/* Municipality */}
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <FormLabel>Comune</FormLabel>
                                        <TextField
                                            select
                                            fullWidth
                                            name="cityId"
                                            value={values.cityId}
                                            onChange={handleChange}
                                        >
                                            {cities.map((city) => (
                                                <MenuItem key={city.id} value={city.id}>
                                                    {city.nome}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </FormControl>
                                </Grid>

                                {/* Postal Code */}
                                <Grid item xs={6}>
                                    <FormLabel>CAP</FormLabel>
                                    <Field
                                        name="postalCode"
                                        as={TextField}
                                        fullWidth
                                        value={values.postalCode}
                                        onChange={handleChange}
                                        error={touched.postalCode && Boolean(errors.postalCode)}
                                        helperText={touched.postalCode && errors.postalCode}
                                    />
                                </Grid>

                                {/* Country */}
                                <Grid item xs={6}>
                                    <FormLabel>Paese</FormLabel>
                                    <Field
                                        name="country"
                                        as={TextField}
                                        fullWidth
                                        value={values.country}
                                        onChange={handleChange}
                                        error={touched.country && Boolean(errors.country)}
                                        helperText={touched.country && errors.country}
                                    />
                                </Grid>

                                {/* Website */}
                                <Grid item xs={6}>
                                    <FormLabel>Sito Web</FormLabel>
                                    <Field
                                        name="website"
                                        as={TextField}
                                        fullWidth
                                        value={values.website}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                {/* SDI Code */}
                                <Grid item xs={6}>
                                    <FormLabel>Codice SDI</FormLabel>
                                    <Field
                                        name="sdiCode"
                                        as={TextField}
                                        fullWidth
                                        value={values.sdiCode}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                {/* PEC */}
                                <Grid item xs={6}>
                                    <FormLabel>PEC</FormLabel>
                                    <Field
                                        name="pec"
                                        as={TextField}
                                        fullWidth
                                        value={values.pec}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <Box display="flex" justifyContent="flex-end" style={{ marginTop: '24px' }}>
                                <Button type="submit" variant="contained" color="primary">
                                    Save Changes
                                </Button>
                            </Box>
                        </Form>);
                }}
            </Formik>
        </div>
    );
};

export default CompanyProfile;
