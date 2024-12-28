// EconomicsForm.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, Grid, Typography, Box, MenuItem, Select, FormControl, InputLabel, Stack, Button } from '@mui/material';

const EconomicsForm = ({ handleNext, handleBack, projectData, setProjectData }) => {
    const [economics, setEconomics] = useState(projectData.economics || []);
    useEffect(() => {
        const calculateFields = () => {
            const { LMS, LCP, CSI, CMO, VBA, SAD, TTP } = economics;
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

            economics.LBA = LBA.toFixed(2);
            economics.VAI = VAI.toFixed(2);
            economics.TLA = TLA.toFixed(2);
            economics.CTP = CTP.toFixed(2);
        };

        calculateFields();
    }, [economics.LMS, economics.LCP, economics.CSI, economics.CMO, economics.VBA, economics.SAD, economics.TTP]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        economics[name] = value;
    };

    return (
        <Stack>
            <Box p={3}>
                <Typography variant="h5" gutterBottom>
                    Quadro Economico
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Gestione somme del progetto
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Lavori a Misura (LMS)"
                            name="LMS"
                            value={economics.LMS}
                            onChange={handleChange}
                            fullWidth
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Lavori a Corpo (LCP)"
                            name="LCP"
                            value={economics.LCP}
                            onChange={handleChange}
                            fullWidth
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Costi della Sicurezza (CSI)"
                            name="CSI"
                            value={economics.CSI}
                            onChange={handleChange}
                            fullWidth
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Costi della Manodopera (CMO)"
                            name="CMO"
                            value={economics.CMO}
                            onChange={handleChange}
                            fullWidth
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Variazione d'Asta (%) (VBA)"
                            name="VBA"
                            value={economics.VBA}
                            onChange={handleChange}
                            fullWidth
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Somme a Disposizione (SAD)"
                            name="SAD"
                            value={economics.SAD}
                            onChange={handleChange}
                            fullWidth
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="LAVORI A BASE D'ASTA (LBA)"
                            name="LBA"
                            value={economics.LBA}
                            fullWidth
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Importo Variazione d'Asta (VAI)"
                            name="VAI"
                            value={economics.VAI}
                            fullWidth
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="TOTALE LAVORI AFFIDATI (TLA)"
                            name="TLA"
                            value={economics.TLA}
                            fullWidth
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Classificazione TTP</InputLabel>
                            <Select
                                name="TTP"
                                value={economics.TTP}
                                onChange={handleChange}
                            >
                                <MenuItem value={1}>LAVORI A BASE D'ASTA</MenuItem>
                                <MenuItem value={2}>LAVORI AFFIDATI</MenuItem>
                                <MenuItem value={3}>LAVORI AFFIDATI + SOMME A DISPOSIZIONE</MenuItem>
                                <MenuItem value={4}>LAVORI A BASE D'ASTA + SOMME A DISPOSIZIONE</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="TOTALE PROGETTO (CTP)"
                            name="CTP"
                            value={economics.CTP}
                            fullWidth
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Stack>
    );
};

EconomicsForm.propTypes = {
    projectData: PropTypes.shape({
        economics: PropTypes.shape({
            LMS: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            LCP: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            CSI: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            CMO: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            VBA: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            SAD: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            TTP: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            LBA: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            VAI: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            TLA: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            CTP: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        }),
    }).isRequired,
    onBack: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
};

export default EconomicsForm;
