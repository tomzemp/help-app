import { Button, InputField } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
    thuAddTopicToSummaryEdit,
    thuReorderTopicsEditing,
} from '../../actions/settingsEdit'
import { IconMoveDown, IconMoveUp } from '../../icons/icons'
import i18n from '../../locales'
import { selGetTopicsEdit } from '../../reducers/settingsEdit'

const TopicsList = ({ currentTopics, reorderTopics }) => {
    const [selectedID, setSelectedID] = useState('')

    return (
        <>
            <div className="outerItemListBox">
                <div className="itemListBox">
                    <div className="innerItemListBox">
                        {currentTopics.map(t => (
                            <TopicListItem
                                id={t.id}
                                key={`option_${t.name}`}
                                name={t.name}
                                selected={t.id === selectedID}
                                setSelectedID={setSelectedID}
                            />
                        ))}
                    </div>
                    <div className="actionButtonsContainer">
                        <div className="actionButtons">
                            <div className="actionButton">
                                <Button
                                    disabled={
                                        !selectedID ||
                                        currentTopics
                                            .map(t => t.id)
                                            .indexOf(selectedID) === 0
                                    }
                                    icon={<IconMoveUp />}
                                    key="button_move_up"
                                    name="up_button"
                                    onClick={() => {
                                        reorderTopics(selectedID, 'up')
                                    }}
                                    small
                                    type="button"
                                    value="up"
                                ></Button>
                            </div>
                            <div className="actionButton">
                                <Button
                                    disabled={
                                        !selectedID ||
                                        currentTopics
                                            .map(t => t.id)
                                            .indexOf(selectedID) ===
                                            currentTopics.length - 1
                                    }
                                    icon={<IconMoveDown />}
                                    key="button_move_down"
                                    name="down_button"
                                    onClick={() => {
                                        reorderTopics(selectedID, 'down')
                                    }}
                                    small
                                    type="button"
                                    value="down"
                                ></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .outerItemListBox {
                    width: 500px;
                    margin-bottom: var(--spacers-dp16);
                }
                .itemListBox {
                    margin-right: var(--spacers-dp4);
                    border: 1px solid var(--colors-grey500);
                    border-radius: 3px;
                }
                .innerItemListBox {
                    min-height: 200px;
                    max-height: 300px;
                    overflow-y: auto;
                }
                .actionButtonsContainer {
                    border-top: 1px solid var(--colors-grey500);
                    padding: var(--spacers-dp4);
                    display: flex;
                }
                .actionButtons {
                    margin-left: auto;
                    display: flex;
                }
                .actionButton {
                    margin-left: var(--spacers-dp4);
                }
            `}</style>
        </>
    )
}

TopicsList.propTypes = {
    currentTopics: PropTypes.array,
    reorderTopics: PropTypes.func,
}

const TopicListItem = ({ id, name, selected, setSelectedID }) => (
    <>
        <div
            className={selected ? 'topicListDivHighlighted' : 'topicListDiv'}
            onClick={() => {
                setSelectedID(id)
            }}
            id={id}
        >
            <span key={`span_${id}`}>{name}</span>
        </div>
        <style jsx>{`
            .topicListDiv {
                overflow: hidden;
                padding: var(--spacers-dp4);
                cursor: default;
            }
            .topicListDivHighlighted {
                overflow: hidden;
                padding: var(--spacers-dp4);
                background-color: var(--colors-teal700);
                cursor: default;
            }
            .topicListDivHighlighted span {
                color: var(--colors-white);
            }
            .topicListDiv:hover {
                background-color: var(--colors-grey200);
            }
        `}</style>
    </>
)

TopicListItem.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    selected: PropTypes.bool,
    setSelectedID: PropTypes.func,
}

const AddNewTopic = ({
    addTopic,
    checkIfTopicExists,
    newTopicName,
    setNewTopicName,
}) => (
    <>
        <div>
            <InputField
                error={checkIfTopicExists(newTopicName)}
                inputWidth="300px"
                onChange={target => {
                    setNewTopicName(target.value)
                }}
                placeholder={i18n.t('Enter a new topic name')}
                value={newTopicName}
                validationText={
                    checkIfTopicExists(newTopicName)
                        ? i18n.t('Topic name already exists')
                        : ''
                }
            />
            <div className="addButton">
                <Button
                    disabled={
                        !newTopicName.length || checkIfTopicExists(newTopicName)
                    }
                    onClick={() => {
                        addTopic(newTopicName)
                        setNewTopicName('')
                    }}
                    primary
                    type="button"
                >
                    {i18n.t('Add Topic')}
                </Button>
            </div>
        </div>
        <style jsx>{`
            .addButton {
                margin-top: var(--spacers-dp4);
            }
        `}</style>
    </>
)

AddNewTopic.propTypes = {
    addTopic: PropTypes.func,
    checkIfTopicExists: PropTypes.func,
    newTopicName: PropTypes.string,
    setNewTopicName: PropTypes.func,
}

const EditTopics = ({ addTopic, reorderTopics, topics }) => {
    const [newTopicName, setNewTopicName] = useState('')

    const checkIfTopicExists = name =>
        Boolean(topics.find(t => t.name === name))

    return (
        <>
            <TopicsList
                currentTopics={topics}
                reorderTopics={reorderTopics}
            ></TopicsList>
            <AddNewTopic
                addTopic={addTopic}
                checkIfTopicExists={checkIfTopicExists}
                newTopicName={newTopicName}
                setNewTopicName={setNewTopicName}
            />
        </>
    )
}

const mapStateToProps = state => {
    return {
        topics: selGetTopicsEdit(state),
    }
}

const mapDispatchToProps = {
    addTopic: thuAddTopicToSummaryEdit,
    reorderTopics: thuReorderTopicsEditing,
}

EditTopics.propTypes = {
    addTopic: PropTypes.func,
    reorderTopics: PropTypes.func,
    topics: PropTypes.array,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTopics)
