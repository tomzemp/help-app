import { combineReducers } from 'redux'
import addDelete from './addDelete'
import appInfo from './appInfo'
import contactHelpDesk from './contactHelpDesk'
import selected from './selected'
import settingsEdit from './settingsEdit'
import topics from './topics'
import user from './user'

export default combineReducers({
    addDelete,
    appInfo,
    contactHelpDesk,
    selected,
    settingsEdit,
    topics,
    user,
})
