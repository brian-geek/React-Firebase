import { SETPROFILE, LOGOUT, DONEONBOARDING } from '../actions'

const initialState = {
    userName: '',
    firstName: '',
    lastName: '',
    companyName: '',
    grade: '',
    homeTown: '',
    bio: '',
    skypeUsername: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SETPROFILE: {
            const { userName, firstName, lastName, companyName, grade, homeTown, bio, skypeUsername } = action.payload;
            return {
                ...state,
                userName,
                firstName,
                lastName,
                companyName,
                grade,
                homeTown,
                bio,
                skypeUsername,
            }
        }
        case LOGOUT: {
            return {
                ...state,
                userName: '',
                firstName: '',
                lastName: '',
                companyName: '',
                grade: '',
                homeTown: '',
                bio:'',
                skypeUsername: '',
            }
        }
        default:
            return state
    }
}

