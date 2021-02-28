export const SET_CONTACT_HELP_OPEN = 'SET_CONTACT_HELP_OPEN'
export const SET_CONTACT_HELP_CLOSED = 'SET_CONTACT_HELP_CLOSED'

export default (state = false, action) => {
    switch (action.type) {
        case SET_CONTACT_HELP_OPEN: {
            return true
        }
        case SET_CONTACT_HELP_CLOSED: {
            return false
        }
        default:
            return state
    }
}

export const selGetContactHelpOpen = state => state.contactHelpDesk
