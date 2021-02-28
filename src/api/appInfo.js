import i18n from '../locales'
import { onError } from './index'

const summaryEndpoint = 'dataStore/helpApp/summary'

const DEFAULT_SETTINGS = { title: i18n.t('Help app'), allowMessages: false }
const DEFAULT_TOPICS = []

// get app info on startup

const appInfoQuery = {
    appInfo: {
        resource: summaryEndpoint,
    },
}

export const apiFetchAppInfo = async engine => {
    try {
        const { appInfo } = await engine.query(appInfoQuery)
        return appInfo
    } catch (error) {
        onError(error)
        onAppInfoError(engine)
    }
}

// update app info

const appInfoUpdateQuery = {
    resource: summaryEndpoint,
    type: 'update',
    data: ({ data }) => data,
}

export const apiUpdateAppInfo = async (engine, summary) => {
    const updatedSummary = await engine.mutate(appInfoUpdateQuery, {
        variables: { data: summary },
    })
    return updatedSummary
}

// initialization of datastore if necessary

const appCreateQuerySummary = {
    resource: summaryEndpoint,
    type: 'create',
    data: DEFAULT_SETTINGS,
}

const appCreateQueryTopics = {
    resource: 'dataStore/helpApp/topics',
    type: 'create',
    data: DEFAULT_TOPICS,
}

const onAppInfoError = async engine => {
    // check if resource is present. if not: create
    let resp
    if (process.env.NODE_ENV === 'development') {
        const url = `${engine.link.baseUrl}/${engine.link.apiPath}/dataStore/helpApp`
        resp = await fetch(url, { mode: 'cors', credentials: 'include' })
    } else {
        const url = `${engine.link.apiPath}/dataStore/helpApp`
        resp = await fetch(url)
    }
    if (resp.status === 404) {
        await engine.mutate(appCreateQuerySummary)
        await engine.mutate(appCreateQueryTopics)
        location.reload()
    } else {
        throw new Error('Inaccessible')
    }
}
