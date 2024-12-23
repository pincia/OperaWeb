import React, { useState } from "react";
import {
    Box,
    Typography,
    Grid,
    Button,
    TextField,
    Stack,
    Paper,
    IconButton,
    Collapse
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import AnimateButton from "ui-component/extended/AnimateButton";

const availableEconomics = [
   {
        id: "A",
        description: "A) LAVORI",
        children: [{
            id: "A1",
            description: "A1)IMPORTO DEI LAVORI A BASE DI GARA",
            children: [
                { id: "A1.1", description: "A1.1) Lavori a Misura" },
                { id: "A1.2", description: "A1.2) Lavori a Corpo" },
                { id: "A1.3", description: "A1.3) Lavori in Economia" },
            ],
        },
            {
                id: "A2",
                description: "A2 - ONERI COMPLESSIVI DELLA SICUREZZA",
                children: [
                    { id: "A2.1", description: "A2.1 - Oneri della sicurezza Ordinari" },
                    { id: "A2.2", description: "A2.2 - Oneri della sicurezza Speciali" },
                ],
            },
            {
                id: "A3",
                description: "A3 - COSTI COMPLESSIVI MANODOPERA",
                children: [
                    { id: "A3.1", description: "A3.1 - Lavori a Misura" },
                    { id: "A3.2", description: "A3.2 - Lavori a Corpo" },
                ],
            },
            {
                id: "A4",
                description: "A4 - IMPORTO DEI LAVORI DA APPALTARE",
                children: [],
            },
            {
                id: "A5",
                description: "A5 - OPERE A CORPO E MISURA - soggette a ribasso",
                children: [],
            }],
    },
    {
        id: "B",
        description: "SOMME A DISPOSIZIONE DELL'AMMINISTRAZIONE",
        children: [{
            id: "B1",
            description: "B1 - SOMME A DISPOSIZIONE DELL'AMMINISTRAZIONE",
            children: [
                { id: "B1.1", description: "B1.1 - Rilievi, accertamenti e indagini" },
                { id: "B1.2", description: "B1.2 - Imprevisti" },
                { id: "B1.3", description: "B1.3 - Acquisizione aree" },
            ],
        },
            {
                id: "B2",
                description: "B2 - OCCUPAZIONE AREE (da piano particellare)",
                children: [
                    { id: "B2.1", description: "B2.1 - Espropriazione terreni" },
                    { id: "B2.2", description: "B2.2 - Indennizzo conduttori e frutti pendenti" },
                ],
            },
            {
                id: "B3",
                description: "B3 - PREZZO CHIUSO (Art. 26 comma 4 legge quadro)",
                children: [],
            },
            {
                id: "B4",
                description: "B4 - SPESE TECNICHE",
                children: [
                    { id: "B4.1", description: "B4.1 - Progettazione" },
                    { id: "B4.2", description: "B4.2 - Direzione lavori" },
                    { id: "B4.3", description: "B4.3 - Contabilità" },
                    { id: "B4.4", description: "B4.4 - Coordinamento sicurezza" },
                    { id: "B4.5", description: "B4.5 - Frazionamenti" },
                    { id: "B4.6", description: "B4.6 - Calcoli cementi armati" },
                ],
            },
            {
                id: "B5",
                description: "B5 - ALTRE SPESE",
                children: [
                    { id: "B5.1", description: "B5.1 - Responsabile del Procedimento" },
                    { id: "B5.2", description: "B5.2 - Spese per Pubblicità" },
                    { id: "B5.3", description: "B5.3 - Analisi e Collaudi" },
                ],
            }],
    }
    ,
    {
        id: "C",
        description: "C - IMPORTO TOTALE DEL PROGETTO (A+B)",
        children: [],
    },
];

export default function EconomicsForm({ handleBack, handleNext, projectData, setProjectData }) {
    const [economics, setEconomics] = useState(projectData.economics || availableEconomics);
    const [expanded, setExpanded] = useState({});

    const toggleExpand = (id) => {
        setExpanded((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const addValueToNode = (id) => {
        const updateTree = (list) =>
            list.map((node) => {
                if (node.id === id && !node.value) {
                    return {
                        ...node,
                        value: { partial: 0, total: 0 },
                    };
                }
                if (node.children) {
                    return { ...node, children: updateTree(node.children) };
                }
                return node;
            });

        const updatedEconomics = updateTree(economics);
        setEconomics(updatedEconomics);
        setProjectData((prev) => ({
            ...prev,
            economics: updatedEconomics,
        }));
    };

    const handleValueChange = (id, field, value) => {
        const updateTree = (list) =>
            list.map((node) => {
                if (node.id === id && node.value) {
                    return {
                        ...node,
                        value: {
                            ...node.value,
                            [field]: value,
                        },
                    };
                }
                if (node.children) {
                    return { ...node, children: updateTree(node.children) };
                }
                return node;
            });

        const updatedEconomics = updateTree(economics);
        setEconomics(updatedEconomics);
        setProjectData((prev) => ({
            ...prev,
            economics: updatedEconomics,
        }));
    };

    const renderTree = (list) =>
        list.map((node) => (
            <Box key={node.id} sx={{ ml: 2, mb: 1 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#f9f9f9",
                        padding: "8px",
                        borderRadius: "4px",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton onClick={() => toggleExpand(node.id)}>
                            {expanded[node.id] ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                        <Typography>{node.description}</Typography>
                    </Box>
                    {(!node.value && (!node.children || node.children.length === 0)) && (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => addValueToNode(node.id)}
                        >
                            Aggiungi Valore
                        </Button>
                    )}
                </Box>
                <Collapse in={expanded[node.id]} timeout="auto" unmountOnExit>
                    <Box sx={{ ml: 4 }}>
                        {node.children && renderTree(node.children)}
                        {node.value && (
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                    alignItems: "center",
                                    marginTop: 1,
                                    padding: 2,
                                    backgroundColor: "#e3f2fd",
                                    borderRadius: 2,
                                }}
                            >
                                <TextField
                                    label="Parziale"
                                    type="number"
                                    value={node.value.partial}
                                    onChange={(e) =>
                                        handleValueChange(node.id, "partial", parseFloat(e.target.value) || 0)
                                    }
                                    size="small"
                                />
                                <TextField
                                    label="Totale"
                                    type="number"
                                    value={node.value.total}
                                    onChange={(e) =>
                                        handleValueChange(node.id, "total", parseFloat(e.target.value) || 0)
                                    }
                                    size="small"
                                />
                            </Box>
                        )}
                    </Box>
                </Collapse>
            </Box>
        ));

    const handleSubmit = () => {
        setProjectData((prev) => ({
            ...prev,
            economics,
        }));
        handleNext();
    };

    return (
        <>
            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Quadro Economico
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Gestisci il quadro economico aggiungendo o modificando le voci.
                </Typography>
                <Paper
                    elevation={3}
                    sx={{
                        maxHeight: "400px",
                        overflowY: "auto",
                        padding: 2,
                        borderRadius: 2,
                        marginTop: 2,
                    }}
                >
                    {renderTree(economics)}
                </Paper>
            </Box>
           
        </>
    );
}
