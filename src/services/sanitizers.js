import sanitizeHtml from 'sanitize-html'

const reformatIframe = html => {
    return html.replace(/<iframe/g, '<iframe style="width: 60%; height:400px;"')
}

export const sanitizeAndReformat = html => {
    return reformatIframe(sanitize(html))
}

export const sanitize = html => {
    const sanitizedHTML = sanitizeHtml(html, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['iframe']),
        allowedAttributes: Object.assign(
            {},
            sanitizeHtml.defaults.allowedAttributes,
            { iframe: ['src'] }
        ),
        allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com'],
    })
    return sanitizedHTML
}
