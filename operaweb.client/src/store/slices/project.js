// third-party
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../index';

const initialState = {
    error: null,
    currentImportedProject: null,
    currentProject: null,
    currentProjectId: null
};

const slice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // SET IMPORTED PROJECT
        setImportedProjectSuccess(state, action) {
            state.currentImportedProject = action.payload;
        },

        // CLEAR IMPORTED PROJECT
        clearImportedProjectSuccess(state) {
            state.currentImportedProject = null;
        },

        // SET CURRENT PROJECT
        setCurrentProjectSuccess(state, action) {
            state.currentProject = action.payload;
        },

        // SET CURRENT PROJECT ID
        setCurrentProjectIdSuccess(state, action) {
            state.currentProjectId = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ⬇️ Redux Thunks

// Imposta il progetto importato
export function setImportedProject(project) {
    return async () => {
        try {
            dispatch(slice.actions.setImportedProjectSuccess(project));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

// Cancella il progetto importato
export function clearImportedProject() {
    return async () => {
        try {
            dispatch(slice.actions.clearImportedProjectSuccess());
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

// Imposta il progetto corrente
export function setCurrentProject(project) {
    return async () => {
        try {
            dispatch(slice.actions.setCurrentProjectSuccess(project));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

// Imposta l'ID del progetto corrente
export function setCurrentProjectId(projectId) {
    return async () => {
        try {
            dispatch(slice.actions.setCurrentProjectIdSuccess(projectId));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
