import { LOGIN, LOGOUT, SET_PORTAL_TYPE, DONEONBOARDING } from '../actions'

const initialState = {
    isLoggedIn: false,
    portalType: '',
    hasDoneOnboarding: false,
    email: '',
    uid: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            const {portalType, email, uid, name, companyName, grade, homeTown, aboutMe, skypeUsername } = action.payload;
            return {
                ...state,
                hasDoneOnboarding: state.hasDoneOnboarding,
                portalType,
                isLoggedIn: true,
                email,
                uid,
            }
        }
        case LOGOUT: {
            return {
                ...state,
                isLoggedIn: false,
                portalType: '',
                email: '',
                uid: '',
            }
        }
        case SET_PORTAL_TYPE: {
            return {
                ...state,
                portalType: action.payload,
            }
        }
        case DONEONBOARDING: {
            return {
                ...state,
                hasDoneOnboarding: true
            }
        }
        default:
            return state
    }
}

