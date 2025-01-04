import React, { useEffect, useState } from 'react';
import { getOrganizationStructure, getOrganizationAvailableRoles, addMember, getUserOrganizationDetails } from 'api/organization';
import Tree from 'react-d3-tree';
import {
    Card,
    CardContent,
    Typography,
    Box,
    TextField,
    Button,
    Snackbar,
    Alert,
    MenuItem,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Avatar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const OrganizationPage = () => {
    const [organizationDetails, setOrganizationDetails] = useState(null);
    const [roles, setRoles] = useState([]);
    const [organizationId, setOrganizationId] = useState('');
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [dialogOpen, setDialogOpen] = useState(false);
    const [memberDialogOpen, setMemberDialogOpen] = useState(false);
    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        roleName: ''
    });

    useEffect(() => {
        // fetchOrganizationStructure();
        fetchAvailableRoles();
        fetchOrganizationDetails();
    }, []);

    const fetchOrganizationStructure = async () => {
        try {
            setLoading(true);
            const data = await getOrganizationStructure();

            if (!data || data.length === 0) throw new Error("Empty structure");

            const findOrganizationId = (node) => {
                if (node.roleName.toLowerCase() === 'organization' && node.members.length > 0) {
                    return node.members[0].userId;
                }
                for (const child of node.children || []) {
                    const id = findOrganizationId(child);
                    if (id) return id;
                }
                return null;
            };

            const rootOrganizationId = findOrganizationId(data[0]);
            setOrganizationId(rootOrganizationId);

            setOrganizationData(data);
        } catch (error) {
            setSnackbar({ open: true, message: 'Failed to load organization structure.', severity: 'error' });
            setOrganizationData(null);
        } finally {
            setLoading(false);
        }
    };

    const fetchAvailableRoles = async () => {
        try {
            const data = await getOrganizationAvailableRoles();
            setRoles(data);
        } catch (error) {
            setSnackbar({ open: true, message: 'Failed to load roles.', severity: 'error' });
        }
    };

    const fetchOrganizationDetails = async () => {
        try {
            const response = await getUserOrganizationDetails();
            setOrganizationDetails({
                id: response.organizationId,
                name: response.organizationName,
            });
            // Mapping dei valori numerici di status a stringhe testuali
            const mappedData = response.members.map(member => ({
                ...member,
                status:
                    member.status === 0 ? 'Richiesta inviata' :
                        member.status === 1 ? 'Attivo' :
                            member.status === 2 ? 'Inattivo' :
                                'Sconosciuto' // Default se lo stato non è 0, 1 o 2
            }));

            setMembers(mappedData);
            setLoading(false);
        } catch (error) {
            setSnackbar({ open: true, message: 'Failed to load organization members.', severity: 'error' });
        }
    };



    const handleAddMember = async () => {
        if (!formData.name || !formData.lastName || !formData.email || !formData.roleName) {
            setSnackbar({ open: true, message: 'Please fill all fields.', severity: 'error' });
            return;
        }

        const payload = {
            organizationId: organizationDetails.id,
            name: formData.name, 
            lastName: formData.lastName,
            email: formData.email,
            roleName: formData.roleName
        };

        try {
            await addMember(payload);
            setSnackbar({ open: true, message: 'Member added successfully! Password sent via email.', severity: 'success' });
            fetchOrganizationStructure();
            fetchOrganizationDetails();
            setFormData({ name: '', lastName: '', email: '', roleName: '' }); // Reset stato
            setDialogOpen(false);
        } catch (error) {
            setSnackbar({ open: true, message: 'Failed to add member.', severity: 'error' });
        }
    };


    const handleViewMember = (member) => {
        setSelectedMember(member);
        setMemberDialogOpen(true);
    };

    return (loading ? <Box>Caricamento dati...</Box> :
        <Card>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>                <Typography variant="h2">{organizationDetails.name}</Typography></Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
    
                    <Typography variant="h3">Membri dell'organizzazione</Typography>
                    <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
                        Aggiungi nuovo membro
                    </Button>
                </Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Ruolo</TableCell>
                                <TableCell>Stato</TableCell>
                                <TableCell>Azioni</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {members.map((member) => (
                                <TableRow key={member.id}>
                                    <TableCell>{`${member.name} ${member.lastName}`}</TableCell>
                                    <TableCell>{member.email}</TableCell>
                                    <TableCell>{member.roleName || 'N/A'}</TableCell>
                                    <TableCell>
                                        <Box
                                            style={{
                                                display: 'inline-block',
                                                padding: '4px 8px',
                                                borderRadius: '8px',
                                                color: '#fff',
                                                backgroundColor:
                                                    member.status === 'Attivo' ? 'green' :
                                                        member.status === 'Richiesta inviata' ? 'orange' :
                                                            'gray'
                                            }}
                                        >
                                            {member.status}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleViewMember(member)}>
                                            <SearchIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>

                </TableContainer>
                {/*{loading ? (*/}
                {/*    <CircularProgress />*/}
                {/*) : organizationData ? (*/}
                {/*    <Box style={{ width: '100%', height: '500px' }}>*/}
                {/*        <Tree*/}
                {/*            data={organizationData}*/}
                {/*            orientation="vertical"*/}
                {/*            translate={{ x: 300, y: 50 }}*/}
                {/*            nodeSize={{ x: 200, y: 100 }}*/}
                {/*            renderCustomNodeElement={({ nodeDatum }) => (*/}
                {/*                <g>*/}
                {/*                    <foreignObject x="-75" y="-50" width="150" height="100">*/}
                {/*                        <Box*/}
                {/*                            sx={{*/}
                {/*                                display: 'flex',*/}
                {/*                                flexDirection: 'column',*/}
                {/*                                alignItems: 'center',*/}
                {/*                                justifyContent: 'center',*/}
                {/*                                border: '1px solid #ccc',*/}
                {/*                                borderRadius: '8px',*/}
                {/*                                padding: '8px',*/}
                {/*                                backgroundColor: '#fff',*/}
                {/*                                boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',*/}
                {/*                                textAlign: 'center'*/}
                {/*                            }}*/}
                {/*                        >*/}
                {/*                            <Typography variant="subtitle2" fontWeight="bold">*/}
                {/*                                {nodeDatum.roleName}*/}
                {/*                            </Typography>*/}
                {/*                            <Typography variant="body2">*/}
                {/*                                {nodeDatum.members?.[0]?.fullName || 'No Members'}*/}
                {/*                            </Typography>*/}
                {/*                            <Typography variant="caption">*/}
                {/*                                {nodeDatum.members?.[0]?.email}*/}
                {/*                            </Typography>*/}
                {/*                        </Box>*/}
                {/*                    </foreignObject>*/}
                {/*                </g>*/}
                {/*            )}*/}
                {/*        />*/}
                {/*    </Box>*/}
                {/*) : (*/}
                {/*    <Typography color="error">Impossibile mostrare struttura</Typography>*/}
                {/*)}*/}
          
            </CardContent>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Aggiungi Nuovo Membro</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nome"
                        fullWidth
                        value={formData.name} // Cambiato da formData.fullName
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        label="Cognome"
                        fullWidth
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        select
                        label="Ruolo"
                        fullWidth
                        value={formData.roleName}
                        onChange={(e) => setFormData({ ...formData, roleName: e.target.value })}
                        margin="dense"
                    >
                        <MenuItem value="">Seleziona Ruolo</MenuItem>
                        {roles.map((role) => (
                            <MenuItem key={role.name} value={role.name}>
                                {role.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} color="secondary">
                        Annulla
                    </Button>
                    <Button onClick={handleAddMember} color="primary" variant="contained">
                        Aggiungi
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={memberDialogOpen} onClose={() => setMemberDialogOpen(false)}>
                <DialogTitle>Dettagli Membro</DialogTitle>
                <DialogContent>
                    {selectedMember && (
                        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                            <Avatar sx={{ width: 80, height: 80, mb: 2 }} />
                            <Typography variant="h6">{`${selectedMember.name} ${selectedMember.lastName}`}</Typography> {/* Nome e cognome */}
                            <Typography variant="body1">Email: {selectedMember.email}</Typography>
                            <Typography variant="body1">Ruolo: {selectedMember.roleName}</Typography>
                            <Typography variant="body1">Telefono: {selectedMember.phoneNumber || 'N/A'}</Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setMemberDialogOpen(false)} color="primary">Chiudi</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
            </Snackbar>
        </Card>
    );
};

export default OrganizationPage;
