import React from 'react'
import { render } from '../../../testing/test-utils'
import '@testing-library/jest-dom/extend-expect'
import EditTopics from '../EditTopics'

describe('EditTopics', () => {
    it('Renders as expected', () => {
        const { container } = render(<EditTopics />, {
            initialState: {
                settingsEdit: {
                    topics: [
                        { id: 'r', name: 'rabbits' },
                        { id: 'd', name: 'dogs' },
                    ],
                },
            },
        })
        expect(container).toMatchSnapshot()
    })
})
