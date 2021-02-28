export const ADD_TOPIC_TO_SUMMARY = 'ADD_TOPIC_TO_SUMMARY'
export const RECEIVED_TOPICS = 'RECEIVED_TOPICS'
export const REMOVE_TOPIC_FROM_SUMMARY = 'REMOVE_TOPIC_FROM_SUMMARY'
export const RENAME_TOPIC_IN_SUMMARY = 'RENAME_TOPIC_IN_SUMMARY'
export const REORDER_TOPICS = 'REORDER_TOPICS'

export const DEFAULT_STATE_TOPICS = []

export default (state = DEFAULT_STATE_TOPICS, action) => {
    switch (action.type) {
        case RECEIVED_TOPICS: {
            return action.value
        }
        case ADD_TOPIC_TO_SUMMARY: {
            return [...state, action.value]
        }
        case REMOVE_TOPIC_FROM_SUMMARY: {
            return [...state].filter(t => t.id !== action.value)
        }
        case RENAME_TOPIC_IN_SUMMARY: {
            return [...state]
                .filter(t => t.id !== action.value.id)
                .concat([action.value])
        }
        case REORDER_TOPICS: {
            return action.value
        }
        default:
            return state
    }
}

// selectors

export const selGetAppTopics = state => state.topics
