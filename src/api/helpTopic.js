import { onError } from './index'

const helpTopicQuery = {
    helpTopic: {
        resource: 'dataStore/helpApp',
        id: ({ id }) => id,
    },
}

export const apiFetchHelpTopic = async (engine, id) => {
    try {
        const { helpTopic } = await engine.query(helpTopicQuery, {
            variables: { id: id },
        })
        return helpTopic
    } catch (error) {
        onError(error)
    }
}

const addTopicQuery = (id, data) => ({
    resource: `dataStore/helpApp/${id}`,
    type: 'create',
    data: data,
})

export const apiAddHelpTopicItem = async (engine, item) => {
    const addedTopic = await engine.mutate(addTopicQuery(item.id, item))
    return addedTopic
}

const updateTopicQuery = {
    resource: 'dataStore/helpApp',
    type: 'update',
    data: ({ data }) => data,
    id: ({ id }) => id,
}

export const apiUpdateHelpTopicItem = async (engine, id, data) => {
    const updatedTopic = await engine.mutate(updateTopicQuery, {
        variables: { id, data },
    })
    return updatedTopic
}

const updateTopicsSummaryQuery = {
    resource: 'dataStore/helpApp/topics',
    type: 'update',
    data: ({ data }) => data,
}

export const apiUpdateSummary = async (engine, summary) => {
    const updatedSummary = await engine.mutate(updateTopicsSummaryQuery, {
        variables: { data: summary },
    })
    return updatedSummary
}

const deleteTopicQuery = {
    resource: 'dataStore/helpApp',
    type: 'delete',
    id: ({ id }) => id,
}

export const apiDeleteHelpTopicItem = async (engine, id) => {
    const deletedItem = await engine.mutate(deleteTopicQuery, {
        variables: { id },
    })
    return deletedItem
}
