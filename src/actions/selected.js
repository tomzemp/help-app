import { actReceiveTopics } from '../actions/topics'
import {
    apiFetchHelpTopic,
    apiUpdateHelpTopicItem,
    apiUpdateSummary,
} from '../api/helpTopic'
import {
    CLEAR_SELECTED,
    CLOSE_SELECTED_EDITING,
    SAVE_SELECTED_EDITING,
    SET_SELECTED,
    SET_SELECTED_EDITING,
    SET_SELECTED_LOADING,
    selGetSelectedName,
} from '../reducers/selected'
import { selGetAppTopics } from '../reducers/topics'

export const actClearSelected = () => ({
    type: CLEAR_SELECTED,
})

export const actSetSelectedEditing = () => ({
    type: SET_SELECTED_EDITING,
})

export const actCloseSelectedEditing = () => ({
    type: CLOSE_SELECTED_EDITING,
})

const actSaveSelectedEditing = (name, html) => ({
    type: SAVE_SELECTED_EDITING,
    value: { name: name, html: html },
})

const actSetSelectedLoading = () => ({
    type: SET_SELECTED_LOADING,
})

const actSetSelected = value => ({
    type: SET_SELECTED,
    value,
})

export const thuSetSelected = id => async (dispatch, getState, engine) => {
    dispatch(actSetSelectedLoading())
    try {
        const helpTopic = await apiFetchHelpTopic(engine, id)
        dispatch(actSetSelected(helpTopic))
    } catch (e) {
        console.log(e)
        dispatch(actSetSelected({ id: null, name: 'null' }))
    }
}

export const thuEditSelected = (id, name, html) => async (
    dispatch,
    getState,
    engine
) => {
    try {
        const data = { id, name, html }
        if (name !== selGetSelectedName(getState())) {
            let topics = selGetAppTopics(getState())
            topics = topics.map(t => {
                if (t.id !== id) {
                    return t
                }
                return Object.assign({}, t, { name })
            })
            await apiUpdateSummary(engine, {
                topics,
            })

            dispatch(actReceiveTopics(topics))
        }

        await apiUpdateHelpTopicItem(engine, id, data)

        dispatch(actSaveSelectedEditing(name, html))
    } catch (e) {
        console.log(e)
    }
}
