<script lang="ts" setup>
import ToggleColorMode from './ToggleColorMode.vue'
</script>

<template>
  <nav class="border p-2 rounded-sm max-w-screen-md mx-auto shadow-sm flex items-center justify-between">
    <div class="logo flex items-center justify-center text-theme">
      <img src="@/assets/logo.svg" alt="logo">
      <div class="text-2xl font-bold ml-2">
        Text Poster
      </div>
    </div>
    <div class="flex items-center gap-4">
      <router-link to="/">
        Home
      </router-link>
      <router-link to="/canvas-layout">
        V2
      </router-link>
      <!-- <Icon class="size-7 p-1 rounded-sm cursor-pointer hover:bg-slate-100" icon="carbon:light" /> -->
      <ToggleColorMode />
    </div>
  </nav>
</template>
