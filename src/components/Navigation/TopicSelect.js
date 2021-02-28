import { SingleSelect, SingleSelectOption } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { thuSetSelected } from '../../actions/selected'
import i18n from '../../locales'
import { selGetSelectedId } from '../../reducers/selected'

const TopicSelect = ({ selectedID, setSelectedTopic, topics }) => {
    return (
        <>
            <div className="selectBox">
                <span className="topicText">{i18n.t('Topic')}: </span>
                <div className="selectContainer">
                    <SingleSelect
                        className="select"
                        filterable
                        noMatchText={i18n.t('Invalid')}
                        selected={selectedID}
                        onChange={payload => {
                            setSelectedTopic(payload.selected)
                        }}
                    >
                        {topics.map(t => {
                            return (
                                <SingleSelectOption
                                    dataTest="dhis2-uicore-singleselectoption"
                                    key={`opt_${t.id}`}
                                    label={t.name}
                                    value={t.id}
                                />
                            )
                        })}
                    </SingleSelect>
                </div>
            </div>
            <style jsx>{`
                .selectBox {
                    padding: 5px;
                    margin-left: 50px;
                    margin-bottom: 10px;
                    width: 400px;
                    display: flex;
                    align-self: center;
                }

                .selectContainer {
                    flex-grow: 1;
                    align-self: center;
                }
                .select {
                    width: 400px;
                }
                .topicText {
                    maximum-width: 150px;
                    margin-right: 10px;
                    align-self: center;
                }
            `}</style>
        </>
    )
}

const mapStateToProps = state => {
    return {
        selectedID: selGetSelectedId(state),
    }
}

const mapDispatchToProps = {
    setSelectedTopic: thuSetSelected,
}

TopicSelect.propTypes = {
    selectedID: PropTypes.string,
    setSelectedTopic: PropTypes.func,
    topics: PropTypes.array,
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicSelect)
