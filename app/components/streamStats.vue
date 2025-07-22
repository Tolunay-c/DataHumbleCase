<template lang="pug">
div.flex.flex-col.gap-3
  // Header
  div(class="border-[#E6E6E6] ps-3").border-s
   h2(class="text-[#111111] font-poppins font-semibold text-xl") Stream Stats

  // Loading State
  div(v-if="pending")
    div.grid.grid-cols-2.gap-8
      div(v-for="i in 2" :key="i").space-y-3
        div.h-4.bg-gray-200.rounded.animate-pulse.w-20
        div.h-8.bg-gray-200.rounded.animate-pulse.w-16
        div.h-4.bg-gray-200.rounded.animate-pulse.w-24

  // Error State
  div(v-else-if="error")
    div.flex.items-center.gap-2.text-red-600
      UIcon(name="i-heroicons-exclamation-triangle" class="w-5 h-5")
      span.text-sm Stream verileri yüklenirken hata oluştu

  // Stats Content
  div(class="grid grid.cols-1 sm:grid-cols-2 gap-8" v-else-if="data")
    
    // Hours Watched
    div(class="bg-[#F5F7FB] rounded-lg p-4 flex flex-col gap-6")
      h3(class="text-[#111111] font-poppins font-semibold text-xl") Hours Watched
      div.text-5xl.font-poppins.font-semibold {{ formatNumber(data.hoursWatched?.value) }}
      div.flex.items-center.gap-1
        UIcon(
          :name="data.hoursWatched?.delta >= 0 ? 'i-heroicons-arrow-up-16-solid' : 'i-heroicons-arrow-down-16-solid'"
          :class="data.hoursWatched?.delta >= 0 ? 'text-green-500 font-poppins font-semibold text-xl' : 'text-red-500 font-poppins font-semibold text-xl'"
          class="w-12 h-12"
        )
        span.text-sm.font-medium(
          :class="data.hoursWatched?.delta >= 0 ? 'text-green-600 font-poppins font-semibold text-xl' : 'text-red-600 font-poppins font-semibold text-xl'"
        ) {{ formatDelta(data.hoursWatched?.delta) }}
        span.text-sm.text-gray-500 ({{ formatPercentage(data.hoursWatched?.deltaPercentage) }})

    // Average Viewers  
    div(class="bg-[#F5F7FB] rounded-lg p-4")
      h3(class="text-[#111111] font-poppins font-semibold text-xl") Average Viewers
      div.text-5xl.font-poppins.font-semibold {{ formatNumber(data.averageViewers?.value) }}
      div.flex.items-center.gap-1
        UIcon(
          :name="data.averageViewers?.delta >= 0 ? 'i-heroicons-arrow-up-16-solid' : 'i-heroicons-arrow-down-16-solid'"
          :class="data.averageViewers?.delta >= 0 ? 'text-green-500 font-poppins font-semibold text-xl' : 'text-red-500 font-poppins font-semibold text-xl'"
          class="w-12 h-12"
        )
        span.text-sm.font-medium(
          :class="data.averageViewers?.delta >= 0 ? 'text-green-600 font-poppins font-semibold text-xl' : 'text-red-600 font-poppins font-semibold text-xl'"
        ) {{ formatDelta(data.averageViewers?.delta) }}
        span.text-sm.text-gray-500 ({{ formatPercentage(data.averageViewers?.deltaPercentage) }})
</template>

<script setup>
// API'den veri çekme
const { data, pending, error } = await useFetch(
  'https://dhcase-mockapi.vercel.app/api/game/578080/stream',
  {
    key: 'stream-stats',
    default: () => ({ hoursWatched: null, averageViewers: null }),
    server: false,
    pick: ['hoursWatched', 'averageViewers'] // Sadece gerekli field'ları al
  }
)

// Sayıları formatla (6400000 -> 6.4M, 24300 -> 24.3K)
const formatNumber = (num) => {
  if (!num) return '0'
  
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toLocaleString()
}

// Delta değerlerini formatla (+1200000 -> +1.2M, -6932 -> -6932)
const formatDelta = (delta) => {
  if (!delta) return '0'
  
  const sign = delta >= 0 ? '+' : ''
  const absValue = Math.abs(delta)
  
  if (absValue >= 1000000) {
    return `${sign}${(delta / 1000000).toFixed(1)}M`
  } else if (absValue >= 1000) {
    return `${sign}${(delta / 1000).toFixed(1)}K`
  }
  return `${sign}${delta}`
}

// Yüzde formatla (22.1 -> 22.1%, -19.1 -> 19.1%)
const formatPercentage = (percentage) => {
  if (percentage === null || percentage === undefined) return '0%'
  return `${Math.abs(percentage)}%`
}
</script>