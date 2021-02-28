import React from 'react'
import { render, screen } from '../../../testing/test-utils'
import '@testing-library/jest-dom/extend-expect'
import NavigationRightActions from '../NavigationRightActions'

describe('NavigationRightActions', () => {
    it('Does not show edit option if user is not superuser', () => {
        render(<NavigationRightActions />, {
            initialState: { user: { isSuperuser: false } },
        })
        expect(screen.queryByText('Edit settings')).not.toBeInTheDocument()
    })

    it('Shows edit option if user is superuser', () => {
        render(<NavigationRightActions />, {
            initialState: { user: { isSuperuser: true } },
        })
        const editButton = screen
            .getAllByRole('button')
            .filter(button => button.textContent === 'Edit settings')[0]
        expect(editButton).toBeVisible()
    })

    it('Does not show contact help button if messaging is not allowed', () => {
        render(<NavigationRightActions />, {
            initialState: {
                appInfo: { allowMessages: false },
                user: { isSuperUser: false },
            },
        })
        expect(screen.queryByText('Contact help')).not.toBeInTheDocument()
    })

    it('Shows contact help button if messaging is allowed', () => {
        render(<NavigationRightActions />, {
            initialState: {
                appInfo: { allowMessages: true },
                user: { isSuperUser: false },
            },
        })
        const contactHelpButton = screen
            .getAllByRole('button')
            .filter(button => button.textContent === 'Contact help')[0]
        expect(contactHelpButton).toBeVisible()
    })
})
