export const CLEAR_SELECTED = 'CLEAR_SELECTED'
export const SET_SELECTED = 'SET_SELECTED'
export const SET_SELECTED_EDITING = 'SET_SELECTED_EDITING'
export const CLOSE_SELECTED_EDITING = 'CLOSE_SELECTED_EDITING'
export const SAVE_SELECTED_EDITING = 'SAVE_SELECTED_EDITING'
export const SET_SELECTED_LOADING = 'SET_SELECTED_LOADING'

export const DEFAULT_STATE_SELECTED = {
    editing: false,
    id: '',
    loading: false,
    name: '',
}

export default (state = DEFAULT_STATE_SELECTED, action) => {
    switch (action.type) {
        case CLEAR_SELECTED: {
            return DEFAULT_STATE_SELECTED
        }
        case SET_SELECTED_EDITING: {
            return Object.assign({}, { ...state }, { editing: true })
        }
        case CLOSE_SELECTED_EDITING: {
            return Object.assign({}, { ...state }, { editing: false })
        }
        case SAVE_SELECTED_EDITING: {
            return Object.assign(
                {},
                { ...state },
                { ...action.value },
                { editing: false }
            )
        }
        case SET_SELECTED_LOADING: {
            return Object.assign({}, { ...state }, { loading: true })
        }
        case SET_SELECTED: {
            return {
                html: action.value.html,
                id: action.value.id,
                loading: false,
                name: action.value.name,
            }
        }
        default:
            return state
    }
}

// selectors

export const selGetSelectedHTML = state => state.selected.html
export const selGetSelectedId = state => state.selected.id
export const selGetSelectedLoading = state => state.selected.loading
export const selGetSelectedName = state => state.selected.name
export const selGetEditMode = state => state.selected.editing
