import React from 'react'
import { render, screen } from '../../../testing/test-utils'
import '@testing-library/jest-dom/extend-expect'
import HelpTopicDisplay from '../HelpTopicDisplay'

describe('HelpTopicDisplay', () => {
    it('Displays selected topic HTML', () => {
        render(<HelpTopicDisplay />, {
            initialState: {
                selected: {
                    name: 'Moomin Test',
                    html: '<p>Velkommen til Mummidalen!</p>',
                },
            },
        })
        expect(
            screen.queryByText('Velkommen til Mummidalen!')
        ).toBeInTheDocument()
    })

    it('Shows edit option if user is superuser', () => {
        render(<HelpTopicDisplay />, {
            initialState: {
                selected: { name: 'Moomin Test' },
                user: { isSuperuser: true },
            },
        })
        const editButton = screen
            .getAllByRole('button')
            .filter(button => button.textContent === 'Edit')[0]
        expect(editButton).toBeInTheDocument()
    })

    it('Does not show edit option if user is not superuser', () => {
        render(<HelpTopicDisplay />, {
            initialState: {
                selected: { name: 'Moomin Test' },
                user: { isSuperuser: false },
            },
        })
        const buttons = screen.queryByRole('button')
        expect(buttons).not.toBeInTheDocument()
    })
})
