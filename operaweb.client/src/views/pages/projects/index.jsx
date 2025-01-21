import React, { useState, useEffect } from "react";
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
    Chip,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { getProjects, getDeletedProjects } from "api/projects";
import { useDispatch } from "react-redux";
import { setCurrentProjectId } from "store/slices/project";
import TrashComponent from "./TrashComponent";

// Colori associati a ogni stato
const statusColors = {
    Creato: "blue",
    InProgress: "green",
    Sospeso: "orange",
    Completato: "purple",
    Cancellato: "red",
    PendingApproval: "yellow",
    Archiviato: "gray",
    Bozza: "lightgray",
};

// Styled Card Component
const StyledCard = styled(Card)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[1],
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    transition: "transform 0.2s",
    height: "400px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "&:hover": {
        transform: "scale(1.03)",
    },
}));

const TruncatedTypography = styled(Typography)(({ theme }) => ({
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
}));

const Projects = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState(0);
    const [projectsData, setProjectsData] = useState({ myProjects: [], involvedProjects: [] });
    const [deletedProjects, setDeletedProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const projectsPerPage = 10;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProjects = async () => {
            setIsLoading(true);
            try {
                const response = await getProjects();
                setProjectsData(response.data);
            } catch (err) {
                console.error("Error fetching projects:", err);
                setError("Failed to load projects. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        const fetchDeletedProjects = async () => {
            try {
                const response = await getDeletedProjects();
                setDeletedProjects(response.data || []);
            } catch (err) {
                console.error("Error fetching deleted projects:", err);
            }
        };

        fetchProjects();
        fetchDeletedProjects();
    }, []);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        setPage(1);
    };

    const currentProjects =
        activeTab === 0
            ? projectsData.myProjects
            : activeTab === 1
                ? projectsData.involvedProjects
                : [];

    const filteredProjects = currentProjects?.filter((project) =>
        project.works.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const displayedProjects = filteredProjects?.slice(
        (page - 1) * projectsPerPage,
        page * projectsPerPage
    );

    const handleOpenProject = (id) => {
        dispatch(setCurrentProjectId(id));
        navigate(`/project`);
    };


    const getStatusLabel = (status) => {
        const keys = Object.keys(statusColors);
        return keys[status] || "Unknown";
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
                <Tab label="I Tuoi Progetti" />
                <Tab label="Progetti In cui sei coinvolto" />
                <Tab label="Cestino" />
            </Tabs>

            {activeTab !== 2 && (
                <>
                    <TextField
                        label="Search Projects"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <Grid container spacing={3}>
                        {displayedProjects?.map((project) => (
                            <Grid item xs = { 12} sm = { 6} md = { 4} key = { project.id } >
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
                                    <Typography color="textSecondary">
                                        <b>Ente/Comune:</b> {project.city || "N/A"}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        <b>Provincia:</b> {project.province || "N/A"}
                                    </Typography>
                                    <TruncatedTypography color="textSecondary">
                                        <b>Lavori:</b> {project.works || "No Title"}
                                    </TruncatedTypography>
                                    <Typography variant="body2" color="textSecondary">
                                        <b>Amount:</b> {project.totalAmount?.toLocaleString() || "0.00"}
                                    </Typography>
                                    <Typography sx={{ marginTop: '8px' }} variant="body2" color="textSecondary">
                                        <b>Stato:</b>{" "}
                                        <span
                                            style={{
                                                fontWeight: "bold",
                                                color: statusColors[getStatusLabel(project.status)],
                                            }}
                                        >
                                            {getStatusLabel(project.status)}
                                        </span>
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
                </>
            )}

            {activeTab === 2 && (
                <TrashComponent
                    deletedProjects={deletedProjects}
                    setDeletedProjects={setDeletedProjects}
                />
            )}
        </Box>
    );
};

export default Projects;
