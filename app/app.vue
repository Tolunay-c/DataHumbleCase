<script setup>
const colorMode = useColorMode()
const isLoading = ref(false) // Loading state için reaktif değişken

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  }
})

async function onClick() {
  isLoading.value = true // Loading başlat
  try {
    await new Promise(res => setTimeout(res, 1000))
    console.log('İşlem tamamlandı!')
  } finally {
    isLoading.value = false // Loading bitir
  }
}
</script>

<template lang="pug">
ClientOnly(v-if="!colorMode?.forced")
  UButton(
    :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
    color="neutral"
    variant="ghost"
    @click="isDark = !isDark"
  )
  
  template(#fallback)
    div.size-8

div.bg-red-500.h-64(class="dark:bg-cyan-500")

UButton(
  :loading="isLoading"
  @click="onClick"
  color="primary"
  variant="solid"
  class="mb-4"
) Test
</template>