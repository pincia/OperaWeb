import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
    TextField,
    Grid,
    Typography,
    Box,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Stack,
    Button,
    FormLabel,
} from '@mui/material';

const EconomicsForm = ({ handleNext, handleBack, projectData, setProjectData }) => {
    const [economics, setEconomics] = useState({
        ...projectData.economics,
        TTP: projectData.economics.TTP || 0, // Imposta il valore predefinito di TTP
    });
    const activeFieldRef = useRef(null);

    useEffect(() => {
        calculateFields();
    }, [economics.LMS, economics.LCP, economics.CSI, economics.CMO, economics.VBA, economics.SAD, economics.TTP]);

    const calculateFields = () => {
        const {
            LMS = 0,
            LCP = 0,
            CSI = 0,
            CMO = 0,
            VBA = 0,
            SAD = 0,
            TTP = 1,
        } = economics;

        const LBA = parseFloat(LMS) + parseFloat(LCP) + parseFloat(CSI) + parseFloat(CMO);
        const VAI = LBA * (parseFloat(VBA) / 100);
        const TLA = LBA + VAI;

        let CTP = 0;
        switch (parseInt(TTP, 10)) {
            case 1:
                CTP = LBA;
                break;
            case 2:
                CTP = TLA;
                break;
            case 3:
                CTP = TLA + parseFloat(SAD);
                break;
            case 4:
                CTP = LBA + parseFloat(SAD);
                break;
            default:
                CTP = 0;
        }

        setEconomics((prevState) => ({
            ...prevState,
            LBA: LBA.toFixed(2),
            VAI: VAI.toFixed(2),
            TLA: TLA.toFixed(2),
            CTP: CTP.toFixed(2),
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        activeFieldRef.current = name;
        setEconomics((prev) => ({ ...prev, [name]: value }));
        setProjectData((prev) => ({
            ...prev,
            economics: { ...prev.economics, [name]: value },
        }));
    };

    const EconomicsField = ({ label, name, readOnly = false, type = "text" }) => (
        <Box sx={{ marginBottom: 2 }}>
            <FormLabel
                sx={{
                    minWidth: '200px',
                    fontWeight: 'bold',
                    color: readOnly ? 'black' : 'inherit',
                }}
            >
                {label}
            </FormLabel>
            <TextField
                name={name}
                value={economics[name] || ''}
                onChange={!readOnly ? handleChange : undefined}
                fullWidth
                type={type}
                inputRef={(input) => {
                    if (input && activeFieldRef.current === name) {
                        input.focus();
                    }
                }}
                onFocus={() => (activeFieldRef.current = name)}
                sx={{
                    width: '200px',
                    backgroundColor: readOnly ? 'rgba(240, 240, 240, 0.8)' : 'inherit',
                    fontWeight: readOnly ? 'bold' : 'normal',
                    pointerEvents: readOnly ? 'none' : 'auto',
                    border: readOnly ? '2px solid grey' : '1px solid rgba(0, 0, 0, 0.23)',
                    borderRadius: '4px',
                }}
                InputProps={{
                    readOnly,
                    style: readOnly ? { fontWeight: 'bold', borderWidth: '2px' } : {},
                }}
            />
        </Box>
    );

    return (
        <Stack>
            <Box p={3}>
                <Typography variant="h5" gutterBottom>
                    Quadro Economico
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Gestione somme del progetto
                </Typography>
                <Typography variant="h5" gutterBottom mt={1}>
                    A) LAVORI
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <EconomicsField label="Lavori a Misura" name="LMS" type="number" />
                        <EconomicsField label="Lavori a Corpo" name="LCP" type="number" />
                        <EconomicsField label="LAVORI A BASE D'ASTA" name="LBA" readOnly />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <EconomicsField label="Costi della Sicurezza" name="CSI" type="number" />
                        <EconomicsField label="Costi della Manodopera" name="CMO" type="number" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <EconomicsField label="Variazione d'Asta (%)" name="VBA" type="number" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <EconomicsField label="Importo Variazione d'Asta" name="VAI" readOnly />
                        <EconomicsField label="TOTALE LAVORI AFFIDATI" name="TLA" readOnly />
                    </Grid>
                </Grid>

                <Typography variant="h5" gutterBottom mt={1}>
                    B) SOMME A DISPOSIZIONE
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <EconomicsField label="Somme a Disposizione" name="SAD" type="number" />
                    </Grid>
                </Grid>

                <Typography variant="h5" gutterBottom mt={1}>
                    C) TOTALE PROGETTO (A + B)
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <FormLabel sx={{ minWidth: '200px' }}>Classificazione TTP</FormLabel>
                        <FormControl fullWidth>
                            <Select
                                name="TTP"
                                value={economics.TTP || ''}
                                onChange={handleChange}
                            >
                                <MenuItem value={1}>LAVORI A BASE D'ASTA</MenuItem>
                                <MenuItem value={2}>LAVORI AFFIDATI</MenuItem>
                                <MenuItem value={3}>LAVORI AFFIDATI + SOMME A DISPOSIZIONE</MenuItem>
                                <MenuItem value={4}>LAVORI A BASE D'ASTA + SOMME A DISPOSIZIONE</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}></Grid>
                    <Grid item xs={12} md={3}>
                        <EconomicsField label="TOTALE PROGETTO" name="CTP" readOnly />
                    </Grid>
                </Grid>
            </Box>
        </Stack>
    );
};

EconomicsForm.propTypes = {
    projectData: PropTypes.shape({
        economics: PropTypes.object.isRequired,
    }).isRequired,
    setProjectData: PropTypes.func.isRequired,
    handleNext: PropTypes.func.isRequired,
    handleBack: PropTypes.func.isRequired,
};

export default EconomicsForm;
