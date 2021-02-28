import { actClearSelected } from '../actions/selected'
import {
    actAddTopicToSummary,
    actRemoveTopicFromSummary,
} from '../actions/topics'
import {
    apiAddHelpTopicItem,
    apiDeleteHelpTopicItem,
    apiUpdateSummary,
} from '../api/helpTopic'
import { apiGetUID } from '../api/utils'
import {
    SET_ADD_DELETE_PROCESSING,
    SET_ADD_DELETE_COMPLETE,
} from '../reducers/addDelete'
import { selGetSelectedId } from '../reducers/selected'
import { selGetAppTopics } from '../reducers/topics'

const actSetAddDeleteProcessing = () => ({
    type: SET_ADD_DELETE_PROCESSING,
})

const actSetAddDeleteComplete = () => ({
    type: SET_ADD_DELETE_COMPLETE,
})

// thunks

export const thuAddTopic = name => async (dispatch, getState, engine) => {
    // dispatch processing
    dispatch(actSetAddDeleteProcessing())

    // get topics for updating summary
    const topics = selGetAppTopics(getState())

    // get uid
    const uids = await apiGetUID(engine, 1)
    const uid = uids[0]

    // add individual item
    const item = { name, id: uid, html: '' }
    const addedItem = await apiAddHelpTopicItem(engine, item)
    if (addedItem.httpStatusCode >= 200 || addedItem.httpStatusCode < 300) {
        // update topics in dataStore
        const updatedSummary = await apiUpdateSummary(engine, {
            topics: [...topics, { id: uid, name }],
        })

        if (
            updatedSummary.httpStatusCode >= 200 ||
            updatedSummary.httpStatusCode < 300
        ) {
            // add item to summary (redux store)
            dispatch(actAddTopicToSummary({ id: uid, name }))

            // dispatch not processing
            dispatch(actSetAddDeleteComplete())
        }
    }
}

export const thuDeleteTopic = id => async (dispatch, getState, engine) => {
    // dispatch processing
    dispatch(actSetAddDeleteProcessing())

    // get topics for updating summary
    const topics = selGetAppTopics(getState())

    // if deleted topic is selected topic, clear selection
    const selectedTopicId = selGetSelectedId(getState())
    console.log('selectedTopicId', selectedTopicId)
    if (id === selectedTopicId) {
        dispatch(actClearSelected())
    }

    // delete item from topics in dataStore
    const updatedSummary = await apiUpdateSummary(engine, {
        topics: topics.filter(t => t.id !== id),
    })

    if (
        updatedSummary.httpStatusCode >= 200 ||
        updatedSummary.httpStatusCode < 300
    ) {
        // remove item from topics (redux store)
        dispatch(actRemoveTopicFromSummary(id))

        // delete individual item
        const deletedItem = await apiDeleteHelpTopicItem(engine, id)

        if (
            deletedItem.httpStatusCode >= 200 ||
            deletedItem.httpStatusCode < 300
        ) {
            dispatch(actSetAddDeleteComplete())
        }
    }
}
