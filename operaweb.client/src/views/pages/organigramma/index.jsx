import React, { useEffect, useState } from 'react';
import { getOrganizationStructure, getAvailableRoles, addMember } from 'api/organization';
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
} from '@mui/material';

const OrganizationPage = () => {
    const [organizationData, setOrganizationData] = useState(null);
    const [roles, setRoles] = useState([]);
    const [organizationId, setOrganizationId] = useState('');
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [dialogOpen, setDialogOpen] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        roleName: ''
    });

    useEffect(() => {
        fetchOrganizationStructure();
        fetchAvailableRoles();
    }, []);

    const fetchOrganizationStructure = async () => {
        try {
            setLoading(true);
            const data = await getOrganizationStructure();

            // Trova l'organizationId come UserId del primo nodo con ruolo "organization"
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
        } finally {
            setLoading(false);
        }
    };

    const fetchAvailableRoles = async () => {
        try {
            const data = await getAvailableRoles();
            setRoles(data);
        } catch (error) {
            setSnackbar({ open: true, message: 'Failed to load roles.', severity: 'error' });
        }
    };

    const handleAddMember = async () => {
        if (!formData.fullName || !formData.email || !formData.roleName) {
            setSnackbar({ open: true, message: 'Please fill all fields.', severity: 'error' });
            return;
        }

        const payload = {
            organizationId: organizationId, // L'ID dell'organizzazione calcolato
            fullName: formData.fullName,
            email: formData.email,
            roleName: formData.roleName
        };

        try {
            await addMember(payload);
            setSnackbar({ open: true, message: 'Member added successfully! Password sent via email.', severity: 'success' });
            fetchOrganizationStructure(); // Aggiorna l'organigramma
            setFormData({ fullName: '', email: '', roleName: '' }); // Reset del form
            setDialogOpen(false); // Chiudi il dialog
        } catch (error) {
            setSnackbar({ open: true, message: 'Failed to add member.', severity: 'error' });
        }
    };

    const renderCustomNode = ({ nodeDatum }) => {
        const member = nodeDatum.members?.[0]; // Prendi il primo membro del nodo

        return (
            <g>
                <foreignObject x="-75" y="-50" width="150" height="100">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '8px',
                            backgroundColor: '#fff',
                            boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
                            textAlign: 'center'
                        }}
                    >
                        <Typography variant="subtitle2" fontWeight="bold">
                            {nodeDatum.roleName}
                        </Typography>
                        <Typography variant="body2">{member?.fullName || 'No Members'}</Typography>
                        <Typography variant="caption">{member?.email}</Typography>
                    </Box>
                </foreignObject>
            </g>
        );
    };

    return (
        <Card>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h4">Organization Structure</Typography>
                    <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
                        Add New Member
                    </Button>
                </Box>

                {/* Albero Organizzativo */}
                {loading ? (
                    <CircularProgress />
                ) : (
                    <Box style={{ width: '100%', height: '500px' }}>
                        <Tree
                            data={organizationData}
                            orientation="vertical"
                            translate={{ x: 300, y: 50 }}
                            nodeSize={{ x: 200, y: 100 }}
                            renderCustomNodeElement={(props) => renderCustomNode(props)}
                        />
                    </Box>
                )}
            </CardContent>

            {/* Dialog per aggiungere membri */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Aggiungi Nuovo Membro</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" mb={2}>
                        Compila il modulo per aggiungere un nuovo membro all'organizzazione. Il membro riceverà un'email con una password temporanea per accedere al sistema.
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            label="Full Name"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            select
                            label="Role"
                            value={formData.roleName}
                            onChange={(e) => setFormData({ ...formData, roleName: e.target.value })}
                            fullWidth
                        >
                            <MenuItem value="">Select Role</MenuItem>
                            {roles.map((role) => (
                                <MenuItem key={role.name} value={role.name}>
                                    {role.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} color="secondary">Cancel</Button>
                    <Button onClick={handleAddMember} color="primary" variant="contained">Add Member</Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar per feedback */}
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
