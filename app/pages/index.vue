<template lang="pug">
div(class="grid grid-cols-1 2xl:grid-cols-[65%_35%] gap-4 lg:gap-8 2xl:gap-0")
  // Left Column - Main Content
  div(class="pt-4 lg:pt-[32px] flex flex-col px-0 lg:px-8")
    CardBox(
      :game-data="gameData" 
      :loading="pending"
      :error="error"
      @retry="retryFetch"
    )
    div(class="mt-6 px-4 lg:px-8 py-6 lg:py-10 bg-white rounded-2xl flex flex-col gap-5")
      PerformanceChart(
        :performance-data="gameData?.performance" 
        :loading="pending"
      )
      div(class="py-4 lg:py-8")
        DescriptionText(
          title="Description"
          :description="gameData?.description"
          :loading="pending"
        )
  
  // Right Column - Side Content
  div(class="mt-4 lg:ml-8 lg:mr-8 2xl:ml-0 2xl:mr-0 2xl:mt-8 px-4 lg:px-[22px] py-4 lg:py-[22px] bg-white flex flex-col gap-4 lg:gap-5 2xl:gap-0 justify-between rounded-2xl")
    DescriptionText(
      title="Short Description"
      content-class="bg-white"
      :description="gameData?.description"
      :loading="pending"
    )
    StreamPerformance(
      :stream-data="gameData?.stream" 
      :loading="pending"
    )
    StreamStats(
      :stream-data="gameData?.stream" 
      :loading="pending"
    )
</template>

<script setup>
// Debug için konsol logları ekle
console.log('🔥 Index.vue component loading...')

// Nuxt 4.0 için useFetch kullanımı
const { data: gameData, pending, error, refresh } = await useFetch('/api/game-dashboard', {
  key: 'game-dashboard-v4',
  default: () => null,
  server: true,
  lazy: false,
  retry: 1,
  retryDelay: 1000,
  timeout: 15000,
  onRequest(context) {
    console.log('📡 [Nuxt 4] Making request to:', context.request)
  },
  onResponse(context) {
    console.log('✅ [Nuxt 4] Response received:', context.response.status)
    if (context.response._data) {
      console.log('📦 [Nuxt 4] Data:', context.response._data)
    }
  },
  onResponseError(context) {
    console.error('❌ [Nuxt 4] Response error:', {
      status: context.response?.status,
      statusText: context.response?.statusText,
      data: context.response?._data,
      error: context.error
    })
  },
  onRequestError(context) {
    console.error('❌ [Nuxt 4] Request error:', context.error)
  }
})

// Retry fonksiyonu
const retryFetch = async () => {
  console.log('🔄 Retrying fetch...')
  await refresh()
}

// Hata durumunu izle
watch(error, (newError) => {
  if (newError) {
    console.error('🚨 Fetch error detected:', newError)
  }
})

// Data değişimini izle
watch(gameData, (newData) => {
  if (newData) {
    console.log('📊 Game data updated:', newData)
  }
}, { immediate: true })

// Page meta
useHead({
  title: 'Dashboard - Game Analytics'
})
</script>