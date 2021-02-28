import {
    SET_CONTACT_HELP_OPEN,
    SET_CONTACT_HELP_CLOSED,
} from '../reducers/contactHelpDesk'

export const actCloseHelpDeskMessage = () => ({
    type: SET_CONTACT_HELP_CLOSED,
})

export const actOpenHelpDeskMessage = () => ({
    type: SET_CONTACT_HELP_OPEN,
})
