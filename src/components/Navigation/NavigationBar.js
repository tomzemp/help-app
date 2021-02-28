import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { HelpIcon } from '../../icons/icons'
import { selGetAppTitle } from '../../reducers/appInfo'
import { selGetAppTopics } from '../../reducers/topics'
import NavigationRightActions from './NavigationRightActions'
import TopicSelect from './TopicSelect'

const NavigationBar = ({ title, topics }) =>
    !title || !topics ? (
        <></>
    ) : (
        <>
            <div className="navigation">
                <div className="iconText">
                    <HelpIcon />
                </div>
                <div className="titleText">
                    <span className="titleText">{title}</span>
                </div>
                <TopicSelect topics={topics} />
                <NavigationRightActions />
            </div>
            <style jsx>{`
                .navigation {
                    height: 80px;
                    padding-top: 20px;
                    padding-left: 10px;
                    background-color: white;
                    box-shadow: 2px 2px 2px lightGrey;
                    display: flex;
                }
                .titleText {
                    maximum-width: 150px;
                    margin-bottom: 10px;
                    align-self: center;
                }
                .titleText span {
                    font-size: 1.5em;
                    letter-spacing: 0.5px;
                    line-height: 1.4;
                }

                .iconText {
                    margin-bottom: 10px;
                    font-size: 1.5em;
                    margin-right: 5px;
                    align-self: center;
                }
            `}</style>
        </>
    )

const mapStateToProps = state => {
    return {
        title: selGetAppTitle(state),
        topics: selGetAppTopics(state),
    }
}

NavigationBar.propTypes = {
    title: PropTypes.string,
    topics: PropTypes.array,
}

export default connect(mapStateToProps)(NavigationBar)
