import { apiFetchAppInfo } from '../api/appInfo'
import { RECEIVED_APP_INFO, UNAVAILABLE_APP_INFO } from '../reducers/appInfo'

export const actReceivedAppInfo = value => ({
    type: RECEIVED_APP_INFO,
    value,
})

export const actUnavailableAppInfo = () => ({
    type: UNAVAILABLE_APP_INFO,
})

export const thuFetchAppInfo = () => {
    return async (dispatch, getState, engine) => {
        try {
            const appInfo = await apiFetchAppInfo(engine)
            dispatch(actReceivedAppInfo(appInfo))
        } catch (e) {
            dispatch(actUnavailableAppInfo)
        }
    }
}
