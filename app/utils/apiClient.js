// utils/apiClient.js - Request batching
class ApiClient {
  constructor() {
    this.pendingRequests = new Map()
    this.requestQueue = []
    this.batchTimeout = null
  }

  // Aynı request'leri birleştir
  async request(url, options = {}) {
    const requestKey = `${url}-${JSON.stringify(options)}`
    
    // Aynı request zaten pending ise, o promise'i döndür
    if (this.pendingRequests.has(requestKey)) {
      console.log('Duplicate request prevented:', url)
      return this.pendingRequests.get(requestKey)
    }

    const requestPromise = this._makeRequest(url, options)
    this.pendingRequests.set(requestKey, requestPromise)

    try {
      const result = await requestPromise
      return result
    } finally {
      this.pendingRequests.delete(requestKey)
    }
  }

  async _makeRequest(url, options) {
    return await $fetch(url, options)
  }

  // Batch requests for GraphQL
  batchRequest(query, variables = {}) {
    return new Promise((resolve, reject) => {
      this.requestQueue.push({ query, variables, resolve, reject })
      
      if (this.batchTimeout) {
        clearTimeout(this.batchTimeout)
      }

      this.batchTimeout = setTimeout(() => {
        this._processBatch()
      }, 10) // 10ms batch window
    })
  }

  async _processBatch() {
    if (this.requestQueue.length === 0) return

    const batch = [...this.requestQueue]
    this.requestQueue = []

    try {
      // Multiple queries'i tek request'te gönder
      const batchQuery = batch.map(item => item.query).join('\n')
      const result = await $fetch('/api/graphql', {
        method: 'POST',
        body: { query: batchQuery }
      })

      // Results'ları ilgili promise'lere dağıt
      batch.forEach((item, index) => {
        item.resolve(result.data[index])
      })
    } catch (error) {
      batch.forEach(item => item.reject(error))
    }
  }
}

// Singleton instance
export const apiClient = new ApiClient()

// composables/useOptimizedFetch.js
export const useOptimizedFetch = (url, options = {}) => {
  const { 
    immediate = true,
    cache = true,
    dedupe = true,
    ...fetchOptions 
  } = options

  const data = ref(null)
  const error = ref(null)
  const pending = ref(false)

  const execute = async () => {
    if (pending.value && dedupe) {
      console.log('Request deduped:', url)
      return
    }

    pending.value = true
    error.value = null

    try {
      const result = cache 
        ? await apiClient.request(url, fetchOptions)
        : await $fetch(url, fetchOptions)
      
      data.value = result
    } catch (err) {
      error.value = err
      console.error('Fetch error:', url, err)
    } finally {
      pending.value = false
    }
  }

  if (immediate) {
    execute()
  }

  return {
    data: readonly(data),
    error: readonly(error),
    pending: readonly(pending),
    refresh: execute
  }
}

// Debounced search example
// composables/useSearch.js
export const useSearch = (searchFn, delay = 300) => {
  const searchTerm = ref('')
  const results = ref([])
  const loading = ref(false)
  
  const debouncedSearch = useDebounceFn(async (term) => {
    if (!term.trim()) {
      results.value = []
      return
    }

    loading.value = true
    try {
      results.value = await searchFn(term)
    } catch (error) {
      console.error('Search error:', error)
      results.value = []
    } finally {
      loading.value = false
    }
  }, delay)

  watch(searchTerm, (newTerm) => {
    debouncedSearch(newTerm)
  })

  return {
    searchTerm,
    results: readonly(results),
    loading: readonly(loading)
  }
}