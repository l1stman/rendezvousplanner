import { DELETE_PROFILE, UPDATE_PROFILE } from '../actions';

const initialState = {
    profile: {},
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: action.payload,
            };
        case DELETE_PROFILE:
            return {
                ...state,
                profile: {},
            }
        default:
            return state;
    }
};

export default reducer;