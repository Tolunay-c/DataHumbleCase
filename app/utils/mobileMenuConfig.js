// mobileMenuConfig.js
export const mobileMenuConfig = {
  // Kullanıcı bilgileri
  user: {
    name: 'Russel Anderson',
    email: 'russel@example.com',
    avatar: '/user-img.svg',
    role: 'Admin'
  },

  // Ana menü bölümleri
  sections: {
    overview: {
      title: 'Overview',
      icon: 'i-heroicons-squares-2x2',
      items: [
        {
          id: 'dashboard',
          name: 'Dashboard',
          icon: 'material-symbols:dashboard',
          link: '/',
          description: 'Ana dashboard görünümü',
          badge: null,
          isActive: true
        },
        {
          id: 'inbox',
          name: 'Inbox',
          icon: 'solar:inbox-bold',
          link: '/inbox',
          description: 'Mesajlar ve bildirimler',
          badge: {
            count: 3,
            color: 'red',
            type: 'notification'
          },
          isActive: false
        }
      ]
    },
    
    settings: {
      title: 'Settings',
      icon: 'i-heroicons-cog-6-tooth',
      items: [
        {
          id: 'settings',
          name: 'Settings',
          icon: 'material-symbols:dashboard-rounded',
          link: '/settings',
          description: 'Hesap ve uygulama ayarları',
          badge: null,
          isActive: false
        },
        {
          id: 'logout',
          name: 'Logout',
          icon: 'solar:logout-2-bold',
          link: '/logout',
          description: 'Oturumu kapat',
          badge: null,
          isActive: false,
          isSpecial: true, // Özel styling için
          specialType: 'danger'
        }
      ]
    }
  },

  // Hızlı aksiyonlar (opsiyonel)
  quickActions: [
    {
      id: 'new-message',
      name: 'New Message',
      icon: 'i-heroicons-plus',
      action: 'compose',
      variant: 'solid',
      color: 'primary',
      description: 'Yeni mesaj oluştur'
    },
    {
      id: 'refresh-data',
      name: 'Refresh Data',
      icon: 'i-heroicons-arrow-path',
      action: 'refresh',
      variant: 'outline',
      color: 'gray',
      description: 'Verileri yenile'
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: 'i-heroicons-bell',
      action: 'notifications',
      variant: 'ghost',
      color: 'orange',
      description: 'Bildirimleri görüntüle',
      badge: {
        count: 5,
        color: 'orange'
      }
    }
  ],

  // Footer bölümü (opsiyonel)
  footer: {
    version: 'v2.1.0',
    copyright: '© 2024 Your Company',
    links: [
      {
        name: 'Privacy',
        link: '/privacy',
        icon: 'i-heroicons-shield-check'
      },
      {
        name: 'Terms',
        link: '/terms',
        icon: 'i-heroicons-document-text'
      },
      {
        name: 'Help',
        link: '/help',
        icon: 'i-heroicons-question-mark-circle'
      }
    ]
  },

  // Theme ve görünüm ayarları
  appearance: {
    showUserProfile: true,
    showQuickActions: true,
    showFooter: false,
    enableSwipeGestures: true,
    animationDuration: 300,
    overlayOpacity: 0.5
  },

  // Breakpoint ayarları
  breakpoints: {
    mobile: 1024, // 1024px altı mobile menu
    tablet: 768,
    desktop: 1024
  }
}

// Menü state management için helper functions
export const menuHelpers = {
  // Aktif route'u belirle
  setActiveRoute: (config, currentPath) => {
    Object.values(config.sections).forEach(section => {
      section.items.forEach(item => {
        item.isActive = item.link === currentPath || 
                       (item.link === '/' && currentPath === '/')
      })
    })
    return config
  },

  // Badge sayılarını güncelle
  updateBadges: (config, badges) => {
    Object.values(config.sections).forEach(section => {
      section.items.forEach(item => {
        if (badges[item.id]) {
          item.badge = {
            ...item.badge,
            count: badges[item.id]
          }
        }
      })
    })
    return config
  },

  // Menü item'ını bul
  findMenuItem: (config, itemId) => {
    for (const section of Object.values(config.sections)) {
      const item = section.items.find(item => item.id === itemId)
      if (item) return item
    }
    return null
  },

  // Quick action'ı bul
  findQuickAction: (config, actionId) => {
    return config.quickActions?.find(action => action.id === actionId)
  }
}

// Varsayılan export
export default mobileMenuConfig