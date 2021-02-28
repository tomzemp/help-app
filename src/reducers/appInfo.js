export const RECEIVED_APP_INFO = 'RECEIVED_APP_INFO'
export const UNAVAILABLE_APP_INFO = 'UNAVAILABLE_APP_INFO'

export const DEFAULT_STATE_APP_INFO = {
    title: '',
    allowMessages: false,
    inaccessible: false,
    helpDeskSubjects: [],
}

export default (state = DEFAULT_STATE_APP_INFO, action) => {
    switch (action.type) {
        case RECEIVED_APP_INFO: {
            return parseAppInfo(action.value)
        }
        case UNAVAILABLE_APP_INFO: {
            return Object.assign({}, state, { inaccessible: true })
        }
        default:
            return state
    }
}

const parseAppInfo = obj => {
    return {
        title: obj.title,
        allowMessages: obj.allowMessages ?? false,
        helpDeskSubjects: obj.helpDeskSubjects ?? [],
        inaccessible: false,
    }
}

// selectors

export const selGetAppInfo = state => state.appInfo
export const selGetAppAllowMessages = state => state.appInfo.allowMessages
export const selGetAppHelpDeskSubjects = state => state.appInfo.helpDeskSubjects
export const selGetAppTitle = state => state.appInfo.title
