import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import {
    Button,
    ButtonStrip,
    InputField,
    Modal,
    ModalContent,
    ModalActions,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { thuDeleteTopic } from '../../actions/addDelete'
import {
    actCloseSelectedEditing,
    thuEditSelected,
} from '../../actions/selected'
import i18n from '../../locales'
import {
    selGetSelectedHTML,
    selGetSelectedId,
    selGetSelectedName,
} from '../../reducers/selected'
import { sanitize } from '../../services/sanitizers'

const HelpTopicEdit = ({
    closeWithoutSaving,
    deleteTopic,
    editTopic,
    html,
    id,
    topicName,
}) => {
    const defaultText = `${i18n.t('This is a page about ')} ${topicName}.`

    const [editedHTML, setEditedHTML] = useState(sanitize(html) || defaultText)
    const [editedName, setEditedName] = useState(topicName)
    const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(
        false
    )

    return (
        <>
            {topicName && (
                <>
                    {deleteConfirmDialogOpen && (
                        <Modal
                            onClose={() => {
                                setDeleteConfirmDialogOpen(false)
                            }}
                            position="middle"
                        >
                            <ModalContent>
                                {i18n.t(
                                    'Are you sure that you want to delete this topic? This action cannot be undone.'
                                )}
                            </ModalContent>
                            <ModalActions>
                                <ButtonStrip>
                                    <Button
                                        onClick={() => {
                                            setDeleteConfirmDialogOpen(false)
                                        }}
                                        type="button"
                                    >
                                        {i18n.t('Cancel')}
                                    </Button>
                                    <Button
                                        destructive
                                        onClick={() => {
                                            deleteTopic(id)
                                            setDeleteConfirmDialogOpen(false)
                                        }}
                                        type="button"
                                    >
                                        {i18n.t('Delete')}
                                    </Button>
                                </ButtonStrip>
                            </ModalActions>
                        </Modal>
                    )}
                    <div className="displayBar">
                        <InputField
                            inputWidth="200px"
                            onChange={e => setEditedName(e.value)}
                            value={editedName}
                        ></InputField>
                        <div className="displayButtons">
                            <ButtonStrip>
                                <Button
                                    onClick={closeWithoutSaving}
                                    type="button"
                                >
                                    {i18n.t('Exit without saving')}
                                </Button>
                                <Button
                                    onClick={() => {
                                        editTopic(id, editedName, editedHTML)
                                    }}
                                    primary
                                    type="button"
                                >
                                    {i18n.t('Save')}
                                </Button>
                                <Button
                                    onClick={() => {
                                        setDeleteConfirmDialogOpen(true)
                                    }}
                                    destructive
                                    type="button"
                                >
                                    {i18n.t('Delete')}
                                </Button>
                            </ButtonStrip>
                        </div>
                    </div>
                </>
            )}
            <div className="editInstructions">
                <span>{`${i18n.t(
                    'Edit the text below about '
                )} ${editedName}`}</span>
            </div>
            <div style={{ margin: 'auto', width: '95%' }}>
                <CKEditor
                    editor={ClassicEditor}
                    config={{
                        mediaEmbed: {
                            previewsInData: true,
                        },
                        link: {
                            defaultProtocol: 'http://',
                        },
                    }}
                    data={html || defaultText}
                    onChange={(event, editor) => {
                        const data = editor.getData()
                        setEditedHTML(data)
                    }}
                />
            </div>
            <style jsx>{`
                .displayBar {
                    display: flex;
                }
                .displayButtons {
                    margin-left: 20px;
                }
                .editInstructions {
                    margin-top: var(--spacers-dp16);
                    margin-bottom: var(--spacers-dp16);
                }
            `}</style>
        </>
    )
}

const mapStateToProps = state => {
    return {
        html: selGetSelectedHTML(state),
        id: selGetSelectedId(state),
        topicName: selGetSelectedName(state),
    }
}

const mapDispatchToProps = {
    closeWithoutSaving: actCloseSelectedEditing,
    deleteTopic: thuDeleteTopic,
    editTopic: thuEditSelected,
}

HelpTopicEdit.propTypes = {
    closeWithoutSaving: PropTypes.func,
    deleteTopic: PropTypes.func,
    editTopic: PropTypes.func,
    html: PropTypes.string,
    id: PropTypes.string,
    topicName: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(HelpTopicEdit)
