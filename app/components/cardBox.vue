<template lang="pug">
div
  // Game Title from API - Dynamic
  div(class="" v-if="data?.name")
    h1(class="text-2xl xl:text-[2.5rem]").font-semibold.font-poppins {{ data.name }}
  
  
  // Loading state for title
  div(v-else-if="pending")
    div.h-8.bg-gray-200.rounded.animate-pulse.w-64.mb-2
    div.h-4.bg-gray-200.rounded.animate-pulse.w-32.mb-6
  
  // Fallback title
  div(v-else)
    h1.text-2xl.font-bold.mb-6.text-gray-900 Game Dashboard
  
  // Cards Loading State
  div.flex.flex-row.items-center.gap-5(v-if="pending")
    div(v-for="i in 3" :key="i").px-6.py-6.bg-gray-200.rounded-2xl.animate-pulse
      div.flex.flex-row.gap-5
        div.w-12.h-12.bg-gray-300.rounded-xl
        div.flex.flex-col.justify-between.gap-2
          div.h-6.w-16.bg-gray-300.rounded
          div.h-4.w-12.bg-gray-300.rounded

  // Cards Content
  div(class="pt-[18px] pb-[28px] flex 2xl:flex-row flex-col items-start 2xl:items-center").gap-5(v-else-if="data")
    div(
      v-for="(item, index) in cardData" 
      :key="index"
      :class="item.bgColor"
      class="px-6 py-6 bg-white rounded-2xl shadow-sm w-full 2xl:w-auto"
    )
      div.flex.flex-row.gap-5
        div.p-2.flex.flex-col.items-center.justify-center.rounded-xl(:class="item.iconBg")
          UIcon(:name="item.icon" class="w-12 h-12 text-white")
        div.flex.flex-col.justify-between
          span(class="text-[#111111] text-[2rem]").font-semibold.font-poppins {{ item.value }}
          span(class=" text-[0.92rem]").font-semibold {{ item.label }}

  // Error State
  div.flex.items-center.justify-center.p-8(v-else-if="error")
    div.text-center
      UIcon(name="i-heroicons-exclamation-triangle" class="w-12 h-12 text-red-500 mx-auto mb-2")
      p.text-red-600.font-medium Veri yüklenirken bir hata oluştu
      UButton(@click="refresh" variant="outline" size="sm" class="mt-2") Tekrar Dene
</template>

<script setup>
// API'den veri çekme - name field dahil
const { data, pending, error, refresh } = await useFetch('https://dhcase-mockapi.vercel.app/api/game/578080/overview', {
  key: 'game-overview',
  default: () => null,
  server: true,
  lazy: false,
  pick: ['name', 'price', 'downloads', 'revenue']
})

// Icon mapping
const iconMap = {
  price: 'solar:tag-price-bold',
  downloads: 'mingcute:game-1-fill', 
  revenue: 'healthicons:money-bag'
}

// Color mapping
const colorMap = {
  price: {
  
    iconBg: 'bg-[#73B0FF66]'
  },
  downloads: {
   
    iconBg: 'bg-[#FF73E166]'
  },
  revenue: {
 
    iconBg: 'bg-[#FF737666]'  
  }
}

// Format functions
const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'm'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

const formatPrice = (price) => {
  return `$${price}`
}

// Card data
const cardData = computed(() => {
  if (!data.value) return []
  
  return [
    {
      icon: iconMap.price,
      value: formatPrice(data.value.price),
      label: 'Price',
      ...colorMap.price
    },
    {
      icon: iconMap.downloads,
      value: formatNumber(data.value.downloads),
      label: 'Downloads', 
      ...colorMap.downloads
    },
    {
      icon: iconMap.revenue,
      value: formatNumber(data.value.revenue),
      label: 'Revenue',
      ...colorMap.revenue
    }
  ]
})
</script>