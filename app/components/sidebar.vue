<template lang="pug">
  div.bg-white.rounded-xl.h-full.py-4.flex.flex-col
    // Logo
    div.flex.justify-center.items-center.px-4
      img(:src="sidebarMenuItems?.logo?.img" alt="Logo" title="Logo" class="object-contain h-8")
    
    // Menu container
    div.flex.flex-col.justify-between.flex-1.pt-10.px-2
      // Overview section
      div.flex.flex-col.gap-5
        div.px-4
          p.text-xs.font-normal.font-poppins.uppercase.text-gray-500 {{ sidebarMenuItems?.overview?.title }}
        div.flex.flex-col.gap-3
          div(v-for="item in sidebarMenuItems?.overview?.items" :key="item.name")
            a(
              :href="item.link"
              :class="isActiveRoute(item.link) ? 'flex flex-row gap-2.5 items-center py-2 rounded-lg px-2 bg-[#F5F7FB]' : 'flex flex-row gap-2.5 items-center py-2 rounded-lg px-2 hover:bg-[#F5F7FB]'"
            )
              UIcon(
                :name="item.icon" 
                :class="isActiveRoute(item.link) ? 'size-5 text-[#3B82F6]' : 'size-5 text-[#777777]'"
              )
              span(
                :class="isActiveRoute(item.link) ? 'font-roboto font-medium text-sm text-[#3B82F6]' : 'font-roboto font-medium text-sm text-[#777777]'"
              ) {{ item.name }}
              
      // Settings section
      div.flex.flex-col.gap-5
        div.px-4
          p.text-xs.font-normal.font-poppins.uppercase.text-gray-500 {{ sidebarMenuItems?.settings?.title }}
        div.flex.flex-col.gap-3
          div(v-for="item in sidebarMenuItems?.settings?.items" :key="item.name")
            a(
              :href="item.link" 
              :class="isActiveRoute(item.link) ? 'flex flex-row gap-2.5 items-center py-2 rounded-lg px-2 bg-[#F5F7FB]' : 'flex flex-row gap-2.5 items-center py-2 rounded-lg px-2 hover:bg-[#F5F7FB]'"
            )
              UIcon(
                :name="item.icon" 
                :class="item.name === 'Logout' ? 'size-5 text-[#FC2220]' : isActiveRoute(item.link) ? 'size-5 text-[#3B82F6]' : 'size-5 text-[#777777]'"
              )
              span(
                :class="item.name === 'Logout' ? 'font-roboto font-medium text-sm text-[#FC2220]' : isActiveRoute(item.link) ? 'font-roboto font-medium text-sm text-[#3B82F6]' : 'font-roboto font-medium text-sm text-[#777777]'"
              ) {{ item.name }}
</template>

<script>
const sidebarMenuItems = {
    logo: {
        type: 'logo',
        name: 'Logo',
        img: '/logo-svg.svg',
        link: '/'
    },
    overview: {
        type: 'section',
        title: 'Overview',
        items: [
            { name: 'Dashboard', icon: 'material-symbols:dashboard', link: '/' },
            { name: 'Inbox', icon: 'solar:inbox-bold', link: '/inbox' }
        ]
    },
    settings: {
        type: 'section',
        title: 'Settings',
        items: [
            { name: 'Settings', icon: 'material-symbols:dashboard-rounded', link: '/settings' },
            { name: 'Logout', icon: 'solar:logout-2-bold', link: '/logout' }
        ]
    }
};

export default {
    data() {
        return {
            sidebarMenuItems
        }
    },
    methods: {
        isActiveRoute(link) {
            const route = useRoute()
            
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
    }
}
</script>