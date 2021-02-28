import { onError } from '../api/index'
import { apiFetchTopics } from '../api/topics'
import {
    ADD_TOPIC_TO_SUMMARY,
    RECEIVED_TOPICS,
    REMOVE_TOPIC_FROM_SUMMARY,
    RENAME_TOPIC_IN_SUMMARY,
    REORDER_TOPICS,
    selGetAppTopics,
} from '../reducers/topics'

export const actAddTopicToSummary = value => ({
    type: ADD_TOPIC_TO_SUMMARY,
    value,
})

export const actReceiveTopics = value => ({
    type: RECEIVED_TOPICS,
    value,
})

export const actRemoveTopicFromSummary = id => ({
    type: REMOVE_TOPIC_FROM_SUMMARY,
    value: id,
})

export const actRenameTopicInSummary = (id, name) => ({
    type: RENAME_TOPIC_IN_SUMMARY,
    value: { id, name },
})

export const actReorderTopics = topics => ({
    type: REORDER_TOPICS,
    value: topics,
})

// thunks

export const thuReorderTopics = (id, type) => {
    return async (dispatch, getState) => {
        const topics = [...selGetAppTopics(getState())]
        const index = topics.findIndex(t => t.id === id)
        const indexNew =
            type === 'up'
                ? Math.max(index - 1, 0)
                : Math.min(index + 1, topics.length - 1)
        ;[topics[index], topics[indexNew]] = [topics[indexNew], topics[index]]
        dispatch(actReorderTopics(topics))
    }
}

export const thuFetchTopics = () => {
    return async (dispatch, getState, engine) => {
        try {
            const topics = await apiFetchTopics(engine)
            dispatch(actReceiveTopics(topics))
        } catch (error) {
            onError(error)
        }
    }
}
