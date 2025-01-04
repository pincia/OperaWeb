import PropTypes from 'prop-types';
import React, { createContext, useEffect, useReducer } from 'react';

// third-party
import { Chance } from 'chance';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
// reducer - state management
import { LOGIN, LOGOUT, REGISTER } from 'store/actions';
import accountReducer from 'store/accountReducer';
import { store, dispatch } from 'store';
// project imports
import Loader from 'ui-component/Loader';
import axios from 'utils/axios';
const chance = new Chance();

// constant
const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

const verifyToken = (serviceToken) => {
    if (!serviceToken) {
        return false;
    }
    const decoded = jwtDecode(serviceToken);
    return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken) => {
    if (serviceToken) {
        localStorage.setItem('serviceToken', serviceToken);
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
    } else {
        localStorage.removeItem('serviceToken');
        delete axios.defaults.headers.common.Authorization;
    }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
    const state = useSelector((state) => state.account); // Usa lo stato Redux

    useEffect(() => {
        const init = async () => {
            try {
                const serviceToken = window.localStorage.getItem('serviceToken');
                if (serviceToken && verifyToken(serviceToken)) {
                    setSession(serviceToken);
                    const response = await axios.get('/api/user/me');
                    const user  = response.data.data;
                    dispatch({
                        type: LOGIN,
                        payload: {
                            isLoggedIn: true,
                            user
                        }
                    });
                } else {
                    dispatch({
                        type: LOGOUT
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: LOGOUT
                });
            }
        };

        init();
    }, []);

    const login = async (email, password) => {
        const response = await axios.post('/api/user/login', { email, password });
        if (response.data.isSucceed) {
            const { accessToken, user } = response.data.data;
            setSession(accessToken);
            dispatch({
                type: LOGIN,
                payload: {
                    isLoggedIn: true,
                    user
                }
            });
        }
        return response;
    };

    const register = async (email, password, firstName, lastName, figure, companyName, vatOrTaxCode) => {
        const id = chance.bb_pin(); // Genera un ID unico (modifica se necessario)
        const response = await axios.post('/api/user/register', {
            id,
            email,
            password,
            firstName,
            lastName,
            figure,
            companyName, 
            vatOrTaxCode 
        });

        if (response.data.isSucceed) {
            const { accessToken, user } = response.data.data;
            setSession(accessToken);
            dispatch({
                type: REGISTER,
                payload: {
                    isLoggedIn: false,
                    user
                }
            });
        } else {
            throw new Error(JSON.stringify(Object.values(response.data.messages)));
        }
    };


    const logout = async  () => {
        const response = await axios.post('/api/user/logout');
        if (response.data.isSucceed) {
            setSession(null);
            dispatch({ type: LOGOUT });
        }       
        return response;
    };

    const resetPassword = async (email) => {
        console.log(email); // Implementa questa funzione se necessario
    };

    // Aggiunta della nuova API per il cambio password
    const changePassword = async (oldPassword, newPassword) => {
        const data = {
            oldPassword: oldPassword,
            newPassword: newPassword
        };

        try {
            // Assicurati che l'endpoint corrisponda al controller
            const response = await axios.post('/api/user/ChangePassword/change-password', data);
            setSession(null);
            return response.data; // Ritorna i dati di successo
        } catch (error) {
            // Stampa l'intero errore per debugging
            console.error('Change Password Error:', error.response?.data || error.message);
            throw error; // Può essere rilanciato per essere gestito altrove
        }
    };


    const updateProfile = () => { };

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, changePassword, updateProfile }}>
            {children}
        </JWTContext.Provider>
    );
};

JWTProvider.propTypes = {
    children: PropTypes.node
};

export default JWTContext;
