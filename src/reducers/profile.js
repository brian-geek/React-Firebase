import { SETPROFILE, LOGOUT, DONEONBOARDING } from '../actions'

const initialState = {
    userName: '',
    firstName: '',
    lastName: '',
    companyName: '',
    grade: '',
    homeTown: '',
    aboutMe: '',
    skypeUsername: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SETPROFILE: {
            const { userName, firstName, lastName, companyName, grade, homeTown, aboutMe, skypeUsername } = action.payload;
            return {
                ...state,
                userName,
                firstName,
                lastName,
                companyName,
                grade,
                homeTown,
                aboutMe,
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
                aboutMe:'',
                skypeUsername: '',
            }
        }
        default:
            return state
    }
}

