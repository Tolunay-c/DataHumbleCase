<template lang="pug">
div.rounded-2xl
  // Loading State
  div(v-if="loading")
    div.space-y-3
      div.h-4.bg-gray-200.rounded.animate-pulse
      div.h-4.bg-gray-200.rounded.animate-pulse.w-4/5
      div.h-4.bg-gray-200.rounded.animate-pulse.w-3/5

  // Error State
  div(v-else-if="!description && !loading")
    div.flex.items-center.gap-2.text-red-600
      UIcon(name="i-heroicons-exclamation-triangle" class="w-5 h-5")
      span.text-sm Açıklama bulunamadı

  // Description Content
  div(v-else-if="description")
    div(:class="titleClass" v-if="showTitle") {{ title }}
    div(:class="contentClass")
      p(
        class="font-roboto font-normal leading-relaxed text-base overflow-hidden line-clamp-6 text-justify"
      ) {{ repeatedText }}

  // No Description
  div(v-else)
    p.text-gray-400.italic.text-sm Açıklama bulunamadı
</template>

<script setup>
// Props tanımlaması - API isteği yok, sadece props!
const props = defineProps({
  title: {
    type: String,
    default: 'Description'
  },
  description: {
    type: String,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  },
  showTitle: {
    type: Boolean,
    default: true
  },
  titleClass: {
    type: String,
    default: 'font-semibold font-poppins text-xl mb-3'
  },
  contentClass: {
    type: String,
    default: 'bg-[#F5F7FB] rounded-lg p-4'
  }
})

// Text'i 3 kere tekrarla - props'tan
const repeatedText = computed(() => {
  if (!props.description) return ''
  return `${props.description} ${props.description} ${props.description}`
})
</script>