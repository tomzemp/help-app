import {
    Button,
    ButtonStrip,
    InputField,
    Modal,
    ModalActions,
    ModalContent,
    ModalTitle,
    SingleSelect,
    SingleSelectOption,
    Tag,
    TextArea,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { actCloseHelpDeskMessage } from '../../actions/contactHelpDesk'
import i18n from '../../locales'
import { selGetAppHelpDeskSubjects } from '../../reducers/appInfo'
import { selGetUserName } from '../../reducers/user'

const HelpDeskAreaSelect = ({ areas, selectedArea, setSelectedArea }) => (
    <>
        <div className="selectContainer">
            <SingleSelect
                selected={selectedArea}
                onChange={payload => {
                    setSelectedArea(payload.selected)
                }}
            >
                {areas.map(a => {
                    return (
                        <SingleSelectOption
                            dataTest="dhis2-uicore-singleselectoption"
                            key={`opt_${a}`}
                            label={a}
                            value={a}
                        />
                    )
                })}
            </SingleSelect>
        </div>
        <style jsx>{`
            .selectContainer {
                width: 300px;
            }
        `}</style>
    </>
)

HelpDeskAreaSelect.propTypes = {
    areas: PropTypes.array,
    selectedArea: PropTypes.string,
    setSelectedArea: PropTypes.func,
}

const ContactDialog = ({ closeHelpDeskMessage, helpDeskAreas, userName }) => {
    const [subject, setSubject] = useState('')
    const [text, setText] = useState('')
    const [selectedArea, setSelectedArea] = useState('')
    return (
        <>
            <Modal large top>
                <ModalTitle>{i18n.t('Send a message')}</ModalTitle>
                <ModalContent>
                    <div className="helpMessageSubheader">
                        <span>(This feature is currently non-functional)</span>
                    </div>
                    <div data-testid="userTag" className="helpMessageSubheader">
                        <span>{`${i18n.t('From')}:`}</span>
                        <Tag>{userName}</Tag>
                    </div>
                    <div className="helpMessageSubheader">
                        <span>{`${i18n.t('To')}:`}</span>
                        <Tag>{i18n.t('Help Desk')}</Tag>
                    </div>
                    {helpDeskAreas.length > 0 && (
                        <div className="helpMessageSubheader">
                            <span>{`${i18n.t('Help desk area')}`}</span>
                            <div className="textAreaContainer">
                                <HelpDeskAreaSelect
                                    className="selectContainer"
                                    areas={helpDeskAreas}
                                    selectedArea={selectedArea}
                                    setSelectedArea={setSelectedArea}
                                />
                            </div>
                        </div>
                    )}
                    <div className="helpMessageSubheader">
                        <InputField
                            label={`${i18n.t('Subject')}:`}
                            name="helpMessageSubjectField"
                            onChange={el => {
                                setSubject(el.value)
                            }}
                            value={subject}
                        />
                    </div>
                    <div className="helpMessageSubheader">
                        <span className="messageTextSubheader">{`${i18n.t(
                            'Message'
                        )}:`}</span>
                        <div className="textAreaContainer">
                            <TextArea
                                name="helpMessageTextArea"
                                onChange={el => setText(el.value)}
                                resize="vertical"
                                rows={6}
                                value={text}
                                width="100%"
                            />
                        </div>
                    </div>
                </ModalContent>
                <ModalActions>
                    <ButtonStrip>
                        <Button onClick={closeHelpDeskMessage}>
                            {i18n.t('Cancel')}
                        </Button>
                        <Button onClick={closeHelpDeskMessage} primary>
                            {i18n.t('Send')}
                        </Button>
                    </ButtonStrip>
                </ModalActions>
            </Modal>
            <style jsx>
                {`
                    .helpMessageSubheader {
                        margin-bottom: var(--spacers-dp16);
                    }
                    .helpMessageSubheader span {
                        font-size: 14px;
                        margin-right: var(--spacers-dp8);
                    }
                    .textAreaContainer {
                        margin-top: var(--spacers-dp8);
                    }
                `}
            </style>
        </>
    )
}

ContactDialog.propTypes = {
    closeHelpDeskMessage: PropTypes.func,
    helpDeskAreas: PropTypes.array,
    userName: PropTypes.string,
}

const mapStateToProps = state => ({
    helpDeskAreas: selGetAppHelpDeskSubjects(state),
    userName: selGetUserName(state),
})

const mapDispatchToProps = {
    closeHelpDeskMessage: actCloseHelpDeskMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactDialog)
