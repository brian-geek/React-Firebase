import { Expert_avatar, Learning_avatar} from '../const'
import { LOGIN, LOGOUT, SET_PORTAL_TYPE, SETPROFILEPICTURE } from '../actions'
const defaultProfilePicture = {
    uri: Learning_avatar
}

export default(profilePicture=defaultProfilePicture, action) => {
    switch (action.type) {
        case LOGIN: {
            const { portalType, photoURL } = action.payload
            if (photoURL === null || photoURL === undefined || photoURL.length === 0) {
                switch (portalType) {
                    case 'Expert':
                        return {uri: Expert_avatar}
                    default:
                        break
                }
                return defaultProfilePicture
            }
            return {
                uri: photoURL
            }
        }
        case LOGOUT: {
            return defaultProfilePicture
        }
        case SET_PORTAL_TYPE: {
            const portalType = action.payload
            switch (portalType) {
                case 'Expert':
                    return {uri: Expert_avatar}
                default:
                    break
            }
            return defaultProfilePicture
        }
        case SETPROFILEPICTURE: {
            const url = action.payload
            return {
                uri: url
            }
        }
        default:
            break
    }
    return profilePicture
}