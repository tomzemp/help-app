import { actReceivedAppInfo } from '../actions/appInfo'
import { actReceiveTopics } from '../actions/topics'
import { apiUpdateAppInfo } from '../api/appInfo'
import { apiAddHelpTopicItem, apiUpdateSummary } from '../api/helpTopic'
import { apiGetUID } from '../api/utils'
import { selGetAppInfo } from '../reducers/appInfo'
import {
    CLEAR_EDIT_SETTINGS,
    RECEIVE_EDIT_SETTINGS,
    UPDATE_TITLE,
    REORDER_TOPICS_EDIT,
    TOGGLE_ALLOW_MESSAGES,
    TURN_OFF_EDIT_SETTINGS,
    ADD_TOPIC_TO_SUMMARY_EDIT,
    selGetSettingsEdit,
    selGetTopicsEdit,
} from '../reducers/settingsEdit'
import { selGetAppTopics } from '../reducers/topics'

export const actClearEditSettings = () => ({
    type: CLEAR_EDIT_SETTINGS,
})

export const actTurnOffEditSettings = () => ({
    type: TURN_OFF_EDIT_SETTINGS,
})

export const actReceiveEditSettings = currentSettings => ({
    type: RECEIVE_EDIT_SETTINGS,
    value: currentSettings,
})

export const actUpdateTitle = title => ({
    type: UPDATE_TITLE,
    value: title,
})

export const actToggleAllowMessages = el => ({
    type: TOGGLE_ALLOW_MESSAGES,
    value: el.checked,
})

export const actReorderTopicsEdit = topics => ({
    type: REORDER_TOPICS_EDIT,
    value: topics,
})

export const actAddTopicToSummaryEdit = topics => ({
    type: ADD_TOPIC_TO_SUMMARY_EDIT,
    value: topics,
})

// thunks

export const thuSetEditSettingsOn = () => async (dispatch, getState) => {
    const { title, allowMessages, helpDeskSubjects } = selGetAppInfo(getState())
    const topics = selGetAppTopics(getState())
    const currentSettings = { title, allowMessages, helpDeskSubjects, topics }
    dispatch(actReceiveEditSettings(currentSettings))
}

export const thuSaveEditedSettings = () => async (
    dispatch,
    getState,
    engine
) => {
    const { title, allowMessages, helpDeskSubjects } = selGetSettingsEdit(
        getState()
    )

    // update app settings
    const updatedSettings = { title, allowMessages, helpDeskSubjects }
    const update = await apiUpdateAppInfo(engine, updatedSettings)
    if (update) {
        dispatch(actReceivedAppInfo(updatedSettings))
    }

    // update topics
    const existingTopics = selGetAppTopics(getState())
    const updatedTopics = selGetTopicsEdit(getState())

    const existingTopicsIDs = existingTopics.map(t => t.id)
    const newTopicCount = updatedTopics
        .map(t => t.id)
        .filter(t => existingTopicsIDs.indexOf(t.id) === -1).length

    const uids = await apiGetUID(engine, newTopicCount)

    updatedTopics.forEach(ut => {
        if (existingTopicsIDs.indexOf(ut.id) === -1) {
            ut.id = uids.pop()
            ut.html = ''
        }
    })

    const newTopics = updatedTopics.filter(
        ut => existingTopicsIDs.indexOf(ut.id) === -1
    )

    const topicPromises = newTopics.map(async topic => {
        const topicAdded = await apiAddHelpTopicItem(engine, topic)
        return topicAdded
    })

    const topicsAdded = await Promise.all(topicPromises)

    // update topics summary

    const updatedSummary = await apiUpdateSummary(engine, {
        topics: updatedTopics.map(t => ({ id: t.id, name: t.name })),
    })

    // update store
    if (topicsAdded && updatedSummary) {
        dispatch(actReceiveTopics(updatedTopics))
    }

    // close edit settings
    dispatch(actTurnOffEditSettings())
}

export const thuReorderTopicsEditing = (id, type) => {
    return async (dispatch, getState) => {
        const topics = [...selGetTopicsEdit(getState())]
        const index = topics.findIndex(t => t.id === id)
        const indexNew =
            type === 'up'
                ? Math.max(index - 1, 0)
                : Math.min(index + 1, topics.length - 1)
        ;[topics[index], topics[indexNew]] = [topics[indexNew], topics[index]]
        dispatch(actReorderTopicsEdit(topics))
    }
}

export const thuAddTopicToSummaryEdit = name => {
    return async (dispatch, getState) => {
        const topics = [...selGetTopicsEdit(getState())]
        topics.push({ id: name, name })
        dispatch(actAddTopicToSummaryEdit(topics))
    }
}
