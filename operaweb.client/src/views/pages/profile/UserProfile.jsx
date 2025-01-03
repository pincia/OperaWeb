import React, { useState, useEffect } from 'react';
import { updateProfile, getProfile } from 'api/users'; // API per recuperare e aggiornare il profilo utente
import { getOrganizationAvailableRoles } from 'api/organization'
import { getProvinces, getCities } from 'api/config'; // API per province e città
import { TextField, Grid, MenuItem, Button,Typography, FormLabel, FormControl, CircularProgress, Box } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import { openSnackbar } from 'store/slices/snackbar';
import * as Yup from 'yup';
import { useDispatch } from 'store';
const UserProfile = () => {
    const [userData, setUserData] = useState(null); // Stato per i dati dell'utente
    const [provinces, setProvinces] = useState([]); // Stato per le province
    const [cities, setCities] = useState([]); // Stato per le città
    const [organizationRoles, setOrganizationRoles] = useState([]); // Stato per i ruoli organizzativi
    const [loading, setLoading] = useState(true); // Stato di caricamento
    const dispatch = useDispatch();
    useEffect(() => {
        const loadProfileData = async () => {
            try {
                setLoading(true); // Impostiamo il caricamento su true prima di fare le chiamate
                const profile = await getProfile(); // Recupera i dati dell'utente
                const provincesData = await getProvinces(); // Recupera le province
                setUserData(profile); // Imposta i dati dell'utente
                setProvinces(provincesData); // Imposta le province
            } catch (error) {
                console.error('Errore nel recupero dei dati utente:', error);
            } finally {
                setLoading(false); // Impostiamo il caricamento su false una volta completate le chiamate
            }
        };

        loadOrganizationRoles();
        loadProfileData();
    }, []); // L'array vuoto fa sì che l'effetto venga eseguito solo al montaggio del componente

    // Carica i ruoli organizzativi
    const loadOrganizationRoles = async () => {
        try {
            const rolesData = await getOrganizationAvailableRoles(); // Chiamata all'API per ottenere i ruoli
            setOrganizationRoles(rolesData); // Imposta i ruoli organizzativi
        } catch (error) {
            console.error('Errore nel recupero dei ruoli organizzativi:', error);
        }
    };

    // Carica le città in base alla provincia selezionata
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

    // Mostriamo un messaggio di caricamento mentre i dati vengono recuperati
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    // Verifica se i dati dell'utente sono disponibili prima di renderizzare
    if (!userData) {
        return <Typography variant="h6">Errore: Dati utente non disponibili</Typography>;
    }

    return (
        <Box>
            <Formik
                initialValues={{
                    firstName: userData.firstName || '',
                    lastName: userData.lastName || '',
                    fullName: userData.fullName || '',
                    phoneNumber: userData.phoneNumber || '',
                    alternateEmail: userData.alternateEmail || '',
                    address: userData.address || '',
                    city: userData.city || '',
                    postalCode: userData.postalCode || '',
                    country: userData.country || '',
                    cf: userData.cf || '',
                    cityId: userData.cityId || '',  // cityId per la città
                    provinceId: userData.provinceId || '',  // provinceId per la provincia
                    email: userData.email || '',
                    organizationRoleId: userData.organizationRoleId || '', // Mappato al ruolo organizzativo
                }}
                validationSchema={Yup.object().shape({
                    firstName: Yup.string().required('Il nome è obbligatorio'),
                    lastName: Yup.string().required('Il cognome è obbligatorio'),
                    fullName: Yup.string().required('Il nome completo è obbligatorio'),
                    phoneNumber: Yup.string().required('Il numero di telefono è obbligatorio'),
                    alternateEmail: Yup.string().email('Email non valida').nullable(),
                    address: Yup.string().nullable(),
                    city: Yup.string().required('La città è obbligatoria'),
                    country: Yup.string().required('Il paese è obbligatorio'),
                    cf: Yup.string()
                        .matches(/^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/, 'Codice Fiscale non valido')
                        .required('Il codice fiscale è obbligatorio'),
                    cityId: Yup.number().required('Il comune è obbligatorio'),
                    provinceId: Yup.number().required('La provincia è obbligatoria'),
                })}
                onSubmit={async (values) => {
                    try {
                        // Aggiungi `provinceId` e `cityId` ai valori se non sono già inclusi
                        const updatedValues = {
                            ...values,
                            provinceId: values.provinceId,  // Assicurati che venga passato
                            cityId: values.cityId,  // Assicurati che venga passato
                        };

                        await updateProfile(values);  // Funzione per aggiornare il profilo
                       dispatch(
                        openSnackbar({
                            open: true,
                            message: 'Profilo utente salvato con successo!',
                            variant: 'alert',
                            alert: { color: 'success' },
                        }));
                    } catch (error) {
                        dispatch(
                        openSnackbar({
                            open: true,
                            message: 'Errore nell\'aggiornamento del profilo utente!',
                            variant: 'alert',
                            alert: { color: 'error' },
                        }));
                    }
                }}
            >
                {({ values, handleChange, handleSubmit, touched, errors }) => {
                    // Effettua il caricamento delle città quando il valore della provincia cambia
                    useEffect(() => {
                        if (values.provinceId) {
                            loadCities(values.provinceId);
                        }
                    }, [values.provinceId]);

                    return (
                        <Form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                {/* Nome */}
                                <Grid item xs={6}>
                                    <FormLabel>Nome *</FormLabel>
                                    <Field
                                        name="firstName"
                                        as={TextField}
                                        fullWidth
                                        value={values.firstName}
                                        onChange={handleChange}
                                        error={touched.firstName && Boolean(errors.firstName)}
                                        helperText={touched.firstName && errors.firstName}
                                    />
                                </Grid>

                                {/* Cognome */}
                                <Grid item xs={6}>
                                    <FormLabel>Cognome *</FormLabel>
                                    <Field
                                        name="lastName"
                                        as={TextField}
                                        fullWidth
                                        value={values.lastName}
                                        onChange={handleChange}
                                        error={touched.lastName && Boolean(errors.lastName)}
                                        helperText={touched.lastName && errors.lastName}
                                    />
                                </Grid>
                                {/* Email*/}
                                <Grid item xs={6}>
                                    <FormLabel>Email / Username</FormLabel>
                                    <Field
                                        name="email"
                                        as={TextField}
                                        fullWidth
                                        value={values.email}
                                        onChange={handleChange}
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                        disabled
                                    />
                                </Grid>
                                {/* Ruolo organizzativo */}
                                <Grid item xs={6}>
                                    <FormLabel>Ruolo nell'organizzazione *</FormLabel>
                                    <Field
                                        name="organizationRoleId"
                                        as={TextField}
                                        select
                                        fullWidth
                                        value={values.organizationRoleId}
                                        onChange={handleChange}
                                        error={touched.organizationRoleId && Boolean(errors.organizationRoleId)}
                                        helperText={touched.organizationRoleId && errors.organizationRoleId}
                                    >
                                        {organizationRoles.map((role) => (
                                            <MenuItem key={role.id} value={role.id}>
                                                {role.name}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                </Grid>

                                {/* Numero di telefono */}
                                <Grid item xs={6}>
                                    <FormLabel>Numero di telefono *</FormLabel>
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

                                {/* Email*/} {/* Email Alternativa */}
                                <Grid item xs={6}>
                                    <FormLabel>Email Alternativa</FormLabel>
                                    <Field
                                        name="alternateEmail"
                                        as={TextField}
                                        fullWidth
                                        value={values.alternateEmail}
                                        onChange={handleChange}
                                        error={touched.alternateEmail && Boolean(errors.alternateEmail)}
                                        helperText={touched.alternateEmail && errors.alternateEmail}
                                    />
                                </Grid>
                                {/* Codice Fiscale */}
                                <Grid item xs={6}>
                                    <FormLabel>Codice Fiscale *</FormLabel>
                                    <Field
                                        name="cf"
                                        as={TextField}
                                        fullWidth
                                        value={values.cf}
                                        onChange={handleChange}
                                        error={touched.cf && Boolean(errors.cf)}
                                        helperText={touched.cf && errors.cf}
                                    />
                                </Grid>
                                {/* Indirizzo */}
                                <Grid item xs={6}>
                                    <FormLabel>Indirizzo *</FormLabel>
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

                                {/* Città */}
                                <Grid item xs={6}>
                                    <FormLabel>Città *</FormLabel>
                                    <Field
                                        name="city"
                                        as={TextField}
                                        fullWidth
                                        value={values.city}
                                        onChange={handleChange}
                                        error={touched.city && Boolean(errors.city)}
                                        helperText={touched.city && errors.city}
                                    />
                                </Grid>
                                {/* Provincia */}
                                <Grid item xs={6}>
                                    <FormLabel>Provincia *</FormLabel>
                                    <Field
                                        name="provinceId"
                                        as={TextField}
                                        select
                                        fullWidth
                                        value={values.provinceId}
                                        onChange={handleChange}
                                        error={touched.provinceId && Boolean(errors.provinceId)}
                                        helperText={touched.provinceId && errors.provinceId}
                                    >
                                        {provinces.map((province) => (
                                            <MenuItem key={province.id} value={province.id}>
                                                {province.nome}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                </Grid>
                                {/* Comune */}
                                <Grid item xs={6}>
                                    <FormLabel>Comune *</FormLabel>
                                    <Field
                                        name="cityId"
                                        as={TextField}
                                        select
                                        fullWidth
                                        value={values.cityId}
                                        onChange={handleChange}
                                        error={touched.cityId && Boolean(errors.cityId)}
                                        helperText={touched.cityId && errors.cityId}
                                    >
                                        {cities.map((city) => (
                                            <MenuItem key={city.id} value={city.id}>
                                                {city.nome}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                </Grid>
                                {/* CAP */}
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

                                {/* Paese */}
                                <Grid item xs={6}>
                                    <FormLabel>Paese *</FormLabel>
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

                            </Grid>
                            <Box display="flex" justifyContent="flex-end" style={{ marginTop: '24px' }}>
                                <Button type="submit" variant="contained" color="primary">
                                    Save Changes
                                </Button>
                            </Box>
                        </Form>
                    );
                }}
            </Formik>
        </Box>
    );
};

export default UserProfile;
