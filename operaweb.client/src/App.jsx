import { RouterProvider } from 'react-router-dom';

// routing
import router from 'routes';

// project imports
import Locales from 'ui-component/Locales';
import NavigationScroll from 'layout/NavigationScroll';
import RTLLayout from 'ui-component/RTLLayout';
import Snackbar from 'ui-component/extended/Snackbar';
import Notistack from 'ui-component/third-party/Notistack';
import { LoadScript } from '@react-google-maps/api';
import ThemeCustomization from 'themes';
// auth provider
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
// import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';
// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';
// import { Auth0Provider as AuthProvider } from 'contexts/Auth0Context';

// ==============================|| APP ||============================== //
const GOOGLE_API_KEY =
    import.meta.env?.VITE_GOOGLE_MAPS_API_KEY;



const App = () => {
    return (
        <LoadScript googleMapsApiKey={GOOGLE_API_KEY} libraries={['places']}>
            <ThemeCustomization>
                <RTLLayout>
                    <Locales>
                        <NavigationScroll>
                            <AuthProvider>
                                <>
                                    <Notistack>
                                        <RouterProvider router={router} />
                                        <Snackbar />
                                    </Notistack>
                                </>
                            </AuthProvider>
                        </NavigationScroll>
                    </Locales>
                </RTLLayout>
            </ThemeCustomization >
        </LoadScript>
    );
};

export default App;
