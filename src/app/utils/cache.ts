export function setCache<T>(key: string, data: CacheData<T>) {
    let result: CacheObject<unknown> = {
        key: key,
        data: data,
        error: null
    }
    try {
        const dataStr = JSON.stringify(data)
        if (dataStr) {
            console.log('dataStr', dataStr)
            localStorage.setItem(key, dataStr)
            result.error = null
            return result
        }

        result.error = 'Ocorreu um erro ao tentar salvar os dados no local storage.'
        return result
    } catch (error) {
        result.error = 'Ocorreu um erro ao salvar os dados no local storage.'
        return result
    }
}

export type CacheData<T> = object | Array<T> | unknown | null

export type CacheObject<T> = {
    key: string,
    data?: CacheData<T>,
    error?: string | null
}

export function getCache(key: string) {
    let result: CacheObject<unknown> = {
        key: key,
        data: null,
        error: null
    }
    try {
        const item = localStorage.getItem(key)
        result.data = item
        if (!item) {
            result.data = null
            result.error = 'O item não pode ser encontrado'
        }

        return result
    } catch (error) {
        result.error = 'Ocorreu um erro ao carregar os dados do local storage.'
        return result
    }
}