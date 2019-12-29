
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SET_PORTAL_TYPE = "SET_PORTAL_TYPE";
export const RESET_PORTAL_TYPE = "RESET_PORTAL_TYPE";
export const DONEONBOARDING = 'DONEONBOARDING'
export const SETPROFILEPICTURE = 'SETPROFILEPICTURE'
export const SETPROFILE = 'SETPROFILE'

export function setPortalType(portalType) {
    return {
        type: SET_PORTAL_TYPE,
        payload: portalType
    }
};

export function login(email, uid, photoURL, portalType) {
    return {
        type: LOGIN,
        payload: {
            email,
            uid,
            portalType,
            photoURL,
        }
    }
}

export function setProfile(userName, firstName, lastName, companyName, grade, homeTown, bio, skypeUsername) {
    return {
        type: SETPROFILE,
        payload: {
            userName:userName?userName:lastName?firstName+' '+lastName:firstName,
            firstName:firstName?firstName:'',
            lastName:lastName?lastName:'',
            companyName:companyName?companyName:'',
            grade:grade?grade:'',
            homeTown:homeTown?homeTown:'',
            bio:bio?bio:'',
            skypeUsername:skypeUsername?skypeUsername:'',
        }
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}

export function setPortal(payload) {
    return {
        type: SET_PORTAL_TYPE,
        payload
    };
};

export function resetPortal(payload) {
    return {
        type: RESET_PORTAL_TYPE,
        payload
    };
}

export function doneOnboarding() {
    return {
        type: DONEONBOARDING
    }
}

export function setProfilePricture(url) {
    return {
        type: SETPROFILEPICTURE,
        payload: url
    }
}
