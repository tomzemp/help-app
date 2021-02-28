import {
    Button,
    ButtonStrip,
    Checkbox,
    Modal,
    ModalActions,
    ModalContent,
    ModalTitle,
    InputField,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import {
    actClearEditSettings,
    actUpdateTitle,
    actToggleAllowMessages,
    thuSaveEditedSettings,
} from '../../actions/settingsEdit'
import i18n from '../../locales'
import { selGetAllowMessages, selGetTitle } from '../../reducers/settingsEdit'
import EditTopics from './EditTopics'
import SettingItem from './SettingItem'

const EditTitle = ({ title, updateTitle }) => {
    return (
        <>
            <InputField
                inputWidth="500px" //redo
                onChange={el => {
                    updateTitle(el.value)
                }}
                value={title}
            />
        </>
    )
}

EditTitle.propTypes = {
    title: PropTypes.string,
    updateTitle: PropTypes.func,
}

const EditSettings = ({
    title,
    allowMessages,
    toggleAllowMessages,
    cancelSettings,
    updateTitle,
    saveSettings,
}) => {
    return (
        <>
            <Modal medium position="middle">
                <ModalTitle>{i18n.t('Edit help app settings')}</ModalTitle>
                <ModalContent>
                    {title != undefined && (
                        <>
                            <SettingItem header={i18n.t('App title')}>
                                <EditTitle
                                    title={title}
                                    updateTitle={updateTitle}
                                />
                            </SettingItem>
                        </>
                    )}
                    <SettingItem
                        header={i18n.t('Help topics')}
                        subheader={i18n.t(
                            'Help topics can be added or reordered below. Options to rename or delete are available when editing the individual topic.'
                        )}
                    >
                        <EditTopics />
                    </SettingItem>
                    <SettingItem header={i18n.t('Help messages')}>
                        <Checkbox
                            label={i18n.t(
                                'Enable users to send messages to request help'
                            )}
                            onChange={toggleAllowMessages}
                            checked={allowMessages}
                        />
                    </SettingItem>
                </ModalContent>
                <ModalActions>
                    <ButtonStrip>
                        <Button onClick={cancelSettings}>
                            {i18n.t('Cancel')}
                        </Button>
                        <Button primary onClick={saveSettings}>
                            {i18n.t('Save')}
                        </Button>
                    </ButtonStrip>
                </ModalActions>
            </Modal>
        </>
    )
}

const mapStateToProps = state => {
    return {
        allowMessages: selGetAllowMessages(state),
        title: selGetTitle(state),
    }
}

const mapDispatchToProps = {
    cancelSettings: actClearEditSettings,
    saveSettings: thuSaveEditedSettings,
    toggleAllowMessages: actToggleAllowMessages,
    updateTitle: actUpdateTitle,
}

EditSettings.propTypes = {
    allowMessages: PropTypes.bool,
    cancelSettings: PropTypes.func,
    saveSettings: PropTypes.func,
    title: PropTypes.string,
    toggleAllowMessages: PropTypes.func,
    updateTitle: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSettings)
