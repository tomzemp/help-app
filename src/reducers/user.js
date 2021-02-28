export const RECEIVED_USER = 'RECEIVED_USER'

export const DEFAULT_STATE_USER = {
    id: '',
    isSuperuser: false,
    name: '',
    organistionUnits: [],
}

export default (state = DEFAULT_STATE_USER, action) => {
    switch (action.type) {
        case RECEIVED_USER: {
            return parseUser(action.value)
        }
        default:
            return state
    }
}

const parseUser = obj => {
    return {
        id: obj.id,
        isSuperuser: checkIsSuperuser(
            obj.userCredentials?.userRoles,
            obj?.authorities
        ),
        name: obj.name,
        orgUnit: obj.organisationUnits,
    }
}

const checkIsSuperuser = (userRoles, authorities) => {
    if (userRoles === undefined) return null
    // uses relaxed standard to let user with Superuser to have access
    // better alternative is to check that all authorities is present
    if (authorities.indexOf('ALL') >= 0) {
        return true
    }
    return userRoles.filter(o => o.name === 'Superuser').length >= 1
}

// selectors

export const selGetUserId = state => state.user.id
export const selGetUserIsSuperuser = state => state.user.isSuperuser
export const selGetUserName = state => state.user.name
export const selGetUserOrgUnit = state => state.user.orgUnit
