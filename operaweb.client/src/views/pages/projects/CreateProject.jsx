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
import ProjectWizard from 'views/forms/forms-wizard/ProjectWizard'
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

import EditableTreeView from "views/ui-elements/advance/UITreeview/EditableTreeView.jsx";
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

const CreateProject = ({ open, handleCloseDialog }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const validationSchema = yup.object({
    });

    const [openLoader, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            address: '',
            city: '',
            zipCode: '',
            country: '',
            file: null
        },
        validationSchema,
        onSubmit: (values, actions) => {
            handleOpen()
            dispatch(
                importXPWE(values).then(
                    (response) => {
                        openSnackbar({
                            open: true,
                            message: 'Submit Success',
                            variant: 'alert',
                            alert: {
                                color: 'success'
                            },
                            close: false
                        })
                        handleCreateProjectClosing(true, response.id);
                        handleClose()
                        
                    },
                    (error) => {
                        handleClose()
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

    const handleCreateProjectClosing = (success, data) => {
        handleCloseDialog(success, data)

    }
    return (
        <Dialog
            open={open}
            fullScreen={true}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDialog}
        >
            {open && (
                <>
                        <DialogContent>
                                <ProjectWizard />      
                        </DialogContent>
                        <Backdrop
                            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                            open={openLoader}
                            onClick={handleClose}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                </>
            )}
        </Dialog>
    );
};

CreateProject.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func
};

export default CreateProject;
