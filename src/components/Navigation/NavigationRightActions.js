import { Button, ButtonStrip } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { actOpenHelpDeskMessage } from '../../actions/contactHelpDesk'
import { MailIcon } from '../../icons/icons'
import i18n from '../../locales'
import { selGetAppAllowMessages } from '../../reducers/appInfo'
import { selGetUserIsSuperuser } from '../../reducers/user'
import SettingsButton from './SettingsButton'

const NavigationRightActions = ({
    allowMessages,
    editPermission,
    openHelpDeskMessage,
}) => {
    return (
        <>
            <div className="buttonContainer">
                <ButtonStrip>
                    {allowMessages && (
                        <Button
                            onClick={openHelpDeskMessage}
                            icon={<MailIcon />}
                            type="button"
                        >
                            {i18n.t('Contact help')}
                        </Button>
                    )}

                    {editPermission && <SettingsButton />}
                </ButtonStrip>
            </div>
            <style jsx>{`
                .buttonContainer {
                    padding: 5px;
                    margin-left: auto;
                    margin-right: 20px;
                    margin-bottom: 10px;
                    display: flex;
                }
            `}</style>
        </>
    )
}

NavigationRightActions.propTypes = {
    allowMessages: PropTypes.bool,
    editPermission: PropTypes.bool,
    openHelpDeskMessage: PropTypes.func,
}

const mapStateToProps = state => ({
    allowMessages: selGetAppAllowMessages(state),
    editPermission: selGetUserIsSuperuser(state),
})

const mapDispatchToProps = {
    openHelpDeskMessage: actOpenHelpDeskMessage,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationRightActions)
