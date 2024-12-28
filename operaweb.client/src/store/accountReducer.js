import { LOGIN, LOGOUT, REGISTER } from './actions';

const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null, // Stato utente centralizzato
    error: null // Per gestire eventuali errori
};

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER: {
            const { user } = action.payload || {};
            return {
                ...state,
                user
            };
        }
        case LOGIN: {
            const  user = action.payload.user || {};
            return {
                ...state,
                isLoggedIn: true,
                isInitialized: true,
                user 
            };
        }
        case LOGOUT: {
            return {
                ...state,
                isInitialized: true,
                isLoggedIn: false,
                user: null
            };
        }
        case 'SET_ERROR': {
            return {
                ...state,
                error: action.payload
            };
        }
        default: {
            return state;
        }
    }
};

export default accountReducer;
