import { CssVariables } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

const Layout = ({ children }) => (
    <>
        <CssVariables colors spacers />
        <div className="page-layout">{children}</div>
        <style jsx global>{`
            body {
                background-color: #f3f5f7;
            }
            .outerContainer {
                height: 100%;
            }
            .innerContainer {
                width: 95%;
                margin: auto;
                height: 100%;
            }
        `}</style>
    </>
)

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
