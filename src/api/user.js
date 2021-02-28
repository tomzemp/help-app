import { onError } from './index'

const userQuery = {
    user: {
        resource: 'me',
        params: {
            fields: [
                'id',
                'name',
                'organisationUnits',
                'userCredentials[userRoles[id,name]]',
                'authorities',
            ],
        },
    },
}

// get user on startup
export const apiFetchUser = async engine => {
    try {
        const { user } = await engine.query(userQuery)
        return user
    } catch (error) {
        onError(error)
    }
}
