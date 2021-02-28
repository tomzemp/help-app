import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { thuSetEditSettingsOn } from '../../actions/settingsEdit'
import i18n from '../../locales'
import { selGetEditingSettingsStatus } from '../../reducers/settingsEdit'
import EditButton from '../Edit/EditButton'

const SettingsButton = ({ settingsEditMode, setToEdit }) => (
    <EditButton
        buttonText={i18n.t('Edit settings')}
        disabled={settingsEditMode}
        onClick={setToEdit}
    />
)

SettingsButton.propTypes = {
    setToEdit: PropTypes.func,
    settingsEditMode: PropTypes.bool,
}

const mapStateToProps = state => ({
    settingsEditMode: selGetEditingSettingsStatus(state),
})

const mapDispatchToProps = {
    setToEdit: thuSetEditSettingsOn,
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsButton)
