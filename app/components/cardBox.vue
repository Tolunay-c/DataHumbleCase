<template lang="pug">
div
  // Game Title - Props'tan gelir
  div(v-if="gameData?.name && !loading")
    h1(class="text-2xl xl:text-[2.5rem] font-semibold font-poppins") {{ gameData.name }}
  
  // Loading state
  div(v-else-if="loading")
    div(class="h-8 bg-gray-200 rounded animate-pulse w-64 mb-2")
  
  // Fallback title
  div(v-else)
    h1(class="text-2xl font-bold mb-6 text-gray-900") Game Dashboard
  
  // Cards Loading State
  div(class="flex flex-row items-center gap-5" v-if="loading")
    div(v-for="i in 3" :key="i" class="px-6 py-6 bg-gray-200 rounded-2xl animate-pulse")
      div(class="flex flex-row gap-5")
        div(class="w-12 h-12 bg-gray-300 rounded-xl")
        div(class="flex flex-col justify-between gap-2")
          div(class="h-6 w-16 bg-gray-300 rounded")
          div(class="h-4 w-12 bg-gray-300 rounded")

  // Cards Content - Props kullan, API isteği yok
  div(class="pt-[18px] pb-[28px] flex 2xl:flex-row flex-col items-start 2xl:items-center gap-5" v-else-if="gameData && !loading")
    div(
      v-for="(item, index) in cardData" 
      :key="index"
      :class="item.bgColor"
      class="px-6 py-6 bg-white rounded-2xl shadow-sm w-full 2xl:w-auto"
    )
      div(class="flex flex-row gap-5")
        div(class="p-2 flex flex-col items-center justify-center rounded-xl" :class="item.iconBg")
          UIcon(:name="item.icon" class="w-12 h-12 text-white")
        div(class="flex flex-col justify-between")
          span(class="text-[#111111] text-[2rem] font-semibold font-poppins") {{ item.value }}
          span(class="text-[0.92rem] font-semibold") {{ item.label }}

  // Error State
  div(class="flex items-center justify-center p-8" v-else-if="error")
    div(class="text-center")
      UIcon(name="i-heroicons-exclamation-triangle" class="w-12 h-12 text-red-500 mx-auto mb-2")
      p(class="text-red-600 font-medium") Veri yüklenirken bir hata oluştu
      UButton(@click="$emit('retry')" variant="outline" size="sm" class="mt-2") Tekrar Dene
</template>

<script setup>
// Props ile veri al - API isteği atma!
const props = defineProps({
  gameData: {
    type: Object,
    default: () => null
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: Object,
    default: null
  }
})

// Emit tanımla
const emit = defineEmits(['retry'])

// Icon ve color mapping
const iconMap = {
  price: 'solar:tag-price-bold',
  downloads: 'mingcute:game-1-fill', 
  revenue: 'healthicons:money-bag'
}

const colorMap = {
  price: { iconBg: 'bg-[#73B0FF66]' },
  downloads: { iconBg: 'bg-[#FF73E166]' },
  revenue: { iconBg: 'bg-[#FF737666]' }
}

// Format functions
const formatNumber = (num) => {
  if (!num) return '0'
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'm'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
  return num.toString()
}

const formatPrice = (price) => `$${price || 0}`

// Card data - props'tan hesapla
const cardData = computed(() => {
  if (!props.gameData) return []
  
  return [
    {
      icon: iconMap.price,
      value: formatPrice(props.gameData.price),
      label: 'Price',
      ...colorMap.price
    },
    {
      icon: iconMap.downloads,
      value: formatNumber(props.gameData.downloads),
      label: 'Downloads', 
      ...colorMap.downloads
    },
    {
      icon: iconMap.revenue,
      value: formatNumber(props.gameData.revenue),
      label: 'Revenue',
      ...colorMap.revenue
    }
  ]
})
</script>