import { apiFetchUser } from '../api/user'
import { RECEIVED_USER } from '../reducers/user'

export const actReceivedUser = value => ({
    type: RECEIVED_USER,
    value,
})

export const thuFetchUser = () => {
    return async (dispatch, getState, engine) => {
        const user = await apiFetchUser(engine)
        dispatch(actReceivedUser(user))
    }
}
