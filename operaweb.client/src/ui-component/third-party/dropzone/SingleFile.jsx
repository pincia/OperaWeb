import PropTypes from 'prop-types';

// material-ui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

// third-party
import { useDropzone } from 'react-dropzone';

// project import
import RejectionFiles from './RejectionFile';
import PlaceholderContent from './PlaceHolderContent';
import FilesPreview from './FilePreview';

const DropzoneWrapper = styled('div')(({ theme }) => ({
    outline: 'none',
    overflow: 'hidden',
    position: 'relative',
    padding: theme.spacing(5, 1),
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create('padding'),
    backgroundColor: theme.palette.background.paper,
    border: `1px dashed ${theme.palette.secondary.main}`,
    '&:hover': { opacity: 0.72, cursor: 'pointer' }
}));

// ==============================|| UPLOAD - SINGLE FILE ||============================== //

const SingleFileUpload = ({ error, file, setFieldValue, sx }) => {
    const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
        accept: { '.xpwe': [] }, // Accetta solo file .xpwe
        multiple: false, // Singolo file
        onDrop: (acceptedFiles) => {
            // Aggiorna il valore di file con Formik
            if (acceptedFiles.length > 0) {
                const uploadedFile = acceptedFiles[0];
                setFieldValue(
                    'file',
                    Object.assign(uploadedFile, {
                        preview: URL.createObjectURL(uploadedFile)
                    })
                );
            }
        }
    });

    // Rimuovi il file
    const onRemove = () => {
        setFieldValue('file', null);
    };

    return (
        <Box sx={{ width: '100%', ...sx }}>
            {/* Dropzone */}
            {!file && (
                <DropzoneWrapper
                    {...getRootProps()}
                    sx={{
                        ...(isDragActive && { opacity: 0.72 }),
                        ...((isDragReject || error) && {
                            color: 'error.main',
                            borderColor: 'error.light',
                            bgcolor: 'error.lighter'
                        })
                    }}
                >
                    <input {...getInputProps()} />
                    <PlaceholderContent />
                </DropzoneWrapper>
            )}

            {/* Errore per file non accettati */}
            {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}

            {/* Anteprima del File */}
            {file && (
                <FilesPreview
                    files={[file]} // Singolo file come array
                    showList={false}
                    onRemove={onRemove}
                />
            )}
        </Box>
    );
};

SingleFileUpload.propTypes = {
    setFieldValue: PropTypes.func.isRequired, // `setFieldValue` è obbligatorio
    file: PropTypes.object, // Un singolo file (non array)
    error: PropTypes.string,
    sx: PropTypes.object
};

export default SingleFileUpload;
