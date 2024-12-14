import React, { useState } from "react";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Pagination,
    TextField,
    Tabs,
    Tab,
    Box,
    Button,
    CardMedia,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[1],
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    transition: "transform 0.2s",
    "&:hover": {
        transform: "scale(1.03)",
    },
}));

const myProjects = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    ente: `Entity ${index + 1}`,
    comune: `City ${index + 1}`,
    provincia: `Province ${index % 5 + 1}`,
    object: `My Project ${String.fromCharCode(65 + (index % 26))}${index + 1}`,
    logo: "https://via.placeholder.com/150",
}));

const involvedProjects = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    ente: `Entity ${index + 16}`,
    comune: `City ${index + 16}`,
    provincia: `Province ${index % 5 + 1}`,
    object: `Involved Project ${String.fromCharCode(65 + (index % 26))}${index + 1}`,
    logo: "https://via.placeholder.com/150",
}));

const Projects = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState(0);
    const projectsPerPage = 10;

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        setPage(1); // Reset to page 1 when changing tabs
    };

    const currentProjects = activeTab === 0 ? myProjects : involvedProjects;

    const filteredProjects = currentProjects.filter((project) =>
        project.object.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const displayedProjects = filteredProjects.slice(
        (page - 1) * projectsPerPage,
        page * projectsPerPage
    );

    return (
        <Box sx={{ padding: 3, backgroundColor: "background.default" }}>
          
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                indicatorColor="secondary"
                textColor="secondary"
                sx={{ marginBottom: 2 }}
            >
                <Tab label="My Projects" />
                <Tab label="Involved Projects" />
            </Tabs>

            <TextField
                label="Search Projects"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Grid container spacing={3}>
                {displayedProjects.map((project) => (
                    <Grid item xs={12} sm={6} md={4} key={project.id}>
                        <StyledCard>
                            <Box sx={{ display: "flex", justifyContent: "center", paddingTop: 2 }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 150, height: 150 }}
                                    image={project.logo}
                                    alt="Project Logo"
                                />
                            </Box>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {project.object}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Ente/Comune: {project.ente}, {project.comune}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Provincia: {project.provincia}
                                </Typography>
                            </CardContent>
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button size="small" variant="contained" color="secondary">
                                    Apri
                                </Button>
                            </Box>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>

            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                sx={{ marginTop: 3, display: "flex", justifyContent: "center" }}
            />
        </Box>
    );
};

export default Projects;
