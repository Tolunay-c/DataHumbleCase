<template lang="pug">
div.flex.items-center.gap-6
  // Icons dizisi için
  div(
    v-for="(iconItem, iconIndex) in boxData.icons" 
    :key="iconIndex"
    class="w-[60px] h-[60px] rounded-2xl flex justify-center items-center bg-white "
  )
    UIcon(
      :name="iconItem.icon" 
      :style="{color: iconItem.color}" 
      class="size-6"
    )

  div(class="w-[1px] h-[30px] bg-gray-500 opacity-45 ")

  // User image için
  div(
    v-if="boxData?.image"
    class="w-[60px] h-[60px] rounded-2xl flex justify-center items-center bg-white relative"
  )
    img(
      :src="boxData?.image" 
      :alt="boxData?.imageTitle"
      class="w-[60px] h-[60px] rounded-xl object-cover"
    )

  // UserName için
  div
    span(class="text-[#111111] font-roboto").font-medium.text-2xl {{ boxData.userName }}
</template>

<script>
const boxData = {
  icons: [
    {
      title: "Icon Box",
      icon: "material-symbols:mail",
      color: "#777777"
    },
    {
      title: "Icon Box", 
      icon: "iconoir:bell-notification-solid",
      color: "#777777" 
    }
  ],
  image: "/user-img.svg",
  imageTitle: "User Profile",
  userName: "Russel"
};

export default {
  data() {
    return {
      boxData
    }
  }
}
</script>