import { Chip, ButtonStrip } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { actSetSelectedEditing } from '../../actions/selected'
import i18n from '../../locales'
import { selGetSelectedHTML, selGetSelectedName } from '../../reducers/selected'
import { selGetUserIsSuperuser } from '../../reducers/user'
import { sanitizeAndReformat } from '../../services/sanitizers'
import EditButton from '../Edit/EditButton'

const DefaultMessage = ({ editPermission }) => {
    const welcomeText = editPermission
        ? i18n.t(
              'Welcome to the help app. You can add new topics by clicking Edit settings above.'
          )
        : i18n.t(
              'Welcome to the help app. Choose a topic above to get started.'
          )

    return (
        <>
            <div>
                <span>{welcomeText}</span>
            </div>
        </>
    )
}

DefaultMessage.propTypes = {
    editPermission: PropTypes.bool,
}

const HelpTopicDisplay = ({
    editPermission,
    selectedHTML,
    selectedName,
    setToEditMode,
}) => {
    return (
        <>
            <div>
                {!selectedName && <DefaultMessage editPermission />}
                {selectedName && (
                    <>
                        <div className="displayBar">
                            <Chip selected={true}>{selectedName}</Chip>
                            {editPermission && (
                                <div className="displayButtons">
                                    <ButtonStrip>
                                        <EditButton
                                            buttonText={i18n.t('Edit')}
                                            onClick={setToEditMode}
                                        />
                                    </ButtonStrip>
                                </div>
                            )}
                        </div>
                        {selectedHTML && (
                            <div
                                className="innerHTML"
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeAndReformat(selectedHTML),
                                }}
                            />
                        )}
                    </>
                )}
            </div>
            <style jsx>{`
                .displayBar {
                    display: flex;
                }
                .displayButtons {
                    margin-left: 20px;
                }
                .innerHTML {
                    margin-top: var(--spacers-dp16);
                }
            `}</style>
        </>
    )
}

const mapStateToProps = state => {
    return {
        editPermission: selGetUserIsSuperuser(state),
        selectedHTML: selGetSelectedHTML(state),
        selectedName: selGetSelectedName(state),
    }
}

const mapDispatchToProps = {
    setToEditMode: actSetSelectedEditing,
}

HelpTopicDisplay.propTypes = {
    editPermission: PropTypes.bool,
    selectedHTML: PropTypes.string,
    selectedName: PropTypes.string,
    setToEditMode: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(HelpTopicDisplay)
