// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project imports
import snackbarReducer from './slices/snackbar';
import customerReducer from './slices/customer';
import chatReducer from './slices/chat';
import calendarReducer from './slices/calendar';
import mailReducer from './slices/mail';
import cartReducer from './slices/cart';
import kanbanReducer from './slices/kanban';
import projectReducer from './slices/project';
import accountReducer from './accountReducer'; // Rimuovo `userReducer`

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    snackbar: snackbarReducer,
    cart: persistReducer(
        {
            key: 'cart',
            storage,
            keyPrefix: 'berry-'
        },
        cartReducer
    ),
    kanban: kanbanReducer,
    customer: customerReducer,
    chat: chatReducer,
    calendar: calendarReducer,
    mail: mailReducer,
    account: accountReducer, // Solo accountReducer gestisce lo stato utente
    project: projectReducer
});

export default reducer;
