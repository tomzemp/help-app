import '@testing-library/jest-dom/extend-expect'

import { sanitize, sanitizeAndReformat } from '../sanitizers'

describe('Sanitize', () => {
    it('removes <script> tags', () => {
        const mockHTML =
            '<span>I am totally innocent</span><script>document.getElementById("app").deleteEverything()</script>'
        const sanitizedHTML = '<span>I am totally innocent</span>'
        expect(sanitize(mockHTML)).toEqual(sanitizedHTML)
    })
})

describe('SanitizeAndReformat', () => {
    it('resizes iframe elements', () => {
        const mockHTML = '<iframe></iframe><iframe></iframe>'
        const reformattedHTML =
            '<iframe style="width: 60%; height:400px;"></iframe><iframe style="width: 60%; height:400px;"></iframe>'
        expect(sanitizeAndReformat(mockHTML)).toEqual(reformattedHTML)
    })

    it('sanitizes and reformats', () => {
        const mockHTML =
            '<iframe></iframe><script>document.getElementById("app").deleteEverything()</script>'
        const sanitizedHTML =
            '<iframe style="width: 60%; height:400px;"></iframe>'
        expect(sanitizeAndReformat(mockHTML)).toEqual(sanitizedHTML)
    })
})
