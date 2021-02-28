import { onError } from './index'

const topicsSummaryQuery = {
    topics: {
        resource: 'dataStore/helpApp/topics',
    },
}

export const apiFetchTopics = async engine => {
    try {
        const { topics } = await engine.query(topicsSummaryQuery)
        return topics.topics
    } catch (error) {
        onError(error)
    }
}
