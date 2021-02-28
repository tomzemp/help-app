import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { thuFetchAppInfo } from '../actions/appInfo'
import { thuFetchTopics } from '../actions/topics'
import { thuFetchUser } from '../actions/user'
import { selGetContactHelpOpen } from '../reducers/contactHelpDesk'
import { selGetEditingSettingsStatus } from '../reducers/settingsEdit'
import ContactDialog from './Contact/ContactDialog'
import EditSettings from './Edit/EditSettings'
import HelpTopicWrapper from './HelpTopic/HelpTopicWrapper'
import Layout from './Layout'
import NavigationBar from './Navigation/NavigationBar'

const Display = ({ contactHelpWriteMode, settingsEditMode }) => {
    if (settingsEditMode) {
        return <EditSettings />
    } else if (contactHelpWriteMode) {
        return <ContactDialog />
    } else {
        return <HelpTopicWrapper />
    }
}

Display.propTypes = {
    contactHelpWriteMode: PropTypes.bool,
    settingsEditMode: PropTypes.bool,
}

const App = ({
    contactHelpWriteMode,
    fetchAppInfo,
    fetchTopics,
    fetchUser,
    settingsEditMode,
}) => {
    useEffect(() => {
        fetchUser()
        fetchAppInfo()
        fetchTopics()
    }, [])

    return (
        <>
            <Layout>
                <div className="outerContainer">
                    <NavigationBar />
                    <div className="innerContainer">
                        <Display
                            contactHelpWriteMode={contactHelpWriteMode}
                            settingsEditMode={settingsEditMode}
                        />
                    </div>
                </div>
            </Layout>
        </>
    )
}

const mapStateToProps = state => ({
    contactHelpWriteMode: selGetContactHelpOpen(state),
    settingsEditMode: selGetEditingSettingsStatus(state),
})

const mapDispatchToProps = {
    fetchAppInfo: thuFetchAppInfo,
    fetchTopics: thuFetchTopics,
    fetchUser: thuFetchUser,
}

App.propTypes = {
    contactHelpWriteMode: PropTypes.bool,
    fetchAppInfo: PropTypes.func,
    fetchTopics: PropTypes.func,
    fetchUser: PropTypes.func,
    settingsEditMode: PropTypes.bool,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
