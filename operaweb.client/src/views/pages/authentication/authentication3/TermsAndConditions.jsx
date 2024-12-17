import React from 'react';
import { Box, Typography, Container, Card, CardContent, Divider, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import Logo from 'ui-component/Logo';

const TermsAndConditions = () => {
    return (
        <AuthWrapper1>
            <Container
                maxWidth="md"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    textAlign: 'justify',
                    padding: 3,
                }}
            >
                <AuthCardWrapper>
                    <Card>
                        <CardContent>
                            {/* Logo */}
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                                <Logo />
                            </Box>

                            {/* Titolo */}
                            <Typography variant="h4" align="center" gutterBottom color="primary.main">
                                Termini e Condizioni
                            </Typography>
                            <Divider sx={{ mb: 2 }} />

                            {/* Contenuto */}
                            <Typography variant="body1" paragraph>
                                Benvenuto su <strong>OperaWeb</strong>. Questi termini e condizioni stabiliscono le regole e i regolamenti per l'utilizzo
                                dei servizi e del sito web di OperaWeb.
                            </Typography>

                            <Typography variant="body1" paragraph>
                                Accedendo a questo sito web, assumiamo che tu accetti questi termini e condizioni. Non continuare a utilizzare OperaWeb se
                                non sei d'accordo con tutti i termini e le condizioni indicati in questa pagina.
                            </Typography>

                            <Typography variant="h6" sx={{ mt: 2 }}>
                                1. Licenza
                            </Typography>
                            <Typography variant="body2" paragraph>
                                Se non diversamente specificato, OperaWeb e/o i suoi licenziatari detengono i diritti di proprietà intellettuale per tutti i
                                materiali presenti su OperaWeb. Tutti i diritti di proprietà intellettuale sono riservati. È possibile accedere ai materiali
                                di OperaWeb per uso personale, soggetto alle restrizioni stabilite in questi termini e condizioni.
                            </Typography>

                            <Typography variant="h6" sx={{ mt: 2 }}>
                                2. Restrizioni
                            </Typography>
                            <Typography variant="body2" paragraph>
                                Non ti è consentito:
                            </Typography>
                            <ul>
                                <li>Ripubblicare materiale presente su questo sito web</li>
                                <li>Vendere, concedere in sublicenza o commercializzare materiale del sito web</li>
                                <li>Mostrare pubblicamente materiale del sito web</li>
                                <li>Utilizzare questo sito web in modo dannoso o illecito</li>
                            </ul>

                            <Typography variant="h6" sx={{ mt: 2 }}>
                                3. Limitazione di responsabilità
                            </Typography>
                            <Typography variant="body2" paragraph>
                                In nessun caso OperaWeb, né alcuno dei suoi amministratori, dipendenti o collaboratori, sarà ritenuto responsabile per danni
                                derivanti dall'uso di questo sito web.
                            </Typography>

                            <Typography variant="h6" sx={{ mt: 2 }}>
                                4. Modifiche ai termini
                            </Typography>
                            <Typography variant="body2" paragraph>
                                OperaWeb si riserva il diritto di modificare questi termini e condizioni in qualsiasi momento. L'uso continuato del sito web
                                dopo eventuali modifiche costituirà accettazione delle stesse.
                            </Typography>

                            <Divider sx={{ my: 2 }} />

                            {/* Footer */}
                            <Box sx={{ textAlign: 'center', mt: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Per ulteriori informazioni, contattaci all'indirizzo{' '}
                                    <Link to="/contact" style={{ textDecoration: 'none', color: '#1976D2' }}>
                                        support@operaweb.com
                                    </Link>
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 2 }}
                                    component={Link}
                                    to="/"
                                >
                                    Torna alla Home
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </AuthCardWrapper>
            </Container>
        </AuthWrapper1>
    );
};

export default TermsAndConditions;
