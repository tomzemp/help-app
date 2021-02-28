import { onError } from './index'

/* queries */
const uidQuery = {
    uidCodes: {
        resource: 'system/id',
        params: ({ limit }) => ({
            limit,
        }),
    },
}

// get user on startup
export const apiGetUID = async (engine, count) => {
    try {
        const { uidCodes } = await engine.query(uidQuery, {
            variables: { limit: count },
        })
        return uidCodes.codes
    } catch (error) {
        onError(error)
    }
}
