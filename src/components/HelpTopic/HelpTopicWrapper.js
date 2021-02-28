import { CircularLoader } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { selGetEditMode, selGetSelectedLoading } from '../../reducers/selected'
import HelpTopicDisplay from './HelpTopicDisplay'
import HelpTopicEdit from './HelpTopicEdit'

const HelpTopicWrapper = ({ editMode, loading }) => {
    return loading ? (
        <CircularLoader />
    ) : (
        <>
            <div className="helpTopicWrapper">
                {!editMode && <HelpTopicDisplay />}
                {editMode && <HelpTopicEdit />}
            </div>
            <style jsx>{`
                .helpTopicWrapper {
                    margin: 20px;
                }
            `}</style>
        </>
    )
}

const mapStateToProps = state => {
    return {
        editMode: selGetEditMode(state),
        loading: selGetSelectedLoading(state),
    }
}

HelpTopicWrapper.propTypes = {
    editMode: PropTypes.bool,
    loading: PropTypes.bool,
}

export default connect(mapStateToProps)(HelpTopicWrapper)
