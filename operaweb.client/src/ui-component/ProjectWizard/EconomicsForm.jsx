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

    const [economics, setEconomics] = useState(() => ({
        MeasuredWorks: 0,
        LumpSumWorks: 0,
        SafetyCosts: 0,
        LaborCosts: 0,
        AuctionVariationPercentage: 0,
        AvailableSums: 0,
        TotalProjectCalculationType: 1, // Valore predefinito
        ...projectData.economics, // Sovrascrive con i valori forniti da projectData
    }));

    const activeFieldRef = useRef(null);

    useEffect(() => {
        calculateFields();
    }, [
        economics.MeasuredWorks,
        economics.LumpSumWorks,
        economics.SafetyCosts,
        economics.LaborCosts,
        economics.AuctionVariationPercentage,
        economics.AvailableSums,
        economics.TotalProjectCalculationType
    ]);

    const calculateFields = () => {
        const {
            MeasuredWorks = 0,
            LumpSumWorks = 0,
            SafetyCosts = 0,
            LaborCosts = 0,
            AuctionVariationPercentage = 0,
            AvailableSums = 0,
            TotalProjectCalculationType = 1,
        } = economics;

        const BaseBidAmount =
            parseFloat(MeasuredWorks) +
            parseFloat(LumpSumWorks) +
            parseFloat(SafetyCosts) +
            parseFloat(LaborCosts);
        const AuctionVariationAmount =
            BaseBidAmount * (parseFloat(AuctionVariationPercentage) / 100);
        const TotalAssignedWorks = BaseBidAmount + AuctionVariationAmount;

        let TotalProjectAmount = 0;
        switch (parseInt(TotalProjectCalculationType, 10)) {
            case 1:
                TotalProjectAmount = BaseBidAmount;
                break;
            case 2:
                TotalProjectAmount = TotalAssignedWorks;
                break;
            case 3:
                TotalProjectAmount = TotalAssignedWorks + parseFloat(AvailableSums);
                break;
            case 4:
                TotalProjectAmount = BaseBidAmount + parseFloat(AvailableSums);
                break;
            default:
                TotalProjectAmount = 0;
        }

        setEconomics((prevState) => ({
            ...prevState,
            BaseBidAmount: BaseBidAmount.toFixed(2),
            AuctionVariationAmount: AuctionVariationAmount.toFixed(2),
            TotalAssignedWorks: TotalAssignedWorks.toFixed(2),
            TotalProjectAmount: TotalProjectAmount.toFixed(2),
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
                        <EconomicsField label="Lavori a Misura" name="MeasuredWorks" type="number" />
                        <EconomicsField label="Lavori a Corpo" name="LumpSumWorks" type="number" />
                        <EconomicsField label="Lavori a Base d'Asta" name="BaseBidAmount" readOnly />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <EconomicsField label="Costi della Sicurezza" name="SafetyCosts" type="number" />
                        <EconomicsField label="Costi della Manodopera" name="LaborCosts" type="number" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <EconomicsField label="Variazione d'Asta (%)" name="AuctionVariationPercentage" type="number" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <EconomicsField label="Importo Variazione d'Asta" name="AuctionVariationAmount" readOnly />
                        <EconomicsField label="Totale Lavori Affidati" name="TotalAssignedWorks" readOnly />
                    </Grid>
                </Grid>

                <Typography variant="h5" gutterBottom mt={1}>
                    B) Somme a Disposizione
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <EconomicsField label="Somme a Disposizione" name="AvailableSums" type="number" />
                    </Grid>
                </Grid>

                <Typography variant="h5" gutterBottom mt={1}>
                    C) Totale Progetto (A + B)
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <Select
                                name="TotalProjectCalculationType"
                                value={economics.TotalProjectCalculationType || ''}
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
                        <EconomicsField label="Totale Progetto" name="TotalProjectAmount" readOnly />
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
