import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import { useDispatch } from 'store';
// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Slide from '@mui/material/Slide';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
// project imports
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { importXPWE } from 'api/projects';
import { openSnackbar } from 'store/slices/snackbar';
import { FormattedMessage } from 'react-intl';
import SingleFileUpload from 'ui-component/third-party/dropzone/SingleFile';

// animation
const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

// ==============================|| PROJECT IMPORT DIALOG ||============================== //

const ImportXpwe = ({ open, handleCloseDialog }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [openLoader, setOpen] = useState(false);

    const handleClose = (success, id) => {
        setOpen(false);
        handleCloseDialog(success, id);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const validationSchema = yup.object({
        file: yup
            .mixed()
            .required('File is required')
            .test(
                'fileFormat',
                'Only .xpwe files are supported',
                (value) => !value || value.name.endsWith('.xpwe')
            )
    });

    const formik = useFormik({
        initialValues: {
            file: null
        },
        validationSchema,
        onSubmit: (values) => {
            handleOpen();
            dispatch(
                importXPWE(values).then(
                    (response) => {
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: 'Submit Success',
                                variant: 'alert',
                                alert: {
                                    color: 'success'
                                },
                                close: false
                            })
                        );
                        handleClose(true, response.data.id);
                    },
                    () => {
                        handleClose(false, -1);
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: 'Submit failed!',
                                variant: 'alert',
                                alert: {
                                    color: 'error'
                                },
                                close: false
                            })
                        );
                    }
                )
            );
        }
    });

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => handleCloseDialog(false, -1)}
            maxWidth="sm" // Dimensione massima della finestra
            fullWidth
        >
            <DialogTitle>
                <FormattedMessage id="importProject" />
            </DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: theme.spacing(2),
                        padding: theme.spacing(2),
                        minHeight: '200px' // Altezza minima fissa per evitare ridimensionamenti
                    }}
                >
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <SingleFileUpload
                                file={formik.values.file}
                                setFieldValue={formik.setFieldValue}
                                error={formik.errors.file && formik.touched.file}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions
                    sx={{
                        justifyContent: 'space-between',
                        padding: theme.spacing(1, 3)
                    }}
                >
                    <Button
                        variant="text"
                        color="error"
                        onClick={() => handleCloseDialog(false, -1)}
                    >
                        Close
                    </Button>
                    <AnimateButton>
                        <Button
                            variant="contained"
                            type="submit"
                            disabled={!formik.values.file || openLoader}
                        >
                            Create
                        </Button>
                    </AnimateButton>
                </DialogActions>
                <Backdrop
                    sx={{ color: '#fff', zIndex: theme.zIndex.drawer + 1 }}
                    open={openLoader}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </form>
        </Dialog>
    );
};

ImportXpwe.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func
};

export default ImportXpwe;
