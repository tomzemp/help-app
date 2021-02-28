import { Button } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import i18n from '../../locales'

const EditButton = ({ buttonText, disabled, onClick }) => {
    return (
        <>
            <div>
                <Button disabled={disabled} onClick={onClick} type="button">
                    {i18n.t(`${buttonText}`)}
                </Button>
            </div>
        </>
    )
}

EditButton.propTypes = {
    buttonText: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
}

export default EditButton
