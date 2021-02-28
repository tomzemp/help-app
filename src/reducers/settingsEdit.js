export const CLEAR_EDIT_SETTINGS = 'CLEAR_EDIT_SETTINGS'
export const RECEIVE_EDIT_SETTINGS = 'RECEIVE_EDIT_SETTINGS'
export const UPDATE_TITLE = 'UPDATE_TITLE'
export const TOGGLE_ALLOW_MESSAGES = 'TOGGLE_ALLOW_MESSAGES'
export const REORDER_TOPICS_EDIT = 'REORDER_TOPICS_EDIT'
export const TURN_OFF_EDIT_SETTINGS = 'TURN_OFF_EDIT_SETTINGS'
export const ADD_TOPIC_TO_SUMMARY_EDIT = 'ADD_TOPIC_TO_SUMMARY_EDIT'

export const DEFAULT_STATE = {
    editingSettings: false,
    title: '',
    topics: [],
    allowMessages: true,
    helpDeskSubjects: [],
}

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case RECEIVE_EDIT_SETTINGS:
            return Object.assign({}, state, action.value, {
                editingSettings: true,
            })
        case CLEAR_EDIT_SETTINGS:
            return DEFAULT_STATE
        case UPDATE_TITLE:
            return Object.assign({}, state, { title: action.value })
        case REORDER_TOPICS_EDIT:
            return Object.assign({}, state, { topics: action.value })
        case TOGGLE_ALLOW_MESSAGES:
            return Object.assign({}, state, { allowMessages: action.value })
        case TURN_OFF_EDIT_SETTINGS:
            return Object.assign({}, state, { editingSettings: false })
        case ADD_TOPIC_TO_SUMMARY_EDIT:
            return Object.assign({}, state, { topics: action.value })
        default:
            return state
    }
}

// selectors

export const selGetSettingsEdit = state => state.settingsEdit
export const selGetTitle = state => state.settingsEdit.title
export const selGetTopicsEdit = state => state.settingsEdit.topics
export const selGetAllowMessages = state => state.settingsEdit.allowMessages
export const selGetEditingSettingsStatus = state =>
    state.settingsEdit.editingSettings
