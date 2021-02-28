import React from 'react'
import { render, screen } from '../../../testing/test-utils'
import '@testing-library/jest-dom/extend-expect'
import ContactDialog from '../ContactDialog'

describe('ContactDialog', () => {
    it('Displays correct user name in from tag', () => {
        render(<ContactDialog />, {
            initialState: {
                appInfo: { helpDeskSubjects: [] },
                user: { name: 'Moomin' },
            },
        })
        expect(screen.getByTestId('userTag')).toHaveTextContent('Moomin')
    })
})
