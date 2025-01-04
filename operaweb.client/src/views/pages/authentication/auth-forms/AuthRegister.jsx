import React, { useEffect, useState } from 'react';
import { useDispatch } from 'store';
import { Link, useNavigate } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { getFigures } from 'api/figure';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import { openSnackbar } from 'store/slices/snackbar';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const JWTRegister = ({ ...others }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const scriptedRef = useScriptRef();
    const dispatch = useDispatch();
    const [errror, setError] = useState(null);
    const [showPassword, setShowPassword] = React.useState(false);
    const [figures, setfigures] = useState([]);
    const { register } = useAuth();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // Fetch figures from API
    useEffect(() => {
        const fetchfigures = async () => {
            try {
                const fetchedfigures = await getFigures();
                setfigures(fetchedfigures);
            } catch (error) {
                console.error('Error fetching figures:', error);
            }
        };

        fetchfigures();
    }, []);

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Sign up with Email address</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    figure: '',
                    companyName: '', // New field for company name
                    vatOrTaxCode: '', // New field for VAT/Tax Code
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Inserisci un indirizzo email valido').max(255).required('L\'email è obbligatoria'),
                    password: Yup.string().max(255).required('La password è obbligatoria'),
                    figure: Yup.string().required('Il ruolo è obbligatorio'),
                    companyName: Yup.string().required('Il nome dell\'azienda è obbligatorio'),
                    vatOrTaxCode: Yup.string().required('La PIVA o il Codice Fiscale è obbligatorio')
                })}

                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        await register(
                            values.email,
                            values.password,
                            values.firstName,
                            values.lastName,
                            values.figure,
                            values.companyName, // Pass company name
                            values.vatOrTaxCode // Pass VAT/Tax Code
                        );
                        setStatus({ success: true });
                        setSubmitting(false);
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: 'Your registration has been successfully completed.',
                                variant: 'alert',
                                alert: {
                                    color: 'success'
                                },
                                close: false
                            })
                        );
                        navigate('/check-mail-confirmation', { replace: true });
                    } catch (err) {
                        setError(Object.entries(response.data.messages)
                            .map(([k, v]) => (`'${v}'`))
                            .join(' '));

                        dispatch(openSnackbar({
                            open: true,
                            message: 'Registrazione flalita ->' +error,
                            variant: 'alert',
                            alert: {
                                color: 'error'
                            },
                            close: false
                        }));
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    margin="normal"
                                    name="firstName"
                                    type="text"
                                    value={values.firstName}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    margin="normal"
                                    name="lastName"
                                    type="text"
                                    value={values.lastName}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>
                        </Grid>
                       
                        {/* Company Name */}
                        <TextField
                            fullWidth
                            label="Company Name"
                            margin="normal"
                            name="companyName"
                            type="text"
                            value={values.companyName}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={Boolean(touched.companyName && errors.companyName)}
                            helperText={touched.companyName && errors.companyName}
                            sx={{ ...theme.typography.customInput }}
                        />

                        {/* VAT or Tax Code */}
                        <TextField
                            fullWidth
                            label="PIVA o CF"
                            margin="normal"
                            name="vatOrTaxCode"
                            type="text"
                            value={values.vatOrTaxCode}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={Boolean(touched.vatOrTaxCode && errors.vatOrTaxCode)}
                            helperText={touched.vatOrTaxCode && errors.vatOrTaxCode}
                            sx={{ ...theme.typography.customInput }}
                        />
                        {/* Figure */}
                        <FormControl
                            fullWidth
                            margin="normal"
                            error={Boolean(touched.figure && errors.figure)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel id="figure-select-label">Figure</InputLabel>
                            <Select
                                labelId="figure-select-label"
                                id="figure-select"
                                name="figure"
                                value={values.figure}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                {figures.map((figure) => (
                                    <MenuItem key={figure.id} value={figure.name}>
                                        {figure.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {touched.figure && errors.figure && (
                                <FormHelperText error>{errors.figure}</FormHelperText>
                            )}
                        </FormControl>


                        <FormControl
                            fullWidth
                            error={Boolean(touched.email && errors.email)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-register"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <Button
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </Button>
                                    </InputAdornment>
                                }
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Sign up
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default JWTRegister;
