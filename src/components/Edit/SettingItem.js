import PropTypes from 'prop-types'
import React from 'react'

const SettingItem = ({ children, header, subheader }) => (
    <>
        <div className="settingItemContainer">
            <span className="settingItemHeader">{header}</span>
            {subheader && (
                <span className="settingItemSubheader">{subheader}</span>
            )}
            <div>{children}</div>
        </div>
        <style jsx>{`
            .settingItemContainer {
                display: flex;
                flex-direction: column;
                margin-bottom: var(--spacers-dp16);
            }
            .settingItemHeader {
                font-size: 16px;
                font-weight: bold;
                line-height: 1.4;
                margin-top: var(--spacers-dp4);
                margin-bottom: var(--spacers-dp4);
            }
            .settingItemSubheader {
                font-size: 12px;
                color: var(--colors-grey700);
                margin-top: var(--spacers-dp4);
                margin-bottom: var(--spacers-dp4);
            }
        `}</style>
    </>
)

SettingItem.propTypes = {
    children: PropTypes.node.isRequired,
    header: PropTypes.string.isRequired,
    subheader: PropTypes.string,
}

export default SettingItem
