import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Grid, Stack, TextField, Typography, Snackbar, Alert } from '@mui/material';
import AuthCardWrapper from '../AuthCardWrapper'; // Stile wrapper
import AuthWrapper1 from '../AuthWrapper1'; // Wrapper della pagina
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';
import useAuth from 'hooks/useAuth';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';

const ChangePasswordForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const { changePassword } = useAuth();
    // Validazione Yup
    const ValidationSchema = Yup.object().shape({
        oldPassword: Yup.string().required('Old password is required'),
        newPassword: Yup.string()
            .min(8, 'New password must be at least 8 characters long')
            .matches(/[a-z]/, 'Must include at least one lowercase letter')
            .matches(/[A-Z]/, 'Must include at least one uppercase letter')
            .matches(/\d/, 'Must include at least one number')
            .required('New password is required')
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            await changePassword(values.oldPassword,values.newPassword);
            dispatch(openSnackbar({
                open: true,
                message: 'Password aggiornata con successo!',
                variant: 'alert',
                alert: {
                    color: 'success'
                },
                close: false
            }));
            resetForm();
            navigate('/login'); // Reindirizza al login
        } catch (error) {
            dispatch(openSnackbar({
                open: true,
                message: error.message,
                variant: 'alert',
                alert: {
                    color: 'error'
                },
                close: false
            }));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="center" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item>
                            <AuthCardWrapper>
                                <Box sx={{ textAlign: 'center', mb: 3 }}>
                                    <Logo />
                                </Box>
                                <Typography variant="h4" textAlign="center" gutterBottom>
                                    Change Password
                                </Typography>
                                <Typography variant="body2" textAlign="center" mb={3}>
                                    Update your account password to keep it secure.
                                </Typography>

                                <Formik
                                    initialValues={{ oldPassword: '', newPassword: '' }}
                                    validationSchema={ValidationSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ errors, touched, isSubmitting }) => (
                                        <Form>
                                            <Stack spacing={2}>
                                                {/* Campo Vecchia Password */}
                                                <Field
                                                    as={TextField}
                                                    type="password"
                                                    name="oldPassword"
                                                    label="Old Password"
                                                    variant="outlined"
                                                    fullWidth
                                                    error={touched.oldPassword && Boolean(errors.oldPassword)}
                                                    helperText={touched.oldPassword && errors.oldPassword}
                                                />

                                                {/* Campo Nuova Password */}
                                                <Field
                                                    as={TextField}
                                                    type="password"
                                                    name="newPassword"
                                                    label="New Password"
                                                    variant="outlined"
                                                    fullWidth
                                                    error={touched.newPassword && Boolean(errors.newPassword)}
                                                    helperText={touched.newPassword && errors.newPassword}
                                                />

                                                {/* Bottone di invio */}
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    fullWidth
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? 'Updating...' : 'Change Password'}
                                                </Button>
                                            </Stack>
                                        </Form>
                                    )}
                                </Formik>

                                <Box mt={3} textAlign="center">
                                    <Button onClick={() => navigate('/login')} color="secondary">
                                        Back to Login
                                    </Button>
                                </Box>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>

                {/* Snackbar */}
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={4000}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                >
                    <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
                </Snackbar>
            </Grid>
        </AuthWrapper1>
    );
};

export default ChangePasswordForm;
