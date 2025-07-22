<template lang="pug">
div

  div(class="lg:hidden bg-white px-4 py-3 flex items-center justify-between shadow-sm")
    // Logo
    div(class="flex items-center")
      img(src="/logo-svg.svg" alt="Logo" class="h-8")
    
    //User Profile and Hamburger Button
    div(class="flex items-center gap-2")
   
      div(class="flex items-center gap-2")
        div(class="flex gap-2")
          UIcon(name="material-symbols:mail" class="w-5 h-5 text-gray-600")
          UIcon(name="iconoir:bell-notification-solid" class="w-5 h-5 text-gray-600")
        img(src="/user-img.svg" alt="User" class="w-8 h-8 rounded-lg")
        span(class="font-medium text-sm text-gray-800") Russel
      
      // Hamburger Button
      UButton(
        @click="toggleMenu"
        variant="ghost"
        size="sm"
        :icon="isMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
        class="text-gray-600"
      )

  // Mobile Sidebar Overlay (menu açıkken görünür)
  div(
    v-if="isMenuOpen"
    class="lg:hidden fixed inset-0 z-50 bg-white/50 backdrop-blur-sm transition-opacity"
    @click="closeMenu"
  )

  // Mobile Sidebar Menu
  div(
    :class="isMenuOpen ? 'translate-x-0' : '-translate-x-full'"
    class="lg:hidden fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50"
  )
    // Menu Header
    div(class="flex items-center justify-between p-4")
      img(src="/logo-svg.svg" alt="Logo" class="h-8")
      UButton(
        @click="closeMenu"
        variant="ghost"
        size="sm"
        icon="i-heroicons-x-mark"
        class="text-gray-600"
      )

    // Menu Content
    div(class="flex flex-col p-4 space-y-6")
      // User Profile Section
      div(class="flex items-center gap-3 pb-4")
        img(src="/user-img.svg" alt="User" class="w-12 h-12 rounded-xl")
        div
          div(class="font-semibold text-gray-800") {{ mobileMenuData.user.name }}
          div(class="text-sm text-gray-500") {{ mobileMenuData.user.email }}

      // Overview Section
      div
        h3(class="text-xs font-medium text-gray-500 uppercase mb-3") {{ mobileMenuData.sections.overview.title }}
        div(class="space-y-1")
          div(v-for="item in mobileMenuData.sections.overview.items" :key="item.name")
            a(
              :href="item.link"
              @click="handleMenuItemClick(item.link)"
              :class="isActiveRoute(item.link) ? activeLinkClass : inactiveLinkClass"
            )
              UIcon(:name="item.icon" class="w-5 h-5")
              span {{ item.name }}

      // Settings Section
      div
        h3(class="text-xs font-medium text-gray-500 uppercase mb-3") {{ mobileMenuData.sections.settings.title }}
        div(class="space-y-1")
          div(v-for="item in mobileMenuData.sections.settings.items" :key="item.name")
            a(
              :href="item.link"
              @click="handleMenuItemClick(item.link)"
              :class="getMenuItemClass(item)"
            )
              UIcon(
                :name="item.icon" 
                :class="item.name === 'Logout' ? 'w-5 h-5 text-red-500' : 'w-5 h-5'"
              )
              span(
                :class="item.name === 'Logout' ? 'text-red-500' : ''"
              ) {{ item.name }}

      // Quick Actions (Opsiyonel)
      div(v-if="mobileMenuData.quickActions")
        h3(class="text-xs font-medium text-gray-500 uppercase mb-3") Quick Actions
        div(class="space-y-2")
          UButton(
            v-for="action in mobileMenuData.quickActions"
            :key="action.name"
            :variant="action.variant"
            :color="action.color"
            size="sm"
            :icon="action.icon"
            @click="handleQuickAction(action.action)"
            class="w-full justify-start"
          ) {{ action.name }}
</template>

<script setup>
// Reactive menu state
const isMenuOpen = ref(false)
const route = useRoute()

// Mobile menu data
const mobileMenuData = ref({
  user: {
    name: 'Russel',
    email: 'russel@example.com',
    avatar: '/user-img.svg'
  },
  sections: {
    overview: {
      title: 'Overview',
      items: [
        {
          name: 'Dashboard',
          icon: 'material-symbols:dashboard',
          link: '/',
          description: 'Ana dashboard görünümü'
        },
        {
          name: 'Inbox',
          icon: 'solar:inbox-bold',
          link: '/inbox',
          description: 'Mesajlar ve bildirimler'
        }
      ]
    },
    settings: {
      title: 'Settings',
      items: [
        {
          name: 'Settings',
          icon: 'material-symbols:dashboard-rounded',
          link: '/settings',
          description: 'Hesap ve uygulama ayarları'
        },
        {
          name: 'Logout',
          icon: 'solar:logout-2-bold',
          link: '/logout',
          description: 'Oturumu kapat'
        }
      ]
    }
  },
  quickActions: [
    {
      name: 'New Message',
      icon: 'i-heroicons-plus',
      action: 'compose',
      variant: 'solid',
      color: 'primary'
    },
    {
      name: 'Refresh Data',
      icon: 'i-heroicons-arrow-path',
      action: 'refresh',
      variant: 'outline',
      color: 'gray'
    }
  ]
})

// CSS Classes
const activeLinkClass = 'flex items-center gap-3 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium transition-colors'
const inactiveLinkClass = 'flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors'

// Methods
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const isActiveRoute = (link) => {
  // Ana sayfa için özel kontrol
  if (link === '/' && route.path === '/') {
    return true
  }
  
  // Diğer sayfalar için path karşılaştırması
  if (link !== '/' && route.path === link) {
    return true
  }
  
  return false
}

const getMenuItemClass = (item) => {
  if (item.name === 'Logout') {
    return 'flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg font-medium transition-colors'
  }
  
  return isActiveRoute(item.link) ? activeLinkClass : inactiveLinkClass
}

const handleMenuItemClick = (link) => {
  // Menu item tıklandığında menüyü kapat
  closeMenu()
  
  // Logout özel durumu
  if (link === '/logout') {
    handleLogout()
    return
  }
  
  // Normal navigation
  navigateTo(link)
}

const handleQuickAction = (action) => {
  const toast = useToast()
  
  switch (action) {
    case 'compose':
      toast.add({
        title: 'New Message',
        description: 'Message composer opened',
        icon: 'i-heroicons-pencil'
      })
      break
      
    case 'refresh':
      toast.add({
        title: 'Refreshing...',
        description: 'Data is being refreshed',
        icon: 'i-heroicons-arrow-path'
      })
      break
      
    default:
      break
  }
  
  closeMenu()
}

const handleLogout = () => {
  const toast = useToast()
  toast.add({
    title: 'Logging out...',
    description: 'You are being logged out',
    icon: 'i-heroicons-arrow-right-on-rectangle',
    color: 'red'
  })
  
  // Logout logic burada olacak
  setTimeout(() => {
    navigateTo('/login')
  }, 1500)
}

// Body scroll'u kontrol et - menu açıkken scroll engelle
watch(isMenuOpen, (isOpen) => {
  if (process.client) {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

// Component unmount'ta scroll'u düzelt
onUnmounted(() => {
  if (process.client) {
    document.body.style.overflow = ''
  }
})

// Escape key ile menüyü kapat
onMounted(() => {
  const handleEscape = (event) => {
    if (event.key === 'Escape') {
      closeMenu()
    }
  }
  
  document.addEventListener('keydown', handleEscape)
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>