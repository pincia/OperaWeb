import PropTypes from 'prop-types';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'store';
// material-ui
import { useTheme, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import MainCard from 'ui-component/cards/MainCard';
import UploadSingleFile from 'ui-component/third-party/dropzone/SingleFile';
import { Formik } from 'formik';
import { CircularProgress } from '@mui/material';
import React from 'react';
import Backdrop from '@mui/material/Backdrop';
// project imports
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { openSnackbar } from 'store/slices/snackbar';
import { FormattedMessage } from 'react-intl';
import { importXPWE } from 'api/projects';
import CircularLoader from 'ui-component/CircularLoader';

// animation
const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    },
    chip: {
        margin: 2
    }
};


// ==============================|| PROJECT ADD DIALOG ||============================== //

const ImportXpwe = ({ open, handleCloseDialog }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const validationSchema = yup.object({
    });

    const [openLoader, setOpen] = React.useState(false);

    const handleClose = (success, id) => {
        setOpen(false);
        handleCloseDialog(success, id);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const formik = useFormik({
        initialValues: {
            file: null
        },
        validationSchema,
        onSubmit: (values, actions) => {
            handleOpen()
            dispatch(
                importXPWE(values).then(
                    (response) => {
                        console.log(response)
                        openSnackbar({
                            open: true,
                            message: 'Submit Success',
                            variant: 'alert',
                            alert: {
                                color: 'success'
                            },
                            close: false
                        })

                        handleClose(true, response.data.id)
                    },
                    (error) => {
                        handleClose(false, -1)
                        openSnackbar({
                            open: true,
                            message: 'Submit failed!',
                            variant: 'alert',
                            alert: {
                                color: 'error'
                            },
                            close: false
                        })
                    })

            );
        }
    });

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDialog}
        >
            {open && (
                <>
                    <DialogTitle><FormattedMessage id="importProject" /></DialogTitle>
                    <form onSubmit={formik.handleSubmit}>
                        <DialogContent>
                            <Grid container spacing={gridSpacing} >
                                <Grid item xs={12}>
                                    <MainCard title={<FormattedMessage id="importProjectDescription" />}>
                                        <input
                                            type="file"
                                            name="file"
                                            accept=".xpwe"
                                            className="block w-full"
                                            onChange={(event) => {
                                                // Set the field value to the selected file
                                                { formik.setFieldValue("file", event.currentTarget.files[0]) };
                                            }}
                                        />
                                    </MainCard>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <AnimateButton>
                                <Button variant="contained" type="submit" >Create</Button>
                            </AnimateButton>
                            <Button variant="text" color="error" onClick={ ()=> handleCloseDialog(false,-1)}>
                                Close
                            </Button>
                        </DialogActions>
                        <Backdrop
                            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                            open={openLoader}
                            onClick={handleClose}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </form>
                </>
            )}
        </Dialog>
    );
};

ImportXpwe.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func
};

export default ImportXpwe;
