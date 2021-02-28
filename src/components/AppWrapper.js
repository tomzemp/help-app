import { useDataEngine } from '@dhis2/app-runtime'
import React, { useMemo } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import rootReducer from '../reducers/index'
import App from './App'

const AppWrapper = () => {
    const engine = useDataEngine()
    const store = useMemo(
        () =>
            createStore(
                rootReducer,
                applyMiddleware(ReduxThunk.withExtraArgument(engine))
            ),
        [engine]
    )

    return (
        <ReduxProvider store={store}>
            <App />
        </ReduxProvider>
    )
}

export default AppWrapper
