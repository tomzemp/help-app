export const SET_ADD_DELETE_PROCESSING = 'SET_ADD_DELETE_PROCESSING'
export const SET_ADD_DELETE_COMPLETE = 'SET_ADD_DELETE_COMPLETE'

export const DEFAULT_STATE_SELECTED = {
    processing: false,
}

// these are not currently used within the app due to limited error handling

export default (state = DEFAULT_STATE_SELECTED, action) => {
    switch (action.type) {
        case SET_ADD_DELETE_PROCESSING: {
            return { processing: true }
        }
        case SET_ADD_DELETE_COMPLETE: {
            return { processing: false }
        }
        default:
            return state
    }
}

// selectors

export const selGetAddDeleteProcessing = state => state.addDelete.processing
