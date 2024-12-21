import React, { useState, useEffect } from "react";
import axios from "axios";
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
    CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { getProjects } from 'api/projects';

const StyledCard = styled(Card)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[1],
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    transition: "transform 0.2s",
    height: "400px", // Altezza fissa per tutte le card
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "&:hover": {
        transform: "scale(1.03)",
    },
}));

const TruncatedTypography = styled(Typography)(({ theme }) => ({
    display: "-webkit-box",
    WebkitLineClamp: 3, // Limita a 3 righe
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
}));

const Projects = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState(0);
    const [projectsData, setProjectsData] = useState({ myProjects: [], involvedProjects: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const projectsPerPage = 10;

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data from API
        const fetchProjects = async () => {
            setIsLoading(true);
            try {
                const response = await getProjects();
                setProjectsData(response.data);
                setIsLoading(false);
            } catch (err) {
                console.error("Error fetching projects:", err);
                setError("Failed to load projects. Please try again later.");
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        setPage(1); // Reset to page 1 when changing tabs
    };

    const currentProjects = activeTab === 0 ? projectsData.myProjects : projectsData.involvedProjects;

    const filteredProjects = currentProjects.filter((project) =>
        project.works.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const displayedProjects = filteredProjects.slice(
        (page - 1) * projectsPerPage,
        page * projectsPerPage
    );

    const handleOpenProject = (id) => {
        navigate(`/project/${id}`);
    };

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    flexDirection: "column",
                }}
            >
                <Typography variant="h6" color="error" gutterBottom>
                    {error}
                </Typography>
                <Button variant="contained" onClick={() => window.location.reload()}>
                    Retry
                </Button>
            </Box>
        );
    }

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
                                    image="https://via.placeholder.com/150"
                                    alt="Project Logo"
                                />
                            </Box>
                            <CardContent>
                             
                                <Typography  color="textSecondary">
                                    <b>Ente/Comune:</b> {project.city || "N/A"}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <b>Provincia:</b> {project.province || "N/A"}
                                </Typography>
                                <TruncatedTypography color="textSecondary" >
                                    <b>Lavori:</b> {project.works || "No Title"}
                                </TruncatedTypography>
                                <Typography variant="body2" color="textSecondary">
                                    <b>Amonut:</b> {project.totalAmount?.toLocaleString() || "0.00"}
                                </Typography>
                            </CardContent>
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleOpenProject(project.id)}
                                >
                                    Apri progetto
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
